# Cervecería El Decano — Carta digital QR

Proyecto estático preparado para **GitHub Pages + Google Sheets**, sin servidor ni suscripciones.

## Qué hace

- La carta abre directamente en el navegador del móvil.
- Las categorías se crean automáticamente.
- Los productos se ordenan con la columna `orden`.
- Un producto con `disponible = NO` se oculta sin borrarlo.
- Los precios se muestran con formato español (`3,50 €`).
- José puede editar precios/platos desde Google Sheets.
- Si Google Sheets falla temporalmente, la web muestra una copia local de seguridad y avisa al cliente de que confirme precios/disponibilidad.

## 1. Subir a GitHub Pages

1. Crea una cuenta gratuita en GitHub si hace falta.
2. Crea un repositorio público, por ejemplo `carta-el-decano`.
3. Sube **el contenido de esta carpeta** al repositorio. `index.html` debe quedar en la raíz.
4. En GitHub entra en **Settings > Pages**.
5. En `Build and deployment`, usa la rama `main` y la carpeta `/ (root)`.
6. Guarda y espera a que GitHub muestre la URL, normalmente:

   `https://USUARIO.github.io/carta-el-decano/`

Esa URL será la que después se introduzca en el QR.

## 2. Crear Google Sheets sin copiar plato por plato

Dentro de `data/` tienes:

`PLANTILLA_GOOGLE_SHEETS.csv`

Ya contiene la carta actual.

1. Crea una hoja de Google Sheets.
2. Ve a **Archivo > Importar > Subir**.
3. Selecciona `data/PLANTILLA_GOOGLE_SHEETS.csv`.
4. Importa el archivo como una hoja nueva.
5. Comparte la hoja con José con permiso de **Editor**.

Así José solo necesita Google Sheets para el mantenimiento diario; no necesita tocar GitHub.

## 3. Columnas

| Columna | Uso |
|---|---|
| `categoria` | Sección de la carta |
| `nombre` | Nombre del producto |
| `descripcion` | Texto pequeño opcional |
| `precio` | Precio principal, ejemplo `4.00` |
| `precio2` | Segundo precio, si existe |
| `etiqueta2` | Texto del segundo precio, por ejemplo `Ración` o `Plato` |
| `disponible` | `SI` o `NO` |
| `orden` | Orden dentro de la categoría |
| `alergenos` | Códigos separados por comas |
| `foto` | Nombre del archivo dentro de `assets/images/` |

### Códigos de alérgenos

- `G` Gluten
- `C` Crustáceos
- `H` Huevo
- `P` Pescado
- `L` Lácteos
- `MO` Moluscos
- `SO` Sulfitos
- `M` Mostaza
- `FS` Frutos secos
- `S` Soja

## 4. Publicar Google Sheets como CSV

1. En la hoja: **Archivo > Compartir > Publicar en la web**.
2. Selecciona la pestaña de la carta.
3. Selecciona **Valores separados por comas (.csv)**.
4. Pulsa **Publicar**.
5. Copia la URL que proporciona Google.

La publicación es de solo lectura. Los clientes no obtienen permiso para editar la hoja.

> Nota: el contenido de la carta es público por definición, así que no metas en esa hoja información privada, contraseñas ni datos internos.

## 5. Conectar la hoja con la web

Abre `js/app.js` y localiza al principio:

```js
const GOOGLE_SHEET_URL = "";
```

Pega la URL CSV:

```js
const GOOGLE_SHEET_URL = "https://docs.google.com/spreadsheets/d/e/.../pub?output=csv";
```

Guarda el cambio en GitHub. A partir de ahí la web leerá Google Sheets.

## 6. Cambios diarios

### Cambiar un precio
Edita `precio` o `precio2` en Google Sheets.

### Ocultar temporalmente un producto
Pon `NO` en `disponible`.

### Volver a mostrarlo
Pon `SI`.

### Añadir un plato
Añade una fila y rellena al menos `categoria`, `nombre`, `precio`, `disponible` y `orden`.

### Añadir una categoría
Usa un nombre nuevo en la columna `categoria`. La web crea la sección y su botón automáticamente.

### Añadir una foto
1. Sube la imagen a `assets/images/` en GitHub.
2. Escribe en la columna `foto` el nombre exacto, por ejemplo `croquetas.jpg`.

## 7. QR

No uses un QR dinámico de pago. Cuando GitHub Pages esté publicado, genera un **QR estático** con la URL final.

Mientras no cambies esa URL de GitHub Pages, puedes modificar toda la carta y el QR impreso seguirá siendo válido.

## 8. Estructura

```text
index.html
css/
  styles.css
js/
  app.js
assets/
  images/
    ...
    allergens/
data/
  PLANTILLA_GOOGLE_SHEETS.csv
INSTRUCCIONES_RAPIDAS.txt
README.md
```

## 9. Fuente de la carta incluida

La copia local y la plantilla de Google Sheets se han preparado a partir de la versión **“Carta_El_Decano_para_Jose (1).pdf”**, porque coincide con el proyecto web recibido de Claude.

Hay una diferencia con `Carta_El_Decano_imprimir_sin_fotos.pdf`: entre otras, la versión para José incluye **Patatas alioli con langostino** y marca el **tercio a 2,10 €**, mientras que la versión de impresión no incluye ese plato y marca el tercio a **2,00 €**. Conviene confirmar cuál es el precio/plato definitivo antes de imprimir el QR como carta oficial.
