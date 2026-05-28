let currentModule = MODULES[0];
let currentTab = "overview";

const moduleList = document.getElementById("moduleList");
const content = document.getElementById("content");
const moduleTitle = document.getElementById("moduleTitle");
const priorityPill = document.getElementById("priorityPill");
const searchInput = document.getElementById("searchInput");

const tabs = document.querySelectorAll(".tab");

/* ---------------------------
   LOCAL STORAGE
--------------------------- */

function getLearnedTopics() {
    return JSON.parse(
        localStorage.getItem("learnedTopics")
    ) || {};
}

function saveLearnedTopics(data) {
    localStorage.setItem(
        "learnedTopics",
        JSON.stringify(data)
    );
}

function getNotes(moduleId) {
    return localStorage.getItem(
        `notes-${moduleId}`
    ) || "";
}

function saveNotes(moduleId, text) {
    localStorage.setItem(
        `notes-${moduleId}`,
        text
    );
}

/* ---------------------------
   PROGRESS
--------------------------- */

function getModuleProgress(module) {

    const learned = getLearnedTopics();

    let total = 0;
    let completed = 0;

    module.sections.forEach(section => {

        section.topics.forEach(topic => {

            total++;

            const key =
                `${module.id}-${topic}`;

            if (learned[key]) {
                completed++;
            }
        });
    });

    return {
        total,
        completed,
        percent:
            total === 0
                ? 0
                : Math.round(
                    (completed / total) * 100
                )
    };
}

function getTotalProgress() {

    let totalTopics = 0;
    let completedTopics = 0;

    MODULES.forEach(module => {

        const progress =
            getModuleProgress(module);

        totalTopics += progress.total;
        completedTopics +=
            progress.completed;
    });

    return {
        totalTopics,
        completedTopics,
        percent:
            totalTopics === 0
                ? 0
                : Math.round(
                    (
                        completedTopics /
                        totalTopics
                    ) * 100
                )
    };
}

/* ---------------------------
   SIDEBAR
--------------------------- */

function renderSidebar(search = "") {

    moduleList.innerHTML = "";

    const filtered =
        MODULES.filter(module =>
            module.title
                .toLowerCase()
                .includes(
                    search.toLowerCase()
                )
        );

    filtered.forEach(module => {

        const progress =
            getModuleProgress(module);

        const div =
            document.createElement("div");

        div.className =
            "module-item";

        if (
            currentModule.id ===
            module.id
        ) {
            div.classList.add(
                "active"
            );
        }

        div.innerHTML = `
            <div class="module-title">
                <span class="dot ${module.color}">
                </span>

                ${module.id}.
                ${module.title}
            </div>

            <div class="module-sub">
                ${progress.completed}
                /
                ${progress.total}
                topics ·
                ${module.priority}
            </div>
        `;

        div.addEventListener(
            "click",
            () => {

                currentModule =
                    module;

                updateHeader();
                renderSidebar(
                    searchInput.value
                );
                renderContent();
            }
        );

        moduleList.appendChild(
            div
        );
    });
}

/* ---------------------------
   HEADER
--------------------------- */

function updateHeader() {

    moduleTitle.textContent =
        `Module ${currentModule.id} — ${currentModule.title}`;

    priorityPill.textContent =
        `Priority: ${currentModule.priority}`;
}

/* ---------------------------
   TABS
--------------------------- */

tabs.forEach(tab => {

    tab.addEventListener(
        "click",
        () => {

            tabs.forEach(t =>
                t.classList.remove(
                    "active"
                )
            );

            tab.classList.add(
                "active"
            );

            currentTab =
                tab.dataset.tab;

            renderContent();
        }
    );
});

/* ---------------------------
   OVERVIEW
--------------------------- */

function renderOverview() {

    const progress =
        getTotalProgress();

    return `
        <div class="card">

            <h2 class="card-title">
                Overall Progress
            </h2>

            <div class="progress-wrapper">

                <div
                    style="
                    display:flex;
                    justify-content:
                    space-between;
                    margin-bottom:12px;
                ">

                    <strong>
                        ${progress.percent}%
                    </strong>

                    <span>
                        ${progress.completedTopics}
                        /
                        ${progress.totalTopics}
                        topics
                    </span>

                </div>

                <div
                    class="progress-bar">

                    <div
                        class="progress-fill"
                        style="
                        width:
                        ${progress.percent}%"
                    >
                    </div>

                </div>
            </div>

            <div
                style="
                display:grid;
                grid-template-columns:
                repeat(auto-fill,
                minmax(280px,1fr));
                gap:20px;
            ">

                ${MODULES.map(module => {

                    const p =
                        getModuleProgress(
                            module
                        );

                    return `
                    <div
                        class="topic-card"
                    >
                        <h3>
                            ${module.id}.
                            ${module.title}
                        </h3>

                        <p
                            style="
                            color:gray;
                            margin-top:8px;
                        ">
                            ${module.priority}
                        </p>

                        <div
                            style="
                            margin-top:16px;
                        ">

                            <div
                                class=
                                "progress-bar">

                                <div
                                    class=
                                    "progress-fill"
                                    style="
                                    width:
                                    ${p.percent}%"
                                ></div>
                            </div>

                            <div
                                style="
                                margin-top:10px;
                            ">
                                ${p.completed}
                                /
                                ${p.total}
                                topics
                            </div>

                        </div>
                    </div>
                    `;
                }).join("")}
            </div>

        </div>
    `;
}

/* ---------------------------
   TOPICS
--------------------------- */

function renderTopics() {

    const learned =
        getLearnedTopics();

    const progress =
        getModuleProgress(
            currentModule
        );

    return `
        <div class="card">

            <h2 class="card-title">
                Topics
            </h2>

            <div
                class="progress-wrapper">

                <div
                    style="
                    display:flex;
                    justify-content:
                    space-between;
                    margin-bottom:10px;
                ">

                    <strong>
                        ${progress.percent}%
                    </strong>

                    <span>
                        ${progress.completed}
                        /
                        ${progress.total}
                    </span>

                </div>

                <div
                    class=
                    "progress-bar">

                    <div
                        class=
                        "progress-fill"
                        style="
                        width:
                        ${progress.percent}%"
                    ></div>
                </div>
            </div>

            ${currentModule.sections.map(
                section => `
                <div
                    style="
                    margin-bottom:40px;
                ">

                    <h3
                        style="
                        margin-bottom:20px;
                    ">
                        ${section.name}
                    </h3>

                    <div
                        class=
                        "topic-grid">

                        ${section.topics.map(
                            topic => {

                            const key =
                                `${currentModule.id}-${topic}`;

                            const completed =
                                learned[key];

                            return `
                            <div
                                class=
                                "topic-card
                                ${
                                completed
                                ? "completed"
                                : ""
                                }"

                                onclick=
                                "toggleTopic(
                                '${key}'
                                )"
                            >
                                ${topic}
                            </div>
                            `;
                        }).join("")}
                    </div>
                </div>
            `
            ).join("")}

        </div>
    `;
}

/* ---------------------------
   EXAM TRAPS
--------------------------- */

function renderTraps() {

    return `
        <div class="card">

            <h2 class="card-title">
                Exam Traps
            </h2>

            <div
                class="trap-list">

                ${currentModule.traps
                    .map(
                    trap => `
                    <div
                        class=
                        "trap-item">

                        <i
                            class=
                            "fa-solid
                            fa-triangle-exclamation">
                        </i>

                        ${trap}
                    </div>
                `
                )
                .join("")}

            </div>
        </div>
    `;
}

/* ---------------------------
   NOTES
--------------------------- */

function renderNotes() {

    const note =
        getNotes(
            currentModule.id
        );

    return `
        <div class="card">

            <h2 class="card-title">
                Notes
            </h2>

            <textarea
                id="notesArea"
                placeholder=
                "Write notes..."
            >${note}</textarea>

            <button
                class="save-btn"
                onclick=
                "saveCurrentNote()"
            >
                Save Notes
            </button>

        </div>
    `;
}

/* ---------------------------
   MAIN CONTENT
--------------------------- */

function renderContent() {

    if (
        currentTab ===
        "overview"
    ) {

        content.innerHTML =
            renderOverview();

    } else if (
        currentTab ===
        "topics"
    ) {

        content.innerHTML =
            renderTopics();

    } else if (
        currentTab ===
        "traps"
    ) {

        content.innerHTML =
            renderTraps();

    } else {

        content.innerHTML =
            renderNotes();
    }
}

/* ---------------------------
   TOPIC TOGGLE
--------------------------- */

function toggleTopic(
    key
) {

    const learned =
        getLearnedTopics();

    learned[key] =
        !learned[key];

    saveLearnedTopics(
        learned
    );

    renderSidebar(
        searchInput.value
    );

    renderContent();
}

/* ---------------------------
   SAVE NOTES
--------------------------- */

function saveCurrentNote() {

    const text =
        document.getElementById(
            "notesArea"
        ).value;

    saveNotes(
        currentModule.id,
        text
    );

    alert(
        "Notes saved!"
    );
}

/* ---------------------------
   SEARCH
--------------------------- */

searchInput.addEventListener(
    "input",
    e => {

        renderSidebar(
            e.target.value
        );
    }
);

/* ---------------------------
   INITIALIZE
--------------------------- */

updateHeader();
renderSidebar();
renderContent();