/* ============================================================
   CERVECERÍA EL DECANO — Carta digital
   ============================================================ */

/*
  PEGA AQUÍ la URL CSV que te da Google Sheets al usar:
  Archivo > Compartir > Publicar en la web > CSV.

  Si está vacío, la carta usa los datos locales incluidos en este archivo.
*/
const GOOGLE_SHEET_URL = "";

/* Carta base: corresponde a la versión digital para revisión de José. */
const SAMPLE_DATA = [
  // categoria, nombre, descripcion, precio, precio2, etiqueta2, disponible, orden, alergenos, foto

  // --- Para picotear ---
  ["Para picotear", "Ensaladilla rusa", "", "3.65", "7.30", "Ración", "SI", 1, "H,P", "ensaladilla.png"],
  ["Para picotear", "Ensaladilla de pulpo", "", "4.15", "8.30", "Ración", "SI", 2, "MO,H", ""],
  ["Para picotear", "Patatas alioli con langostino", "", "4.15", "8.30", "Ración", "SI", 3, "C,H", "langostino.png"],
  ["Para picotear", "Huevas con mayonesa", "", "4.65", "9.30", "Ración", "SI", 4, "P,H", "huevas.png"],
  ["Para picotear", "Cóctel de marisco", "", "4.90", "9.80", "Ración", "SI", 5, "C,MO,P", ""],

  // --- Montaditos ---
  ["Montaditos", "Pringá", "Con patatas pajas", "4.00", "", "", "SI", 1, "G", ""],
  ["Montaditos", "Solomillo al whisky con jamón", "Con patatas pajas", "4.00", "", "", "SI", 2, "G,SO", ""],
  ["Montaditos", "Piripi", "Con patatas pajas", "4.00", "", "", "SI", 3, "G", ""],
  ["Montaditos", "Montadito de lomo con salsa verde", "Con patatas pajas", "4.00", "", "", "SI", 4, "G", "lomo_salsa_verde.png"],
  ["Montaditos", "Perrito caliente", "", "2.50", "", "", "SI", 5, "G", "perrito.png"],
  ["Montaditos", "Hamburguesa con queso", "Con patatas pajas", "4.00", "", "", "SI", 6, "G,L", ""],

  // --- Para entrar en calor ---
  ["Para entrar en calor", "Carrillera en salsa", "Tapa / plato. Con patatas a lo pobre +0,70€. Con puré o arroz basmati +0,45€", "4.20", "8.40", "Plato", "SI", 1, "SO", "carrillera.png"],
  ["Para entrar en calor", "Solomillo al whisky", "Tapa / plato. Con patatas a lo pobre +0,70€. Con puré o arroz basmati +0,45€", "4.20", "8.40", "Plato", "SI", 2, "SO", ""],
  ["Para entrar en calor", "Albóndigas de chocos", "Tapa / plato. Con patatas a lo pobre +0,70€. Con puré o arroz basmati +0,45€", "4.20", "8.40", "Plato", "SI", 3, "G,L,MO", ""],
  ["Para entrar en calor", "Pollo con miel y mostaza", "Tapa / plato. Con patatas a lo pobre +0,70€. Con puré o arroz basmati +0,45€", "4.20", "8.40", "Plato", "SI", 4, "M", ""],
  ["Para entrar en calor", "Rulo de cabra", "", "4.65", "12.30", "Plato", "SI", 5, "L", ""],
  ["Para entrar en calor", "Champiñones al ajillo con panecillos", "", "6.30", "", "", "SI", 6, "G", "champinones.png"],
  ["Para entrar en calor", "Bacalao con pisto y panecillos", "", "6.30", "", "", "SI", 7, "P,G", "bacalao_pisto.png"],
  ["Para entrar en calor", "Croquetas de puchero", "Con patatas pajas", "4.60", "9.20", "Ración", "SI", 8, "G,L,H", ""],
  ["Para entrar en calor", "Croquetas de jamón", "Con patatas pajas", "4.60", "9.20", "Ración", "SI", 9, "G,L,H", ""],
  ["Para entrar en calor", "Alitas de pollo a la BBQ", "Con patatas pajas", "4.60", "9.20", "Ración", "SI", 10, "G", ""],
  ["Para entrar en calor", "Lagrimitas de pollo", "Con patatas pajas", "4.60", "9.20", "Ración", "SI", 11, "G", ""],
  ["Para entrar en calor", "Tortilla de patatas", "", "4.15", "", "", "SI", 12, "H", ""],
  ["Para entrar en calor", "Lasaña con pan de ajo", "", "9.80", "", "", "SI", 13, "G,L,H", ""],
  ["Para entrar en calor", "Mini brochetas con puré", "", "5.50", "", "", "SI", 14, "L", ""],

  // --- Sabe a tradición ---
  ["Sabe a tradición", "Queso con nueces", "", "9.45", "", "", "SI", 1, "L,FS", ""],
  ["Sabe a tradición", "Jamón con pan de cristal", "", "11.45", "", "", "SI", 2, "G", ""],
  ["Sabe a tradición", "Crujicoque de queso", "", "6.75", "", "", "SI", 3, "G,L", "crujicoque.png"],
  ["Sabe a tradición", "Crujicoque carbonara", "", "6.75", "", "", "SI", 4, "G,L,H", ""],
  ["Sabe a tradición", "Crujicoque york", "", "6.75", "", "", "SI", 5, "G,L", ""],

  // --- Arroces y pasta con historia ---
  ["Arroces y pasta con historia", "Espaguetis boloñesa", "", "9.30", "", "", "SI", 1, "G,L", ""],
  ["Arroces y pasta con historia", "Tallarines a la marinera", "", "9.70", "", "", "SI", 2, "G,MO,C,P", ""],
  ["Arroces y pasta con historia", "Arroz negro", "", "12.75", "", "", "SI", 3, "MO,C", "arroz_negro.png"],
  ["Arroces y pasta con historia", "Risotto de setas", "", "12.75", "", "", "SI", 4, "L", ""],
  ["Arroces y pasta con historia", "Fideuá", "", "12.75", "", "", "SI", 5, "G,C,MO,P", ""],
  ["Arroces y pasta con historia", "Fideguay", "", "12.75", "", "", "SI", 6, "G,L", "fideguay.png"],
  ["Arroces y pasta con historia", "Paella de marisco", "", "12.75", "", "", "SI", 7, "C,MO,P", ""],
  ["Arroces y pasta con historia", "Arroz marroquí", "", "9.75", "", "", "SI", 8, "FS", ""],

  // --- Refresca el cuerpo ---
  ["Refresca el cuerpo", "Mixta", "", "7.75", "", "", "SI", 1, "H,P", ""],
  ["Refresca el cuerpo", "Tomate aliñado", "", "6.25", "", "", "SI", 2, "", ""],
  ["Refresca el cuerpo", "Pimentada con melva", "", "8.45", "", "", "SI", 3, "P", ""],
  ["Refresca el cuerpo", "Salmorejo", "", "5.15", "", "", "SI", 4, "G,H", ""],

  // --- Sabor a mar ---
  ["Sabor a mar", "Patatas con choco", "", "8.25", "", "", "SI", 1, "MO", ""],
  ["Sabor a mar", "Merluza en salsa de gulas y langostino", "", "13.75", "", "", "SI", 2, "P,C", ""],
  ["Sabor a mar", "Bacalao a la vizcaína", "", "13.20", "", "", "SI", 3, "P", "bacalao_vizcaina.png"],
  ["Sabor a mar", "Almejas al ajillo", "", "10.80", "", "", "SI", 4, "MO", "almejas.png"],
  ["Sabor a mar", "Gambas al brandy", "", "9.75", "", "", "SI", 5, "C,SO", "gambas_brandy.png"],
  ["Sabor a mar", "Garbanzos a la marinera", "", "8.20", "", "", "SI", 6, "MO,C,P", ""],
  ["Sabor a mar", "Suquet de pescadores", "", "13.30", "", "", "SI", 7, "P,MO,C", ""],
  ["Sabor a mar", "Mejillones a la marinera", "", "6.15", "", "", "SI", 8, "MO", ""],

  // --- Menús que no fallan ---
  ["Menús que no fallan", "Callos de ternera", "A elegir: arroz basmati o patatas a lo pobre", "8.50", "", "", "SI", 1, "", "callos.png"],
  ["Menús que no fallan", "Costilla a la barbacoa", "Con puré de patatas", "16.30", "", "", "SI", 2, "L", "costilla_pure.png"],
  ["Menús que no fallan", "Codillo de cerdo", "Con patatas a lo pobre y ensalada", "16.30", "", "", "SI", 3, "", ""],
  ["Menús que no fallan", "Rabo de toro", "Con patatas a lo pobre", "14.60", "", "", "SI", 4, "SO", "rabo_de_toro.png"],
  ["Menús que no fallan", "Migas serranas", "", "11.90", "", "", "SI", 5, "G", ""],
  ["Menús que no fallan", "Pechuga de pollo al ajillo", "Con arroz y patatas a lo pobre", "13.90", "", "", "SI", 6, "", ""],
  ["Menús que no fallan", "Secreto asado con pimentada", "Con puré de patatas", "14.20", "", "", "SI", 7, "L", ""],
  ["Menús que no fallan", "Lomo al Roquefort", "Con puré o arroz basmati", "10.90", "", "", "SI", 8, "L", ""],
  ["Menús que no fallan", "Solomillo de cerdo con salsa a las 5 pimientas", "Con puré o arroz basmati", "14.90", "", "", "SI", 9, "L", ""],
  ["Menús que no fallan", "Riñones al jerez", "Con patatas a lo pobre y arroz basmati", "15.10", "", "", "SI", 10, "SO", ""],
  ["Menús que no fallan", "Pollo teriyaki con arroz", "", "12.15", "", "", "SI", 11, "G,S", "pollo_teriyaki.png"],
  ["Menús que no fallan", "Secreto a baja temperatura", "Con cebolla caramelizada y patatas a lo pobre", "12.15", "", "", "SI", 12, "", ""],

  // --- El final feliz (postres, 3,70€ cada uno) ---
  ["El final feliz", "Chocolate blanco y pistacho", "", "3.70", "", "", "SI", 1, "L,FS", "postre_chocolate_blanco_pistacho.png"],
  ["El final feliz", "Natilla y canela", "", "3.70", "", "", "SI", 2, "L,H", "postre_natilla_canela.png"],
  ["El final feliz", "Griego de manzana y mango", "", "3.70", "", "", "SI", 3, "L", "postre_griego_manzana_mango.png"],
  ["El final feliz", "Doble Lotus", "", "3.70", "", "", "SI", 4, "G,L", "postre_doble_lotus.png"],
  ["El final feliz", "Chocolate tres texturas", "", "3.70", "", "", "SI", 5, "L", "postre_chocolate_tres_texturas.png"],
  ["El final feliz", "Tocino de cielo, nata y nueces", "", "3.70", "", "", "SI", 6, "H,L,FS", "postre_tocino_cielo_nata_nueces.png"],
  ["El final feliz", "Queso ricota y frutas del bosque", "", "3.70", "", "", "SI", 7, "L", "postre_queso_ricota_frutas_bosque.png"],
  ["El final feliz", "Limón, merengue y milhojas", "", "3.70", "", "", "SI", 8, "G,H,L", "postre_limon_merengue_milhojas.png"],
  ["El final feliz", "Músico al caramelo", "", "3.70", "", "", "SI", 9, "FS,L", "postre_musico_caramelo.png"],
  ["El final feliz", "Pedro Ximénez y crumble de mantequilla", "", "3.70", "", "", "SI", 10, "G,L,SO", "postre_pedro_ximenez_crumble.png"],
  ["El final feliz", "Turrón", "", "3.70", "", "", "SI", 11, "FS,L", "postre_turron.png"],

  // --- Para brindar ---
  ["Para brindar", "Vino blanco (copa)", "", "2.50", "", "", "SI", 1, "SO", ""],
  ["Para brindar", "Vino blanco (botella)", "", "12.00", "", "", "SI", 2, "SO", ""],
  ["Para brindar", "Vino tinto (copa)", "", "2.50", "", "", "SI", 3, "SO", ""],
  ["Para brindar", "Vino tinto (botella)", "", "12.00", "", "", "SI", 4, "SO", ""],
  ["Para brindar", "Tinto de verano", "", "2.00", "", "", "SI", 5, "SO", ""],
  ["Para brindar", "Cerveza cortada", "", "1.80", "", "", "SI", 6, "G", ""],
  ["Para brindar", "Cerveza entera", "", "2.50", "", "", "SI", 7, "G", ""],
  ["Para brindar", "Tercio", "", "2.10", "", "", "SI", 8, "G", ""],
  ["Para brindar", "Refrescos", "", "2.00", "", "", "SI", 9, "", ""],
  ["Para brindar", "Lipton", "", "2.20", "", "", "SI", 10, "", ""],
  ["Para brindar", "Lipton maracuyá", "", "2.20", "", "", "SI", 11, "", ""],
  ["Para brindar", "Aquarius naranja", "", "2.20", "", "", "SI", 12, "", ""],
  ["Para brindar", "Aquarius limón", "", "2.20", "", "", "SI", 13, "", ""],
  ["Para brindar", "Zumos", "", "1.80", "", "", "SI", 14, "", ""],
  ["Para brindar", "Agua 0,5L", "", "1.20", "", "", "SI", 15, "", ""],
  ["Para brindar", "Agua 1L", "", "2.20", "", "", "SI", 16, "", ""],
  ["Para brindar", "Café", "", "1.50", "", "", "SI", 17, "", ""],

  // --- Salsas a elegir ---
  ["Salsas a elegir", "Mojo picón", "Suplemento", "0.40", "", "", "SI", 1, "", ""],
  ["Salsas a elegir", "Barbacoa", "Suplemento", "0.40", "", "", "SI", 2, "", ""],
  ["Salsas a elegir", "Salsa verde", "Suplemento", "0.40", "", "", "SI", 3, "", ""],
  ["Salsas a elegir", "Salsa alioli", "Suplemento", "0.40", "", "", "SI", 4, "H", ""],
];

const SAMPLE_COLUMNS = ["categoria", "nombre", "descripcion", "precio", "precio2", "etiqueta2", "disponible", "orden", "alergenos", "foto"];

const ALLERGEN_LABELS = {
  G: "Gluten", C: "Crustáceos", H: "Huevo", P: "Pescado", L: "Lácteos",
  MO: "Moluscos", SO: "Sulfitos", M: "Mostaza", FS: "Frutos secos", S: "Soja"
};

function formatPrice(value) {
  if (value === undefined || value === null || String(value).trim() === "") return "";
  const num = parseFloat(String(value).replace(",", "."));
  if (Number.isNaN(num)) return String(value);
  return num.toFixed(2).replace(".", ",") + " €";
}

function parseCSV(text) {
  const rows = [];
  let row = [];
  let field = "";
  let inQuotes = false;

  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    const next = text[i + 1];
    if (inQuotes) {
      if (c === '"' && next === '"') { field += '"'; i++; }
      else if (c === '"') inQuotes = false;
      else field += c;
    } else {
      if (c === '"') inQuotes = true;
      else if (c === ",") { row.push(field); field = ""; }
      else if (c === "\r") { /* ignorar */ }
      else if (c === "\n") { row.push(field); rows.push(row); row = []; field = ""; }
      else field += c;
    }
  }
  if (field.length || row.length) { row.push(field); rows.push(row); }
  return rows.filter(r => r.some(cell => String(cell).trim() !== ""));
}

function rowsToItems(rows, columns) {
  return rows.map(r => {
    const obj = {};
    columns.forEach((col, i) => { obj[col] = (r[i] ?? "").toString().trim(); });
    return obj;
  });
}

function showStatus(message, type = "warning") {
  const el = document.getElementById("status-message");
  if (!el) return;
  el.textContent = message;
  el.className = `status-message ${type}`;
  el.hidden = false;
}

async function loadMenuData() {
  const fallback = rowsToItems(SAMPLE_DATA, SAMPLE_COLUMNS);
  if (!GOOGLE_SHEET_URL.trim()) return { items: fallback, source: "local" };

  try {
    const url = new URL(GOOGLE_SHEET_URL);
    url.searchParams.set("_", Date.now().toString());
    const res = await fetch(url.toString(), { cache: "no-store" });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const text = await res.text();
    const rows = parseCSV(text);
    if (rows.length < 2) throw new Error("La hoja no contiene filas de menú");

    const header = rows[0].map(h => h.trim().toLowerCase());
    const required = ["categoria", "nombre", "precio", "disponible", "orden"];
    const missing = required.filter(c => !header.includes(c));
    if (missing.length) throw new Error(`Faltan columnas: ${missing.join(", ")}`);

    return { items: rowsToItems(rows.slice(1), header), source: "sheet" };
  } catch (err) {
    console.error("No se pudo cargar Google Sheets:", err);
    showStatus("Ahora mismo no se ha podido actualizar la carta desde Google Sheets. Se muestra la copia de seguridad; confirma precios o disponibilidad con el personal.", "warning");
    return { items: fallback, source: "fallback" };
  }
}

function slugify(text) {
  return text.toString().toLowerCase()
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

function makeAllergenBadge(code) {
  const img = document.createElement("img");
  const label = ALLERGEN_LABELS[code] || code;
  img.className = "al";
  img.src = `assets/images/allergens/${code}.png`;
  img.alt = label;
  img.title = label;
  img.loading = "lazy";
  return img;
}

function buildItem(item) {
  const wrapper = document.createElement("div");
  wrapper.className = "menu-item";

  if (item.foto) {
    const photo = document.createElement("img");
    photo.className = "item-photo";
    photo.src = `assets/images/${item.foto}`;
    photo.alt = item.nombre || "Plato";
    photo.loading = "lazy";
    photo.addEventListener("error", () => photo.remove());
    wrapper.appendChild(photo);
  }

  const main = document.createElement("div");
  main.className = "item-main";

  const row = document.createElement("div");
  row.className = "item-row";

  const name = document.createElement("span");
  name.className = "item-name";
  name.append(document.createTextNode(item.nombre || "Sin nombre"));

  if (item.alergenos) {
    item.alergenos.split(",").map(c => c.trim()).filter(Boolean).forEach(code => {
      if (ALLERGEN_LABELS[code]) name.appendChild(makeAllergenBadge(code));
    });
  }

  const price = document.createElement("span");
  price.className = "item-price";
  const mainPrice = formatPrice(item.precio);
  const secondary = item.precio2
    ? `${item.etiqueta2 ? item.etiqueta2 + " " : ""}${formatPrice(item.precio2)}`
    : "";
  price.textContent = secondary ? `${mainPrice} / ${secondary}` : mainPrice;

  row.append(name, price);
  main.appendChild(row);

  if (item.descripcion) {
    const desc = document.createElement("div");
    desc.className = "item-desc";
    desc.textContent = item.descripcion;
    main.appendChild(desc);
  }

  wrapper.appendChild(main);
  return wrapper;
}

function renderMenu(items) {
  const visible = items.filter(it =>
    (it.disponible || "SI").toString().trim().toUpperCase() !== "NO" &&
    (it.nombre || "").trim() !== ""
  );

  const categories = [];
  const byCategory = new Map();
  visible.forEach(it => {
    const cat = (it.categoria || "Otros").trim();
    if (!byCategory.has(cat)) { byCategory.set(cat, []); categories.push(cat); }
    byCategory.get(cat).push(it);
  });

  categories.forEach(cat => {
    byCategory.get(cat).sort((a, b) => {
      const oa = Number.parseFloat(a.orden);
      const ob = Number.parseFloat(b.orden);
      return (Number.isNaN(oa) ? 9999 : oa) - (Number.isNaN(ob) ? 9999 : ob);
    });
  });

  const nav = document.getElementById("nav-categories");
  const container = document.getElementById("menu-sections");
  nav.replaceChildren();
  container.replaceChildren();

  if (!categories.length) {
    showStatus("No hay platos disponibles en este momento.", "error");
    return;
  }

  categories.forEach(cat => {
    const id = slugify(cat) || `seccion-${categories.indexOf(cat) + 1}`;

    const chip = document.createElement("a");
    chip.href = `#${id}`;
    chip.className = "chip";
    chip.textContent = cat;
    nav.appendChild(chip);

    const section = document.createElement("section");
    section.id = id;
    section.className = "menu-section";

    const title = document.createElement("h2");
    title.textContent = cat;
    section.appendChild(title);

    const body = document.createElement("div");
    body.className = "section-body";
    byCategory.get(cat).forEach(item => body.appendChild(buildItem(item)));
    section.appendChild(body);

    container.appendChild(section);
  });
}

document.addEventListener("DOMContentLoaded", async () => {
  try {
    const { items } = await loadMenuData();
    renderMenu(items);
  } catch (err) {
    console.error(err);
    showStatus("No se ha podido cargar la carta. Por favor, consulta con el personal.", "error");
  }
});
