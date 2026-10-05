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


    categoryCatalogs: {

        "PS-ALM-001": {
            title: "Control de Alarmas",
            titleEn: "Alarm Control",
            items: [
                ["Panel de alarma central PS-A100", "Central de monitoreo 32 zonas"],
                ["Sensor magnético de puerta SM-12", "Contacto magnético cableado"],
                ["Detector de movimiento PIR-90", "Infrarrojo pasivo interior"],
                ["Sirena exterior SR-200", "120 dB con strobe LED"],
                ["Teclado LED TK-45", "Armado/desarmado local"],
                ["Módulo GSM/4G MG-8", "Aviso por celular y app"],
                ["Sensor de rotura de cristal RG-3", "Acústico de alta sensibilidad"],
                ["Botón de pánico BP-1", "Activación silenciosa"],
                ["Fuente respaldada FR-5A", "Batería 12V incluida"],
                ["Software de monitoreo SoftAlarm", "Supervisión multi-sitio"]
            ]
        },

        "PS-ACC-001": {
            title: "Control de Acceso",
            titleEn: "Access Control",
            items: [
                ["Controlador de acceso CA-4", "Hasta 4 puertas"],
                ["Lector de proximidad RFID RP-10", "Tarjetas y llaveros"],
                ["Lector biométrico huella BF-2", "1:N hasta 3000 usuarios"],
                ["Cerradura magnética CM-280", "Fuerza 280 kg"],
                ["Torniquete de acceso TR-1", "Paso controlado peatonal"],
                ["Tarjetas de proximidad pack 50", "MIFARE 13.56 MHz"],
                ["Software Access Manager", "Usuarios, horarios y reportes"],
                ["Botón de salida BE-01", "Liberación de puerta"],
                ["Fuente de acceso FA-3A", "12V / 3A regulada"],
                ["Videoportero IP VP-5", "Llamada y apertura remota"]
            ]
        },

        "PS-FIR-001": {
            title: "Detección de Incendios",
            titleEn: "Fire Detection",
            items: [
                ["Central de detección CD-64", "Hasta 64 detectores"],
                ["Detector de humo fotoeléctrico DH-1", "Techo interior"],
                ["Detector de calor termovelocimétrico DT-2", "Ambientes industriales"],
                ["Detector combinado humo/calor DC-3", "Doble tecnología"],
                ["Estación manual de alarma EM-1", "Ruptura de vidrio"],
                ["Módulo de supervisión MS-4", "Líneas y dispositivos"],
                ["Sirena visual-auditiva SVA-10", "Estroboscópica roja"],
                ["Cable resistente al fuego RF-2x1.5", "100 m bobina"],
                ["Repetidor de señal RS-F", "Amplificación de lazo"],
                ["Software FireView", "Mapa y eventos en tiempo real"]
            ]
        },

        "PS-AUT-001": {
            title: "Automatizaciones",
            titleEn: "Automations",
            items: [
                ["PLC de automatización PLC-S1", "Control de escenarios"],
                ["Módulo relé inteligente MR-8", "8 salidas conmutadas"],
                ["Sensor de ocupación SO-PIR", "Encendido automático"],
                ["Actuador de persianas AP-24", "Motor 24V silencioso"],
                ["Termostato inteligente TI-7", "Programación semanal"],
                ["Gateway IoT GW-Pro", "Integración multi-protocolo"],
                ["Dimmer LED DM-4C", "4 canales 0-10V"],
                ["Contacto de ventana CV-WiFi", "Estado abierto/cerrado"],
                ["App Control Center", "Escenas y automatismos"],
                ["Hub de automatización HA-Core", "Orquestación local"]
            ]
        },

        "PS-VID-001": {
            title: "Videovigilancia",
            titleEn: "Video Surveillance",
            items: [
                ["Cámara IP dome 4MP CD-4", "Interior, IR 30 m"],
                ["Cámara bullet 5MP CB-5", "Exterior IP67"],
                ["Cámara PTZ 20x CPTZ-20", "Zoom óptico y tracking"],
                ["NVR 16 canales NVR-16", "Hasta 8TB × 2"],
                ["Disco HDD vigilancia 4TB", "Escritura 24/7"],
                ["Switch PoE 8 puertos SW-8", "Alimentación de cámaras"],
                ["Analítica de video AI-V", "Personas, vehículos, intrusión"],
                ["Monitor 27'' videowall", "Visualización multipantalla"],
                ["Fuente UPS cámara UPS-C", "Respaldo 30 min"],
                ["Cliente móvil ProtectaCam", "Vista remota segura"]
            ]
        },

        "PS-FIB-001": {
            title: "Fibra Óptica",
            titleEn: "Fiber Optics",
            items: [
                ["Cable fibra monomodo FO-1K", "1 km bobina OS2"],
                ["Cable fibra multimodo FO-MM", "OM3 300 m"],
                ["Switch fibra 8 SFP SW-F8", "Gigabit óptico"],
                ["Conversor media fibra-cobre MC-1", "RJ45 a SC"],
                ["Patch cord SC/APC 3 m", "Conectorizado"],
                ["Caja de empalme CE-24", "Hasta 24 fibras"],
                ["ODF rack 1U ODF-12", "Distribución óptica"],
                ["Fusionadora de fibra FF-Pro", "Empalme de precisión"],
                ["Medidor OTDR OT-1", "Certificación de tendido"],
                ["Transceiver SFP 1G SX", "Multimodo 850 nm"]
            ]
        },

        "PS-HVA-001": {
            title: "(HVAC) Aire Acondicionado",
            titleEn: "(HVAC) Air Conditioning",
            items: [
                ["Unidad interior split UI-12", "12,000 BTU inverter"],
                ["Unidad exterior UE-18", "18,000 BTU R32"],
                ["Cassette de techo CT-24", "24,000 BTU 4 vías"],
                ["Termostato de zona TZ-WiFi", "Control por app"],
                ["Sensor de CO2 ambiental SC-2", "Calidad de aire"],
                ["Válvula modulante VM-3", "Control de caudal"],
                ["Filtro HEPA repuesto FH-1", "Alta eficiencia"],
                ["Control central HVAC-Core", "Multi-zona BMS"],
                ["Detector de fugas de gas DF-G", "Seguridad de equipo"],
                ["Mantenimiento programado pack", "Plan anual preventivo"]
            ]
        },

        "PS-PCI-001": {
            title: "(PCI) Protección Contra Incendios",
            titleEn: "(PCI) Fire Protection Systems",
            items: [
                ["Rociador automático RA-68", "Temperatura 68 °C"],
                ["Válvula de gobierno VG-4", "Sistema húmedo"],
                ["Extintor PQS 6 kg EX-6", "ABC multipropósito"],
                ["Extintor CO2 5 kg EX-CO2", "Equipos eléctricos"],
                ["Gabinete para manguera GM-1", "Carrete 30 m"],
                ["Sistema de gas FM-200", "Salas técnicas"],
                ["Bombas contra incendio BI-50", "50 HP diésel/eléctrica"],
                ["Señalética fotoluminiscente SF-10", "Kit de evacuación"],
                ["Detector de flujo de agua DF-A", "Supervisión de red"],
                ["Central de bombeo CB-PCI", "Arranque automático"]
            ]
        },

        "PS-ING-001": {
            title: "Ingenierías Especiales",
            titleEn: "Special Engineering",
            items: [
                ["Estudio de ingeniería de seguridad", "Diseño a medida"],
                ["Proyecto de cableado estructurado", "Norma TIA/EIA"],
                ["Integración BMS / SCADA", "Sistemas centralizados"],
                ["Diseño de cuarto de control", "Layout y ergonomía"],
                ["Auditoría de infraestructura", "Diagnóstico técnico"],
                ["Plan de continuidad operativa", "Resiliencia del sitio"],
                ["Comisionamiento de sistemas", "Pruebas y entrega"],
                ["Capacitación técnica in-situ", "Operadores y mantenedores"],
                ["Documentación as-built", "Planos y manuales"],
                ["Soporte de ingeniería especializada", "Acompañamiento de obra"]
            ]
        }

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
    PRODUCTS
    ===================================================== */


    /* =====================================================
       PRODUCT EDITORS (solo Empresa)
    ===================================================== */

    setupProductEditors() {

        if (!window.ProtectaCatalog) return;

        let modal = document.getElementById("productEditModal");

        if (!modal) {

            modal = document.createElement("div");
            modal.id = "productEditModal";
            modal.className = "edit-modal";
            modal.innerHTML =
                `<div class="edit-modal-panel">` +
                `<h3 id="editModalTitle">Editar categoría</h3>` +
                `<div class="edit-field"><label>Nombre</label><input type="text" id="editTitle"></div>` +
                `<div class="edit-field"><label>Descripción</label><textarea id="editDesc"></textarea></div>` +
                `<div class="edit-field" id="editImageField"><label>Foto del producto (se mantiene la animación)</label>` +
                `<div class="edit-preview" id="editPreview"></div>` +
                `<input type="file" id="editImage" accept="image/*"></div>` +
                `<div class="edit-actions">` +
                `<button type="button" class="edit-cancel" id="editCancel">Cancelar</button>` +
                `<button type="button" class="edit-save" id="editSave">Guardar</button>` +
                `</div></div>`;

            document.body.appendChild(modal);

        }

        let editingCode = null;
        let editingItemIndex = null;
        let pendingImage = null;

        const titleInput = () => document.getElementById("editTitle");
        const descInput = () => document.getElementById("editDesc");
        const preview = () => document.getElementById("editPreview");
        const fileInput = () => document.getElementById("editImage");
        const imageField = () => document.getElementById("editImageField");

        const openModal = (code, itemIndex) => {

            editingCode = code;
            editingItemIndex = (itemIndex === undefined ? null : itemIndex);
            pendingImage = null;

            const cat = window.ProtectaCatalog.getByCode(code);
            if (!cat) return;

            const modalTitle = document.getElementById("editModalTitle");

            if (editingItemIndex === null) {

                modalTitle.textContent = "Editar categoría";
                titleInput().value = cat.title;
                descInput().value = cat.desc;
                pendingImage = cat.image || null;
                preview().style.backgroundImage = cat.image ? ("url(" + cat.image + ")") : "none";
                imageField().style.display = "";

            } else {

                modalTitle.textContent = "Editar producto";
                const item = cat.items[editingItemIndex];
                titleInput().value = item[0];
                descInput().value = item[1];
                imageField().style.display = "none";

            }

            fileInput().value = "";
            modal.classList.add("open");

        };

        document.getElementById("editCancel").onclick = () => {
            modal.classList.remove("open");
        };

        modal.addEventListener("click", (e) => {
            if (e.target === modal) modal.classList.remove("open");
        });

        fileInput().onchange = () => {
            const file = fileInput().files && fileInput().files[0];
            if (!file) return;
            const reader = new FileReader();
            reader.onload = () => {
                pendingImage = reader.result;
                preview().style.backgroundImage = "url(" + pendingImage + ")";
            };
            reader.readAsDataURL(file);
        };

        document.getElementById("editSave").onclick = () => {

            if (!editingCode) return;

            const name = titleInput().value.trim();
            const desc = descInput().value.trim();

            if (editingItemIndex === null) {

                const patch = { title: name, desc: desc };
                if (pendingImage !== null) patch.image = pendingImage;
                window.ProtectaCatalog.updateCategory(editingCode, patch);

            } else {

                window.ProtectaCatalog.updateItem(
                    editingCode,
                    editingItemIndex,
                    name,
                    desc
                );

            }

            this.categoryCatalogs =
                window.ProtectaCatalog.toCatalogsMap();

            window.ProtectaCatalog.applyToDOM(
                this.language || "es"
            );

            this.bindCategoryEditButtons(openModal);

            modal.classList.remove("open");

            // Refresh open catalog view if visible
            const panel = document.getElementById("categoryCatalog");
            const active = document.querySelector(".product-card.catalog-active");
            if (panel && panel.classList.contains("open") && active && this._openCatalogFn) {
                const code = active.dataset.code || "";
                if (code) this._openCatalogFn(code, active);
            }

        };

        this.bindCategoryEditButtons(openModal);

        // Store openModal globally for delegation
        window._protectaOpenEditModal = openModal;

        if (!window._protectaItemEditBound) {

            window._protectaItemEditBound = true;

            document.addEventListener("click", (e) => {
                // Category EDITAR (main grid)
                const catBtn = e.target.closest(".product-edit-btn[data-edit-code], .products-section > .products-grid .product-edit-btn");
                if (catBtn && !catBtn.closest("#categoryCatalog") && !catBtn.hasAttribute("data-edit-item")) {
                    e.preventDefault();
                    e.stopPropagation();
                    const card = catBtn.closest(".product-card");
                    const code = (catBtn.dataset.editCode || (card && card.dataset.code) || "").trim();
                    if (code && window._protectaOpenEditModal) {
                        window._protectaOpenEditModal(code, null);
                    }
                    return;
                }

                // Product EDITAR inside open catalog
                const btn = e.target.closest("[data-edit-item]");
                if (!btn) return;
                e.preventDefault();
                e.stopPropagation();

                const itemCard = btn.closest(".product-card");
                const parentCode =
                    (itemCard && itemCard.dataset.parentCode) ||
                    (document.querySelector(".product-card.catalog-active") || {}).dataset.code ||
                    "";
                const code = String(parentCode).trim();
                const idx = parseInt(btn.getAttribute("data-edit-item"), 10);
                if (code && window._protectaOpenEditModal && !isNaN(idx)) {
                    window._protectaOpenEditModal(code, idx);
                }
            });

        }

    },

    bindCategoryEditButtons(openModal) {

        window._protectaOpenEditModal = openModal;

        document.querySelectorAll(".products-section > .products-grid > .product-card").forEach((card) => {
            let btn = card.querySelector(".product-edit-btn");
            if (!btn) {
                btn = document.createElement("button");
                btn.type = "button";
                btn.className = "product-edit-btn";
                btn.textContent = "EDITAR";
                const code = card.dataset.code || "";
                if (code) btn.setAttribute("data-edit-code", code);
                const img = card.querySelector(".product-image");
                if (img) img.appendChild(btn);
            } else if (card.dataset.code) {
                btn.setAttribute("data-edit-code", card.dataset.code);
            }
        });

    },



    bindProductGridEvents() {

        const section =
            document.querySelector(
                ".products-section"
            );

        if (!section || section.dataset.boundGrid === "1") {
            // still rebind detail buttons after re-render
        }

        const catalogPanel =
            document.getElementById(
                "categoryCatalog"
            ) ||
            (function () {
                const sec =
                    document.querySelector(
                        ".products-section"
                    );
                if (!sec) return null;
                let p =
                    document.getElementById(
                        "categoryCatalog"
                    );
                if (!p) {
                    p =
                        document.createElement(
                            "div"
                        );
                    p.id = "categoryCatalog";
                    p.className =
                        "catalog-panel";
                    sec.appendChild(p);
                }
                return p;
            })();

        // Use event delegation on products section
        if (section && section.dataset.boundGrid !== "1") {

            section.dataset.boundGrid = "1";

            section.addEventListener(
                "click",
                (e) => {

                    const detail =
                        e.target.closest(
                            ".products-section > .products-grid > .product-card .product-detail"
                        );

                    if (detail) {

                        e.preventDefault();
                        e.stopPropagation();

                        const card =
                            detail.closest(
                                ".product-card"
                            );

                        const code =
                            (card &&
                                (card.dataset
                                    .code ||
                                    (card.querySelector(
                                        ".product-code"
                                    ) ||
                                        {})
                                        .textContent
                                        .trim())) ||
                            "";

                        if (
                            card &&
                            card.classList.contains(
                                "catalog-active"
                            ) &&
                            catalogPanel &&
                            catalogPanel.classList.contains(
                                "open"
                            )
                        ) {

                            catalogPanel.classList.remove(
                                "open"
                            );

                            section.classList.remove(
                                "catalog-open"
                            );

                            card.classList.remove(
                                "catalog-active"
                            );

                            return;

                        }

                        // open catalog via existing flow
                        const fakeOpen =
                            this._openCatalogFn;

                        if (
                            fakeOpen
                        )
                            fakeOpen(
                                code,
                                card
                            );

                        return;

                    }

                }
            );

        }

        // filter buttons
        document
            .querySelectorAll(
                ".product-filter"
            )
            .forEach((filter) => {

                filter.onclick = () => {

                    document
                        .querySelectorAll(
                            ".product-filter"
                        )
                        .forEach((b) =>
                            b.classList.remove(
                                "active"
                            )
                        );

                    filter.classList.add(
                        "active"
                    );

                    const category =
                        filter.dataset
                            .filter;

                    let visible = 0;

                    document
                        .querySelectorAll(
                            ".products-section > .products-grid > .product-card"
                        )
                        .forEach(
                            (product) => {

                                const show =
                                    category ===
                                        "all" ||
                                    product
                                        .dataset
                                        .category ===
                                        category;

                                product.classList.toggle(
                                    "product-hidden",
                                    !show
                                );

                                if (
                                    show
                                )
                                    visible++;

                            }
                        );

                    const counter =
                        document.getElementById(
                            "productCount"
                        );

                    if (counter)
                        counter.textContent =
                            String(
                                visible
                            ).padStart(
                                2,
                                "0"
                            );

                };

            });

    },

    setupGestion() {

        const list =
            document.getElementById(
                "gestionList"
            );

        const search =
            document.getElementById(
                "gestionSearch"
            );

        const newBtn =
            document.getElementById(
                "gestionNewCat"
            );

        if (
            !list ||
            !window.ProtectaCatalog
        )
            return;

        const refresh = (query) => {

            const data =
                query
                    ? window.ProtectaCatalog.search(
                          query
                      )
                    : window.ProtectaCatalog.load();

            if (!data.length) {

                list.innerHTML =
                    '<p style="color:#737d91;padding:20px;">No hay resultados.</p>';

                return;

            }

            list.innerHTML = data
                .map((cat) => {

                    const items =
                        cat.items ||
                        [];

                    const itemsHtml =
                        items
                            .map(
                                (it, i) =>
                                    `<div class="gestion-item" data-code="${cat.code}" data-idx="${i}">` +
                                    `<div class="gestion-item-info"><strong>${it[0]}</strong><span>${it[1]}</span></div>` +
                                    `<div class="gestion-item-actions">` +
                                    `<button type="button" data-act="edit-item" data-code="${cat.code}" data-idx="${i}">Editar</button>` +
                                    `<button type="button" data-act="del-item" data-code="${cat.code}" data-idx="${i}">Borrar</button>` +
                                    `</div></div>`
                            )
                            .join("");

                    return (
                        `<div class="gestion-card" data-code="${cat.code}">` +
                        `<div class="gestion-card-head">` +
                        `<div><div class="catalog-code">${cat.code}</div><h3>${cat.title}</h3><p>${cat.desc || ""}</p></div>` +
                        `<div class="gestion-card-actions">` +
                        `<button type="button" data-act="edit-cat" data-code="${cat.code}">Editar catálogo</button>` +
                        `<button type="button" data-act="add-item" data-code="${cat.code}">+ Producto</button>` +
                        `<button type="button" data-act="del-cat" data-code="${cat.code}">Borrar catálogo</button>` +
                        `</div></div>` +
                        `<div class="gestion-items">${itemsHtml || '<p style="color:#737d91;font-size:13px;">Sin productos</p>'}</div>` +
                        `</div>`
                    );

                })
                .join("");

        };

        refresh();

        if (search) {

            search.oninput = () =>
                refresh(
                    search.value
                );

        }

        if (newBtn) {

            newBtn.onclick = () => {

                const code =
                    "PS-NEW-" +
                    String(
                        Date.now()
                    ).slice(-4);

                const title =
                    prompt(
                        "Nombre del catálogo:",
                        "Nuevo catálogo"
                    );

                if (!title) return;

                const desc =
                    prompt(
                        "Descripción:",
                        ""
                    ) || "";

                const filter =
                    prompt(
                        "Filtro (security / technology / network):",
                        "technology"
                    ) || "technology";

                window.ProtectaCatalog.addCategory(
                    {
                        code: code,
                        title: title,
                        titleEn: title,
                        desc: desc,
                        descEn: desc,
                        filter: filter,
                        label: title
                            .slice(
                                0,
                                6
                            )
                            .toUpperCase(),
                        categoryLabel:
                            title.toUpperCase(),
                        items: []
                    }
                );

                window.ProtectaCatalog.applyToDOM(
                    this.language ||
                        "es"
                );

                refresh(
                    search
                        ? search.value
                        : ""
                );

            };

        }

        list.onclick = (e) => {

            const btn =
                e.target.closest(
                    "[data-act]"
                );

            if (!btn) return;

            const act =
                btn.dataset.act;

            const code =
                btn.dataset.code;

            const idx =
                btn.dataset.idx !==
                undefined
                    ? parseInt(
                          btn.dataset
                              .idx,
                          10
                      )
                    : null;

            if (
                act === "del-cat"
            ) {

                if (
                    !confirm(
                        "¿Borrar catálogo " +
                            code +
                            " y todos sus productos?"
                    )
                )
                    return;

                window.ProtectaCatalog.deleteCategory(
                    code
                );

            } else if (
                act === "edit-cat"
            ) {

                const cat =
                    window.ProtectaCatalog.getByCode(
                        code
                    );

                if (!cat) return;

                const title =
                    prompt(
                        "Nombre:",
                        cat.title
                    );

                if (
                    title === null
                )
                    return;

                const desc =
                    prompt(
                        "Descripción:",
                        cat.desc ||
                            ""
                    );

                if (
                    desc === null
                )
                    return;

                window.ProtectaCatalog.updateCategory(
                    code,
                    {
                        title: title,
                        titleEn: title,
                        desc: desc,
                        descEn: desc
                    }
                );

            } else if (
                act === "add-item"
            ) {

                const name =
                    prompt(
                        "Nombre del producto:",
                        ""
                    );

                if (!name) return;

                const desc =
                    prompt(
                        "Descripción:",
                        ""
                    ) || "";

                window.ProtectaCatalog.addItem(
                    code,
                    name,
                    desc
                );

            } else if (
                act === "edit-item"
            ) {

                const cat =
                    window.ProtectaCatalog.getByCode(
                        code
                    );

                if (
                    !cat ||
                    !cat.items[
                        idx
                    ]
                )
                    return;

                const name =
                    prompt(
                        "Nombre:",
                        cat.items[
                            idx
                        ][0]
                    );

                if (
                    name === null
                )
                    return;

                const desc =
                    prompt(
                        "Descripción:",
                        cat.items[
                            idx
                        ][1]
                    );

                if (
                    desc === null
                )
                    return;

                window.ProtectaCatalog.updateItem(
                    code,
                    idx,
                    name,
                    desc
                );

            } else if (
                act === "del-item"
            ) {

                if (
                    !confirm(
                        "¿Borrar este producto?"
                    )
                )
                    return;

                window.ProtectaCatalog.deleteItem(
                    code,
                    idx
                );

            }

            window.ProtectaCatalog.applyToDOM(
                this.language ||
                    "es"
            );

            refresh(
                search
                    ? search.value
                    : ""
            );

        };

    },


    setupProducts() {
        const self = this;
        const lang = this.language || "es";

        // Reset open state
        document.querySelectorAll(".products-section").forEach((s) => {
            s.classList.remove("catalog-open");
        });

        // Build / refresh cards from shared catalog
        if (window.ProtectaCatalog) {
            window.ProtectaCatalog.applyToDOM(lang);
            this.categoryCatalogs = window.ProtectaCatalog.toCatalogsMap();
        } else {
            console.warn("ProtectaCatalog no cargó (catalog-shared.js)");
        }

        const section = document.querySelector("#products") ||
            document.querySelector(".products-section");
        if (!section) return;

        // Catalog panel
        let panel = document.getElementById("categoryCatalog");
        if (!panel) {
            panel = document.createElement("div");
            panel.id = "categoryCatalog";
            panel.className = "catalog-panel";
            section.appendChild(panel);
        } else {
            panel.classList.remove("open");
            panel.innerHTML = "";
        }

        // ---- Open catalog (10 products) ----
        const openCatalog = (code, card) => {
            if (!window.ProtectaCatalog) return;

            const full = window.ProtectaCatalog.getByCode(code);
            if (!full) {
                console.warn("Catálogo no encontrado:", code);
                return;
            }

            const items = full.items || [];
            const title = lang === "en" ? (full.titleEn || full.title) : full.title;
            const closeLabel = lang === "en" ? "← BACK TO CATALOGS" : "← VOLVER A CATÁLOGOS";
            const statusLabel = lang === "en" ? "AVAILABLE" : "DISPONIBLE";
            const noScan = !!full.noScan;

            document.querySelectorAll(".product-card.catalog-active").forEach((c) =>
                c.classList.remove("catalog-active")
            );
            if (card) card.classList.add("catalog-active");
            section.classList.add("catalog-open");

            let listHtml = "";
            items.forEach((item, i) => {
                const n = String(i + 1).padStart(2, "0");
                const itemCode = code + "-" + n;
                const img = full.image
                    ? `<img class="product-photo-img" src="${full.image}" alt="">`
                    : "";
                const hasPhoto = full.image ? " has-photo" : "";
                const noScanCls = noScan ? " no-scan" : "";

                listHtml +=
                    `<article class="product-card${hasPhoto}${noScanCls}" data-item-index="${i}" data-parent-code="${code}">` +
                    `<div class="product-image">` +
                    img +
                    `<div class="product-image-grid"></div>` +
                    `<div class="product-placeholder">` +
                    `<span class="product-code">${itemCode}</span>` +
                    `<strong>${(full.label || "ITEM")}</strong>` +
                    `<span>PRODUCTO ${n}</span>` +
                    `</div>` +
                    `<div class="product-status">● ${statusLabel}</div>` +
                    `<button type="button" class="product-edit-btn" data-edit-item="${i}" data-parent-code="${code}">EDITAR</button>` +
                    `</div>` +
                    `<div class="product-info">` +
                    `<div class="product-category">${full.categoryLabel || ""}</div>` +
                    `<h3>${item[0]}</h3>` +
                    `<p>${item[1] || ""}</p>` +
                    `<div class="product-footer">` +
                    `<span class="product-id">${itemCode}</span>` +
                    `<button type="button" class="product-detail" data-edit-item="${i}" data-parent-code="${code}">` +
                    `<span>EDITAR</span><b>→</b></button>` +
                    `</div></div></article>`;
            });

            if (!items.length) {
                listHtml = `<p style="color:#737d91;padding:20px;">Este catálogo no tiene productos aún. Agrégalos en Gestión.</p>`;
            }

            panel.innerHTML =
                `<div class="catalog-panel-header">` +
                `<div><div class="catalog-code">${code} · ${items.length} productos</div>` +
                `<h3>${title}</h3></div>` +
                `<button type="button" class="catalog-close" id="catalogCloseBtn">${closeLabel}</button>` +
                `</div>` +
                `<div class="catalog-list products-grid">${listHtml}</div>`;

            panel.classList.add("open");

            const closeBtn = document.getElementById("catalogCloseBtn");
            if (closeBtn) {
                closeBtn.onclick = () => {
                    panel.classList.remove("open");
                    section.classList.remove("catalog-open");
                    document.querySelectorAll(".product-card.catalog-active").forEach((c) =>
                        c.classList.remove("catalog-active")
                    );
                    panel.innerHTML = "";
                };
            }

            setTimeout(() => {
                panel.scrollIntoView({ behavior: "smooth", block: "start" });
            }, 60);
        };

        this._openCatalogFn = openCatalog;

        // ---- Edit modal ----
        let modal = document.getElementById("productEditModal");
        if (!modal) {
            modal = document.createElement("div");
            modal.id = "productEditModal";
            modal.className = "edit-modal";
            modal.innerHTML =
                `<div class="edit-modal-panel">` +
                `<h3 id="editModalTitle">Editar</h3>` +
                `<div class="edit-field"><label>Nombre</label><input type="text" id="editTitle"></div>` +
                `<div class="edit-field"><label>Descripción</label><textarea id="editDesc"></textarea></div>` +
                `<div class="edit-field" id="editLabelField"><label>Texto en imagen (ej. ALARM)</label><input type="text" id="editLabel"></div>` +
                `<div class="edit-field" id="editCatLabelField"><label>Etiqueta categoría (ej. ALARM SYSTEMS)</label><input type="text" id="editCatLabel"></div>` +
                `<div class="edit-field" id="editImageField">` +
                `<label>Imagen del producto</label>` +
                `<div class="edit-preview" id="editPreview"></div>` +
                `<input type="file" id="editImage" accept="image/*">` +
                `</div>` +
                `<div class="edit-field" id="editScanField">` +
                `<label style="display:flex;align-items:center;gap:10px;text-transform:none;letter-spacing:0;font-size:13px;cursor:pointer;">` +
                `<input type="checkbox" id="editNoScan" style="width:auto;"> Desactivar animación de la línea` +
                `</label></div>` +
                `<div class="edit-actions">` +
                `<button type="button" class="edit-cancel" id="editCancel">Cancelar</button>` +
                `<button type="button" class="edit-save" id="editSave">Guardar</button>` +
                `</div></div>`;
            document.body.appendChild(modal);
        }

        let editingCode = null;
        let editingItemIndex = null;
        let pendingImage = null;

        const openEdit = (code, itemIndex) => {
            const cat = window.ProtectaCatalog && window.ProtectaCatalog.getByCode(code);
            if (!cat) return;
            editingCode = code;
            editingItemIndex = itemIndex === undefined ? null : itemIndex;
            pendingImage = null;

            const titleEl = document.getElementById("editModalTitle");
            const titleInput = document.getElementById("editTitle");
            const descInput = document.getElementById("editDesc");
            const labelInput = document.getElementById("editLabel");
            const catLabelInput = document.getElementById("editCatLabel");
            const preview = document.getElementById("editPreview");
            const imageField = document.getElementById("editImageField");
            const labelField = document.getElementById("editLabelField");
            const catLabelField = document.getElementById("editCatLabelField");
            const scanField = document.getElementById("editScanField");
            const noScan = document.getElementById("editNoScan");
            const fileInput = document.getElementById("editImage");

            if (editingItemIndex === null) {
                titleEl.textContent = "Editar catálogo";
                titleInput.value = cat.title || "";
                descInput.value = cat.desc || "";
                labelInput.value = cat.label || "";
                catLabelInput.value = cat.categoryLabel || "";
                pendingImage = cat.image || null;
                preview.style.backgroundImage = cat.image ? `url('${cat.image}')` : "none";
                imageField.style.display = "";
                labelField.style.display = "";
                catLabelField.style.display = "";
                scanField.style.display = "";
                noScan.checked = !!cat.noScan;
            } else {
                titleEl.textContent = "Editar producto";
                const item = cat.items[editingItemIndex] || ["", ""];
                titleInput.value = item[0] || "";
                descInput.value = item[1] || "";
                imageField.style.display = "none";
                labelField.style.display = "none";
                catLabelField.style.display = "none";
                scanField.style.display = "none";
            }
            fileInput.value = "";
            modal.classList.add("open");
        };

        this._openEditModal = openEdit;
        window._protectaOpenEditModal = openEdit;

        document.getElementById("editCancel").onclick = () => modal.classList.remove("open");
        modal.onclick = (e) => { if (e.target === modal) modal.classList.remove("open"); };

        document.getElementById("editImage").onchange = () => {
            const file = document.getElementById("editImage").files[0];
            if (!file) return;
            const reader = new FileReader();
            reader.onload = () => {
                pendingImage = reader.result;
                document.getElementById("editPreview").style.backgroundImage = `url('${pendingImage}')`;
            };
            reader.readAsDataURL(file);
        };

        document.getElementById("editSave").onclick = () => {
            if (!editingCode || !window.ProtectaCatalog) return;
            const name = document.getElementById("editTitle").value.trim();
            const desc = document.getElementById("editDesc").value.trim();

            if (editingItemIndex === null) {
                const patch = {
                    title: name,
                    titleEn: name,
                    desc: desc,
                    descEn: desc,
                    label: document.getElementById("editLabel").value.trim() || "CAT",
                    categoryLabel: document.getElementById("editCatLabel").value.trim() || "",
                    noScan: document.getElementById("editNoScan").checked
                };
                if (pendingImage !== null) patch.image = pendingImage;
                window.ProtectaCatalog.updateCategory(editingCode, patch);
            } else {
                window.ProtectaCatalog.updateItem(editingCode, editingItemIndex, name, desc);
            }

            modal.classList.remove("open");
            window.ProtectaCatalog.applyToDOM(self.language || "es");
            self.categoryCatalogs = window.ProtectaCatalog.toCatalogsMap();

            // Re-open catalog if was open
            const active = document.querySelector(".product-card.catalog-active");
            if (active && section.classList.contains("catalog-open")) {
                openCatalog(editingCode, active);
            }
        };

        // ---- Single click delegation (open + edit) ----
        if (section.dataset.protectaBound !== "1") {
            section.dataset.protectaBound = "1";

            section.addEventListener("click", (e) => {
                // EDITAR product inside open catalog
                const editItemBtn = e.target.closest("[data-edit-item]");
                if (editItemBtn && editItemBtn.closest("#categoryCatalog")) {
                    e.preventDefault();
                    e.stopPropagation();
                    const code = editItemBtn.getAttribute("data-parent-code") ||
                        (editItemBtn.closest("[data-parent-code]") || {}).dataset.parentCode;
                    const idx = parseInt(editItemBtn.getAttribute("data-edit-item"), 10);
                    if (code && !isNaN(idx)) openEdit(code, idx);
                    return;
                }

                // EDITAR category card
                const editCatBtn = e.target.closest(".product-edit-btn");
                if (editCatBtn && !editCatBtn.closest("#categoryCatalog") && !editCatBtn.hasAttribute("data-edit-item")) {
                    e.preventDefault();
                    e.stopPropagation();
                    const card = editCatBtn.closest(".product-card");
                    const code = editCatBtn.dataset.editCode || (card && card.dataset.code);
                    if (code) openEdit(code, null);
                    return;
                }

                // Open catalog: VER CATÁLOGO or whole card
                if (e.target.closest("#categoryCatalog")) return;
                if (e.target.closest(".catalog-close")) return;

                const card = e.target.closest(".products-grid > .product-card");
                if (!card) return;
                const mainGrid = section.querySelector(":scope > .products-grid") ||
                    section.querySelector(".products-grid");
                if (!mainGrid || !mainGrid.contains(card)) return;

                e.preventDefault();
                e.stopPropagation();

                const code = (card.dataset.code ||
                    (card.querySelector(".product-code") || {}).textContent || "").trim();
                if (!code) return;

                openCatalog(code, card);
            });
        }

        // Filters
        document.querySelectorAll(".product-filter").forEach((filter) => {
            filter.onclick = () => {
                document.querySelectorAll(".product-filter").forEach((b) => b.classList.remove("active"));
                filter.classList.add("active");
                const category = filter.dataset.filter;
                let visible = 0;
                document.querySelectorAll("#products .products-grid > .product-card, .products-section > .products-grid > .product-card")
                    .forEach((product) => {
                        if (product.closest("#categoryCatalog")) return;
                        const show = category === "all" || product.dataset.category === category;
                        product.classList.toggle("product-hidden", !show);
                        if (show) visible++;
                    });
                const counter = document.getElementById("productCount");
                if (counter) counter.textContent = String(visible).padStart(2, "0");
            };
        });

        this.setupGestion();
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
        ProtectaCore.setupProducts();

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