const STORAGE_KEYS = {
    COMPLETED: "ocp_completed_topics",
    NOTES: "ocp_notes",
    BOOKMARKS: "ocp_bookmarks",
    STREAK: "ocp_streak",
    LAST_VISIT: "ocp_last_visit"
};

/* ==========================
   SAFE STORAGE
========================== */

function getStorage(key, fallback) {
    try {
        const value =
            localStorage.getItem(key);

        return value
            ? JSON.parse(value)
            : fallback;

    } catch (err) {
        console.error(
            "Storage Read Error:",
            err
        );

        return fallback;
    }
}

function setStorage(key, value) {
    try {
        localStorage.setItem(
            key,
            JSON.stringify(value)
        );

    } catch (err) {
        console.error(
            "Storage Write Error:",
            err
        );
    }
}

/* ==========================
   COMPLETED TOPICS
========================== */

function getCompletedTopics() {
    return getStorage(
        STORAGE_KEYS.COMPLETED,
        {}
    );
}

function saveCompletedTopics(
    completed
) {
    setStorage(
        STORAGE_KEYS.COMPLETED,
        completed
    );
}

function toggleTopicComplete(
    key
) {

    const completed =
        getCompletedTopics();

    completed[key] =
        !completed[key];

    saveCompletedTopics(
        completed
    );

    return completed[key];
}

function isTopicCompleted(
    key
) {

    const completed =
        getCompletedTopics();

    return !!completed[key];
}

/* ==========================
   MODULE PROGRESS
========================== */

function getModuleProgress(
    module
) {

    const completed =
        getCompletedTopics();

    let total = 0;
    let done = 0;

    module.sections.forEach(
        section => {

        section.topics.forEach(
            topic => {

            total++;

            const key =
                `${module.id}-${topic}`;

            if (
                completed[key]
            ) {
                done++;
            }
        });
    });

    const percent =
        total === 0
            ? 0
            : Math.round(
                (done / total) * 100
            );

    return {
        total,
        done,
        percent
    };
}

function getOverallProgress() {

    let total = 0;
    let done = 0;

    MODULES.forEach(module => {

        const progress =
            getModuleProgress(
                module
            );

        total +=
            progress.total;

        done +=
            progress.done;
    });

    return {
        total,
        done,

        percent:
            total === 0
                ? 0
                : Math.round(
                    (done / total)
                    * 100
                )
    };
}

/* ==========================
   NOTES
========================== */

function getAllNotes() {
    return getStorage(
        STORAGE_KEYS.NOTES,
        {}
    );
}

function getNote(
    moduleId
) {

    const notes =
        getAllNotes();

    return notes[moduleId]
        || "";
}

function saveNote(
    moduleId,
    text
) {

    const notes =
        getAllNotes();

    notes[moduleId] =
        text;

    setStorage(
        STORAGE_KEYS.NOTES,
        notes
    );
}

/* ==========================
   BOOKMARKS
========================== */

function getBookmarks() {

    return getStorage(
        STORAGE_KEYS.BOOKMARKS,
        []
    );
}

function isBookmarked(
    moduleId
) {

    return getBookmarks()
        .includes(moduleId);
}

function toggleBookmark(
    moduleId
) {

    let bookmarks =
        getBookmarks();

    if (
        bookmarks.includes(
            moduleId
        )
    ) {

        bookmarks =
            bookmarks.filter(
                id =>
                id !== moduleId
            );

    } else {

        bookmarks.push(
            moduleId
        );
    }

    setStorage(
        STORAGE_KEYS.BOOKMARKS,
        bookmarks
    );

    return bookmarks;
}

/* ==========================
   STUDY STREAK
========================== */

function updateStudyStreak() {

    const today =
        new Date()
        .toDateString();

    const streak =
        getStorage(
            STORAGE_KEYS.STREAK,
            {
                count:0
            }
        );

    const lastVisit =
        localStorage.getItem(
            STORAGE_KEYS
            .LAST_VISIT
        );

    if (
        !lastVisit
    ) {

        streak.count = 1;

    } else {

        const last =
            new Date(
                lastVisit
            );

        const current =
            new Date(today);

        const diff =
            Math.floor(
                (
                    current
                    - last
                )
                /
                (
                    1000
                    * 60
                    * 60
                    * 24
                )
            );

        if (
            diff === 1
        ) {

            streak.count++;

        } else if (
            diff > 1
        ) {

            streak.count = 1;
        }
    }

    setStorage(
        STORAGE_KEYS.STREAK,
        streak
    );

    localStorage.setItem(
        STORAGE_KEYS
        .LAST_VISIT,
        today
    );

    return streak.count;
}

function getStudyStreak() {

    const streak =
        getStorage(
            STORAGE_KEYS.STREAK,
            {
                count:0
            }
        );

    return streak.count;
}

/* ==========================
   AUTO SAVE NOTES
========================== */

let noteSaveTimer;

function autoSaveNote(
    moduleId,
    text
) {

    clearTimeout(
        noteSaveTimer
    );

    noteSaveTimer =
        setTimeout(() => {

        saveNote(
            moduleId,
            text
        );

        if (
            typeof
            showToast
            === "function"
        ) {

            showToast(
                "Notes auto-saved"
            );
        }

    }, 700);
}

/* ==========================
   EXPORT / IMPORT
========================== */

function exportProgress() {

    const data = {
        completed:
            getCompletedTopics(),

        notes:
            getAllNotes(),

        bookmarks:
            getBookmarks(),

        streak:
            getStudyStreak(),

        exportedAt:
            new Date()
            .toISOString()
    };

    const blob =
        new Blob(
            [
                JSON.stringify(
                    data,
                    null,
                    2
                )
            ],
            {
                type:
                "application/json"
            }
        );

    const url =
        URL.createObjectURL(
            blob
        );

    const a =
        document.createElement(
            "a"
        );

    a.href = url;
    a.download =
        "ocp-progress.json";

    a.click();

    URL.revokeObjectURL(
        url
    );
}

function importProgress(
    json
) {

    try {

        const data =
            JSON.parse(json);

        if (
            data.completed
        ) {

            saveCompletedTopics(
                data.completed
            );
        }

        if (
            data.notes
        ) {

            setStorage(
                STORAGE_KEYS
                .NOTES,
                data.notes
            );
        }

        if (
            data.bookmarks
        ) {

            setStorage(
                STORAGE_KEYS
                .BOOKMARKS,
                data.bookmarks
            );
        }

        showToast(
            "Progress imported"
        );

    } catch {

        showToast(
            "Invalid backup file"
        );
    }
}