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

        };

        this.bindCategoryEditButtons(openModal);

        if (!window._protectaItemEditBound) {

            window._protectaItemEditBound = true;

            document.addEventListener("click", (e) => {
                const btn = e.target.closest("[data-edit-item]");
                if (!btn) return;
                const active = document.querySelector(".product-card.catalog-active");
                if (!active) return;
                const codeEl = active.querySelector(".product-code");
                const code = active.dataset.code || (codeEl && codeEl.textContent.trim());
                const idx = parseInt(btn.getAttribute("data-edit-item"), 10);
                openModal(code, idx);
            });

        }

    },

    bindCategoryEditButtons(openModal) {

        document.querySelectorAll(".product-card").forEach((card) => {

            let btn = card.querySelector(".product-edit-btn");

            if (!btn) {

                btn = document.createElement("button");
                btn.type = "button";
                btn.className = "product-edit-btn";
                btn.textContent = "EDITAR";
                const img = card.querySelector(".product-image");
                if (img) img.appendChild(btn);

            }

            btn.onclick = (e) => {
                e.preventDefault();
                e.stopPropagation();
                const codeEl = card.querySelector(".product-code");
                const code = card.dataset.code || (codeEl && codeEl.textContent.trim());
                openModal(code, null);
            };

        });

    },


    setupProducts() {

        // Sync from shared catalog (localStorage)
        if (window.ProtectaCatalog) {

            this.categoryCatalogs =
                window.ProtectaCatalog.toCatalogsMap();

            window.ProtectaCatalog.applyToDOM(
                this.language || "es"
            );

            this.setupProductEditors();

        }

        const filters =
            document.querySelectorAll(
                ".product-filter"
            );

        const products =
            document.querySelectorAll(
                ".product-card"
            );

        const counter =
            document.getElementById(
                "productCount"
            );


        if (!filters.length || !products.length)
            return;


        filters.forEach(filter => {

            filter.addEventListener(
                "click",
                () => {

                    filters.forEach(
                        button => {

                            button.classList.remove(
                                "active"
                            );

                        }
                    );


                    filter.classList.add(
                        "active"
                    );


                    const category =
                        filter.dataset.filter;


                    let visible = 0;


                    products.forEach(product => {

                        const productCategory =
                            product.dataset.category;


                        const show =
                            category === "all" ||
                            productCategory === category;


                        if (show) {

                            product.classList.remove(
                                "product-hidden"
                            );

                            visible++;

                        } else {

                            product.classList.add(
                                "product-hidden"
                            );

                        }

                    });


                    if (counter) {

                        counter.textContent =
                            String(visible)
                                .padStart(2, "0");

                    }

                }
            );

        });


        const detailButtons =
            document.querySelectorAll(
                ".product-detail"
            );


        // Ensure catalog panel exists inside products-section
        let catalogPanel =
            document.getElementById(
                "categoryCatalog"
            );

        const productsSection =
            document.querySelector(
                ".products-section"
            );

        if (!catalogPanel && productsSection) {

            catalogPanel =
                document.createElement(
                    "div"
                );

            catalogPanel.id =
                "categoryCatalog";

            catalogPanel.className =
                "catalog-panel";

            productsSection.appendChild(
                catalogPanel
            );

        }


        const openCatalog = (code, card) => {

            if (!catalogPanel) return;

            if (window.ProtectaCatalog) {
                this.categoryCatalogs =
                    window.ProtectaCatalog.toCatalogsMap();
            }

            const fullCat = window.ProtectaCatalog
                ? window.ProtectaCatalog.getByCode(code)
                : null;

            const catalog =
                this.categoryCatalogs[code];

            if (!catalog) {
                catalogPanel.classList.remove("open");
                return;
            }

            document
                .querySelectorAll(".product-card.catalog-active")
                .forEach(c => c.classList.remove("catalog-active"));

            if (card) card.classList.add("catalog-active");

            const productsSection =
                document.querySelector(".products-section");
            if (productsSection)
                productsSection.classList.add("catalog-open");

            const lang = this.language || "es";
            const title =
                lang === "en" ? catalog.titleEn : catalog.title;
            const closeLabel =
                lang === "en" ? "← BACK TO CATALOGS" : "← VOLVER A CATÁLOGOS";
            const statusLabel =
                lang === "en" ? "AVAILABLE" : "DISPONIBLE";
            const viewLabel =
                lang === "en" ? "VIEW" : "VER";
            const label =
                (fullCat && fullCat.label) || "ITEM";
            const categoryLabel =
                (fullCat && fullCat.categoryLabel) || code;
            const catImage =
                (fullCat && fullCat.image) || null;

            let listHtml = "";

            catalog.items.forEach((item, i) => {
                const n = String(i + 1).padStart(2, "0");
                const itemCode = code + "-" + n;
                const photoStyle = catImage
                    ? ` style="background-image:url(${catImage})"`
                    : "";
                const hasPhoto = catImage ? " has-photo" : "";
                const editBtn =
                    `<button type="button" class="product-edit-btn" data-edit-item="${i}">EDITAR</button>`;

                listHtml +=
                    `<article class="product-card${hasPhoto}" data-item-index="${i}" data-parent-code="${code}">` +
                    `<div class="product-image">` +
                    (catImage
                        ? `<div class="product-photo"${photoStyle}></div>`
                        : "") +
                    `<div class="product-image-grid"></div>` +
                    `<div class="product-placeholder">` +
                    `<span class="product-code">${itemCode}</span>` +
                    `<strong>${label}</strong>` +
                    `<span>PRODUCTO ${n}</span>` +
                    `</div>` +
                    `<div class="product-status">● ${statusLabel}</div>` +
                    editBtn +
                    `</div>` +
                    `<div class="product-info">` +
                    `<div class="product-category">${categoryLabel}</div>` +
                    `<h3>${item[0]}</h3>` +
                    `<p>${item[1]}</p>` +
                    `<div class="product-footer">` +
                    `<span class="product-id">${itemCode}</span>` +
                    `<button type="button" class="product-detail catalog-item-edit" data-edit-item="${i}">` +
                    `<span>EDITAR</span><b>→</b>` +
                    `</button>` +
                    `</div></div></article>`;
            });

            catalogPanel.innerHTML =
                `<div class="catalog-panel-header">` +
                `<div>` +
                `<div class="catalog-code">${code} · 10 productos</div>` +
                `<h3>${title}</h3>` +
                `</div>` +
                `<button type="button" class="catalog-close" id="catalogCloseBtn">${closeLabel}</button>` +
                `</div>` +
                `<div class="catalog-list products-grid">${listHtml}</div>`;

            catalogPanel.classList.add("open");

            const closeBtn =
                document.getElementById("catalogCloseBtn");

            if (closeBtn) {
                closeBtn.addEventListener("click", () => {
                    catalogPanel.classList.remove("open");
                    if (productsSection)
                        productsSection.classList.remove("catalog-open");
                    document
                        .querySelectorAll(".product-card.catalog-active")
                        .forEach(c =>
                            c.classList.remove("catalog-active")
                        );
                });
            }

            setTimeout(() => {
                catalogPanel.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });
            }, 80);

        };



        detailButtons.forEach(button => {

            button.addEventListener(
                "click",
                (e) => {

                    e.preventDefault();

                    e.stopPropagation();

                    const card =
                        button.closest(
                            ".product-card"
                        );

                    if (!card) return;

                    const codeEl =
                        card.querySelector(
                            ".product-code"
                        );

                    const code =
                        codeEl
                            ? codeEl
                                .textContent
                                .trim()
                            : "";

                    // Toggle if same catalog open
                    if (
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

                        card.classList.remove(
                            "catalog-active"
                        );

                        return;

                    }

                    openCatalog(code, card);

                }
            );

        });

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
        this.setupProducts();

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