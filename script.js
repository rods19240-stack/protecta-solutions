const ProtectaCore = {

    mode: "simulation",

    language:
        localStorage.getItem("protectaLanguage") || "es",

    booted: false,

    data: {

        nodes: 24891,

        connections: 81492,

        globalRisk: 18.7,

        anomalies: 137

    },


    /* =====================================================
       INIT
    ===================================================== */

    init() {

        this.createBootParticles();

        this.setupBoot();

        this.setupNavigation();

        this.setupSearch();

        this.setupExploreButton();

        this.setupAnalyticsButton();

        this.setupControls();

        this.setupLanguage();

        this.setupNotifications();

        this.setupSettings();

        this.setupEntityExplorer();

        this.setupGraphExpand();

        this.setupGraphNodes();

        this.setupViewButtons();

        this.animateMetrics();

        this.applyLanguage();

        this.detectDevice();

    },


    /* =====================================================
       BOOT SYSTEM
    ===================================================== */

    setupBoot() {

        const button =
            document.getElementById(
                "initializeButton"
            );

        const bootScreen =
            document.getElementById(
                "bootScreen"
            );

        if (!button || !bootScreen) {

            this.booted = true;

            return;

        }


        button.addEventListener(
            "click",
            () => {

                if (this.booted) return;

                this.booted = true;

                this.startBootSequence();

            }
        );


        setTimeout(
            () => {

                if (!this.booted) {

                    document
                        .getElementById("bootHint")
                        ?.classList.add(
                            "ready"
                        );

                }

            },
            2500
        );

    },


    startBootSequence() {

        const boot =
            document.getElementById(
                "bootScreen"
            );

        if (!boot) return;


        boot.classList.add(
            "explode"
        );


        this.createLogoParticles();


        setTimeout(
            () => {

                boot.classList.add(
                    "loading"
                );

            },
            650
        );


        this.runLoader();

    },


    runLoader() {

        const bar =
            document.getElementById(
                "loaderProgressBar"
            );

        const percent =
            document.getElementById(
                "loaderPercent"
            );

        const status =
            document.getElementById(
                "loaderStatus"
            );


        if (!bar || !percent || !status) {

            this.finishBoot();

            return;

        }


        const stages = [

            {
                percent: 18,
                text: "INITIALIZING CORE"
            },

            {
                percent: 36,
                text: "LOADING GRAPH ENGINE"
            },

            {
                percent: 58,
                text: "ANALYZING NETWORK"
            },

            {
                percent: 76,
                text: "STARTING RISK ENGINE"
            },

            {
                percent: 92,
                text: "CONNECTING NEO4J INTERFACE"
            },

            {
                percent: 100,
                text: "PROTECTA CORE READY"
            }

        ];


        let current =
            0;

        const duration =
            1050;


        const timer =
            setInterval(
                () => {

                    const stage =
                        stages[current];


                    if (!stage) {

                        clearInterval(timer);

                        this.showBootNetwork();

                        return;

                    }


                    bar.style.width =
                        `${stage.percent}%`;


                    percent.textContent =
                        `${stage.percent}%`;


                    status.textContent =
                        stage.text;


                    current++;

                },
                duration
            );

    },


    showBootNetwork() {

        const boot =
            document.getElementById(
                "bootScreen"
            );

        if (!boot) return;


        boot.classList.add(
            "network"
        );


        setTimeout(
            () => {

                this.finishBoot();

            },
            1300
        );

    },


    finishBoot() {

        const boot =
            document.getElementById(
                "bootScreen"
            );

        if (!boot) return;


        boot.classList.add(
            "finished"
        );


        document.body.classList.add(
            "system-entered"
        );


        setTimeout(
            () => {

                boot.remove();

            },
            1300
        );

    },


    /* =====================================================
       BOOT PARTICLES
    ===================================================== */

    createBootParticles() {

        const container =
            document.getElementById(
                "bootParticles"
            );

        if (!container) return;


        const amount =
            window.innerWidth < 650
                ? 45
                : 90;


        for (
            let i = 0;
            i < amount;
            i++
        ) {

            const particle =
                document.createElement(
                    "span"
                );


            particle.className =
                "boot-particle";


            particle.style.left =
                `${Math.random() * 100}%`;


            particle.style.setProperty(
                "--move",
                `${(Math.random() - .5) * 180}px`
            );


            particle.style.setProperty(
                "--duration",
                `${5 + Math.random() * 10}s`
            );


            particle.style.animationDelay =
                `${Math.random() * 8}s`;


            particle.style.opacity =
                `${.15 + Math.random() * .65}`;


            container.appendChild(
                particle
            );

        }

    },


    createLogoParticles() {

        const container =
            document.getElementById(
                "logoParticles"
            );

        if (!container) return;


        const amount =
            window.innerWidth < 650
                ? 70
                : 150;


        for (
            let i = 0;
            i < amount;
            i++
        ) {

            const particle =
                document.createElement(
                    "span"
                );


            particle.className =
                "logo-particle";


            const centerX =
                50 +
                (Math.random() - .5) * 45;


            const centerY =
                45 +
                (Math.random() - .5) * 25;


            particle.style.left =
                `${centerX}%`;


            particle.style.top =
                `${centerY}%`;


            const angle =
                Math.random() *
                Math.PI *
                2;


            const distance =
                80 +
                Math.random() * 420;


            const x =
                Math.cos(angle) *
                distance;


            const y =
                Math.sin(angle) *
                distance;


            particle.animate(

                [

                    {
                        transform:
                            "translate(0,0) scale(1)",

                        opacity:
                            1

                    },

                    {

                        transform:
                            `translate(${x}px,${y}px) scale(0)`,

                        opacity:
                            0

                    }

                ],

                {

                    duration:
                        700 +
                        Math.random() * 900,

                    delay:
                        Math.random() * 250,

                    easing:
                        "cubic-bezier(.2,.8,.2,1)",

                    fill:
                        "forwards"

                }

            );


            container.appendChild(
                particle
            );

        }

    },


    /* =====================================================
       NAVIGATION
    ===================================================== */

    setupNavigation() {

        const items =
            document.querySelectorAll(
                ".nav-item"
            );


        items.forEach(
            item => {

                item.addEventListener(
                    "click",
                    event => {

                        event.preventDefault();


                        items.forEach(
                            nav => {

                                nav.classList.remove(
                                    "active"
                                );

                            }
                        );


                        item.classList.add(
                            "active"
                        );


                        const target =
                            item.getAttribute(
                                "href"
                            );


                        if (
                            target &&
                            target.startsWith("#")
                        ) {

                            const section =
                                document.querySelector(
                                    target
                                );


                            if (section) {

                                section.scrollIntoView({

                                    behavior:
                                        "smooth",

                                    block:
                                        "start"

                                });

                            }

                        }

                    }
                );

            }
        );

    },


    /* =====================================================
       SEARCH
    ===================================================== */

    setupSearch() {

        const search =
            document.getElementById(
                "globalSearch"
            );


        if (!search) return;


        document.addEventListener(
            "keydown",
            event => {

                if (

                    (event.ctrlKey ||
                    event.metaKey) &&

                    event.key.toLowerCase()
                    === "k"

                ) {

                    event.preventDefault();

                    search.focus();

                }

            }
        );


        search.addEventListener(
            "input",
            event => {

                const value =
                    event.target.value
                        .trim()
                        .toLowerCase();


                const rows =
                    document.querySelectorAll(
                        ".entity-row"
                    );


                if (!value) {

                    rows.forEach(
                        row => {

                            row.style.display =
                                "";

                        }
                    );

                    return;

                }


                rows.forEach(
                    row => {

                        const searchable =
                            row.dataset.search
                            || "";


                        row.style.display =
                            searchable
                                .includes(value)
                                ? ""
                                : "none";

                    }
                );

            }
        );


        search.addEventListener(
            "keydown",
            event => {

                if (
                    event.key === "Enter"
                ) {

                    const value =
                        search.value.trim();


                    if (!value) return;


                    this.showToast(
                        this.language === "es"
                            ? `Buscando: ${value}`
                            : `Searching: ${value}`
                    );


                    search.blur();

                }

            }
        );

    },


    /* =====================================================
       EXPLORE NETWORK
    ===================================================== */

    setupExploreButton() {

        const button =
            document.getElementById(
                "exploreButton"
            );


        if (!button) return;


        button.addEventListener(
            "click",
            () => {

                const graph =
                    document.querySelector(
                        ".graph-panel"
                    );


                if (!graph) return;


                graph.scrollIntoView({

                    behavior:
                        "smooth",

                    block:
                        "center"

                });


                setTimeout(
                    () => {

                        this.flashGraph();

                    },
                    500
                );

            }
        );

    },


    /* =====================================================
       ANALYTICS
    ===================================================== */

    setupAnalyticsButton() {

        const button =
            document.getElementById(
                "analyticsButton"
            );


        if (!button) return;


        button.addEventListener(
            "click",
            () => {

                const analytics =
                    document.getElementById(
                        "analytics"
                    );


                if (!analytics) return;


                analytics.scrollIntoView({

                    behavior:
                        "smooth",

                    block:
                        "center"

                });


                analytics.animate(

                    [

                        {
                            transform:
                                "scale(1)"
                        },

                        {
                            transform:
                                "scale(1.015)"
                        },

                        {
                            transform:
                                "scale(1)"
                        }

                    ],

                    {

                        duration:
                            700

                    }

                );

            }
        );

    },


    /* =====================================================
       GRAPH CONTROLS
    ===================================================== */

    setupControls() {

        const controls =
            document.querySelectorAll(
                ".control"
            );


        controls.forEach(
            control => {

                control.addEventListener(
                    "click",
                    () => {

                        controls.forEach(
                            button => {

                                button.classList.remove(
                                    "active"
                                );

                            }
                        );


                        control.classList.add(
                            "active"
                        );


                        this.flashGraph();


                        this.showToast(
                            this.language === "es"
                                ? `Vista: ${control.textContent.trim()}`
                                : `View: ${control.textContent.trim()}`
                        );

                    }
                );

            }
        );

    },


    flashGraph() {

        const graph =
            document.querySelector(
                ".graph"
            );


        if (!graph) return;


        graph.animate(

            [

                {
                    filter:
                        "brightness(1)"
                },

                {
                    filter:
                        "brightness(1.35)"
                },

                {
                    filter:
                        "brightness(1)"
                }

            ],

            {

                duration:
                    500

            }

        );

    },


    /* =====================================================
       LANGUAGE
    ===================================================== */

    setupLanguage() {

        const button =
            document.getElementById(
                "languageButton"
            );


        if (!button) return;


        button.addEventListener(
            "click",
            () => {

                this.language =
                    this.language === "es"
                        ? "en"
                        : "es";


                localStorage.setItem(
                    "protectaLanguage",
                    this.language
                );


                this.applyLanguage();

            }
        );

    },


    applyLanguage() {

        const language =
            this.language;


        document.documentElement.lang =
            language;


        const elements =
            document.querySelectorAll(
                "[data-es][data-en]"
            );


        elements.forEach(
            element => {

                element.textContent =
                    element.getAttribute(
                        `data-${language}`
                    );

            }
        );


        const search =
            document.getElementById(
                "globalSearch"
            );


        if (search) {

            search.placeholder =
                search.getAttribute(
                    `data-placeholder-${language}`
                );

        }


        const languageButton =
            document.getElementById(
                "languageButton"
            );


        if (languageButton) {

            languageButton.textContent =
                language === "es"
                    ? "🇪🇸 ES"
                    : "🇺🇸 EN";

        }

    },


    /* =====================================================
       NOTIFICATIONS
    ===================================================== */

    setupNotifications() {

        const button =
            document.getElementById(
                "notificationButton"
            );


        if (!button) return;


        button.addEventListener(
            "click",
            () => {

                const alerts =
                    document.getElementById(
                        "alerts"
                    );


                if (!alerts) return;


                alerts.scrollIntoView({

                    behavior:
                        "smooth",

                    block:
                        "center"

                });


                alerts.animate(

                    [

                        {
                            transform:
                                "translateX(0)"
                        },

                        {
                            transform:
                                "translateX(-5px)"
                        },

                        {
                            transform:
                                "translateX(5px)"
                        },

                        {
                            transform:
                                "translateX(0)"
                        }

                    ],

                    {

                        duration:
                            500

                    }

                );

            }
        );

    },


    /* =====================================================
       SETTINGS
    ===================================================== */

    setupSettings() {

        const button =
            document.getElementById(
                "settingsButton"
            );


        if (!button) return;


        button.addEventListener(
            "click",
            () => {

                button.animate(

                    [

                        {
                            transform:
                                "rotate(0deg)"
                        },

                        {
                            transform:
                                "rotate(90deg)"
                        },

                        {
                            transform:
                                "rotate(0deg)"
                        }

                    ],

                    {

                        duration:
                            500

                    }

                );


                this.showToast(
                    this.language === "es"
                        ? "Configuración del sistema"
                        : "System settings"
                );

            }
        );

    },


    /* =====================================================
       ENTITY EXPLORER
    ===================================================== */

    setupEntityExplorer() {

        const button =
            document.getElementById(
                "exploreEntities"
            );


        if (!button) return;


        button.addEventListener(
            "click",
            () => {

                const entities =
                    document.getElementById(
                        "entities"
                    );


                if (!entities) return;


                entities.scrollIntoView({

                    behavior:
                        "smooth",

                    block:
                        "center"

                });


                entities.animate(

                    [

                        {
                            boxShadow:
                                "0 0 0 rgba(0,168,255,0)"
                        },

                        {
                            boxShadow:
                                "0 0 40px rgba(0,168,255,.22)"
                        },

                        {
                            boxShadow:
                                "0 0 0 rgba(0,168,255,0)"
                        }

                    ],

                    {

                        duration:
                            1000

                    }

                );

            }
        );

    },


    /* =====================================================
       GRAPH EXPAND
    ===================================================== */

    setupGraphExpand() {

        const button =
            document.getElementById(
                "expandGraph"
            );


        if (!button) return;


        button.addEventListener(
            "click",
            () => {

                const graph =
                    document.querySelector(
                        ".graph-panel"
                    );


                if (!graph) return;


                graph.classList.toggle(
                    "expanded"
                );


                if (
                    graph.classList.contains(
                        "expanded"
                    )
                ) {

                    graph.scrollIntoView({

                        behavior:
                            "smooth",

                        block:
                            "start"

                    });

                }

            }
        );

    },


    /* =====================================================
       GRAPH NODES
    ===================================================== */

    setupGraphNodes() {

        const nodes =
            document.querySelectorAll(
                ".graph-node:not(.small-node)"
            );


        nodes.forEach(
            node => {

                node.addEventListener(
                    "click",
                    () => {

                        const symbol =
                            node.querySelector(
                                ".node-symbol"
                            );


                        const name =
                            symbol
                                ? symbol.textContent.trim()
                                : "CORE";


                        node.animate(

                            [

                                {
                                    transform:
                                        "scale(1)"
                                },

                                {
                                    transform:
                                        "scale(1.2)"
                                },

                                {
                                    transform:
                                        "scale(1)"
                                }

                            ],

                            {

                                duration:
                                    450

                            }

                        );


                        this.showToast(

                            this.language === "es"
                                ? `Nodo seleccionado: ${name}`
                                : `Selected node: ${name}`

                        );

                    }
                );

            }
        );

    },


    /* =====================================================
       VIEW BUTTONS
    ===================================================== */

    setupViewButtons() {

        const buttons =
            document.querySelectorAll(
                ".view-all"
            );


        buttons.forEach(
            button => {

                button.addEventListener(
                    "click",
                    () => {

                        this.showToast(

                            this.language === "es"
                                ? "Módulo seleccionado"
                                : "Module selected"

                        );

                    }
                );

            }
        );

    },


    /* =====================================================
       METRICS
    ===================================================== */

    animateMetrics() {

        const elements =
            document.querySelectorAll(
                ".metric-value"
            );


        elements.forEach(
            (element,index) => {

                element.style.opacity =
                    "0";

                element.style.transform =
                    "translateY(12px)";


                setTimeout(
                    () => {

                        element.style.transition =
                            "all .6s ease";

                        element.style.opacity =
                            "1";

                        element.style.transform =
                            "translateY(0)";

                    },
                    350 +
                    index * 120
                );

            }
        );

    },


    /* =====================================================
       DEVICE DETECTION
    ===================================================== */

    detectDevice() {

        const width =
            window.innerWidth;


        let device =
            "desktop";


        if (width <= 650) {

            device =
                "mobile";

        }
        else if (width <= 1000) {

            device =
                "tablet";

        }


        document.body.dataset.device =
            device;

    },


    handleResize() {

        this.detectDevice();

    },


    /* =====================================================
       TOAST
    ===================================================== */

    showToast(message) {

        const container =
            document.getElementById(
                "toastContainer"
            );


        if (!container) return;


        const toast =
            document.createElement(
                "div"
            );


        toast.className =
            "toast";


        toast.textContent =
            message;


        container.appendChild(
            toast
        );


        setTimeout(
            () => {

                toast.animate(

                    [

                        {
                            opacity:
                                1,

                            transform:
                                "translateX(0)"
                        },

                        {
                            opacity:
                                0,

                            transform:
                                "translateX(30px)"
                        }

                    ],

                    {

                        duration:
                            300,

                        fill:
                            "forwards"

                    }

                );


                setTimeout(
                    () => {

                        toast.remove();

                    },
                    300
                );

            },
            2800
        );

    },


    /* =====================================================
       FUTURE NEO4J
    ===================================================== */

    connectToNeo4j(config) {

        console.log(
            "Neo4j connection requested:",
            config
        );


        /*
            FUTURA ARQUITECTURA

            FRONTEND
                 ↓
            FLASK API
                 ↓
              NEO4J

            Ejemplo:

            fetch("/api/network")
                .then(response => response.json())
                .then(data => {
                    this.renderNetwork(data);
                });
        */

    },


    renderNetwork(data) {

        console.log(
            "Rendering Neo4j network:",
            data
        );

    }

};


/* =========================================================
   START
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        ProtectaCore.init();

    }
);


/* =========================================================
   RESPONSIVE
========================================================= */

window.addEventListener(
    "resize",
    () => {

        ProtectaCore.handleResize();

    }
);