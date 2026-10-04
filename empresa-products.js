/**
 * Empresa — catálogo de productos (imágenes, abrir 10 productos, editar)
 * Se ejecuta al final para asegurar que funcione aunque haya conflictos.
 */
(function () {
    "use strict";

    function ready(fn) {
        if (document.readyState === "loading") {
            document.addEventListener("DOMContentLoaded", fn);
        } else {
            fn();
        }
    }

    function getLang() {
        return (window.ProtectaCore && ProtectaCore.language) ||
            localStorage.getItem("protectaLanguage") || "es";
    }

    function ensurePanel(section) {
        var panel = document.getElementById("categoryCatalog");
        if (!panel) {
            panel = document.createElement("div");
            panel.id = "categoryCatalog";
            panel.className = "catalog-panel";
            section.appendChild(panel);
        }
        return panel;
    }

    function ensureModal() {
        var modal = document.getElementById("productEditModal");
        if (modal) return modal;

        modal = document.createElement("div");
        modal.id = "productEditModal";
        modal.className = "edit-modal";
        modal.innerHTML =
            '<div class="edit-modal-panel">' +
            '<h3 id="editModalTitle">Editar</h3>' +
            '<div class="edit-field"><label>Nombre</label><input type="text" id="editTitle"></div>' +
            '<div class="edit-field"><label>Descripción</label><textarea id="editDesc"></textarea></div>' +
            '<div class="edit-field" id="editLabelField"><label>Texto en imagen (ej. ALARM)</label><input type="text" id="editLabel"></div>' +
            '<div class="edit-field" id="editCatLabelField"><label>Etiqueta categoría</label><input type="text" id="editCatLabel"></div>' +
            '<div class="edit-field" id="editImageField">' +
            '<label>Imagen (subir / importar)</label>' +
            '<div class="edit-preview" id="editPreview"></div>' +
            '<input type="file" id="editImage" accept="image/*">' +
            "</div>" +
            '<div class="edit-field" id="editScanField">' +
            '<label style="display:flex;align-items:center;gap:10px;text-transform:none;letter-spacing:0;font-size:13px;cursor:pointer;">' +
            '<input type="checkbox" id="editNoScan" style="width:auto;"> Desactivar animación de la línea' +
            "</label></div>" +
            '<div class="edit-actions">' +
            '<button type="button" class="edit-cancel" id="editCancel">Cancelar</button>' +
            '<button type="button" class="edit-save" id="editSave">Guardar</button>' +
            "</div></div>";
        document.body.appendChild(modal);
        return modal;
    }

    function rebuildGrid() {
        if (!window.ProtectaCatalog) {
            console.warn("[Protecta] catalog-shared.js no cargó");
            return;
        }
        window.ProtectaCatalog.applyToDOM(getLang());
    }

    function openCatalog(code, card) {
        if (!window.ProtectaCatalog) return;
        var full = window.ProtectaCatalog.getByCode(code);
        if (!full) {
            console.warn("[Protecta] catálogo no encontrado:", code);
            return;
        }

        var section =
            document.getElementById("products") ||
            document.querySelector(".products-section");
        if (!section) return;

        var panel = ensurePanel(section);
        var lang = getLang();
        var items = full.items || [];
        var title = lang === "en" ? full.titleEn || full.title : full.title;
        var closeLabel = lang === "en" ? "← BACK TO CATALOGS" : "← VOLVER A CATÁLOGOS";
        var statusLabel = lang === "en" ? "AVAILABLE" : "DISPONIBLE";

        document.querySelectorAll(".product-card.catalog-active").forEach(function (c) {
            c.classList.remove("catalog-active");
        });
        if (card) card.classList.add("catalog-active");
        section.classList.add("catalog-open");

        var listHtml = "";
        items.forEach(function (item, i) {
            var n = String(i + 1).padStart(2, "0");
            var itemCode = code + "-" + n;
            var img = full.image
                ? '<img class="product-photo-img" src="' + full.image + '" alt="">'
                : "";
            var hasPhoto = full.image ? " has-photo" : "";
            var noScan = full.noScan ? " no-scan" : "";

            listHtml +=
                '<article class="product-card' +
                hasPhoto +
                noScan +
                '" data-item-index="' +
                i +
                '" data-parent-code="' +
                code +
                '">' +
                '<div class="product-image">' +
                img +
                '<div class="product-image-grid"></div>' +
                '<div class="product-placeholder">' +
                '<span class="product-code">' +
                itemCode +
                "</span>" +
                "<strong>" +
                (full.label || "ITEM") +
                "</strong>" +
                "<span>PRODUCTO " +
                n +
                "</span>" +
                "</div>" +
                '<div class="product-status">● ' +
                statusLabel +
                "</div>" +
                '<button type="button" class="product-edit-btn" data-edit-item="' +
                i +
                '" data-parent-code="' +
                code +
                '">EDITAR</button>' +
                "</div>" +
                '<div class="product-info">' +
                '<div class="product-category">' +
                (full.categoryLabel || "") +
                "</div>" +
                "<h3>" +
                (item[0] || "") +
                "</h3>" +
                "<p>" +
                (item[1] || "") +
                "</p>" +
                '<div class="product-footer">' +
                '<span class="product-id">' +
                itemCode +
                "</span>" +
                '<button type="button" class="product-detail" data-edit-item="' +
                i +
                '" data-parent-code="' +
                code +
                '"><span>EDITAR</span><b>→</b></button>' +
                "</div></div></article>";
        });

        if (!items.length) {
            listHtml =
                '<p style="color:#737d91;padding:20px;">Sin productos. Agrégalos en Gestión.</p>';
        }

        panel.innerHTML =
            '<div class="catalog-panel-header">' +
            "<div><div class=\"catalog-code\">" +
            code +
            " · " +
            items.length +
            " productos</div>" +
            "<h3>" +
            title +
            "</h3></div>" +
            '<button type="button" class="catalog-close" id="catalogCloseBtn">' +
            closeLabel +
            "</button></div>" +
            '<div class="catalog-list products-grid">' +
            listHtml +
            "</div>";

        panel.classList.add("open");

        var closeBtn = document.getElementById("catalogCloseBtn");
        if (closeBtn) {
            closeBtn.onclick = function () {
                panel.classList.remove("open");
                section.classList.remove("catalog-open");
                document.querySelectorAll(".product-card.catalog-active").forEach(function (c) {
                    c.classList.remove("catalog-active");
                });
                panel.innerHTML = "";
            };
        }

        setTimeout(function () {
            panel.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 50);
    }

    var editingCode = null;
    var editingItemIndex = null;
    var pendingImage = null;

    function openEdit(code, itemIndex) {
        if (!window.ProtectaCatalog) return;
        var cat = window.ProtectaCatalog.getByCode(code);
        if (!cat) return;

        var modal = ensureModal();
        editingCode = code;
        editingItemIndex = itemIndex === undefined || itemIndex === null ? null : itemIndex;
        pendingImage = null;

        var titleEl = document.getElementById("editModalTitle");
        var titleInput = document.getElementById("editTitle");
        var descInput = document.getElementById("editDesc");
        var labelInput = document.getElementById("editLabel");
        var catLabelInput = document.getElementById("editCatLabel");
        var preview = document.getElementById("editPreview");
        var imageField = document.getElementById("editImageField");
        var labelField = document.getElementById("editLabelField");
        var catLabelField = document.getElementById("editCatLabelField");
        var scanField = document.getElementById("editScanField");
        var noScan = document.getElementById("editNoScan");
        var fileInput = document.getElementById("editImage");

        if (editingItemIndex === null) {
            titleEl.textContent = "Editar catálogo";
            titleInput.value = cat.title || "";
            descInput.value = cat.desc || "";
            labelInput.value = cat.label || "";
            catLabelInput.value = cat.categoryLabel || "";
            pendingImage = cat.image || null;
            preview.style.backgroundImage = cat.image ? "url('" + cat.image + "')" : "none";
            imageField.style.display = "";
            labelField.style.display = "";
            catLabelField.style.display = "";
            scanField.style.display = "";
            noScan.checked = !!cat.noScan;
        } else {
            titleEl.textContent = "Editar producto";
            var item = cat.items[editingItemIndex] || ["", ""];
            titleInput.value = item[0] || "";
            descInput.value = item[1] || "";
            imageField.style.display = "none";
            labelField.style.display = "none";
            catLabelField.style.display = "none";
            scanField.style.display = "none";
        }
        fileInput.value = "";
        modal.classList.add("open");
    }

    function bindModal() {
        var modal = ensureModal();

        document.getElementById("editCancel").onclick = function () {
            modal.classList.remove("open");
        };
        modal.onclick = function (e) {
            if (e.target === modal) modal.classList.remove("open");
        };
        document.getElementById("editImage").onchange = function () {
            var file = this.files && this.files[0];
            if (!file) return;
            var reader = new FileReader();
            reader.onload = function () {
                pendingImage = reader.result;
                document.getElementById("editPreview").style.backgroundImage =
                    "url('" + pendingImage + "')";
            };
            reader.readAsDataURL(file);
        };
        document.getElementById("editSave").onclick = function () {
            if (!editingCode || !window.ProtectaCatalog) return;
            var name = document.getElementById("editTitle").value.trim();
            var desc = document.getElementById("editDesc").value.trim();

            if (editingItemIndex === null) {
                var patch = {
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
            rebuildGrid();

            var section = document.getElementById("products");
            if (section && section.classList.contains("catalog-open")) {
                var active = document.querySelector(".product-card.catalog-active");
                openCatalog(editingCode, active);
            }
        };
    }

    function bindClicks() {
        var section =
            document.getElementById("products") ||
            document.querySelector(".products-section");
        if (!section || section.dataset.empresaProductsBound === "1") return;
        section.dataset.empresaProductsBound = "1";

        section.addEventListener("click", function (e) {
            // Edit item inside open catalog
            var editItem = e.target.closest("[data-edit-item]");
            if (editItem && editItem.closest("#categoryCatalog")) {
                e.preventDefault();
                e.stopPropagation();
                var code =
                    editItem.getAttribute("data-parent-code") ||
                    (editItem.closest("[data-parent-code]") || {}).getAttribute("data-parent-code");
                var idx = parseInt(editItem.getAttribute("data-edit-item"), 10);
                if (code && !isNaN(idx)) openEdit(code, idx);
                return;
            }

            // Edit category
            var editCat = e.target.closest(".product-edit-btn");
            if (
                editCat &&
                !editCat.closest("#categoryCatalog") &&
                !editCat.hasAttribute("data-edit-item")
            ) {
                e.preventDefault();
                e.stopPropagation();
                var card = editCat.closest(".product-card");
                var c =
                    editCat.getAttribute("data-edit-code") ||
                    (card && card.getAttribute("data-code"));
                if (c) openEdit(c, null);
                return;
            }

            if (e.target.closest("#categoryCatalog")) return;
            if (e.target.closest(".catalog-close")) return;

            // Open catalog
            var card2 = e.target.closest(".product-card");
            if (!card2) return;
            var mainGrid =
                section.querySelector(":scope > .products-grid") ||
                section.querySelector(".products-grid");
            if (!mainGrid || !mainGrid.contains(card2)) return;

            e.preventDefault();
            e.stopPropagation();

            var code2 = (
                card2.getAttribute("data-code") ||
                ((card2.querySelector(".product-code") || {}).textContent || "")
            ).trim();
            if (!code2) return;
            openCatalog(code2, card2);
        });
    }

    function bindFilters() {
        document.querySelectorAll(".product-filter").forEach(function (filter) {
            filter.onclick = function () {
                document.querySelectorAll(".product-filter").forEach(function (b) {
                    b.classList.remove("active");
                });
                filter.classList.add("active");
                var category = filter.getAttribute("data-filter");
                var visible = 0;
                document
                    .querySelectorAll("#products .products-grid > .product-card")
                    .forEach(function (product) {
                        if (product.closest("#categoryCatalog")) return;
                        var show =
                            category === "all" ||
                            product.getAttribute("data-category") === category;
                        product.classList.toggle("product-hidden", !show);
                        if (show) visible++;
                    });
                var counter = document.getElementById("productCount");
                if (counter) counter.textContent = String(visible).padStart(2, "0");
            };
        });
    }

    function init() {
        if (!window.ProtectaCatalog) {
            console.warn("[Protecta] Esperando catalog-shared.js…");
            setTimeout(init, 200);
            return;
        }

        // Force default images if storage is stale
        try {
            var data = window.ProtectaCatalog.load();
            var changed = false;
            data.forEach(function (cat) {
                if (!cat.image || cat.image === "null") {
                    var def = (window.ProtectaCatalog.defaults || []).find(function (d) {
                        return d.code === cat.code;
                    });
                    if (def && def.image) {
                        cat.image = def.image;
                        changed = true;
                    }
                }
            });
            if (changed) window.ProtectaCatalog.save(data);
        } catch (e) {}

        rebuildGrid();
        bindModal();
        bindClicks();
        bindFilters();

        // Also rebuild after boot finishes
        var app = document.getElementById("application");
        if (app) {
            var obs = new MutationObserver(function () {
                if (app.style.display !== "none" && app.offsetParent !== null) {
                    rebuildGrid();
                }
            });
            obs.observe(document.body, { attributes: true, subtree: true, attributeFilter: ["class", "style"] });
            setTimeout(function () {
                obs.disconnect();
            }, 15000);
        }

        // Rebuild when navigating to #products
        window.addEventListener("hashchange", function () {
            if (location.hash === "#products" || location.hash === "#gestion") {
                setTimeout(rebuildGrid, 50);
            }
        });

        console.log("[Protecta] empresa-products listo");
    }

    ready(function () {
        // Wait a bit for ProtectaCore boot / other scripts
        setTimeout(init, 300);
        setTimeout(rebuildGrid, 1500);
        setTimeout(rebuildGrid, 3500);
    });
})();
