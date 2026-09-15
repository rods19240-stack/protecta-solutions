const ProtectaCore = {

    mode: "simulation",

    language: localStorage.getItem("protectaLanguage") || "es",

    data: {
        nodes: 24891,
        connections: 81492,
        globalRisk: 18.7,
        anomalies: 137
    },


    init() {

        this.setupNavigation();

        this.setupSearch();

        this.setupExploreButton();

        this.setupControls();

        this.setupLanguage();

        this.animateMetrics();

        this.applyLanguage();

    },


    /* =========================
       NAVIGATION
    ========================= */

    setupNavigation() {

        const items = document.querySelectorAll(".nav-item");

        items.forEach(item => {

            item.addEventListener("click", event => {

                event.preventDefault();

                items.forEach(nav => {
                    nav.classList.remove("active");
                });

                item.classList.add("active");

            });

        });

    },


    /* =========================
       SEARCH
    ========================= */

    setupSearch() {

        const search = document.getElementById("globalSearch");

        if (!search) return;


        document.addEventListener("keydown", event => {

            if (
                (event.ctrlKey || event.metaKey) &&
                event.key.toLowerCase() === "k"
            ) {

                event.preventDefault();

                search.focus();

            }

        });


        search.addEventListener("input", event => {

            const value = event.target.value.trim();

            if (value.length > 2) {

                console.log(
                    "Protecta search:",
                    value
                );

            }

        });

    },


    /* =========================
       EXPLORE BUTTON
    ========================= */

    setupExploreButton() {

        const button =
            document.getElementById("exploreButton");

        if (!button) return;


        button.addEventListener("click", () => {

            const graph =
                document.querySelector(".graph-panel");

            if (!graph) return;


            graph.scrollIntoView({

                behavior: "smooth",

                block: "center"

            });


            graph.animate(

                [
                    {
                        boxShadow:
                            "0 0 0 rgba(0,168,255,0)"
                    },

                    {
                        boxShadow:
                            "0 0 35px rgba(0,168,255,.3)"
                    },

                    {
                        boxShadow:
                            "0 0 0 rgba(0,168,255,0)"
                    }
                ],

                {
                    duration: 1000
                }

            );

        });

    },


    /* =========================
       GRAPH CONTROLS
    ========================= */

    setupControls() {

        const controls =
            document.querySelectorAll(".control");

        controls.forEach(control => {

            control.addEventListener("click", () => {

                controls.forEach(button => {

                    button.classList.remove("active");

                });

                control.classList.add("active");

                console.log(
                    "Graph timeframe:",
                    control.textContent.trim()
                );

            });

        });

    },


    /* =========================
       LANGUAGE
    ========================= */

    setupLanguage() {

        const button =
            document.getElementById("languageButton");

        if (!button) return;


        button.addEventListener("click", () => {

            this.language =
                this.language === "es"
                    ? "en"
                    : "es";


            localStorage.setItem(
                "protectaLanguage",
                this.language
            );


            this.applyLanguage();

        });

    },


    applyLanguage() {

        const language =
            this.language;


        document.documentElement.lang =
            language;


        /* TEXTOS */

        const elements =
            document.querySelectorAll(
                "[data-es][data-en]"
            );


        elements.forEach(element => {

            element.textContent =
                element.getAttribute(
                    `data-${language}`
                );

        });


        /* PLACEHOLDER DEL BUSCADOR */

        const search =
            document.getElementById("globalSearch");


        if (search) {

            search.placeholder =
                search.getAttribute(
                    `data-placeholder-${language}`
                );

        }


        /* BOTÓN DE IDIOMA */

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


        /* TÍTULO */

        document.title =
            language === "es"
                ? "Protecta Solutions | Protecta Core"
                : "Protecta Solutions | Protecta Core";


        console.log(
            "Protecta language:",
            language
        );

    },


    /* =========================
       METRICS ANIMATION
    ========================= */

    animateMetrics() {

        const elements =
            document.querySelectorAll(
                ".metric-value"
            );


        elements.forEach(element => {

            element.style.opacity = "0";

            element.style.transform =
                "translateY(8px)";


            setTimeout(() => {

                element.style.transition =
                    "all .5s ease";

                element.style.opacity = "1";

                element.style.transform =
                    "translateY(0)";

            }, 150);

        });

    },


    /* =========================
       NEO4J
    ========================= */

    connectToNeo4j(config) {

        console.log(
            "Neo4j connection requested:",
            config
        );


        /*
            FUTURA CONEXIÓN

            Frontend
                 ↓
               Flask
                 ↓
               Neo4j

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


/* =========================
   START PROTECTA CORE
========================= */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        ProtectaCore.init();

    }
);