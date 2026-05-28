let currentModule = MODULES[0];
let currentTab = "overview";
let currentFilter = "all";

/* ==========================
   DOM
========================== */

const moduleList =
    document.getElementById(
        "moduleList"
    );

const content =
    document.getElementById(
        "content"
    );

const searchInput =
    document.getElementById(
        "searchInput"
    );

const moduleTitle =
    document.getElementById(
        "moduleTitle"
    );

const priorityPill =
    document.getElementById(
        "priorityPill"
    );

const streakCount =
    document.getElementById(
        "streakCount"
    );

const overallProgress =
    document.getElementById(
        "overallProgress"
    );

const toast =
    document.getElementById(
        "toast"
    );

/* ==========================
   TOAST
========================== */

function showToast(
    message
) {

    toast.textContent =
        message;

    toast.classList.add(
        "show"
    );

    setTimeout(() => {

        toast.classList.remove(
            "show"
        );

    }, 2200);
}

/* ==========================
   HEADER
========================== */

function updateHeader() {

    moduleTitle.textContent =
        `Module ${currentModule.id} — ${currentModule.title}`;

    priorityPill.textContent =
        currentModule.priority;
}

/* ==========================
   SIDEBAR
========================== */

function renderSidebar() {

    moduleList.innerHTML =
        "";

    const search =
        searchInput
        .value
        .toLowerCase();

    const modules =
        MODULES.filter(
            module => {

            const progress =
                getModuleProgress(
                    module
                );

            const matchSearch =
                module.title
                .toLowerCase()
                .includes(
                    search
                );

            let matchFilter =
                true;

            if (
                currentFilter ===
                "completed"
            ) {

                matchFilter =
                    progress.percent
                    === 100;
            }

            if (
                currentFilter ===
                "pending"
            ) {

                matchFilter =
                    progress.percent
                    < 100;
            }

            return (
                matchSearch
                &&
                matchFilter
            );
        });

    modules.forEach(
        module => {

        const progress =
            getModuleProgress(
                module
            );

        const div =
            document
            .createElement(
                "div"
            );

        div.className =
            "module-item fade-in";

        if (
            currentModule.id
            === module.id
        ) {

            div.classList.add(
                "active"
            );
        }

        div.innerHTML =
        `
        <div
            class=
            "module-title"
        >
            <span
                class=
                "dot
                ${module.color}"
            ></span>

            <span>
                ${module.id}.
                ${module.title}
            </span>
        </div>

        <div
            class=
            "module-sub"
        >
            ${progress.done}
            /
            ${progress.total}
            topics ·
            ${progress.percent}%
        </div>
        `;

        div.addEventListener(
            "click",
            () => {

                currentModule =
                    module;

                updateHeader();

                renderSidebar();

                renderContent();
            }
        );

        moduleList
        .appendChild(
            div
        );
    });

    const overall =
        getOverallProgress();

    overallProgress
    .textContent =
        `${overall.percent}%`;
}

/* ==========================
   OVERVIEW
========================== */

function renderOverview() {

    const overall =
        getOverallProgress();

    return `
    <div
        class=
        "stats-grid
        fade-in"
    >

        <div
            class=
            "stat-card"
        >

            <div
                class=
                "stat-top"
            >

                <div>

                    <div
                        class=
                        "stat-title"
                    >
                        Progress
                    </div>

                    <div
                        class=
                        "stat-value"
                    >
                        ${
                        overall
                        .percent
                        }%
                    </div>

                </div>

                <div
                    class=
                    "stat-icon"
                >
                    <i
                        class=
                        "fa-solid
                        fa-chart-line"
                    ></i>
                </div>

            </div>

            <div
                class=
                "stat-sub"
            >
                ${
                overall.done
                }
                /
                ${
                overall.total
                }
                completed
            </div>

        </div>

        <div
            class=
            "stat-card"
        >

            <div
                class=
                "stat-top"
            >

                <div>

                    <div
                        class=
                        "stat-title"
                    >
                        Study Streak
                    </div>

                    <div
                        class=
                        "stat-value"
                    >
                        ${
                        getStudyStreak()
                        }
                    </div>

                </div>

                <div
                    class=
                    "stat-icon"
                >
                    <i
                        class=
                        "fa-solid
                        fa-fire"
                    ></i>
                </div>

            </div>

            <div
                class=
                "stat-sub"
            >
                consecutive days
            </div>

        </div>

    </div>

    <div
        class=
        "module-grid
        slide-up"
    >

        ${
        MODULES.map(
            module => {

            const p =
                getModuleProgress(
                    module
                );

            return `
            <div
                class=
                "module-card"
            >

                <div
                    class=
                    "module-card-top"
                >

                    <div>

                        <h3>
                            ${
                            module.title
                            }
                        </h3>

                        <small>
                            Module
                            ${
                            module.id
                            }
                        </small>

                    </div>

                    <div
                        class=
                        "module-priority"
                    >
                        ${
                        module
                        .priority
                        }
                    </div>

                </div>

                <div
                    class=
                    "module-progress"
                >

                    <div
                        class=
                        "module-progress-info"
                    >

                        <span>
                            Progress
                        </span>

                        <span>
                            ${
                            p.percent
                            }%
                        </span>

                    </div>

                    <div
                        class=
                        "progress-bar"
                    >
                        <div
                            class=
                            "progress-fill"
                            style="
                            width:
                            ${
                            p.percent
                            }%
                            "
                        ></div>
                    </div>

                </div>

            </div>
            `;
        })
        .join("")
        }

    </div>
    `;
}

/* ==========================
   TOPICS
========================== */

function renderTopics() {

    const completed =
        getCompletedTopics();

    return `
    <div class="card">

        ${
        currentModule
        .sections
        .map(
            section => `
            <div
                class=
                "topic-section"
            >

                <h3
                    class=
                    "topic-section-title"
                >
                    ${
                    section.name
                    }
                </h3>

                <div
                    class=
                    "topic-grid"
                >

                    ${
                    section.topics
                    .map(
                    topic => {

                    const key =
                        `${currentModule.id}-${topic}`;

                    const done =
                        completed[
                            key
                        ];

                    return `
                    <div
                        class=
                        "topic-card
                        ${
                        done
                        ? "completed"
                        : ""
                        }"

                        onclick=
                        "toggleTopic(
                            '${key}'
                        )"
                    >

                        <div
                            class=
                            "topic-title"
                        >
                            ${topic}
                        </div>

                    </div>
                    `;
                })
                .join("")
                }

                </div>

            </div>
        `
        )
        .join("")
        }

    </div>
    `;
}

/* ==========================
   TOGGLE TOPIC
========================== */

function toggleTopic(
    key
) {

    const completed =
        toggleTopicComplete(
            key
        );

    renderSidebar();
    renderContent();

    showToast(
        completed
        ? "Topic completed"
        : "Topic removed"
    );
}

/* ==========================
   TRAPS
========================== */

function renderTraps() {

    return `
    <div
        class=
        "card fade-in"
    >

        <div
            class=
            "trap-list"
        >

            ${
            currentModule
            .traps
            .map(
            trap => `
                <div
                    class=
                    "trap-item"
                >
                    <i
                        class=
                        "fa-solid
                        fa-triangle-exclamation"
                    ></i>

                    <span>
                        ${trap}
                    </span>
                </div>
            `
            )
            .join("")
            }

        </div>

    </div>
    `;
}

/* ==========================
   NOTES
========================== */

function renderNotes() {

    const note =
        getNote(
            currentModule.id
        );

    return `
    <div
        class=
        "card fade-in"
    >

        <div
            class=
            "notes-wrapper"
        >

            <textarea
                id=
                "notesArea"

                class=
                "notes-textarea"

                placeholder=
                "Write notes..."
            >${note}</textarea>

            <div
                class=
                "notes-actions"
            >

                <button
                    class=
                    "save-btn"

                    onclick=
                    "saveCurrentNote()"
                >
                    Save Notes
                </button>

            </div>

        </div>

    </div>
    `;
}

function saveCurrentNote() {

    const text =
        document
        .getElementById(
            "notesArea"
        )
        .value;

    saveNote(
        currentModule.id,
        text
    );

    showToast(
        "Notes saved"
    );
}

/* ==========================
   CONTENT
========================== */

function renderContent() {

    let html = "";

    switch(
        currentTab
    ) {

        case
        "overview":

            html =
            renderOverview();
            break;

        case
        "topics":

            html =
            renderTopics();
            break;

        case
        "traps":

            html =
            renderTraps();
            break;

        case
        "notes":

            html =
            renderNotes();
            break;

        case
        "analytics":

            html =
            renderAnalytics();
            break;
    }

    content.innerHTML =
        html;

    attachAutosave();
}

/* ==========================
   NOTE AUTOSAVE
========================== */

function attachAutosave() {

    const notesArea =
        document
        .getElementById(
            "notesArea"
        );

    if (
        !notesArea
    ) return;

    notesArea
    .addEventListener(
        "input",
        e => {

        autoSaveNote(
            currentModule.id,
            e.target.value
        );
    });
}