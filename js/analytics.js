/* ==========================
   ANALYTICS ENGINE
========================== */

function getAnalytics() {

    const overall =
        getOverallProgress();

    const completed =
        getCompletedTopics();

    const bookmarks =
        getBookmarks();

    const streak =
        getStudyStreak();

    let totalModules =
        MODULES.length;

    let completedModules = 0;

    let weakModules = [];
    let strongModules = [];

    MODULES.forEach(module => {

        const progress =
            getModuleProgress(
                module
            );

        if (
            progress.percent ===
            100
        ) {

            completedModules++;
        }

        if (
            progress.percent <
            40
        ) {

            weakModules.push({
                title:
                    module.title,

                percent:
                    progress.percent
            });
        }

        if (
            progress.percent >=
            75
        ) {

            strongModules.push({
                title:
                    module.title,

                percent:
                    progress.percent
            });
        }
    });

    weakModules.sort(
        (a, b) =>
        a.percent -
        b.percent
    );

    strongModules.sort(
        (a, b) =>
        b.percent -
        a.percent
    );

    return {
        overall,

        streak,

        totalModules,

        completedModules,

        bookmarkedCount:
            bookmarks.length,

        weakModules,

        strongModules,

        completedTopics:
            overall.done,

        totalTopics:
            overall.total
    };
}

/* ==========================
   RENDER ANALYTICS
========================== */

function renderAnalytics() {

    const analytics =
        getAnalytics();

    return `
    <div class="fade-in">

        <div class="analytics-grid">

            <div class="analytics-card">

                <h3>
                    Overall Progress
                </h3>

                <div
                    class="analytics-value"
                >
                    ${
                    analytics
                    .overall
                    .percent
                    }%
                </div>

                <div
                    class="analytics-sub"
                >
                    ${
                    analytics
                    .completedTopics
                    }
                    /
                    ${
                    analytics
                    .totalTopics
                    }
                    topics completed
                </div>

            </div>

            <div class="analytics-card">

                <h3>
                    Modules Completed
                </h3>

                <div
                    class="analytics-value"
                >
                    ${
                    analytics
                    .completedModules
                    }
                </div>

                <div
                    class="analytics-sub"
                >
                    out of
                    ${
                    analytics
                    .totalModules
                    }
                    modules
                </div>

            </div>

            <div class="analytics-card">

                <h3>
                    Study Streak
                </h3>

                <div
                    class="analytics-value"
                >
                    ${
                    analytics
                    .streak
                    }
                </div>

                <div
                    class="analytics-sub"
                >
                    consecutive days
                </div>

            </div>

            <div class="analytics-card">

                <h3>
                    Bookmarks
                </h3>

                <div
                    class="analytics-value"
                >
                    ${
                    analytics
                    .bookmarkedCount
                    }
                </div>

                <div
                    class="analytics-sub"
                >
                    saved modules
                </div>

            </div>

        </div>

        <div
            style="
                height:24px;
            "
        ></div>

        <div class="card">

            <div
                style="
                display:flex;
                justify-content:
                space-between;
                align-items:center;
                margin-bottom:20px;
            "
            >

                <h2
                    class=
                    "card-title"
                >
                    Weak Modules
                </h2>

            </div>

            ${
                analytics
                .weakModules
                .length
                ? `
                <div
                    class=
                    "module-grid"
                >

                ${
                    analytics
                    .weakModules
                    .map(
                    module => `
                        <div
                            class=
                            "module-card"
                        >

                            <h3>
                                ${
                                module
                                .title
                                }
                            </h3>

                            <div
                                style="
                                height:
                                10px;
                            "
                            ></div>

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
                                    module
                                    .percent
                                    }%
                                "
                                ></div>
                            </div>

                            <div
                                style="
                                margin-top:
                                10px;
                                font-size:
                                12px;
                                color:
                                var(--muted);
                            "
                            >
                                ${
                                module
                                .percent
                                }%
                                completed
                            </div>

                        </div>
                    `
                )
                .join("")
                }

                </div>
            `
            : `
                <div
                    class=
                    "empty-state"
                >
                    <i
                        class=
                        "fa-solid
                        fa-circle-check"
                    ></i>

                    <h3>
                        No weak modules
                    </h3>

                    <p>
                        Great progress.
                    </p>
                </div>
            `
            }

        </div>

        <div
            style="
                height:24px;
            "
        ></div>

        <div class="card">

            <h2
                class=
                "card-title"
            >
                Strong Modules
            </h2>

            ${
                analytics
                .strongModules
                .length
                ? `
                <div
                    class=
                    "module-grid"
                >

                ${
                    analytics
                    .strongModules
                    .map(
                    module => `
                        <div
                            class=
                            "module-card"
                        >

                            <h3>
                                ${
                                module
                                .title
                                }
                            </h3>

                            <div
                                style="
                                height:
                                10px;
                            "
                            ></div>

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
                                    module
                                    .percent
                                    }%
                                "
                                ></div>
                            </div>

                            <div
                                style="
                                margin-top:
                                10px;
                                font-size:
                                12px;
                                color:
                                var(--muted);
                            "
                            >
                                ${
                                module
                                .percent
                                }%
                                completed
                            </div>

                        </div>
                    `
                )
                .join("")
                }

                </div>
            `
            : `
                <div
                    class=
                    "empty-state"
                >
                    <i
                        class=
                        "fa-solid
                        fa-chart-line"
                    ></i>

                    <h3>
                        No strong modules
                    </h3>

                    <p>
                        Finish more topics.
                    </p>
                </div>
            `
            }

        </div>

    </div>
    `;
}