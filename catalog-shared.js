/**
 * Protecta — catálogo compartido (Empresa + Clientes)
 * Los cambios hechos en Empresa se guardan en localStorage
 * y se reflejan automáticamente en Clientes.
 */
(function (global) {
    const STORAGE_KEY = "protectaProductData_v1";

    const DEFAULT_CATEGORIES = [
        {
            code: "PS-ALM-001",
            filter: "security",
            label: "ALARM",
            categoryLabel: "ALARM SYSTEMS",
            title: "Control de Alarmas",
            titleEn: "Alarm Control",
            desc: "Sistemas de control y monitoreo de alarmas para protección de instalaciones.",
            descEn: "Alarm control and monitoring systems for facility protection.",
            image: null,
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
        {
            code: "PS-ACC-001",
            filter: "security",
            label: "ACCESS",
            categoryLabel: "ACCESS CONTROL",
            title: "Control de Acceso",
            titleEn: "Access Control",
            desc: "Sistemas de control y gestión de accesos para instalaciones empresariales.",
            descEn: "Access control and management systems for enterprise facilities.",
            image: null,
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
        {
            code: "PS-FIR-001",
            filter: "security",
            label: "FIRE",
            categoryLabel: "FIRE DETECTION",
            title: "Detección de Incendios",
            titleEn: "Fire Detection",
            desc: "Sistemas de detección temprana de incendios y alertas en tiempo real.",
            descEn: "Early fire detection systems and real-time alerts.",
            image: null,
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
        {
            code: "PS-AUT-001",
            filter: "technology",
            label: "AUTO",
            categoryLabel: "AUTOMATION",
            title: "Automatizaciones",
            titleEn: "Automations",
            desc: "Soluciones de automatización inteligente para edificios e instalaciones.",
            descEn: "Intelligent automation solutions for buildings and facilities.",
            image: null,
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
        {
            code: "PS-VID-001",
            filter: "security",
            label: "VIDEO",
            categoryLabel: "VIDEO SURVEILLANCE",
            title: "Videovigilancia",
            titleEn: "Video Surveillance",
            desc: "Sistema inteligente para monitoreo y análisis de espacios en tiempo real.",
            descEn: "Intelligent system for real-time space monitoring and analysis.",
            image: null,
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
        {
            code: "PS-FIB-001",
            filter: "network",
            label: "FIBER",
            categoryLabel: "FIBER OPTICS",
            title: "Fibra Óptica",
            titleEn: "Fiber Optics",
            desc: "Infraestructura de fibra óptica para conectividad de alta velocidad.",
            descEn: "Fiber optic infrastructure for high-speed connectivity.",
            image: null,
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
        {
            code: "PS-HVA-001",
            filter: "technology",
            label: "HVAC",
            categoryLabel: "HVAC SYSTEMS",
            title: "(HVAC) Aire Acondicionado",
            titleEn: "(HVAC) Air Conditioning",
            desc: "Sistemas de climatización y control de aire acondicionado para espacios críticos.",
            descEn: "Climate control and air conditioning systems for critical spaces.",
            image: null,
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
        {
            code: "PS-PCI-001",
            filter: "security",
            label: "PCI",
            categoryLabel: "FIRE PROTECTION",
            title: "(PCI) Protección Contra Incendios",
            titleEn: "(PCI) Fire Protection Systems",
            desc: "Sistemas de protección contra incendios: extinción, rociadores y seguridad pasiva.",
            descEn: "Fire protection systems: suppression, sprinklers and passive safety.",
            image: null,
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
        {
            code: "PS-ING-001",
            filter: "technology",
            label: "ENG",
            categoryLabel: "SPECIAL ENGINEERING",
            title: "Ingenierías Especiales",
            titleEn: "Special Engineering",
            desc: "Proyectos de ingeniería especializada adaptados a las necesidades del cliente.",
            descEn: "Specialized engineering projects tailored to client needs.",
            image: null,
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
    ];

    function cloneDefaults() {
        return JSON.parse(JSON.stringify(DEFAULT_CATEGORIES));
    }

    function load() {
        try {
            const raw = localStorage.getItem(STORAGE_KEY);
            if (!raw) return cloneDefaults();
            const parsed = JSON.parse(raw);
            if (!Array.isArray(parsed) || parsed.length === 0) return cloneDefaults();
            return parsed;
        } catch (e) {
            return cloneDefaults();
        }
    }

    function save(data) {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
            return true;
        } catch (e) {
            console.warn("No se pudo guardar el catálogo (posiblemente imagen muy grande).", e);
            return false;
        }
    }

    function getByCode(code) {
        return load().find(function (c) {
            return c.code === code;
        }) || null;
    }

    function updateCategory(code, patch) {
        const data = load();
        const idx = data.findIndex(function (c) {
            return c.code === code;
        });
        if (idx === -1) return false;
        data[idx] = Object.assign({}, data[idx], patch);
        return save(data);
    }

    function updateItem(code, itemIndex, name, desc) {
        const data = load();
        const cat = data.find(function (c) {
            return c.code === code;
        });
        if (!cat || !cat.items[itemIndex]) return false;
        cat.items[itemIndex] = [name, desc];
        return save(data);
    }

    function toCatalogsMap(data) {
        const map = {};
        (data || load()).forEach(function (c) {
            map[c.code] = {
                title: c.title,
                titleEn: c.titleEn,
                items: c.items
            };
        });
        return map;
    }

    /**
     * Aplica datos guardados a las tarjetas .product-card del DOM
     */
    function applyToDOM(lang) {
        lang = lang || "es";
        const data = load();
        const cards = document.querySelectorAll(".product-card");

        cards.forEach(function (card, i) {
            const codeEl = card.querySelector(".product-code");
            let code = codeEl ? codeEl.textContent.trim() : "";
            let cat = data.find(function (c) {
                return c.code === code;
            });
            // Fallback by order
            if (!cat && data[i]) cat = data[i];
            if (!cat) return;

            if (codeEl) codeEl.textContent = cat.code;

            const strong = card.querySelector(".product-placeholder strong");
            if (strong) strong.textContent = cat.label;

            const catLabel = card.querySelector(".product-category");
            if (catLabel) catLabel.textContent = cat.categoryLabel;

            const h3 = card.querySelector(".product-info h3");
            if (h3) {
                h3.textContent = lang === "en" ? cat.titleEn : cat.title;
                h3.setAttribute("data-es", cat.title);
                h3.setAttribute("data-en", cat.titleEn);
            }

            const p = card.querySelector(".product-info p");
            if (p) {
                p.textContent = lang === "en" ? cat.descEn : cat.desc;
                p.setAttribute("data-es", cat.desc);
                p.setAttribute("data-en", cat.descEn);
            }

            const idEl = card.querySelector(".product-id");
            if (idEl) {
                idEl.textContent = cat.code + " · 100 productos";
            }

            card.dataset.category = cat.filter;
            card.dataset.code = cat.code;

            // Imagen personalizada sin quitar animación (grid + scan)
            let photo = card.querySelector(".product-photo");
            if (cat.image) {
                if (!photo) {
                    photo = document.createElement("div");
                    photo.className = "product-photo";
                    const imgWrap = card.querySelector(".product-image");
                    if (imgWrap) imgWrap.insertBefore(photo, imgWrap.firstChild);
                }
                photo.style.backgroundImage = "url(" + cat.image + ")";
                card.classList.add("has-photo");
            } else if (photo) {
                photo.remove();
                card.classList.remove("has-photo");
            }
        });
    }

    global.ProtectaCatalog = {
        STORAGE_KEY: STORAGE_KEY,
        load: load,
        save: save,
        getByCode: getByCode,
        updateCategory: updateCategory,
        updateItem: updateItem,
        toCatalogsMap: toCatalogsMap,
        applyToDOM: applyToDOM,
        defaults: DEFAULT_CATEGORIES
    };
})(window);
