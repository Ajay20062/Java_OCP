/* ==========================
   INIT
========================== */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        initApp();
    }
);

/* ==========================
   APP START
========================== */

function initApp() {

    updateStudyStreak();

    streakCount.textContent =
        `${getStudyStreak()} Days`;

    updateHeader();

    renderSidebar();

    renderContent();

    setupTabs();

    setupFilters();

    setupSearch();

    setupSidebarToggle();

    setupThemeToggle();

    setupBookmark();

    keyboardShortcuts();
}

/* ==========================
   TABS
========================== */

function setupTabs() {

    const tabs =
        document.querySelectorAll(
            ".tab"
        );

    tabs.forEach(tab => {

        tab.addEventListener(
            "click",
            () => {

                tabs.forEach(
                    btn =>
                    btn.classList.remove(
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
}

/* ==========================
   FILTERS
========================== */

function setupFilters() {

    const filters =
        document.querySelectorAll(
            ".filter-btn"
        );

    filters.forEach(btn => {

        btn.addEventListener(
            "click",
            () => {

                filters.forEach(
                    item =>
                    item.classList.remove(
                        "active"
                    )
                );

                btn.classList.add(
                    "active"
                );

                currentFilter =
                    btn.dataset.filter;

                renderSidebar();
            }
        );
    });
}

/* ==========================
   SEARCH
========================== */

function setupSearch() {

    searchInput
    .addEventListener(
        "input",
        () => {

        renderSidebar();
    });
}

/* ==========================
   SIDEBAR TOGGLE
========================== */

function setupSidebarToggle() {

    const toggleBtn =
        document.getElementById(
            "sidebarToggle"
        );

    const sidebar =
        document.getElementById(
            "sidebar"
        );

    toggleBtn
    .addEventListener(
        "click",
        () => {

        sidebar.classList.toggle(
            "collapsed"
        );
    });
}

/* ==========================
   THEME TOGGLE
========================== */

function setupThemeToggle() {

    const themeBtn =
        document.getElementById(
            "themeBtn"
        );

    const body =
        document.body;

    const savedTheme =
        localStorage.getItem(
            "ocp_theme"
        );

    if (
        savedTheme ===
        "light"
    ) {

        enableLightTheme();
    }

    themeBtn
    .addEventListener(
        "click",
        () => {

        const isLight =
            body.classList.contains(
                "light"
            );

        if (
            isLight
        ) {

            disableLightTheme();

        } else {

            enableLightTheme();
        }
    });
}

function enableLightTheme() {

    document.body
    .classList.add(
        "light"
    );

    localStorage.setItem(
        "ocp_theme",
        "light"
    );

    showToast(
        "Light mode enabled"
    );
}

function disableLightTheme() {

    document.body
    .classList.remove(
        "light"
    );

    localStorage.setItem(
        "ocp_theme",
        "dark"
    );

    showToast(
        "Dark mode enabled"
    );
}

/* ==========================
   BOOKMARK
========================== */

function setupBookmark() {

    const bookmarkBtn =
        document.getElementById(
            "bookmarkBtn"
        );

    updateBookmarkIcon();

    bookmarkBtn
    .addEventListener(
        "click",
        () => {

        toggleBookmark(
            currentModule.id
        );

        updateBookmarkIcon();

        showToast(
            isBookmarked(
                currentModule.id
            )
            ? "Bookmarked"
            : "Bookmark removed"
        );
    });
}

function updateBookmarkIcon() {

    const icon =
        document
        .querySelector(
            "#bookmarkBtn i"
        );

    if (
        isBookmarked(
            currentModule.id
        )
    ) {

        icon.className =
        "fa-solid fa-bookmark";

    } else {

        icon.className =
        "fa-regular fa-bookmark";
    }
}

/* ==========================
   KEYBOARD SHORTCUTS
========================== */

function keyboardShortcuts() {

    document
    .addEventListener(
        "keydown",
        e => {

        /* CTRL + K SEARCH */

        if (
            e.ctrlKey
            &&
            e.key.toLowerCase()
            === "k"
        ) {

            e.preventDefault();

            searchInput.focus();

            showToast(
                "Search opened"
            );
        }

        /* CTRL + S SAVE NOTES */

        if (
            e.ctrlKey
            &&
            e.key.toLowerCase()
            === "s"
        ) {

            e.preventDefault();

            const area =
                document
                .getElementById(
                    "notesArea"
                );

            if (
                area
            ) {

                saveNote(
                    currentModule.id,
                    area.value
                );

                showToast(
                    "Notes saved"
                );
            }
        }

        /* ALT + 1 → OVERVIEW */

        if (
            e.altKey
            &&
            e.key === "1"
        ) {

            switchTab(
                "overview"
            );
        }

        /* ALT + 2 → TOPICS */

        if (
            e.altKey
            &&
            e.key === "2"
        ) {

            switchTab(
                "topics"
            );
        }

        /* ALT + 3 → NOTES */

        if (
            e.altKey
            &&
            e.key === "3"
        ) {

            switchTab(
                "notes"
            );
        }

        /* ALT + 4 → ANALYTICS */

        if (
            e.altKey
            &&
            e.key === "4"
        ) {

            switchTab(
                "analytics"
            );
        }
    });
}

/* ==========================
   TAB SWITCH HELPER
========================== */

function switchTab(
    tabName
) {

    currentTab =
        tabName;

    document
    .querySelectorAll(
        ".tab"
    )
    .forEach(tab => {

        tab.classList.remove(
            "active"
        );

        if (
            tab.dataset.tab
            === tabName
        ) {

            tab.classList.add(
                "active"
            );
        }
    });

    renderContent();
}

/* ==========================
   MODULE CHANGE FIX
========================== */

const originalRenderSidebar =
    renderSidebar;

renderSidebar =
function () {

    originalRenderSidebar();

    updateBookmarkIcon();
};

/* ==========================
   OPTIONAL EXPORT BUTTON
========================== */

window.exportProgress =
    exportProgress;

/* ==========================
   DEBUG
========================== */

console.log(
    "Java OCP Dashboard v2 Loaded"
);