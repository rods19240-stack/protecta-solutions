const ProtectaCore = {

    mode: "simulation",

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
        this.animateMetrics();
    },

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

    setupSearch() {

        const search = document.getElementById("globalSearch");

        document.addEventListener("keydown", event => {

            if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {

                event.preventDefault();
                search.focus();

            }

        });

        search.addEventListener("input", event => {

            const value = event.target.value.trim();

            if (value.length > 2) {
                console.log("Protecta search:", value);
            }

        });

    },

    setupExploreButton() {

        const button = document.getElementById("exploreButton");

        button.addEventListener("click", () => {

            const graph = document.querySelector(".graph-panel");

            graph.scrollIntoView({
                behavior: "smooth",
                block: "center"
            });

            graph.animate(
                [
                    {
                        boxShadow: "0 0 0 rgba(0,168,255,0)"
                    },
                    {
                        boxShadow: "0 0 35px rgba(0,168,255,.3)"
                    },
                    {
                        boxShadow: "0 0 0 rgba(0,168,255,0)"
                    }
                ],
                {
                    duration: 1000
                }
            );

        });

    },

    setupControls() {

        const controls = document.querySelectorAll(".control");

        controls.forEach(control => {

            control.addEventListener("click", () => {

                controls.forEach(button => {
                    button.classList.remove("active");
                });

                control.classList.add("active");

            });

        });

    },

    animateMetrics() {

        const elements = document.querySelectorAll(".metric-value");

        elements.forEach(element => {

            element.style.opacity = "0";
            element.style.transform = "translateY(8px)";

            setTimeout(() => {

                element.style.transition = "all .5s ease";
                element.style.opacity = "1";
                element.style.transform = "translateY(0)";

            }, 150);

        });

    },

    connectToNeo4j(config) {

        console.log("Neo4j connection requested:", config);

        /*
            Aquí posteriormente conectaremos:

            Frontend
                 ↓
              API
                 ↓
              Neo4j

            Ejemplo futuro:

            fetch("/api/network")
                .then(response => response.json())
                .then(data => {
                    this.renderNetwork(data);
                });
        */

    },

    renderNetwork(data) {

        console.log("Rendering Neo4j network:", data);

    }

};

document.addEventListener("DOMContentLoaded", () => {
    ProtectaCore.init();
});