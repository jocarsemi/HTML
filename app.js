
/* ==========================================================
   AULA WEB INTERACTIVA
   HTML5 · CSS3 · JavaScript ES6+
   Nivel: 2.º Bachillerato
   JavaScript Vanilla
   ========================================================== */

"use strict";

/* ==========================================================
   1. CONFIGURACIÓN Y UTILIDADES
   ========================================================== */

const STORAGE_KEY = "aulaWebProgress_v1";

const $ = (selector, parent = document) =>
    parent.querySelector(selector);

const $$ = (selector, parent = document) =>
    [...parent.querySelectorAll(selector)];

function escapeHTML(value) {
    return String(value).replace(/[&<>"']/g, char => ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#039;"
    })[char]);
}

function loadProgress() {
    try {
        return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
    } catch {
        return {};
    }
}

let progress = {
    completedLessons: [],
    completedChallenges: [],
    quizAnswers: {},
    quizCompleted: false,
    quizScore: 0,
    ...loadProgress()
};

function saveProgress() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    updateDashboard();
}

function notify(message, type = "success") {
    let notification = $("#app-notification");

    if (!notification) {
        notification = document.createElement("div");
        notification.id = "app-notification";
        notification.className = "app-notification";
        document.body.appendChild(notification);
    }

    notification.textContent = message;
    notification.dataset.type = type;
    notification.classList.add("show");

    clearTimeout(notify.timeout);
    notify.timeout = setTimeout(() => {
        notification.classList.remove("show");
    }, 2600);
}

/* ==========================================================
   2. TEMARIO
   ========================================================== */

const modules = [
    {
        id: "html",
        number: 1,
        title: "HTML5: estructura web",
        description: "Construye la estructura y el contenido de una página web.",
        icon: "🌐",
        lessons: [
            {
                id: "html-intro",
                title: "1. Introducción a HTML5",
                duration: "15 min",
                content: `
                    <h2>Introducción a HTML5</h2>
                    <p>HTML (HyperText Markup Language) es el lenguaje de marcado utilizado para definir la estructura y el significado del contenido de una página web.</p>

                    <div class="concept-card">
                        <strong>Idea clave</strong>
                        <p>HTML no es un lenguaje de programación: es un lenguaje de marcado que utiliza etiquetas para organizar el contenido.</p>
                    </div>

                    <h3>¿Qué es HTML5?</h3>
                    <p>HTML5 es la evolución del estándar HTML. Incorpora elementos semánticos, soporte multimedia y nuevas posibilidades para desarrollar aplicaciones web.</p>

                    <h3>Estructura básica de un documento</h3>
                    <pre><code>&lt;!DOCTYPE html&gt;
&lt;html lang="es"&gt;
&lt;head&gt;
    &lt;meta charset="UTF-8"&gt;
    &lt;meta name="viewport"
          content="width=device-width, initial-scale=1.0"&gt;
    &lt;title&gt;Mi primera web&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;
    &lt;h1&gt;Hola, mundo&lt;/h1&gt;
    &lt;p&gt;Mi primera página web.&lt;/p&gt;
&lt;/body&gt;
&lt;/html&gt;</code></pre>

                    <h3>Partes fundamentales</h3>
                    <ul>
                        <li><code>&lt;!DOCTYPE html&gt;</code>: indica que utilizamos HTML5.</li>
                        <li><code>&lt;html&gt;</code>: elemento raíz del documento.</li>
                        <li><code>&lt;head&gt;</code>: contiene metadatos y configuración.</li>
                        <li><code>&lt;body&gt;</code>: contiene el contenido visible.</li>
                        <li><code>&lt;title&gt;</code>: establece el título de la pestaña.</li>
                    </ul>

                    <h3>Etiquetas y atributos</h3>
                    <p>Las etiquetas suelen tener una apertura y un cierre. Los atributos proporcionan información adicional.</p>
                    <pre><code>&lt;a href="https://developer.mozilla.org"&gt;
    Consultar documentación
&lt;/a&gt;</code></pre>
                    <p>En este ejemplo, <code>href</code> es un atributo de la etiqueta de enlace.</p>

                    <div class="tip-card">
                        <strong>Consejo</strong>
                        <p>Utiliza siempre una estructura HTML completa y declara el idioma del documento con <code>lang="es"</code>.</p>
                    </div>
                `
            },
            {
                id: "html-text",
                title: "2. Texto, enlaces e imágenes",
                duration: "20 min",
                content: `
                    <h2>Texto, enlaces e imágenes</h2>
                    <p>HTML proporciona etiquetas específicas para organizar textos y añadir recursos externos.</p>

                    <h3>Encabezados</h3>
                    <p>Los encabezados organizan jerárquicamente la información.</p>
                    <pre><code>&lt;h1&gt;Título principal&lt;/h1&gt;
&lt;h2&gt;Apartado&lt;/h2&gt;
&lt;h3&gt;Subapartado&lt;/h3&gt;</code></pre>
                    <p>Existen seis niveles, desde <code>h1</code> hasta <code>h6</code>. No deben elegirse por su tamaño visual, sino por su importancia estructural.</p>

                    <h3>Párrafos y formato</h3>
                    <pre><code>&lt;p&gt;Este es un párrafo.&lt;/p&gt;
&lt;strong&gt;Texto importante&lt;/strong&gt;
&lt;em&gt;Texto enfatizado&lt;/em&gt;
&lt;mark&gt;Texto destacado&lt;/mark&gt;
&lt;small&gt;Texto secundario&lt;/small&gt;
&lt;br&gt;Salto de línea
&lt;hr&gt;Separación temática</code></pre>

                    <h3>Listas</h3>
                    <p>Las listas pueden ser ordenadas o desordenadas.</p>
                    <pre><code>&lt;ul&gt;
    &lt;li&gt;HTML&lt;/li&gt;
    &lt;li&gt;CSS&lt;/li&gt;
&lt;/ul&gt;

&lt;ol&gt;
    &lt;li&gt;Diseñar&lt;/li&gt;
    &lt;li&gt;Programar&lt;/li&gt;
    &lt;li&gt;Publicar&lt;/li&gt;
&lt;/ol&gt;</code></pre>

                    <h3>Enlaces</h3>
                    <pre><code>&lt;a href="https://www.w3.org/"&gt;
    Web del W3C
&lt;/a&gt;</code></pre>
                    <p>Para abrir un enlace en otra pestaña:</p>
                    <pre><code>&lt;a href="https://example.com"
   target="_blank"
   rel="noopener noreferrer"&gt;
    Abrir página
&lt;/a&gt;</code></pre>

                    <h3>Imágenes</h3>
                    <pre><code>&lt;img src="imagen.jpg"
     alt="Descripción de la imagen"
     width="300"&gt;</code></pre>
                    <p>El atributo <code>alt</code> proporciona una descripción textual y es fundamental para la accesibilidad.</p>
                `
            },
            {
                id: "html-semantic",
                title: "3. HTML semántico",
                duration: "20 min",
                content: `
                    <h2>HTML semántico</h2>
                    <p>El HTML semántico utiliza etiquetas que describen el significado de cada parte de una página.</p>

                    <h3>Etiquetas principales</h3>
                    <ul>
                        <li><code>&lt;header&gt;</code>: cabecera de una página o sección.</li>
                        <li><code>&lt;nav&gt;</code>: bloque de navegación.</li>
                        <li><code>&lt;main&gt;</code>: contenido principal.</li>
                        <li><code>&lt;section&gt;</code>: sección temática.</li>
                        <li><code>&lt;article&gt;</code>: contenido independiente.</li>
                        <li><code>&lt;aside&gt;</code>: contenido complementario.</li>
                        <li><code>&lt;footer&gt;</code>: pie de página o sección.</li>
                    </ul>

                    <h3>Ejemplo de estructura semántica</h3>
                    <pre><code>&lt;body&gt;
    &lt;header&gt;
        &lt;h1&gt;Mi revista digital&lt;/h1&gt;
    &lt;/header&gt;

    &lt;nav&gt;
        &lt;a href="#noticias"&gt;Noticias&lt;/a&gt;
    &lt;/nav&gt;

    &lt;main&gt;
        &lt;section id="noticias"&gt;
            &lt;article&gt;
                &lt;h2&gt;Noticia principal&lt;/h2&gt;
                &lt;p&gt;Contenido de la noticia.&lt;/p&gt;
            &lt;/article&gt;
        &lt;/section&gt;

        &lt;aside&gt;
            Información complementaria
        &lt;/aside&gt;
    &lt;/main&gt;

    &lt;footer&gt;
        &amp;copy; 2026 Mi revista
    &lt;/footer&gt;
&lt;/body&gt;</code></pre>

                    <h3>Ventajas</h3>
                    <ul>
                        <li>Mejora la accesibilidad.</li>
                        <li>Facilita la comprensión del código.</li>
                        <li>Ayuda a los motores de búsqueda a interpretar el contenido.</li>
                        <li>Mejora el mantenimiento del proyecto.</li>
                    </ul>

                    <div class="warning-card">
                        <strong>Recuerda</strong>
                        <p>No utilices <code>&lt;div&gt;</code> para todo. Si existe una etiqueta semántica adecuada, es preferible utilizarla.</p>
                    </div>
                `
            },
            {
                id: "html-forms",
                title: "4. Formularios y tablas",
                duration: "25 min",
                content: `
                    <h2>Formularios y tablas</h2>

                    <h3>Formularios</h3>
                    <p>Los formularios permiten recoger información del usuario.</p>
                    <pre><code>&lt;form action="/registro" method="post"&gt;
    &lt;label for="nombre"&gt;Nombre:&lt;/label&gt;
    &lt;input type="text"
           id="nombre"
           name="nombre"
           required&gt;

    &lt;label for="email"&gt;Correo:&lt;/label&gt;
    &lt;input type="email"
           id="email"
           name="email"
           required&gt;

    &lt;button type="submit"&gt;
        Enviar
    &lt;/button&gt;
&lt;/form&gt;</code></pre>

                    <h3>Tipos de campos</h3>
                    <ul>
                        <li><code>text</code>: texto.</li>
                        <li><code>email</code>: correo electrónico.</li>
                        <li><code>password</code>: contraseña.</li>
                        <li><code>number</code>: número.</li>
                        <li><code>date</code>: fecha.</li>
                        <li><code>checkbox</code>: casilla de selección.</li>
                        <li><code>radio</code>: selección única.</li>
                        <li><code>submit</code>: envío del formulario.</li>
                    </ul>

                    <h3>Otros elementos</h3>
                    <pre><code>&lt;select name="curso"&gt;
    &lt;option value="1"&gt;Primero&lt;/option&gt;
    &lt;option value="2"&gt;Segundo&lt;/option&gt;
&lt;/select&gt;

&lt;textarea name="comentario"
          rows="4"&gt;&lt;/textarea&gt;</code></pre>

                    <h3>Tablas</h3>
                    <pre><code>&lt;table&gt;
    &lt;caption&gt;Calificaciones&lt;/caption&gt;
    &lt;thead&gt;
        &lt;tr&gt;
            &lt;th&gt;Alumno&lt;/th&gt;
            &lt;th&gt;Nota&lt;/th&gt;
        &lt;/tr&gt;
    &lt;/thead&gt;
    &lt;tbody&gt;
        &lt;tr&gt;
            &lt;td&gt;Ana&lt;/td&gt;
            &lt;td&gt;9&lt;/td&gt;
        &lt;/tr&gt;
    &lt;/tbody&gt;
&lt;/table&gt;</code></pre>

                    <p>Las tablas deben utilizarse para presentar datos tabulares, no para maquetar páginas.</p>
                `
            }
        ]
    },
    {
        id: "css",
        number: 2,
        title: "CSS3: diseño y estilos",
        description: "Transforma documentos HTML en páginas atractivas y adaptables.",
        icon: "🎨",
        lessons: [
            {
                id: "css-intro",
                title: "1. Introducción a CSS3",
                duration: "15 min",
                content: `
                    <h2>Introducción a CSS3</h2>
                    <p>CSS (Cascading Style Sheets) es el lenguaje que define la presentación visual de los documentos HTML.</p>

                    <h3>Separación de responsabilidades</h3>
                    <ul>
                        <li>HTML: estructura y contenido.</li>
                        <li>CSS: diseño y presentación.</li>
                        <li>JavaScript: comportamiento e interactividad.</li>
                    </ul>

                    <h3>Sintaxis</h3>
                    <pre><code>selector {
    propiedad: valor;
}</code></pre>

                    <p>Ejemplo:</p>
                    <pre><code>h1 {
    color: blue;
    font-size: 32px;
    text-align: center;
}</code></pre>

                    <h3>Formas de aplicar CSS</h3>
                    <p><strong>CSS externo:</strong></p>
                    <pre><code>&lt;link rel="stylesheet"
      href="styles.css"&gt;</code></pre>

                    <p><strong>CSS interno:</strong></p>
                    <pre><code>&lt;style&gt;
    p { color: red; }
&lt;/style&gt;</code></pre>

                    <p><strong>CSS en línea:</strong></p>
                    <pre><code>&lt;p style="color: red;"&gt;
    Texto
&lt;/p&gt;</code></pre>

                    <p>En proyectos reales, suele ser preferible utilizar hojas de estilo externas.</p>
                `
            },
            {
                id: "css-selectors",
                title: "2. Selectores y especificidad",
                duration: "20 min",
                content: `
                    <h2>Selectores y especificidad</h2>
                    <p>Los selectores indican qué elementos HTML recibirán determinadas reglas CSS.</p>

                    <h3>Selectores básicos</h3>
                    <pre><code>/* Selector de etiqueta */
p { color: gray; }

/* Selector de clase */
.destacado { color: red; }

/* Selector de identificador */
#principal { background: black; }

/* Selector universal */
* { box-sizing: border-box; }</code></pre>

                    <h3>Selectores combinados</h3>
                    <pre><code>article p {
    color: navy;
}

.menu > li {
    list-style: none;
}

h1, h2, h3 {
    font-family: Arial, sans-serif;
}</code></pre>

                    <h3>Pseudoclases</h3>
                    <pre><code>a:hover {
    color: red;
}

input:focus {
    outline: 2px solid blue;
}

li:first-child {
    font-weight: bold;
}</code></pre>

                    <h3>Especificidad</h3>
                    <p>Cuando varias reglas afectan al mismo elemento, el navegador calcula su especificidad.</p>
                    <ul>
                        <li>Estilos en línea: prioridad elevada.</li>
                        <li>Identificadores: mayor especificidad que clases.</li>
                        <li>Clases, atributos y pseudoclases.</li>
                        <li>Etiquetas y pseudoelementos.</li>
                    </ul>

                    <div class="concept-card">
                        <strong>Importante</strong>
                        <p>La cascada también tiene en cuenta el origen de la regla, la importancia y el orden de aparición. Evita abusar de <code>!important</code>.</p>
                    </div>
                `
            },
            {
                id: "css-box",
                title: "3. Modelo de caja y tipografía",
                duration: "20 min",
                content: `
                    <h2>Modelo de caja</h2>
                    <p>En CSS, cada elemento se representa como una caja rectangular.</p>

                    <AsyncImage query="CSS box model diagram content padding border margin educational diagram" aspectRatio="16:9" />

                    <h3>Partes del modelo</h3>
                    <ul>
                        <li><strong>Content:</strong> contenido.</li>
                        <li><strong>Padding:</strong> espacio interior.</li>
                        <li><strong>Border:</strong> borde.</li>
                        <li><strong>Margin:</strong> espacio exterior.</li>
                    </ul>

                    <pre><code>.caja {
    width: 300px;
    padding: 20px;
    border: 5px solid black;
    margin: 15px;
}</code></pre>

                    <h3>box-sizing</h3>
                    <pre><code>* {
    box-sizing: border-box;
}</code></pre>
                    <p>Con <code>border-box</code>, el ancho declarado incluye el contenido, el padding y el borde.</p>

                    <h3>Tipografía</h3>
                    <pre><code>body {
    font-family: Arial, sans-serif;
    font-size: 16px;
    line-height: 1.6;
    color: #222;
}

h1 {
    font-size: 2rem;
    font-weight: 700;
}</code></pre>

                    <h3>Colores y unidades</h3>
                    <ul>
                        <li>Colores: nombres, hexadecimal, RGB, HSL.</li>
                        <li><code>px</code>: unidad absoluta CSS de referencia.</li>
                        <li><code>rem</code>: relativa al tamaño de fuente raíz.</li>
                        <li><code>em</code>: relativa al tamaño de fuente del elemento.</li>
                        <li><code>%</code>: valor relativo al contexto correspondiente.</li>
                        <li><code>vw</code> y <code>vh</code>: unidades relativas al viewport.</li>
                    </ul>
                `
            },
            {
                id: "css-layout",
                title: "4. Flexbox, Grid y responsive",
                duration: "30 min",
                content: `
                    <h2>Diseño moderno con CSS</h2>

                    <h3>Flexbox</h3>
                    <p>Flexbox facilita la distribución de elementos en una dimensión: fila o columna.</p>
                    <pre><code>.contenedor {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 20px;
    flex-wrap: wrap;
}</code></pre>

                    <p>Propiedades importantes:</p>
                    <ul>
                        <li><code>justify-content</code>: distribución en el eje principal.</li>
                        <li><code>align-items</code>: alineación en el eje transversal.</li>
                        <li><code>flex-direction</code>: dirección del eje principal.</li>
                        <li><code>flex-wrap</code>: permite saltar de línea.</li>
                        <li><code>gap</code>: separación entre elementos.</li>
                    </ul>

                    <h3>CSS Grid</h3>
                    <p>Grid permite crear diseños bidimensionales mediante filas y columnas.</p>
                    <pre><code>.galeria {
    display: grid;
    grid-template-columns:
        repeat(3, 1fr);
    gap: 16px;
}</code></pre>

                    <h3>Diseño responsive</h3>
                    <p>Una página responsive adapta su distribución a diferentes tamaños de pantalla.</p>
                    <pre><code>.contenedor {
    width: min(100% - 32px, 1100px);
    margin-inline: auto;
}

@media (max-width: 700px) {
    .galeria {
        grid-template-columns: 1fr;
    }
}</code></pre>

                    <h3>Variables CSS</h3>
                    <pre><code>:root {
    --color-principal: #2563eb;
    --espaciado: 1rem;
}

.boton {
    background: var(--color-principal);
    padding: var(--espaciado);
}</code></pre>

                    <h3>Transiciones</h3>
                    <pre><code>.boton {
    transition: transform .2s ease,
                background .2s ease;
}

.boton:hover {
    transform: translateY(-3px);
}</code></pre>
                `
            }
        ]
    },
    {
        id: "javascript",
        number: 3,
        title: "JavaScript: programación web",
        description: "Añade lógica, interacción y dinamismo a tus páginas.",
        icon: "⚡",
        lessons: [
            {
                id: "js-intro",
                title: "1. Introducción a JavaScript",
                duration: "20 min",
                content: `
                    <h2>Introducción a JavaScript</h2>
                    <p>JavaScript es un lenguaje de programación que permite añadir comportamiento dinámico a las páginas web.</p>

                    <h3>Incluir JavaScript</h3>
                    <pre><code>&lt;script src="app.js" defer&gt;&lt;/script&gt;</code></pre>
                    <p>El atributo <code>defer</code> permite ejecutar el script después de analizar el documento HTML.</p>

                    <h3>Mostrar información</h3>
                    <pre><code>console.log("Hola, mundo");
alert("Bienvenido");
document.title = "Mi web";</code></pre>

                    <h3>Variables</h3>
                    <pre><code>const nombre = "Ana";
let edad = 17;

edad = 18;</code></pre>
                    <ul>
                        <li><code>const</code>: no permite reasignar la variable.</li>
                        <li><code>let</code>: permite reasignar la variable.</li>
                        <li><code>var</code>: declaración antigua, con ámbito de función.</li>
                    </ul>

                    <h3>Tipos de datos</h3>
                    <pre><code>const texto = "Hola";
const numero = 25;
const decimal = 3.14;
const activo = true;
const indefinido = undefined;
const vacio = null;</code></pre>

                    <h3>Operadores</h3>
                    <pre><code>let suma = 5 + 3;
let resta = 5 - 3;
let producto = 5 * 3;
let division = 6 / 2;
let resto = 7 % 2;

let igual = 5 === 5;
let mayor = 8 > 3;</code></pre>
                    <p>Se recomienda utilizar igualdad estricta (<code>===</code>) para evitar conversiones implícitas inesperadas.</p>
                `
            },
            {
                id: "js-control",
                title: "2. Condicionales y bucles",
                duration: "20 min",
                content: `
                    <h2>Condicionales y bucles</h2>

                    <h3>Condicional if / else</h3>
                    <pre><code>const nota = 7;

if (nota >= 5) {
    console.log("Aprobado");
} else {
    console.log("Suspenso");
}</code></pre>

                    <h3>Operadores lógicos</h3>
                    <ul>
                        <li><code>&&</code>: AND, ambas condiciones deben cumplirse.</li>
                        <li><code>||</code>: OR, basta con que se cumpla una.</li>
                        <li><code>!</code>: NOT, invierte el valor lógico.</li>
                    </ul>

                    <pre><code>const edad = 18;
const tienePermiso = true;

if (edad >= 18 && tienePermiso) {
    console.log("Acceso permitido");
}</code></pre>

                    <h3>Switch</h3>
                    <pre><code>const dia = 2;

switch (dia) {
    case 1:
        console.log("Lunes");
        break;
    case 2:
        console.log("Martes");
        break;
    default:
        console.log("Otro día");
}</code></pre>

                    <h3>Bucle for</h3>
                    <pre><code>for (let i = 1; i <= 5; i++) {
    console.log(i);
}</code></pre>

                    <h3>Bucle while</h3>
                    <pre><code>let contador = 1;

while (contador <= 5) {
    console.log(contador);
    contador++;
}</code></pre>

                    <h3>for...of</h3>
                    <pre><code>const lenguajes = ["HTML", "CSS", "JS"];

for (const lenguaje of lenguajes) {
    console.log(lenguaje);
}</code></pre>
                `
            },
            {
                id: "js-functions",
                title: "3. Funciones y arrays",
                duration: "25 min",
                content: `
                    <h2>Funciones y arrays</h2>

                    <h3>Funciones tradicionales</h3>
                    <pre><code>function saludar(nombre) {
    return "Hola " + nombre;
}

const mensaje = saludar("Ana");
console.log(mensaje);</code></pre>

                    <h3>Funciones flecha</h3>
                    <pre><code>const sumar = (a, b) => a + b;

console.log(sumar(4, 5));</code></pre>

                    <h3>Parámetros y retorno</h3>
                    <p>Los parámetros reciben datos y <code>return</code> devuelve el resultado de una función.</p>

                    <h3>Arrays</h3>
                    <pre><code>const frutas = ["manzana", "pera", "kiwi"];

console.log(frutas[0]);

frutas.push("naranja");
frutas.pop();

console.log(frutas.length);</code></pre>

                    <h3>Métodos de arrays</h3>
                    <pre><code>const numeros = [1, 2, 3, 4, 5];

const dobles = numeros.map(n => n * 2);

const pares = numeros.filter(n => n % 2 === 0);

const suma = numeros.reduce(
    (total, n) => total + n, 0
);

console.log(dobles);
console.log(pares);
console.log(suma);</code></pre>

                    <h3>Objetos</h3>
                    <pre><code>const alumno = {
    nombre: "Lucía",
    edad: 17,
    curso: "2º Bachillerato"
};

console.log(alumno.nombre);
alumno.edad = 18;</code></pre>
                `
            },
            {
                id: "js-dom",
                title: "4. DOM y eventos",
                duration: "30 min",
                content: `
                    <h2>DOM y eventos</h2>
                    <p>El DOM (Document Object Model) representa el documento HTML como una estructura de objetos que JavaScript puede consultar y modificar.</p>

                    <h3>Seleccionar elementos</h3>
                    <pre><code>const titulo = document.querySelector("h1");
const botones = document.querySelectorAll("button");
const caja = document.getElementById("caja");</code></pre>

                    <h3>Modificar contenido</h3>
                    <pre><code>titulo.textContent = "Nuevo título";
caja.innerHTML = "&lt;p&gt;Nuevo contenido&lt;/p&gt;";</code></pre>
                    <p>Utiliza <code>textContent</code> para insertar texto sin interpretarlo como HTML. Evita introducir contenido no confiable con <code>innerHTML</code>.</p>

                    <h3>Modificar estilos y clases</h3>
                    <pre><code>caja.style.backgroundColor = "lightblue";

caja.classList.add("activo");
caja.classList.remove("oculto");
caja.classList.toggle("destacado");</code></pre>

                    <h3>Eventos</h3>
                    <pre><code>const boton = document.querySelector("#boton");

boton.addEventListener("click", () => {
    alert("Has pulsado el botón");
});</code></pre>

                    <h3>Leer datos de un formulario</h3>
                    <pre><code>const formulario = document.querySelector("form");

formulario.addEventListener("submit", event => {
    event.preventDefault();

    const nombre = document.querySelector("#nombre").value;

    console.log("Hola " + nombre);
});</code></pre>

                    <h3>Almacenamiento local</h3>
                    <pre><code>localStorage.setItem("usuario", "Ana");

const usuario = localStorage.getItem("usuario");

localStorage.removeItem("usuario");</code></pre>
                    <p>Los datos de <code>localStorage</code> permanecen en el navegador hasta que se eliminan. Solo almacena cadenas de texto; para objetos se utiliza <code>JSON.stringify()</code> y <code>JSON.parse()</code>.</p>
                `
            }
        ]
    },
    {
        id: "project",
        number: 4,
        title: "Proyecto web: integración",
        description: "Aplica los tres lenguajes en un proyecto completo.",
        icon: "🚀",
        lessons: [
            {
                id: "project-structure",
                title: "1. Organización del proyecto",
                duration: "15 min",
                content: `
                    <h2>Organización de un proyecto web</h2>
                    <p>Un proyecto web debe estar organizado para facilitar su mantenimiento y evolución.</p>

                    <h3>Estructura recomendada</h3>
                    <pre><code>mi-proyecto/
│
├── index.html
├── css/
│   └── styles.css
├── js/
│   └── app.js
└── img/
    ├── logo.png
    └── portada.jpg</code></pre>

                    <h3>Separación de archivos</h3>
                    <p>El HTML contiene la estructura, CSS los estilos y JavaScript la lógica.</p>
                    <pre><code>&lt;link rel="stylesheet" href="css/styles.css"&gt;
&lt;script src="js/app.js" defer&gt;&lt;/script&gt;</code></pre>

                    <h3>Buenas prácticas</h3>
                    <ul>
                        <li>Utilizar nombres claros y coherentes.</li>
                        <li>Evitar repetir código.</li>
                        <li>Separar responsabilidades.</li>
                        <li>Comentar las partes complejas.</li>
                        <li>Organizar los recursos en carpetas.</li>
                    </ul>
                `
            },
            {
                id: "project-responsive",
                title: "2. Accesibilidad y responsive",
                duration: "20 min",
                content: `
                    <h2>Accesibilidad y diseño responsive</h2>
                    <p>Una web de calidad debe poder utilizarse desde diferentes dispositivos y por personas con distintas capacidades.</p>

                    <h3>Accesibilidad</h3>
                    <ul>
                        <li>Utilizar HTML semántico.</li>
                        <li>Incluir textos alternativos en imágenes informativas.</li>
                        <li>Asociar etiquetas a los campos de formulario.</li>
                        <li>Mantener un contraste suficiente.</li>
                        <li>Permitir la navegación mediante teclado.</li>
                        <li>No transmitir información únicamente mediante colores.</li>
                    </ul>

                    <h3>Diseño responsive</h3>
                    <pre><code>&lt;meta name="viewport"
      content="width=device-width, initial-scale=1.0"&gt;</code></pre>

                    <p>Ejemplo de adaptación mediante media queries:</p>
                    <pre><code>.tarjetas {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1rem;
}

@media (max-width: 768px) {
    .tarjetas {
        grid-template-columns: 1fr;
    }
}</code></pre>

                    <h3>Pruebas</h3>
                    <p>Comprueba tu web en diferentes resoluciones, utiliza la navegación por teclado y revisa los errores de la consola del navegador.</p>
                `
            },
            {
                id: "project-security",
                title: "3. Seguridad y buenas prácticas",
                duration: "20 min",
                content: `
                    <h2>Seguridad y buenas prácticas</h2>
                    <p>Una aplicación web debe proteger los datos y evitar comportamientos inesperados.</p>

                    <h3>Principios básicos</h3>
                    <ul>
                        <li>No confiar en los datos introducidos por el usuario.</li>
                        <li>Validar la información en el servidor.</li>
                        <li>Evitar insertar contenido no confiable mediante <code>innerHTML</code>.</li>
                        <li>Utilizar HTTPS en sitios publicados.</li>
                        <li>No almacenar contraseñas en texto plano.</li>
                        <li>No incluir claves secretas en JavaScript del navegador.</li>
                    </ul>

                    <h3>Validación de formularios</h3>
                    <pre><code>const email = document.querySelector("#email");

if (!email.checkValidity()) {
    console.log("Correo no válido");
}</code></pre>

                    <p>La validación del navegador mejora la experiencia, pero no sustituye a la validación del servidor.</p>

                    <h3>Consola de desarrollo</h3>
                    <p>Las herramientas de desarrollo permiten inspeccionar elementos, comprobar estilos, revisar errores y depurar JavaScript.</p>

                    <h3>Optimización</h3>
                    <ul>
                        <li>Optimizar el tamaño de las imágenes.</li>
                        <li>Evitar código innecesario.</li>
                        <li>Reutilizar estilos.</li>
                        <li>Minimizar peticiones cuando proceda.</li>
                        <li>Probar el rendimiento en diferentes dispositivos.</li>
                    </ul>
                `
            },
            {
                id: "project-final",
                title: "4. Publicación y proyecto final",
                duration: "30 min",
                content: `
                    <h2>Publicación y proyecto final</h2>
                    <p>Una vez desarrollada y probada una web, podemos publicarla para que otras personas puedan acceder a ella.</p>

                    <h3>Proceso de desarrollo</h3>
                    <ol>
                        <li>Definir el objetivo y el público.</li>
                        <li>Diseñar la estructura de contenidos.</li>
                        <li>Crear el HTML.</li>
                        <li>Aplicar estilos con CSS.</li>
                        <li>Añadir interactividad con JavaScript.</li>
                        <li>Comprobar accesibilidad y adaptación.</li>
                        <li>Probar y corregir errores.</li>
                        <li>Publicar el proyecto.</li>
                    </ol>

                    <h3>Proyecto propuesto: portal de aula</h3>
                    <p>Desarrolla una web que permita presentar información de una asignatura o de un proyecto de clase.</p>

                    <h4>Requisitos mínimos</h4>
                    <ul>
                        <li>Una cabecera con título y navegación.</li>
                        <li>Al menos tres secciones semánticas.</li>
                        <li>Una galería de imágenes.</li>
                        <li>Una hoja CSS externa.</li>
                        <li>Diseño responsive.</li>
                        <li>Un formulario validado.</li>
                        <li>Una función JavaScript interactiva.</li>
                    </ul>

                    <div class="challenge-card">
                        <strong>Reto final</strong>
                        <p>Consigue que tu proyecto sea accesible, funcional y visualmente atractivo tanto en ordenador como en móvil.</p>
                    </div>
                `
            }
        ]
    }
];

/* ==========================================================
   3. NAVEGACIÓN Y TEMARIO
   ========================================================== */

let currentModule = 0;
let currentLesson = 0;

function renderModuleMenu() {
    const container = $("#module-list");
    if (!container) return;

    container.innerHTML = modules.map((module, index) => `
        <button class="module-button ${index === currentModule ? "active" : ""}"
                data-module="${index}">
            <span>${module.icon}</span>
            <span>${module.title}</span>
            <small>${module.lessons.length} lecciones</small>
        </button>
    `).join("");

    $$("[data-module]", container).forEach(button => {
        button.addEventListener("click", () => {
            currentModule = Number(button.dataset.module);
            currentLesson = 0;
            renderModuleMenu();
            renderLesson();
        });
    });
}

function renderLesson() {
    const module = modules[currentModule];
    const lesson = module.lessons[currentLesson];

    const lessonMenu = $("#lesson-list");
    const content = $("#lesson-content");

    if (lessonMenu) {
        lessonMenu.innerHTML = module.lessons.map((item, index) => `
            <button class="lesson-button ${
                index === currentLesson ? "active" : ""
            } ${progress.completedLessons.includes(item.id) ? "completed" : ""}"
                    data-lesson="${index}">
                <span>${progress.completedLessons.includes(item.id) ? "✓" : "○"}</span>
                ${item.title}
            </button>
        `).join("");

        $$("[data-lesson]", lessonMenu).forEach(button => {
            button.addEventListener("click", () => {
                currentLesson = Number(button.dataset.lesson);
                renderLesson();
            });
        });
    }

    if (!content) return;

    const isCompleted = progress.completedLessons.includes(lesson.id);

    content.innerHTML = `
        <div class="lesson-header">
            <div>
                <span class="eyebrow">MÓDULO ${module.number}</span>
                <h1>${lesson.title}</h1>
                <p>${module.description}</p>
            </div>
            <span class="lesson-duration">⏱ ${lesson.duration}</span>
        </div>

        <div class="lesson-body">
            ${lesson.content}
        </div>

        <div class="lesson-navigation">
            <button class="btn btn-secondary" id="previous-lesson"
                ${currentLesson === 0 ? "disabled" : ""}>
                ← Anterior
            </button>

            <button class="btn btn-primary" id="complete-lesson">
                ${isCompleted ? "✓ Lección completada" : "Marcar como completada"}
            </button>

            <button class="btn btn-secondary" id="next-lesson"
                ${currentLesson === module.lessons.length - 1 ? "disabled" : ""}>
                Siguiente →
            </button>
        </div>
    `;

    $("#previous-lesson")?.addEventListener("click", () => {
        if (currentLesson > 0) {
            currentLesson--;
            renderLesson();
        }
    });

    $("#next-lesson")?.addEventListener("click", () => {
        if (currentLesson < module.lessons.length - 1) {
            currentLesson++;
            renderLesson();
        }
    });

    $("#complete-lesson")?.addEventListener("click", () => {
        if (!progress.completedLessons.includes(lesson.id)) {
            progress.completedLessons.push(lesson.id);
            saveProgress();
            notify("¡Lección completada! +10 XP");
        } else {
            notify("Esta lección ya estaba completada.");
        }
        renderLesson();
    });
}

/* ==========================================================
   4. NAVEGACIÓN ENTRE VISTAS
   ========================================================== */

function showView(viewName) {
    const views = $$(".view, [data-view-panel]");

    views.forEach(view => {
        const viewId = view.dataset.viewPanel || view.id;
        const active = viewId === viewName ||
            viewId === `view-${viewName}`;

        view.classList.toggle("active", active);
        view.hidden = !active;
    });

    $$("[data-view]").forEach(button => {
        const active = button.dataset.view === viewName;
        button.classList.toggle("active", active);
        button.setAttribute("aria-current", active ? "page" : "false");
    });

    if (viewName === "temario") {
        renderModuleMenu();
        renderLesson();
    }

    if (viewName === "sandbox") {
        updatePreview();
    }

    if (viewName === "retos") {
        renderChallenges();
    }

    if (viewName === "quiz") {
        renderQuiz();
    }

    const sidebar = $("#sidebar");
    sidebar?.classList.remove("open");

    window.scrollTo({ top: 0, behavior: "smooth" });
}

function setupNavigation() {
    $$("[data-view]").forEach(button => {
        button.addEventListener("click", () => {
            showView(button.dataset.view);
        });
    });

    $("#menu-toggle")?.addEventListener("click", () => {
        $("#sidebar")?.classList.toggle("open");
    });
}

/* ==========================================================
   5. SANDBOX HTML, CSS Y JAVASCRIPT
   ========================================================== */

const templates = {
    blank: {
        html: `<h1>Mi primera web</h1>
<p>¡Estoy aprendiendo HTML, CSS y JavaScript!</p>
<button id="saludar">Saludar</button>
<p id="mensaje"></p>`,
        css: `body {
    font-family: Arial, sans-serif;
    padding: 30px;
    color: #222;
}

h1 {
    color: #2563eb;
}

button {
    padding: 10px 16px;
    border: none;
    border-radius: 8px;
    background: #2563eb;
    color: white;
    cursor: pointer;
}`,
        js: `document.querySelector("#saludar")
    .addEventListener("click", () => {
        document.querySelector("#mensaje").textContent =
            "¡Hola, desarrollador web!";
    });`
    },

    card: {
        html: `<main class="tarjeta">
    <span class="etiqueta">PROYECTO WEB</span>
    <h1>Mi tarjeta digital</h1>
    <p>Estoy aprendiendo a crear páginas web con HTML, CSS y JavaScript.</p>
    <button id="accion">Descubrir</button>
    <p id="resultado"></p>
</main>`,
        css: `* {
    box-sizing: border-box;
}

body {
    min-height: 100vh;
    margin: 0;
    display: grid;
    place-items: center;
    background: #eef2ff;
    font-family: Arial, sans-serif;
}

.tarjeta {
    width: min(90%, 400px);
    padding: 30px;
    background: white;
    border-radius: 18px;
    box-shadow: 0 10px 30px #0002;
}

.etiqueta {
    color: #2563eb;
    font-weight: bold;
    font-size: 12px;
}

button {
    background: #2563eb;
    color: white;
    border: 0;
    border-radius: 8px;
    padding: 12px 18px;
    cursor: pointer;
}`,
        js: `document.querySelector("#accion")
    .addEventListener("click", () => {
        document.querySelector("#resultado").textContent =
            "¡Has descubierto el poder de JavaScript!";
    });`
    },

    counter: {
        html: `<main class="contador">
    <h1>Contador interactivo</h1>
    <p id="numero">0</p>
    <div class="acciones">
        <button id="restar">−</button>
        <button id="sumar">+</button>
        <button id="reiniciar">Reiniciar</button>
    </div>
</main>`,
        css: `body {
    font-family: Arial, sans-serif;
    text-align: center;
    padding: 40px 15px;
    background: #f8fafc;
}

.contador {
    max-width: 400px;
    margin: auto;
    padding: 30px;
    background: white;
    border-radius: 18px;
    box-shadow: 0 8px 24px #0001;
}

#numero {
    font-size: 60px;
    font-weight: bold;
    color: #2563eb;
}

button {
    padding: 12px 18px;
    margin: 5px;
    border: 0;
    border-radius: 8px;
    background: #2563eb;
    color: white;
    cursor: pointer;
}`,
        js: `let contador = 0;

const numero = document.querySelector("#numero");

document.querySelector("#sumar").addEventListener("click", () => {
    contador++;
    numero.textContent = contador;
});

document.querySelector("#restar").addEventListener("click", () => {
    contador--;
    numero.textContent = contador;
});

document.querySelector("#reiniciar").addEventListener("click", () => {
    contador = 0;
    numero.textContent = contador;
});`
    },

    form: {
        html: `<main class="formulario">
    <h1>Formulario de contacto</h1>
    <form id="contacto">
        <label for="nombre">Nombre</label>
        <input id="nombre" required placeholder="Tu nombre">

        <label for="email">Correo electrónico</label>
        <input id="email" type="email" required placeholder="tu@email.com">

        <button type="submit">Enviar</button>
    </form>
    <p id="respuesta" aria-live="polite"></p>
</main>`,
        css: `body {
    font-family: Arial, sans-serif;
    background: #f1f5f9;
    padding: 25px;
}

.formulario {
    max-width: 450px;
    margin: 30px auto;
    padding: 28px;
    background: white;
    border-radius: 14px;
}

label {
    display: block;
    margin-top: 16px;
}

input {
    width: 100%;
    padding: 12px;
    margin-top: 6px;
    border: 1px solid #cbd5e1;
    border-radius: 8px;
}

button {
    margin-top: 20px;
    padding: 12px 20px;
    background: #2563eb;
    color: white;
    border: 0;
    border-radius: 8px;
    cursor: pointer;
}`,
        js: `document.querySelector("#contacto")
    .addEventListener("submit", event => {
        event.preventDefault();

        const nombre = document.querySelector("#nombre").value;

        document.querySelector("#respuesta").textContent =
            "¡Gracias por contactar, " + nombre + "!";
    });`
    }
};

function getEditorValues() {
    return {
        html: $("#editor-html")?.value ?? "",
        css: $("#editor-css")?.value ?? "",
        js: $("#editor-js")?.value ?? ""
    };
}

function updatePreview() {
    const preview = $("#preview-frame");
    if (!preview) return;

    const { html, css, js } = getEditorValues();

    const safeJS = js.replace(/<\/script/gi, "<\\/script");

    const documentContent = `<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<style>${css.replace(/<\/style/gi, "<\\/style")}</style>
</head>
<body>
${html}
<script>
try {
${safeJS}
} catch (error) {
    console.error(error);
}
<\/script>
</body>
</html>`;

    preview.srcdoc = documentContent;
}

function loadTemplate(templateName) {
    const template = templates[templateName];
    if (!template) return;

    const htmlEditor = $("#editor-html");
    const cssEditor = $("#editor-css");
    const jsEditor = $("#editor-js");

    if (htmlEditor) htmlEditor.value = template.html;
    if (cssEditor) cssEditor.value = template.css;
    if (jsEditor) jsEditor.value = template.js;

    updatePreview();
    notify("Plantilla cargada correctamente.");
}

function setupSandbox() {
    const htmlEditor = $("#editor-html");
    const cssEditor = $("#editor-css");
    const jsEditor = $("#editor-js");

    [htmlEditor, cssEditor, jsEditor].forEach(editor => {
        editor?.addEventListener("input", updatePreview);
    });

    $("#run-code")?.addEventListener("click", updatePreview);

    $("#reset-code")?.addEventListener("click", () => {
        loadTemplate("blank");
    });

    $$("[data-template]").forEach(button => {
        button.addEventListener("click", () => {
            loadTemplate(button.dataset.template);
        });
    });

    const templateSelect = $("#template-select");
    templateSelect?.addEventListener("change", () => {
        loadTemplate(templateSelect.value);
    });

    if (htmlEditor && cssEditor && jsEditor) {
        loadTemplate("blank");
    }
}

/* ==========================================================
   6. RETOS AUTOEVALUABLES
   ========================================================== */

const challenges = [
    {
        id: "challenge-html-1",
        category: "HTML",
        title: "La estructura perdida",
        difficulty: "Fácil",
        xp: 20,
        description: `
            Crea la estructura básica de una página HTML5.
            Debe contener un encabezado principal con el texto
            <strong>Mi primera página</strong> y un párrafo con
            el texto <strong>Estoy aprendiendo HTML</strong>.
        `,
        starter: `<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Mi página</title>
</head>
<body>

</body>
</html>`,
        placeholder: "Escribe aquí tu código HTML...",
        validate: code => {
            const text = code.toLowerCase();
            return {
                checks: [
                    ["Incluye DOCTYPE HTML", /<!doctype\s+html/.test(text)],
                    ["Incluye la etiqueta html", /<html\b/.test(text)],
                    ["Incluye head y body", /<head\b/.test(text) && /<body\b/.test(text)],
                    ["Incluye un h1", /<h1\b/.test(text)],
                    ["Incluye el título solicitado", /mi primera página|mi primera pagina/.test(text)],
                    ["Incluye el párrafo solicitado", /estoy aprendiendo html/.test(text)]
                ]
            };
        }
    },
    {
        id: "challenge-html-2",
        category: "HTML",
        title: "Formulario de acceso",
        difficulty: "Medio",
        xp: 30,
        description: `
            Construye un formulario de acceso con un campo para
            el usuario, otro para la contraseña y un botón de envío.
            Utiliza etiquetas <code>label</code>, <code>input</code>
            y <code>button</code>. La contraseña debe usar
            <code>type="password"</code>.
        `,
        starter: `<form>
    <!-- Escribe aquí tu formulario -->
</form>`,
        placeholder: "Construye tu formulario...",
        validate: code => {
            const text = code.toLowerCase();
            return {
                checks: [
                    ["Existe un formulario", /<form\b/.test(text)],
                    ["Incluye una etiqueta label", /<label\b/.test(text)],
                    ["Incluye un campo de texto", /<input[^>]*type\s*=\s*["']?text/.test(text)],
                    ["Incluye un campo password", /<input[^>]*type\s*=\s*["']?password/.test(text)],
                    ["Incluye un botón de envío", /<button\b/.test(text) || /<input[^>]*type\s*=\s*["']?submit/.test(text)]
                ]
            };
        }
    },
    {
        id: "challenge-css-1",
        category: "CSS",
        title: "Dale vida a una tarjeta",
        difficulty: "Fácil",
        xp: 20,
        description: `
            Escribe CSS para una clase <code>.tarjeta</code>.
            Debe tener fondo blanco, esquinas redondeadas,
            espacio interior de al menos 20px y una sombra.
        `,
        starter: `.tarjeta {
    /* Escribe tus estilos */
}`,
        placeholder: "Escribe aquí tus reglas CSS...",
        validate: code => {
            const text = code.toLowerCase();
            return {
                checks: [
                    ["Selecciona .tarjeta", /\.tarjeta\s*\{/.test(text)],
                    ["Establece un fondo blanco", /background(?:-color)?\s*:\s*(white|#fff(?:fff)?|rgb\(\s*255\s*,\s*255\s*,\s*255\s*\))/.test(text)],
                    ["Redondea las esquinas", /border-radius\s*:\s*(?!0(?:px)?\s*;)[^;]+/.test(text)],
                    ["Añade espacio interior", /padding\s*:\s*(?:2\d|[3-9]\d|\d{3,})(?:px|rem|em)/.test(text) || /padding\s*:\s*(?:[2-9]\d|\d{3,})px/.test(text)],
                    ["Incluye una sombra", /box-shadow\s*:/.test(text)]
                ]
            };
        }
    },
    {
        id: "challenge-css-2",
        category: "CSS",
        title: "Diseño adaptable",
        difficulty: "Medio",
        xp: 30,
        description: `
            Crea un contenedor con diseño Flexbox, separación
            de 15px entre elementos y una media query para
            pantallas de hasta 600px.
        `,
        starter: `.contenedor {
    /* Tu código */
}

/* Añade aquí la media query */`,
        placeholder: "Escribe CSS responsive...",
        validate: code => {
            const text = code.toLowerCase();
            return {
                checks: [
                    ["Selecciona .contenedor", /\.contenedor\s*\{/.test(text)],
                    ["Utiliza display: flex", /display\s*:\s*flex/.test(text)],
                    ["Define una separación", /gap\s*:\s*[^;]+/.test(text)],
                    ["Incluye una media query", /@media/.test(text)],
                    ["Adapta pantallas de 600px o menos", /max-width\s*:\s*600px/.test(text)]
                ]
            };
        }
    },
    {
        id: "challenge-js-1",
        category: "JavaScript",
        title: "Calculadora de suma",
        difficulty: "Fácil",
        xp: 25,
        description: `
            Crea una función llamada <code>sumar</code> que reciba
            dos parámetros y devuelva su suma utilizando
            <code>return</code>.
        `,
        starter: `// Crea aquí tu función sumar

// Ejemplo esperado:
// sumar(4, 5) devuelve 9`,
        placeholder: "Escribe tu función JavaScript...",
        validate: code => {
            const text = code.toLowerCase();
            return {
                checks: [
                    ["Declara una función sumar", /function\s+sumar\s*\(/.test(text) || /(?:const|let|var)\s+sumar\s*=\s*(?:function|\([^)]*\)\s*=>|[a-z_$][\w$]*\s*=>)/.test(text)],
                    ["Recibe dos parámetros", /sumar\s*\(\s*[\w$]+\s*,\s*[\w$]+\s*\)/.test(text)],
                    ["Utiliza return", /\breturn\b/.test(text)],
                    ["Realiza una suma", /[\w$]+\s*\+\s*[\w$]+/.test(text)]
                ]
            };
        }
    },
    {
        id: "challenge-js-2",
        category: "JavaScript",
        title: "El contador inteligente",
        difficulty: "Medio",
        xp: 35,
        description: `
            Declara una variable <code>contador</code> con valor 0.
            Crea una función <code>incrementar</code> que aumente
            su valor en 1 y utiliza <code>console.log</code> para
            mostrar el resultado.
        `,
        starter: `// Declara contador

// Crea la función incrementar

// Muestra el resultado`,
        placeholder: "Programa tu contador...",
        validate: code => {
            const text = code.toLowerCase();
            return {
                checks: [
                    ["Declara contador", /\b(let|var|const)\s+contador\b/.test(text)],
                    ["Inicializa contador a cero", /\bcontador\s*=\s*0\b/.test(text)],
                    ["Declara incrementar", /function\s+incrementar\s*\(/.test(text) || /(?:const|let|var)\s+incrementar\s*=/.test(text)],
                    ["Incrementa el contador", /contador\s*(?:\+\+|\+=\s*1|=\s*contador\s*\+\s*1)/.test(text)],
                    ["Muestra el resultado", /console\.log\s*\(/.test(text)]
                ]
            };
        }
    }
];

function renderChallenges() {
    const container = $("#challenges-container") || $("#retos-container");
    if (!container) return;

    container.innerHTML = challenges.map(challenge => {
        const completed = progress.completedChallenges.includes(challenge.id);

        return `
            <article class="challenge-card ${completed ? "completed" : ""}">
                <div class="challenge-top">
                    <span class="challenge-category">${challenge.category}</span>
                    <span class="challenge-difficulty">${challenge.difficulty}</span>
                </div>

                <h3>${challenge.title}</h3>
                <div class="challenge-description">${challenge.description}</div>

                <div class="challenge-meta">
                    <span>⭐ ${challenge.xp} XP</span>
                    <span>${completed ? "✓ Completado" : "Pendiente"}</span>
                </div>

                <button class="btn btn-primary"
                        data-open-challenge="${challenge.id}">
                    ${completed ? "Volver a practicar" : "Resolver reto"}
                </button>
            </article>
        `;
    }).join("");

    $$("[data-open-challenge]", container).forEach(button => {
        button.addEventListener("click", () => {
            openChallenge(button.dataset.openChallenge);
        });
    });
}

function openChallenge(challengeId) {
    const challenge = challenges.find(item => item.id === challengeId);
    if (!challenge) return;

    const container = $("#challenge-workspace") || $("#reto-workspace");

    if (!container) {
        notify("No se encuentra el espacio de resolución del reto.", "error");
        return;
    }

    container.hidden = false;
    container.innerHTML = `
        <div class="challenge-workspace-inner">
            <div class="challenge-workspace-header">
                <div>
                    <span class="challenge-category">${challenge.category}</span>
                    <h2>${challenge.title}</h2>
                </div>
                <button class="btn btn-secondary" id="close-challenge">
                    Cerrar ✕
                </button>
            </div>

            <div class="challenge-instructions">
                ${challenge.description}
            </div>

            <label for="challenge-code">Tu código</label>
            <textarea id="challenge-code"
                      rows="12"
                      spellcheck="false"
                      placeholder="${escapeHTML(challenge.placeholder)}">${escapeHTML(challenge.starter)}</textarea>

            <div class="challenge-actions">
                <button class="btn btn-primary" id="check-challenge">
                    Comprobar solución
                </button>
                <button class="btn btn-secondary" id="reset-challenge">
                    Restaurar código
                </button>
            </div>

            <div id="challenge-feedback" aria-live="polite"></div>
        </div>
    `;

    $("#close-challenge")?.addEventListener("click", () => {
        container.hidden = true;
    });

    $("#reset-challenge")?.addEventListener("click", () => {
        $("#challenge-code").value = challenge.starter;
        $("#challenge-feedback").innerHTML = "";
    });

    $("#check-challenge")?.addEventListener("click", () => {
        checkChallenge(challenge);
    });

    container.scrollIntoView({ behavior: "smooth", block: "start" });
}

function checkChallenge(challenge) {
    const code = $("#challenge-code")?.value || "";
    const result = challenge.validate(code);
    const checks = result.checks;

    const passed = checks.filter(item => item[1]).length;
    const total = checks.length;
    const complete = passed === total;

    const feedback = $("#challenge-feedback");
    if (!feedback) return;

    feedback.innerHTML = `
        <div class="challenge-result ${complete ? "success" : "partial"}">
            <h3>${complete ? "¡Reto superado!" : "Sigue intentándolo"}</h3>
            <p>Has superado ${passed} de ${total} comprobaciones.</p>
            <div class="checklist">
                ${checks.map(([label, success]) => `
                    <div class="check-item ${success ? "passed" : "failed"}">
                        <span>${success ? "✓" : "✗"}</span>
                        ${label}
                    </div>
                `).join("")}
            </div>
        </div>
    `;

    if (complete && !progress.completedChallenges.includes(challenge.id)) {
        progress.completedChallenges.push(challenge.id);
        saveProgress();
        renderChallenges();
        notify(`¡Reto superado! Has conseguido ${challenge.xp} XP.`);
    } else if (complete) {
        notify("¡Perfecto! Ya tenías este reto completado.");
    }
}

/* ==========================================================
   7. QUIZ DE 12 PREGUNTAS
   ========================================================== */

const quizQuestions = [
    {
        question: "¿Qué significa HTML?",
        answers: [
            "HyperText Markup Language",
            "HighText Machine Language",
            "HyperTool Multi Language",
            "Home Text Markup Language"
        ],
        correct: 0,
        explanation: "HTML significa HyperText Markup Language. Es un lenguaje de marcado."
    },
    {
        question: "¿Qué etiqueta contiene el contenido visible de una página?",
        answers: ["head", "body", "meta", "title"],
        correct: 1,
        explanation: "El elemento body contiene el contenido visible del documento."
    },
    {
        question: "¿Qué atributo proporciona un texto alternativo a una imagen?",
        answers: ["title", "src", "alt", "href"],
        correct: 2,
        explanation: "El atributo alt proporciona una alternativa textual a la imagen."
    },
    {
        question: "¿Qué etiqueta HTML representa el contenido principal?",
        answers: ["main", "aside", "footer", "span"],
        correct: 0,
        explanation: "main identifica el contenido principal del documento."
    },
    {
        question: "¿Qué propiedad CSS cambia el color del texto?",
        answers: ["background", "font-style", "color", "text-decoration"],
        correct: 2,
        explanation: "La propiedad color establece el color del texto."
    },
    {
        question: "¿Qué sistema permite distribuir elementos en dos dimensiones?",
        answers: ["Float", "CSS Grid", "Inline", "Position"],
        correct: 1,
        explanation: "CSS Grid permite organizar elementos en filas y columnas."
    },
    {
        question: "¿Qué propiedad activa Flexbox?",
        answers: [
            "position: flex",
            "display: flex",
            "flex: enabled",
            "layout: flex"
        ],
        correct: 1,
        explanation: "display: flex convierte un elemento en un contenedor flexible."
    },
    {
        question: "¿Qué unidad CSS es relativa al tamaño de fuente raíz?",
        answers: ["px", "vw", "rem", "cm"],
        correct: 2,
        explanation: "rem se calcula en relación con el tamaño de fuente del elemento raíz."
    },
    {
        question: "¿Qué palabra clave declara una variable que no se puede reasignar?",
        answers: ["var", "let", "const", "static"],
        correct: 2,
        explanation: "const impide reasignar el identificador, aunque el contenido de un objeto puede modificarse."
    },
    {
        question: "¿Qué operador compara valor y tipo sin conversión implícita?",
        answers: ["=", "==", "===", "!="],
        correct: 2,
        explanation: "El operador === realiza una comparación estricta."
    },
    {
        question: "¿Qué método permite escuchar un evento en JavaScript?",
        answers: [
            "addEventListener()",
            "createEvent()",
            "listen()",
            "eventClick()"
        ],
        correct: 0,
        explanation: "addEventListener() registra una función que se ejecutará cuando ocurra un evento."
    },
    {
        question: "¿Qué método permite guardar una cadena en el almacenamiento local del navegador?",
        answers: [
            "sessionStorage.save()",
            "localStorage.setItem()",
            "document.store()",
            "browser.write()"
        ],
        correct: 1,
        explanation: "localStorage.setItem(clave, valor) guarda una cadena en el almacenamiento local."
    }
];

let quizSubmitted = false;

function renderQuiz() {
    const container = $("#quiz-container") || $("#quiz-content");
    if (!container) return;

    quizSubmitted = false;

    const previousAnswers = progress.quizAnswers || {};

    container.innerHTML = `
        <div class="quiz-header">
            <h2>Evaluación final</h2>
            <p>12 preguntas para comprobar lo que has aprendido.</p>
            <div class="quiz-progress">
                <span id="quiz-progress-text">0 / 12 respondidas</span>
                <div class="progress-track">
                    <div class="progress-fill" id="quiz-progress-fill"></div>
                </div>
            </div>
        </div>

        <form id="quiz-form">
            ${quizQuestions.map((question, index) => `
                <article class="quiz-question" data-question="${index}">
                    <h3>
                        <span class="question-number">${index + 1}</span>
                        ${question.question}
                    </h3>

                    <div class="quiz-answers">
                        ${question.answers.map((answer, answerIndex) => `
                            <label class="quiz-option">
                                <input type="radio"
                                       name="question-${index}"
                                       value="${answerIndex}"
                                       ${Number(previousAnswers[index]) === answerIndex &&
                                         previousAnswers[index] !== undefined ? "checked" : ""}>
                                <span>${answer}</span>
                            </label>
                        `).join("")}
                    </div>

                    <div class="quiz-explanation" id="explanation-${index}"></div>
                </article>
            `).join("")}

            <div class="quiz-actions">
                <button type="submit" class="btn btn-primary" id="submit-quiz">
                    Corregir evaluación
                </button>
                <button type="button" class="btn btn-secondary" id="reset-quiz">
                    Reiniciar quiz
                </button>
            </div>
        </form>

        <div id="quiz-result" aria-live="polite"></div>
    `;

    $$('input[type="radio"]', container).forEach(input => {
        input.addEventListener("change", updateQuizProgress);
    });

    $("#quiz-form")?.addEventListener("submit", event => {
        event.preventDefault();
        submitQuiz();
    });

    $("#reset-quiz")?.addEventListener("click", resetQuiz);

    updateQuizProgress();

    if (progress.quizCompleted) {
        showQuizResult(progress.quizScore, true);
    }
}

function updateQuizProgress() {
    const answered = quizQuestions.filter((question, index) =>
        $(`input[name="question-${index}"]:checked`)
    ).length;

    const text = $("#quiz-progress-text");
    const fill = $("#quiz-progress-fill");

    if (text) text.textContent = `${answered} / ${quizQuestions.length} respondidas`;
    if (fill) fill.style.width = `${answered / quizQuestions.length * 100}%`;
}

function submitQuiz() {
    if (quizSubmitted) return;

    const answers = {};
    let answered = 0;

    quizQuestions.forEach((question, index) => {
        const selected = $(`input[name="question-${index}"]:checked`);

        if (selected) {
            answers[index] = Number(selected.value);
            answered++;
        }
    });

    if (answered < quizQuestions.length) {
        notify(`Te faltan ${quizQuestions.length - answered} preguntas por responder.`, "error");
        return;
    }

    let score = 0;

    quizQuestions.forEach((question, index) => {
        const selected = answers[index];
        const correct = selected === question.correct;

        if (correct) score++;

        const explanation = $(`#explanation-${index}`);
        if (explanation) {
            explanation.className = `quiz-explanation show ${correct ? "correct" : "incorrect"}`;
            explanation.innerHTML = `
                <strong>${correct ? "✓ Correcto" : "✗ Incorrecto"}</strong>
                <p>${question.explanation}</p>
                ${!correct ? `<p>Respuesta correcta: <strong>${escapeHTML(question.answers[question.correct])}</strong></p>` : ""}
            `;
        }

        $$(`input[name="question-${index}"]`).forEach(input => {
            input.disabled = true;
        });
    });

    quizSubmitted = true;

    progress.quizAnswers = answers;
    progress.quizCompleted = true;
    progress.quizScore = score;
    saveProgress();

    showQuizResult(score, false);
}

function showQuizResult(score, restored = false) {
    const result = $("#quiz-result");
    if (!result) return;

    const percentage = Math.round(score / quizQuestions.length * 100);

    let message = "¡Buen intento! Sigue practicando.";
    if (percentage >= 90) {
        message = "¡Excelente! Dominas los fundamentos del desarrollo web.";
    } else if (percentage >= 70) {
        message = "¡Muy bien! Tienes una buena base de desarrollo web.";
    } else if (percentage >= 50) {
        message = "¡Vas por buen camino! Repasa algunos conceptos.";
    }

    result.innerHTML = `
        <div class="quiz-result-card">
            <div class="quiz-score">${percentage}%</div>
            <h2>${score} de ${quizQuestions.length} respuestas correctas</h2>
            <p>${message}</p>
            ${restored ? "<small>Resultado recuperado de tu progreso anterior.</small>" : ""}
        </div>
    `;
}

function resetQuiz() {
    progress.quizAnswers = {};
    progress.quizCompleted = false;
    progress.quizScore = 0;

    saveProgress();
    renderQuiz();
    notify("Quiz reiniciado.");
}

/* ==========================================================
   8. PROGRESO Y ESTADÍSTICAS
   ========================================================== */

function updateDashboard() {
    const totalLessons = modules.reduce(
        (total, module) => total + module.lessons.length, 0
    );

    const completedLessons = progress.completedLessons.length;
    const completedChallenges = progress.completedChallenges.length;
    const totalChallenges = challenges.length;

    const totalActivities = totalLessons + totalChallenges + 1;
    const completedActivities = completedLessons + completedChallenges +
        (progress.quizCompleted ? 1 : 0);

    const percentage = Math.round(
        completedActivities / totalActivities * 100
    );

    const xpLessons = completedLessons * 10;
    const xpChallenges = challenges
        .filter(challenge => progress.completedChallenges.includes(challenge.id))
        .reduce((total, challenge) => total + challenge.xp, 0);

    const xpQuiz = progress.quizCompleted
        ? Math.round(progress.quizScore / quizQuestions.length * 100)
        : 0;

    const xp = xpLessons + xpChallenges + xpQuiz;

    const values = {
        "progress-percent": `${percentage}%`,
        "progress-bar": `${percentage}%`,
        "completed-lessons": completedLessons,
        "completed-challenges": `${completedChallenges}/${totalChallenges}`,
        "total-xp": xp,
        "quiz-score": progress.quizCompleted
            ? `${progress.quizScore}/${quizQuestions.length}`
            : "Pendiente"
    };

    Object.entries(values).forEach(([id, value]) => {
        const element = document.getElementById(id);
        if (!element) return;

        if (id === "progress-bar") {
            element.style.width = value;
            element.setAttribute("aria-valuenow", percentage);
        } else {
            element.textContent = value;
        }
    });

    $$("[data-progress]").forEach(element => {
        element.textContent = `${percentage}%`;
    });

    $$("[data-progress-bar]").forEach(element => {
        element.style.width = `${percentage}%`;
    });

    $$("[data-xp]").forEach(element => {
        element.textContent = xp;
    });

    const lessonCount = $("#lesson-count");
    if (lessonCount) {
        lessonCount.textContent = `${completedLessons}/${totalLessons}`;
    }

    const challengeCount = $("#challenge-count");
    if (challengeCount) {
        challengeCount.textContent = `${completedChallenges}/${totalChallenges}`;
    }
}

/* ==========================================================
   9. REINICIO DEL PROGRESO
   ========================================================== */

function setupResetProgress() {
    const resetButtons = [
        "#reset-progress",
        "#reset-all",
        "[data-reset-progress]"
    ];

    resetButtons.forEach(selector => {
        $$(selector).forEach(button => {
            button.addEventListener("click", () => {
                const confirmed = confirm(
                    "¿Seguro que quieres borrar todo tu progreso? Esta acción no se puede deshacer."
                );

                if (!confirmed) return;

                localStorage.removeItem(STORAGE_KEY);

                progress = {
                    completedLessons: [],
                    completedChallenges: [],
                    quizAnswers: {},
                    quizCompleted: false,
                    quizScore: 0
                };

                renderModuleMenu();
                renderLesson();
                renderChallenges();
                updateDashboard();

                notify("Progreso reiniciado.");
            });
        });
    });
}

/* ==========================================================
   10. INICIALIZACIÓN
   ========================================================== */

function initializeApp() {
    setupNavigation();
    setupSandbox();
    setupResetProgress();

    renderModuleMenu();
    renderLesson();
    renderChallenges();
    updateDashboard();

    const initialView = $(".view.active")?.id
        ?.replace("view-", "") || "temario";

    showView(initialView);

    console.log("🚀 Aula Web iniciada correctamente.");
}

document.addEventListener("DOMContentLoaded", initializeApp);

/* ==========================================================
   AULA WEB INTERACTIVA
   HTML5 · CSS3 · JavaScript ES6+
   Nivel: 2.º Bachillerato
   JavaScript Vanilla
   ========================================================== */

"use strict";

/* ==========================================================
   1. CONFIGURACIÓN Y UTILIDADES
   ========================================================== */

const STORAGE_KEY = "aulaWebProgress_v1";

const $ = (selector, parent = document) =>
    parent.querySelector(selector);

const $$ = (selector, parent = document) =>
    [...parent.querySelectorAll(selector)];

function escapeHTML(value) {
    return String(value).replace(/[&<>"']/g, char => ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#039;"
    })[char]);
}

function loadProgress() {
    try {
        return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
    } catch {
        return {};
    }
}

let progress = {
    completedLessons: [],
    completedChallenges: [],
    quizAnswers: {},
    quizCompleted: false,
    quizScore: 0,
    ...loadProgress()
};

function saveProgress() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    updateDashboard();
}

function notify(message, type = "success") {
    let notification = $("#app-notification");

    if (!notification) {
        notification = document.createElement("div");
        notification.id = "app-notification";
        notification.className = "app-notification";
        document.body.appendChild(notification);
    }

    notification.textContent = message;
    notification.dataset.type = type;
    notification.classList.add("show");

    clearTimeout(notify.timeout);
    notify.timeout = setTimeout(() => {
        notification.classList.remove("show");
    }, 2600);
}

/* ==========================================================
   2. TEMARIO
   ========================================================== */

const modules = [
    {
        id: "html",
        number: 1,
        title: "HTML5: estructura web",
        description: "Construye la estructura y el contenido de una página web.",
        icon: "🌐",
        lessons: [
            {
                id: "html-intro",
                title: "1. Introducción a HTML5",
                duration: "15 min",
                content: `
                    <h2>Introducción a HTML5</h2>
                    <p>HTML (HyperText Markup Language) es el lenguaje de marcado utilizado para definir la estructura y el significado del contenido de una página web.</p>

                    <div class="concept-card">
                        <strong>Idea clave</strong>
                        <p>HTML no es un lenguaje de programación: es un lenguaje de marcado que utiliza etiquetas para organizar el contenido.</p>
                    </div>

                    <h3>¿Qué es HTML5?</h3>
                    <p>HTML5 es la evolución del estándar HTML. Incorpora elementos semánticos, soporte multimedia y nuevas posibilidades para desarrollar aplicaciones web.</p>

                    <h3>Estructura básica de un documento</h3>
                    <pre><code>&lt;!DOCTYPE html&gt;
&lt;html lang="es"&gt;
&lt;head&gt;
    &lt;meta charset="UTF-8"&gt;
    &lt;meta name="viewport"
          content="width=device-width, initial-scale=1.0"&gt;
    &lt;title&gt;Mi primera web&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;
    &lt;h1&gt;Hola, mundo&lt;/h1&gt;
    &lt;p&gt;Mi primera página web.&lt;/p&gt;
&lt;/body&gt;
&lt;/html&gt;</code></pre>

                    <h3>Partes fundamentales</h3>
                    <ul>
                        <li><code>&lt;!DOCTYPE html&gt;</code>: indica que utilizamos HTML5.</li>
                        <li><code>&lt;html&gt;</code>: elemento raíz del documento.</li>
                        <li><code>&lt;head&gt;</code>: contiene metadatos y configuración.</li>
                        <li><code>&lt;body&gt;</code>: contiene el contenido visible.</li>
                        <li><code>&lt;title&gt;</code>: establece el título de la pestaña.</li>
                    </ul>

                    <h3>Etiquetas y atributos</h3>
                    <p>Las etiquetas suelen tener una apertura y un cierre. Los atributos proporcionan información adicional.</p>
                    <pre><code>&lt;a href="https://developer.mozilla.org"&gt;
    Consultar documentación
&lt;/a&gt;</code></pre>
                    <p>En este ejemplo, <code>href</code> es un atributo de la etiqueta de enlace.</p>

                    <div class="tip-card">
                        <strong>Consejo</strong>
                        <p>Utiliza siempre una estructura HTML completa y declara el idioma del documento con <code>lang="es"</code>.</p>
                    </div>
                `
            },
            {
                id: "html-text",
                title: "2. Texto, enlaces e imágenes",
                duration: "20 min",
                content: `
                    <h2>Texto, enlaces e imágenes</h2>
                    <p>HTML proporciona etiquetas específicas para organizar textos y añadir recursos externos.</p>

                    <h3>Encabezados</h3>
                    <p>Los encabezados organizan jerárquicamente la información.</p>
                    <pre><code>&lt;h1&gt;Título principal&lt;/h1&gt;
&lt;h2&gt;Apartado&lt;/h2&gt;
&lt;h3&gt;Subapartado&lt;/h3&gt;</code></pre>
                    <p>Existen seis niveles, desde <code>h1</code> hasta <code>h6</code>. No deben elegirse por su tamaño visual, sino por su importancia estructural.</p>

                    <h3>Párrafos y formato</h3>
                    <pre><code>&lt;p&gt;Este es un párrafo.&lt;/p&gt;
&lt;strong&gt;Texto importante&lt;/strong&gt;
&lt;em&gt;Texto enfatizado&lt;/em&gt;
&lt;mark&gt;Texto destacado&lt;/mark&gt;
&lt;small&gt;Texto secundario&lt;/small&gt;
&lt;br&gt;Salto de línea
&lt;hr&gt;Separación temática</code></pre>

                    <h3>Listas</h3>
                    <p>Las listas pueden ser ordenadas o desordenadas.</p>
                    <pre><code>&lt;ul&gt;
    &lt;li&gt;HTML&lt;/li&gt;
    &lt;li&gt;CSS&lt;/li&gt;
&lt;/ul&gt;

&lt;ol&gt;
    &lt;li&gt;Diseñar&lt;/li&gt;
    &lt;li&gt;Programar&lt;/li&gt;
    &lt;li&gt;Publicar&lt;/li&gt;
&lt;/ol&gt;</code></pre>

                    <h3>Enlaces</h3>
                    <pre><code>&lt;a href="https://www.w3.org/"&gt;
    Web del W3C
&lt;/a&gt;</code></pre>
                    <p>Para abrir un enlace en otra pestaña:</p>
                    <pre><code>&lt;a href="https://example.com"
   target="_blank"
   rel="noopener noreferrer"&gt;
    Abrir página
&lt;/a&gt;</code></pre>

                    <h3>Imágenes</h3>
                    <pre><code>&lt;img src="imagen.jpg"
     alt="Descripción de la imagen"
     width="300"&gt;</code></pre>
                    <p>El atributo <code>alt</code> proporciona una descripción textual y es fundamental para la accesibilidad.</p>
                `
            },
            {
                id: "html-semantic",
                title: "3. HTML semántico",
                duration: "20 min",
                content: `
                    <h2>HTML semántico</h2>
                    <p>El HTML semántico utiliza etiquetas que describen el significado de cada parte de una página.</p>

                    <h3>Etiquetas principales</h3>
                    <ul>
                        <li><code>&lt;header&gt;</code>: cabecera de una página o sección.</li>
                        <li><code>&lt;nav&gt;</code>: bloque de navegación.</li>
                        <li><code>&lt;main&gt;</code>: contenido principal.</li>
                        <li><code>&lt;section&gt;</code>: sección temática.</li>
                        <li><code>&lt;article&gt;</code>: contenido independiente.</li>
                        <li><code>&lt;aside&gt;</code>: contenido complementario.</li>
                        <li><code>&lt;footer&gt;</code>: pie de página o sección.</li>
                    </ul>

                    <h3>Ejemplo de estructura semántica</h3>
                    <pre><code>&lt;body&gt;
    &lt;header&gt;
        &lt;h1&gt;Mi revista digital&lt;/h1&gt;
    &lt;/header&gt;

    &lt;nav&gt;
        &lt;a href="#noticias"&gt;Noticias&lt;/a&gt;
    &lt;/nav&gt;

    &lt;main&gt;
        &lt;section id="noticias"&gt;
            &lt;article&gt;
                &lt;h2&gt;Noticia principal&lt;/h2&gt;
                &lt;p&gt;Contenido de la noticia.&lt;/p&gt;
            &lt;/article&gt;
        &lt;/section&gt;

        &lt;aside&gt;
            Información complementaria
        &lt;/aside&gt;
    &lt;/main&gt;

    &lt;footer&gt;
        &amp;copy; 2026 Mi revista
    &lt;/footer&gt;
&lt;/body&gt;</code></pre>

                    <h3>Ventajas</h3>
                    <ul>
                        <li>Mejora la accesibilidad.</li>
                        <li>Facilita la comprensión del código.</li>
                        <li>Ayuda a los motores de búsqueda a interpretar el contenido.</li>
                        <li>Mejora el mantenimiento del proyecto.</li>
                    </ul>

                    <div class="warning-card">
                        <strong>Recuerda</strong>
                        <p>No utilices <code>&lt;div&gt;</code> para todo. Si existe una etiqueta semántica adecuada, es preferible utilizarla.</p>
                    </div>
                `
            },
            {
                id: "html-forms",
                title: "4. Formularios y tablas",
                duration: "25 min",
                content: `
                    <h2>Formularios y tablas</h2>

                    <h3>Formularios</h3>
                    <p>Los formularios permiten recoger información del usuario.</p>
                    <pre><code>&lt;form action="/registro" method="post"&gt;
    &lt;label for="nombre"&gt;Nombre:&lt;/label&gt;
    &lt;input type="text"
           id="nombre"
           name="nombre"
           required&gt;

    &lt;label for="email"&gt;Correo:&lt;/label&gt;
    &lt;input type="email"
           id="email"
           name="email"
           required&gt;

    &lt;button type="submit"&gt;
        Enviar
    &lt;/button&gt;
&lt;/form&gt;</code></pre>

                    <h3>Tipos de campos</h3>
                    <ul>
                        <li><code>text</code>: texto.</li>
                        <li><code>email</code>: correo electrónico.</li>
                        <li><code>password</code>: contraseña.</li>
                        <li><code>number</code>: número.</li>
                        <li><code>date</code>: fecha.</li>
                        <li><code>checkbox</code>: casilla de selección.</li>
                        <li><code>radio</code>: selección única.</li>
                        <li><code>submit</code>: envío del formulario.</li>
                    </ul>

                    <h3>Otros elementos</h3>
                    <pre><code>&lt;select name="curso"&gt;
    &lt;option value="1"&gt;Primero&lt;/option&gt;
    &lt;option value="2"&gt;Segundo&lt;/option&gt;
&lt;/select&gt;

&lt;textarea name="comentario"
          rows="4"&gt;&lt;/textarea&gt;</code></pre>

                    <h3>Tablas</h3>
                    <pre><code>&lt;table&gt;
    &lt;caption&gt;Calificaciones&lt;/caption&gt;
    &lt;thead&gt;
        &lt;tr&gt;
            &lt;th&gt;Alumno&lt;/th&gt;
            &lt;th&gt;Nota&lt;/th&gt;
        &lt;/tr&gt;
    &lt;/thead&gt;
    &lt;tbody&gt;
        &lt;tr&gt;
            &lt;td&gt;Ana&lt;/td&gt;
            &lt;td&gt;9&lt;/td&gt;
        &lt;/tr&gt;
    &lt;/tbody&gt;
&lt;/table&gt;</code></pre>

                    <p>Las tablas deben utilizarse para presentar datos tabulares, no para maquetar páginas.</p>
                `
            }
        ]
    },
    {
        id: "css",
        number: 2,
        title: "CSS3: diseño y estilos",
        description: "Transforma documentos HTML en páginas atractivas y adaptables.",
        icon: "🎨",
        lessons: [
            {
                id: "css-intro",
                title: "1. Introducción a CSS3",
                duration: "15 min",
                content: `
                    <h2>Introducción a CSS3</h2>
                    <p>CSS (Cascading Style Sheets) es el lenguaje que define la presentación visual de los documentos HTML.</p>

                    <h3>Separación de responsabilidades</h3>
                    <ul>
                        <li>HTML: estructura y contenido.</li>
                        <li>CSS: diseño y presentación.</li>
                        <li>JavaScript: comportamiento e interactividad.</li>
                    </ul>

                    <h3>Sintaxis</h3>
                    <pre><code>selector {
    propiedad: valor;
}</code></pre>

                    <p>Ejemplo:</p>
                    <pre><code>h1 {
    color: blue;
    font-size: 32px;
    text-align: center;
}</code></pre>

                    <h3>Formas de aplicar CSS</h3>
                    <p><strong>CSS externo:</strong></p>
                    <pre><code>&lt;link rel="stylesheet"
      href="styles.css"&gt;</code></pre>

                    <p><strong>CSS interno:</strong></p>
                    <pre><code>&lt;style&gt;
    p { color: red; }
&lt;/style&gt;</code></pre>

                    <p><strong>CSS en línea:</strong></p>
                    <pre><code>&lt;p style="color: red;"&gt;
    Texto
&lt;/p&gt;</code></pre>

                    <p>En proyectos reales, suele ser preferible utilizar hojas de estilo externas.</p>
                `
            },
            {
                id: "css-selectors",
                title: "2. Selectores y especificidad",
                duration: "20 min",
                content: `
                    <h2>Selectores y especificidad</h2>
                    <p>Los selectores indican qué elementos HTML recibirán determinadas reglas CSS.</p>

                    <h3>Selectores básicos</h3>
                    <pre><code>/* Selector de etiqueta */
p { color: gray; }

/* Selector de clase */
.destacado { color: red; }

/* Selector de identificador */
#principal { background: black; }

/* Selector universal */
* { box-sizing: border-box; }</code></pre>

                    <h3>Selectores combinados</h3>
                    <pre><code>article p {
    color: navy;
}

.menu > li {
    list-style: none;
}

h1, h2, h3 {
    font-family: Arial, sans-serif;
}</code></pre>

                    <h3>Pseudoclases</h3>
                    <pre><code>a:hover {
    color: red;
}

input:focus {
    outline: 2px solid blue;
}

li:first-child {
    font-weight: bold;
}</code></pre>

                    <h3>Especificidad</h3>
                    <p>Cuando varias reglas afectan al mismo elemento, el navegador calcula su especificidad.</p>
                    <ul>
                        <li>Estilos en línea: prioridad elevada.</li>
                        <li>Identificadores: mayor especificidad que clases.</li>
                        <li>Clases, atributos y pseudoclases.</li>
                        <li>Etiquetas y pseudoelementos.</li>
                    </ul>

                    <div class="concept-card">
                        <strong>Importante</strong>
                        <p>La cascada también tiene en cuenta el origen de la regla, la importancia y el orden de aparición. Evita abusar de <code>!important</code>.</p>
                    </div>
                `
            },
            {
                id: "css-box",
                title: "3. Modelo de caja y tipografía",
                duration: "20 min",
                content: `
                    <h2>Modelo de caja</h2>
                    <p>En CSS, cada elemento se representa como una caja rectangular.</p>

                    <AsyncImage query="CSS box model diagram content padding border margin educational diagram" aspectRatio="16:9" />

                    <h3>Partes del modelo</h3>
                    <ul>
                        <li><strong>Content:</strong> contenido.</li>
                        <li><strong>Padding:</strong> espacio interior.</li>
                        <li><strong>Border:</strong> borde.</li>
                        <li><strong>Margin:</strong> espacio exterior.</li>
                    </ul>

                    <pre><code>.caja {
    width: 300px;
    padding: 20px;
    border: 5px solid black;
    margin: 15px;
}</code></pre>

                    <h3>box-sizing</h3>
                    <pre><code>* {
    box-sizing: border-box;
}</code></pre>
                    <p>Con <code>border-box</code>, el ancho declarado incluye el contenido, el padding y el borde.</p>

                    <h3>Tipografía</h3>
                    <pre><code>body {
    font-family: Arial, sans-serif;
    font-size: 16px;
    line-height: 1.6;
    color: #222;
}

h1 {
    font-size: 2rem;
    font-weight: 700;
}</code></pre>

                    <h3>Colores y unidades</h3>
                    <ul>
                        <li>Colores: nombres, hexadecimal, RGB, HSL.</li>
                        <li><code>px</code>: unidad absoluta CSS de referencia.</li>
                        <li><code>rem</code>: relativa al tamaño de fuente raíz.</li>
                        <li><code>em</code>: relativa al tamaño de fuente del elemento.</li>
                        <li><code>%</code>: valor relativo al contexto correspondiente.</li>
                        <li><code>vw</code> y <code>vh</code>: unidades relativas al viewport.</li>
                    </ul>
                `
            },
            {
                id: "css-layout",
                title: "4. Flexbox, Grid y responsive",
                duration: "30 min",
                content: `
                    <h2>Diseño moderno con CSS</h2>

                    <h3>Flexbox</h3>
                    <p>Flexbox facilita la distribución de elementos en una dimensión: fila o columna.</p>
                    <pre><code>.contenedor {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 20px;
    flex-wrap: wrap;
}</code></pre>

                    <p>Propiedades importantes:</p>
                    <ul>
                        <li><code>justify-content</code>: distribución en el eje principal.</li>
                        <li><code>align-items</code>: alineación en el eje transversal.</li>
                        <li><code>flex-direction</code>: dirección del eje principal.</li>
                        <li><code>flex-wrap</code>: permite saltar de línea.</li>
                        <li><code>gap</code>: separación entre elementos.</li>
                    </ul>

                    <h3>CSS Grid</h3>
                    <p>Grid permite crear diseños bidimensionales mediante filas y columnas.</p>
                    <pre><code>.galeria {
    display: grid;
    grid-template-columns:
        repeat(3, 1fr);
    gap: 16px;
}</code></pre>

                    <h3>Diseño responsive</h3>
                    <p>Una página responsive adapta su distribución a diferentes tamaños de pantalla.</p>
                    <pre><code>.contenedor {
    width: min(100% - 32px, 1100px);
    margin-inline: auto;
}

@media (max-width: 700px) {
    .galeria {
        grid-template-columns: 1fr;
    }
}</code></pre>

                    <h3>Variables CSS</h3>
                    <pre><code>:root {
    --color-principal: #2563eb;
    --espaciado: 1rem;
}

.boton {
    background: var(--color-principal);
    padding: var(--espaciado);
}</code></pre>

                    <h3>Transiciones</h3>
                    <pre><code>.boton {
    transition: transform .2s ease,
                background .2s ease;
}

.boton:hover {
    transform: translateY(-3px);
}</code></pre>
                `
            }
        ]
    },
    {
        id: "javascript",
        number: 3,
        title: "JavaScript: programación web",
        description: "Añade lógica, interacción y dinamismo a tus páginas.",
        icon: "⚡",
        lessons: [
            {
                id: "js-intro",
                title: "1. Introducción a JavaScript",
                duration: "20 min",
                content: `
                    <h2>Introducción a JavaScript</h2>
                    <p>JavaScript es un lenguaje de programación que permite añadir comportamiento dinámico a las páginas web.</p>

                    <h3>Incluir JavaScript</h3>
                    <pre><code>&lt;script src="app.js" defer&gt;&lt;/script&gt;</code></pre>
                    <p>El atributo <code>defer</code> permite ejecutar el script después de analizar el documento HTML.</p>

                    <h3>Mostrar información</h3>
                    <pre><code>console.log("Hola, mundo");
alert("Bienvenido");
document.title = "Mi web";</code></pre>

                    <h3>Variables</h3>
                    <pre><code>const nombre = "Ana";
let edad = 17;

edad = 18;</code></pre>
                    <ul>
                        <li><code>const</code>: no permite reasignar la variable.</li>
                        <li><code>let</code>: permite reasignar la variable.</li>
                        <li><code>var</code>: declaración antigua, con ámbito de función.</li>
                    </ul>

                    <h3>Tipos de datos</h3>
                    <pre><code>const texto = "Hola";
const numero = 25;
const decimal = 3.14;
const activo = true;
const indefinido = undefined;
const vacio = null;</code></pre>

                    <h3>Operadores</h3>
                    <pre><code>let suma = 5 + 3;
let resta = 5 - 3;
let producto = 5 * 3;
let division = 6 / 2;
let resto = 7 % 2;

let igual = 5 === 5;
let mayor = 8 > 3;</code></pre>
                    <p>Se recomienda utilizar igualdad estricta (<code>===</code>) para evitar conversiones implícitas inesperadas.</p>
                `
            },
            {
                id: "js-control",
                title: "2. Condicionales y bucles",
                duration: "20 min",
                content: `
                    <h2>Condicionales y bucles</h2>

                    <h3>Condicional if / else</h3>
                    <pre><code>const nota = 7;

if (nota >= 5) {
    console.log("Aprobado");
} else {
    console.log("Suspenso");
}</code></pre>

                    <h3>Operadores lógicos</h3>
                    <ul>
                        <li><code>&&</code>: AND, ambas condiciones deben cumplirse.</li>
                        <li><code>||</code>: OR, basta con que se cumpla una.</li>
                        <li><code>!</code>: NOT, invierte el valor lógico.</li>
                    </ul>

                    <pre><code>const edad = 18;
const tienePermiso = true;

if (edad >= 18 && tienePermiso) {
    console.log("Acceso permitido");
}</code></pre>

                    <h3>Switch</h3>
                    <pre><code>const dia = 2;

switch (dia) {
    case 1:
        console.log("Lunes");
        break;
    case 2:
        console.log("Martes");
        break;
    default:
        console.log("Otro día");
}</code></pre>

                    <h3>Bucle for</h3>
                    <pre><code>for (let i = 1; i <= 5; i++) {
    console.log(i);
}</code></pre>

                    <h3>Bucle while</h3>
                    <pre><code>let contador = 1;

while (contador <= 5) {
    console.log(contador);
    contador++;
}</code></pre>

                    <h3>for...of</h3>
                    <pre><code>const lenguajes = ["HTML", "CSS", "JS"];

for (const lenguaje of lenguajes) {
    console.log(lenguaje);
}</code></pre>
                `
            },
            {
                id: "js-functions",
                title: "3. Funciones y arrays",
                duration: "25 min",
                content: `
                    <h2>Funciones y arrays</h2>

                    <h3>Funciones tradicionales</h3>
                    <pre><code>function saludar(nombre) {
    return "Hola " + nombre;
}

const mensaje = saludar("Ana");
console.log(mensaje);</code></pre>

                    <h3>Funciones flecha</h3>
                    <pre><code>const sumar = (a, b) => a + b;

console.log(sumar(4, 5));</code></pre>

                    <h3>Parámetros y retorno</h3>
                    <p>Los parámetros reciben datos y <code>return</code> devuelve el resultado de una función.</p>

                    <h3>Arrays</h3>
                    <pre><code>const frutas = ["manzana", "pera", "kiwi"];

console.log(frutas[0]);

frutas.push("naranja");
frutas.pop();

console.log(frutas.length);</code></pre>

                    <h3>Métodos de arrays</h3>
                    <pre><code>const numeros = [1, 2, 3, 4, 5];

const dobles = numeros.map(n => n * 2);

const pares = numeros.filter(n => n % 2 === 0);

const suma = numeros.reduce(
    (total, n) => total + n, 0
);

console.log(dobles);
console.log(pares);
console.log(suma);</code></pre>

                    <h3>Objetos</h3>
                    <pre><code>const alumno = {
    nombre: "Lucía",
    edad: 17,
    curso: "2º Bachillerato"
};

console.log(alumno.nombre);
alumno.edad = 18;</code></pre>
                `
            },
            {
                id: "js-dom",
                title: "4. DOM y eventos",
                duration: "30 min",
                content: `
                    <h2>DOM y eventos</h2>
                    <p>El DOM (Document Object Model) representa el documento HTML como una estructura de objetos que JavaScript puede consultar y modificar.</p>

                    <h3>Seleccionar elementos</h3>
                    <pre><code>const titulo = document.querySelector("h1");
const botones = document.querySelectorAll("button");
const caja = document.getElementById("caja");</code></pre>

                    <h3>Modificar contenido</h3>
                    <pre><code>titulo.textContent = "Nuevo título";
caja.innerHTML = "&lt;p&gt;Nuevo contenido&lt;/p&gt;";</code></pre>
                    <p>Utiliza <code>textContent</code> para insertar texto sin interpretarlo como HTML. Evita introducir contenido no confiable con <code>innerHTML</code>.</p>

                    <h3>Modificar estilos y clases</h3>
                    <pre><code>caja.style.backgroundColor = "lightblue";

caja.classList.add("activo");
caja.classList.remove("oculto");
caja.classList.toggle("destacado");</code></pre>

                    <h3>Eventos</h3>
                    <pre><code>const boton = document.querySelector("#boton");

boton.addEventListener("click", () => {
    alert("Has pulsado el botón");
});</code></pre>

                    <h3>Leer datos de un formulario</h3>
                    <pre><code>const formulario = document.querySelector("form");

formulario.addEventListener("submit", event => {
    event.preventDefault();

    const nombre = document.querySelector("#nombre").value;

    console.log("Hola " + nombre);
});</code></pre>

                    <h3>Almacenamiento local</h3>
                    <pre><code>localStorage.setItem("usuario", "Ana");

const usuario = localStorage.getItem("usuario");

localStorage.removeItem("usuario");</code></pre>
                    <p>Los datos de <code>localStorage</code> permanecen en el navegador hasta que se eliminan. Solo almacena cadenas de texto; para objetos se utiliza <code>JSON.stringify()</code> y <code>JSON.parse()</code>.</p>
                `
            }
        ]
    },
    {
        id: "project",
        number: 4,
        title: "Proyecto web: integración",
        description: "Aplica los tres lenguajes en un proyecto completo.",
        icon: "🚀",
        lessons: [
            {
                id: "project-structure",
                title: "1. Organización del proyecto",
                duration: "15 min",
                content: `
                    <h2>Organización de un proyecto web</h2>
                    <p>Un proyecto web debe estar organizado para facilitar su mantenimiento y evolución.</p>

                    <h3>Estructura recomendada</h3>
                    <pre><code>mi-proyecto/
│
├── index.html
├── css/
│   └── styles.css
├── js/
│   └── app.js
└── img/
    ├── logo.png
    └── portada.jpg</code></pre>

                    <h3>Separación de archivos</h3>
                    <p>El HTML contiene la estructura, CSS los estilos y JavaScript la lógica.</p>
                    <pre><code>&lt;link rel="stylesheet" href="css/styles.css"&gt;
&lt;script src="js/app.js" defer&gt;&lt;/script&gt;</code></pre>

                    <h3>Buenas prácticas</h3>
                    <ul>
                        <li>Utilizar nombres claros y coherentes.</li>
                        <li>Evitar repetir código.</li>
                        <li>Separar responsabilidades.</li>
                        <li>Comentar las partes complejas.</li>
                        <li>Organizar los recursos en carpetas.</li>
                    </ul>
                `
            },
            {
                id: "project-responsive",
                title: "2. Accesibilidad y responsive",
                duration: "20 min",
                content: `
                    <h2>Accesibilidad y diseño responsive</h2>
                    <p>Una web de calidad debe poder utilizarse desde diferentes dispositivos y por personas con distintas capacidades.</p>

                    <h3>Accesibilidad</h3>
                    <ul>
                        <li>Utilizar HTML semántico.</li>
                        <li>Incluir textos alternativos en imágenes informativas.</li>
                        <li>Asociar etiquetas a los campos de formulario.</li>
                        <li>Mantener un contraste suficiente.</li>
                        <li>Permitir la navegación mediante teclado.</li>
                        <li>No transmitir información únicamente mediante colores.</li>
                    </ul>

                    <h3>Diseño responsive</h3>
                    <pre><code>&lt;meta name="viewport"
      content="width=device-width, initial-scale=1.0"&gt;</code></pre>

                    <p>Ejemplo de adaptación mediante media queries:</p>
                    <pre><code>.tarjetas {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1rem;
}

@media (max-width: 768px) {
    .tarjetas {
        grid-template-columns: 1fr;
    }
}</code></pre>

                    <h3>Pruebas</h3>
                    <p>Comprueba tu web en diferentes resoluciones, utiliza la navegación por teclado y revisa los errores de la consola del navegador.</p>
                `
            },
            {
                id: "project-security",
                title: "3. Seguridad y buenas prácticas",
                duration: "20 min",
                content: `
                    <h2>Seguridad y buenas prácticas</h2>
                    <p>Una aplicación web debe proteger los datos y evitar comportamientos inesperados.</p>

                    <h3>Principios básicos</h3>
                    <ul>
                        <li>No confiar en los datos introducidos por el usuario.</li>
                        <li>Validar la información en el servidor.</li>
                        <li>Evitar insertar contenido no confiable mediante <code>innerHTML</code>.</li>
                        <li>Utilizar HTTPS en sitios publicados.</li>
                        <li>No almacenar contraseñas en texto plano.</li>
                        <li>No incluir claves secretas en JavaScript del navegador.</li>
                    </ul>

                    <h3>Validación de formularios</h3>
                    <pre><code>const email = document.querySelector("#email");

if (!email.checkValidity()) {
    console.log("Correo no válido");
}</code></pre>

                    <p>La validación del navegador mejora la experiencia, pero no sustituye a la validación del servidor.</p>

                    <h3>Consola de desarrollo</h3>
                    <p>Las herramientas de desarrollo permiten inspeccionar elementos, comprobar estilos, revisar errores y depurar JavaScript.</p>

                    <h3>Optimización</h3>
                    <ul>
                        <li>Optimizar el tamaño de las imágenes.</li>
                        <li>Evitar código innecesario.</li>
                        <li>Reutilizar estilos.</li>
                        <li>Minimizar peticiones cuando proceda.</li>
                        <li>Probar el rendimiento en diferentes dispositivos.</li>
                    </ul>
                `
            },
            {
                id: "project-final",
                title: "4. Publicación y proyecto final",
                duration: "30 min",
                content: `
                    <h2>Publicación y proyecto final</h2>
                    <p>Una vez desarrollada y probada una web, podemos publicarla para que otras personas puedan acceder a ella.</p>

                    <h3>Proceso de desarrollo</h3>
                    <ol>
                        <li>Definir el objetivo y el público.</li>
                        <li>Diseñar la estructura de contenidos.</li>
                        <li>Crear el HTML.</li>
                        <li>Aplicar estilos con CSS.</li>
                        <li>Añadir interactividad con JavaScript.</li>
                        <li>Comprobar accesibilidad y adaptación.</li>
                        <li>Probar y corregir errores.</li>
                        <li>Publicar el proyecto.</li>
                    </ol>

                    <h3>Proyecto propuesto: portal de aula</h3>
                    <p>Desarrolla una web que permita presentar información de una asignatura o de un proyecto de clase.</p>

                    <h4>Requisitos mínimos</h4>
                    <ul>
                        <li>Una cabecera con título y navegación.</li>
                        <li>Al menos tres secciones semánticas.</li>
                        <li>Una galería de imágenes.</li>
                        <li>Una hoja CSS externa.</li>
                        <li>Diseño responsive.</li>
                        <li>Un formulario validado.</li>
                        <li>Una función JavaScript interactiva.</li>
                    </ul>

                    <div class="challenge-card">
                        <strong>Reto final</strong>
                        <p>Consigue que tu proyecto sea accesible, funcional y visualmente atractivo tanto en ordenador como en móvil.</p>
                    </div>
                `
            }
        ]
    }
];

/* ==========================================================
   3. NAVEGACIÓN Y TEMARIO
   ========================================================== */

let currentModule = 0;
let currentLesson = 0;

function renderModuleMenu() {
    const container = $("#module-list");
    if (!container) return;

    container.innerHTML = modules.map((module, index) => `
        <button class="module-button ${index === currentModule ? "active" : ""}"
                data-module="${index}">
            <span>${module.icon}</span>
            <span>${module.title}</span>
            <small>${module.lessons.length} lecciones</small>
        </button>
    `).join("");

    $$("[data-module]", container).forEach(button => {
        button.addEventListener("click", () => {
            currentModule = Number(button.dataset.module);
            currentLesson = 0;
            renderModuleMenu();
            renderLesson();
        });
    });
}

function renderLesson() {
    const module = modules[currentModule];
    const lesson = module.lessons[currentLesson];

    const lessonMenu = $("#lesson-list");
    const content = $("#lesson-content");

    if (lessonMenu) {
        lessonMenu.innerHTML = module.lessons.map((item, index) => `
            <button class="lesson-button ${
                index === currentLesson ? "active" : ""
            } ${progress.completedLessons.includes(item.id) ? "completed" : ""}"
                    data-lesson="${index}">
                <span>${progress.completedLessons.includes(item.id) ? "✓" : "○"}</span>
                ${item.title}
            </button>
        `).join("");

        $$("[data-lesson]", lessonMenu).forEach(button => {
            button.addEventListener("click", () => {
                currentLesson = Number(button.dataset.lesson);
                renderLesson();
            });
        });
    }

    if (!content) return;

    const isCompleted = progress.completedLessons.includes(lesson.id);

    content.innerHTML = `
        <div class="lesson-header">
            <div>
                <span class="eyebrow">MÓDULO ${module.number}</span>
                <h1>${lesson.title}</h1>
                <p>${module.description}</p>
            </div>
            <span class="lesson-duration">⏱ ${lesson.duration}</span>
        </div>

        <div class="lesson-body">
            ${lesson.content}
        </div>

        <div class="lesson-navigation">
            <button class="btn btn-secondary" id="previous-lesson"
                ${currentLesson === 0 ? "disabled" : ""}>
                ← Anterior
            </button>

            <button class="btn btn-primary" id="complete-lesson">
                ${isCompleted ? "✓ Lección completada" : "Marcar como completada"}
            </button>

            <button class="btn btn-secondary" id="next-lesson"
                ${currentLesson === module.lessons.length - 1 ? "disabled" : ""}>
                Siguiente →
            </button>
        </div>
    `;

    $("#previous-lesson")?.addEventListener("click", () => {
        if (currentLesson > 0) {
            currentLesson--;
            renderLesson();
        }
    });

    $("#next-lesson")?.addEventListener("click", () => {
        if (currentLesson < module.lessons.length - 1) {
            currentLesson++;
            renderLesson();
        }
    });

    $("#complete-lesson")?.addEventListener("click", () => {
        if (!progress.completedLessons.includes(lesson.id)) {
            progress.completedLessons.push(lesson.id);
            saveProgress();
            notify("¡Lección completada! +10 XP");
        } else {
            notify("Esta lección ya estaba completada.");
        }
        renderLesson();
    });
}

/* ==========================================================
   4. NAVEGACIÓN ENTRE VISTAS
   ========================================================== */

function showView(viewName) {
    const views = $$(".view, [data-view-panel]");

    views.forEach(view => {
        const viewId = view.dataset.viewPanel || view.id;
        const active = viewId === viewName ||
            viewId === `view-${viewName}`;

        view.classList.toggle("active", active);
        view.hidden = !active;
    });

    $$("[data-view]").forEach(button => {
        const active = button.dataset.view === viewName;
        button.classList.toggle("active", active);
        button.setAttribute("aria-current", active ? "page" : "false");
    });

    if (viewName === "temario") {
        renderModuleMenu();
        renderLesson();
    }

    if (viewName === "sandbox") {
        updatePreview();
    }

    if (viewName === "retos") {
        renderChallenges();
    }

    if (viewName === "quiz") {
        renderQuiz();
    }

    const sidebar = $("#sidebar");
    sidebar?.classList.remove("open");

    window.scrollTo({ top: 0, behavior: "smooth" });
}

function setupNavigation() {
    $$("[data-view]").forEach(button => {
        button.addEventListener("click", () => {
            showView(button.dataset.view);
        });
    });

    $("#menu-toggle")?.addEventListener("click", () => {
        $("#sidebar")?.classList.toggle("open");
    });
}

/* ==========================================================
   5. SANDBOX HTML, CSS Y JAVASCRIPT
   ========================================================== */

const templates = {
    blank: {
        html: `<h1>Mi primera web</h1>
<p>¡Estoy aprendiendo HTML, CSS y JavaScript!</p>
<button id="saludar">Saludar</button>
<p id="mensaje"></p>`,
        css: `body {
    font-family: Arial, sans-serif;
    padding: 30px;
    color: #222;
}

h1 {
    color: #2563eb;
}

button {
    padding: 10px 16px;
    border: none;
    border-radius: 8px;
    background: #2563eb;
    color: white;
    cursor: pointer;
}`,
        js: `document.querySelector("#saludar")
    .addEventListener("click", () => {
        document.querySelector("#mensaje").textContent =
            "¡Hola, desarrollador web!";
    });`
    },

    card: {
        html: `<main class="tarjeta">
    <span class="etiqueta">PROYECTO WEB</span>
    <h1>Mi tarjeta digital</h1>
    <p>Estoy aprendiendo a crear páginas web con HTML, CSS y JavaScript.</p>
    <button id="accion">Descubrir</button>
    <p id="resultado"></p>
</main>`,
        css: `* {
    box-sizing: border-box;
}

body {
    min-height: 100vh;
    margin: 0;
    display: grid;
    place-items: center;
    background: #eef2ff;
    font-family: Arial, sans-serif;
}

.tarjeta {
    width: min(90%, 400px);
    padding: 30px;
    background: white;
    border-radius: 18px;
    box-shadow: 0 10px 30px #0002;
}

.etiqueta {
    color: #2563eb;
    font-weight: bold;
    font-size: 12px;
}

button {
    background: #2563eb;
    color: white;
    border: 0;
    border-radius: 8px;
    padding: 12px 18px;
    cursor: pointer;
}`,
        js: `document.querySelector("#accion")
    .addEventListener("click", () => {
        document.querySelector("#resultado").textContent =
            "¡Has descubierto el poder de JavaScript!";
    });`
    },

    counter: {
        html: `<main class="contador">
    <h1>Contador interactivo</h1>
    <p id="numero">0</p>
    <div class="acciones">
        <button id="restar">−</button>
        <button id="sumar">+</button>
        <button id="reiniciar">Reiniciar</button>
    </div>
</main>`,
        css: `body {
    font-family: Arial, sans-serif;
    text-align: center;
    padding: 40px 15px;
    background: #f8fafc;
}

.contador {
    max-width: 400px;
    margin: auto;
    padding: 30px;
    background: white;
    border-radius: 18px;
    box-shadow: 0 8px 24px #0001;
}

#numero {
    font-size: 60px;
    font-weight: bold;
    color: #2563eb;
}

button {
    padding: 12px 18px;
    margin: 5px;
    border: 0;
    border-radius: 8px;
    background: #2563eb;
    color: white;
    cursor: pointer;
}`,
        js: `let contador = 0;

const numero = document.querySelector("#numero");

document.querySelector("#sumar").addEventListener("click", () => {
    contador++;
    numero.textContent = contador;
});

document.querySelector("#restar").addEventListener("click", () => {
    contador--;
    numero.textContent = contador;
});

document.querySelector("#reiniciar").addEventListener("click", () => {
    contador = 0;
    numero.textContent = contador;
});`
    },

    form: {
        html: `<main class="formulario">
    <h1>Formulario de contacto</h1>
    <form id="contacto">
        <label for="nombre">Nombre</label>
        <input id="nombre" required placeholder="Tu nombre">

        <label for="email">Correo electrónico</label>
        <input id="email" type="email" required placeholder="tu@email.com">

        <button type="submit">Enviar</button>
    </form>
    <p id="respuesta" aria-live="polite"></p>
</main>`,
        css: `body {
    font-family: Arial, sans-serif;
    background: #f1f5f9;
    padding: 25px;
}

.formulario {
    max-width: 450px;
    margin: 30px auto;
    padding: 28px;
    background: white;
    border-radius: 14px;
}

label {
    display: block;
    margin-top: 16px;
}

input {
    width: 100%;
    padding: 12px;
    margin-top: 6px;
    border: 1px solid #cbd5e1;
    border-radius: 8px;
}

button {
    margin-top: 20px;
    padding: 12px 20px;
    background: #2563eb;
    color: white;
    border: 0;
    border-radius: 8px;
    cursor: pointer;
}`,
        js: `document.querySelector("#contacto")
    .addEventListener("submit", event => {
        event.preventDefault();

        const nombre = document.querySelector("#nombre").value;

        document.querySelector("#respuesta").textContent =
            "¡Gracias por contactar, " + nombre + "!";
    });`
    }
};

function getEditorValues() {
    return {
        html: $("#editor-html")?.value ?? "",
        css: $("#editor-css")?.value ?? "",
        js: $("#editor-js")?.value ?? ""
    };
}

function updatePreview() {
    const preview = $("#preview-frame");
    if (!preview) return;

    const { html, css, js } = getEditorValues();

    const safeJS = js.replace(/<\/script/gi, "<\\/script");

    const documentContent = `<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<style>${css.replace(/<\/style/gi, "<\\/style")}</style>
</head>
<body>
${html}
<script>
try {
${safeJS}
} catch (error) {
    console.error(error);
}
<\/script>
</body>
</html>`;

    preview.srcdoc = documentContent;
}

function loadTemplate(templateName) {
    const template = templates[templateName];
    if (!template) return;

    const htmlEditor = $("#editor-html");
    const cssEditor = $("#editor-css");
    const jsEditor = $("#editor-js");

    if (htmlEditor) htmlEditor.value = template.html;
    if (cssEditor) cssEditor.value = template.css;
    if (jsEditor) jsEditor.value = template.js;

    updatePreview();
    notify("Plantilla cargada correctamente.");
}

function setupSandbox() {
    const htmlEditor = $("#editor-html");
    const cssEditor = $("#editor-css");
    const jsEditor = $("#editor-js");

    [htmlEditor, cssEditor, jsEditor].forEach(editor => {
        editor?.addEventListener("input", updatePreview);
    });

    $("#run-code")?.addEventListener("click", updatePreview);

    $("#reset-code")?.addEventListener("click", () => {
        loadTemplate("blank");
    });

    $$("[data-template]").forEach(button => {
        button.addEventListener("click", () => {
            loadTemplate(button.dataset.template);
        });
    });

    const templateSelect = $("#template-select");
    templateSelect?.addEventListener("change", () => {
        loadTemplate(templateSelect.value);
    });

    if (htmlEditor && cssEditor && jsEditor) {
        loadTemplate("blank");
    }
}

/* ==========================================================
   6. RETOS AUTOEVALUABLES
   ========================================================== */

const challenges = [
    {
        id: "challenge-html-1",
        category: "HTML",
        title: "La estructura perdida",
        difficulty: "Fácil",
        xp: 20,
        description: `
            Crea la estructura básica de una página HTML5.
            Debe contener un encabezado principal con el texto
            <strong>Mi primera página</strong> y un párrafo con
            el texto <strong>Estoy aprendiendo HTML</strong>.
        `,
        starter: `<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Mi página</title>
</head>
<body>

</body>
</html>`,
        placeholder: "Escribe aquí tu código HTML...",
        validate: code => {
            const text = code.toLowerCase();
            return {
                checks: [
                    ["Incluye DOCTYPE HTML", /<!doctype\s+html/.test(text)],
                    ["Incluye la etiqueta html", /<html\b/.test(text)],
                    ["Incluye head y body", /<head\b/.test(text) && /<body\b/.test(text)],
                    ["Incluye un h1", /<h1\b/.test(text)],
                    ["Incluye el título solicitado", /mi primera página|mi primera pagina/.test(text)],
                    ["Incluye el párrafo solicitado", /estoy aprendiendo html/.test(text)]
                ]
            };
        }
    },
    {
        id: "challenge-html-2",
        category: "HTML",
        title: "Formulario de acceso",
        difficulty: "Medio",
        xp: 30,
        description: `
            Construye un formulario de acceso con un campo para
            el usuario, otro para la contraseña y un botón de envío.
            Utiliza etiquetas <code>label</code>, <code>input</code>
            y <code>button</code>. La contraseña debe usar
            <code>type="password"</code>.
        `,
        starter: `<form>
    <!-- Escribe aquí tu formulario -->
</form>`,
        placeholder: "Construye tu formulario...",
        validate: code => {
            const text = code.toLowerCase();
            return {
                checks: [
                    ["Existe un formulario", /<form\b/.test(text)],
                    ["Incluye una etiqueta label", /<label\b/.test(text)],
                    ["Incluye un campo de texto", /<input[^>]*type\s*=\s*["']?text/.test(text)],
                    ["Incluye un campo password", /<input[^>]*type\s*=\s*["']?password/.test(text)],
                    ["Incluye un botón de envío", /<button\b/.test(text) || /<input[^>]*type\s*=\s*["']?submit/.test(text)]
                ]
            };
        }
    },
    {
        id: "challenge-css-1",
        category: "CSS",
        title: "Dale vida a una tarjeta",
        difficulty: "Fácil",
        xp: 20,
        description: `
            Escribe CSS para una clase <code>.tarjeta</code>.
            Debe tener fondo blanco, esquinas redondeadas,
            espacio interior de al menos 20px y una sombra.
        `,
        starter: `.tarjeta {
    /* Escribe tus estilos */
}`,
        placeholder: "Escribe aquí tus reglas CSS...",
        validate: code => {
            const text = code.toLowerCase();
            return {
                checks: [
                    ["Selecciona .tarjeta", /\.tarjeta\s*\{/.test(text)],
                    ["Establece un fondo blanco", /background(?:-color)?\s*:\s*(white|#fff(?:fff)?|rgb\(\s*255\s*,\s*255\s*,\s*255\s*\))/.test(text)],
                    ["Redondea las esquinas", /border-radius\s*:\s*(?!0(?:px)?\s*;)[^;]+/.test(text)],
                    ["Añade espacio interior", /padding\s*:\s*(?:2\d|[3-9]\d|\d{3,})(?:px|rem|em)/.test(text) || /padding\s*:\s*(?:[2-9]\d|\d{3,})px/.test(text)],
                    ["Incluye una sombra", /box-shadow\s*:/.test(text)]
                ]
            };
        }
    },
    {
        id: "challenge-css-2",
        category: "CSS",
        title: "Diseño adaptable",
        difficulty: "Medio",
        xp: 30,
        description: `
            Crea un contenedor con diseño Flexbox, separación
            de 15px entre elementos y una media query para
            pantallas de hasta 600px.
        `,
        starter: `.contenedor {
    /* Tu código */
}

/* Añade aquí la media query */`,
        placeholder: "Escribe CSS responsive...",
        validate: code => {
            const text = code.toLowerCase();
            return {
                checks: [
                    ["Selecciona .contenedor", /\.contenedor\s*\{/.test(text)],
                    ["Utiliza display: flex", /display\s*:\s*flex/.test(text)],
                    ["Define una separación", /gap\s*:\s*[^;]+/.test(text)],
                    ["Incluye una media query", /@media/.test(text)],
                    ["Adapta pantallas de 600px o menos", /max-width\s*:\s*600px/.test(text)]
                ]
            };
        }
    },
    {
        id: "challenge-js-1",
        category: "JavaScript",
        title: "Calculadora de suma",
        difficulty: "Fácil",
        xp: 25,
        description: `
            Crea una función llamada <code>sumar</code> que reciba
            dos parámetros y devuelva su suma utilizando
            <code>return</code>.
        `,
        starter: `// Crea aquí tu función sumar

// Ejemplo esperado:
// sumar(4, 5) devuelve 9`,
        placeholder: "Escribe tu función JavaScript...",
        validate: code => {
            const text = code.toLowerCase();
            return {
                checks: [
                    ["Declara una función sumar", /function\s+sumar\s*\(/.test(text) || /(?:const|let|var)\s+sumar\s*=\s*(?:function|\([^)]*\)\s*=>|[a-z_$][\w$]*\s*=>)/.test(text)],
                    ["Recibe dos parámetros", /sumar\s*\(\s*[\w$]+\s*,\s*[\w$]+\s*\)/.test(text)],
                    ["Utiliza return", /\breturn\b/.test(text)],
                    ["Realiza una suma", /[\w$]+\s*\+\s*[\w$]+/.test(text)]
                ]
            };
        }
    },
    {
        id: "challenge-js-2",
        category: "JavaScript",
        title: "El contador inteligente",
        difficulty: "Medio",
        xp: 35,
        description: `
            Declara una variable <code>contador</code> con valor 0.
            Crea una función <code>incrementar</code> que aumente
            su valor en 1 y utiliza <code>console.log</code> para
            mostrar el resultado.
        `,
        starter: `// Declara contador

// Crea la función incrementar

// Muestra el resultado`,
        placeholder: "Programa tu contador...",
        validate: code => {
            const text = code.toLowerCase();
            return {
                checks: [
                    ["Declara contador", /\b(let|var|const)\s+contador\b/.test(text)],
                    ["Inicializa contador a cero", /\bcontador\s*=\s*0\b/.test(text)],
                    ["Declara incrementar", /function\s+incrementar\s*\(/.test(text) || /(?:const|let|var)\s+incrementar\s*=/.test(text)],
                    ["Incrementa el contador", /contador\s*(?:\+\+|\+=\s*1|=\s*contador\s*\+\s*1)/.test(text)],
                    ["Muestra el resultado", /console\.log\s*\(/.test(text)]
                ]
            };
        }
    }
];

function renderChallenges() {
    const container = $("#challenges-container") || $("#retos-container");
    if (!container) return;

    container.innerHTML = challenges.map(challenge => {
        const completed = progress.completedChallenges.includes(challenge.id);

        return `
            <article class="challenge-card ${completed ? "completed" : ""}">
                <div class="challenge-top">
                    <span class="challenge-category">${challenge.category}</span>
                    <span class="challenge-difficulty">${challenge.difficulty}</span>
                </div>

                <h3>${challenge.title}</h3>
                <div class="challenge-description">${challenge.description}</div>

                <div class="challenge-meta">
                    <span>⭐ ${challenge.xp} XP</span>
                    <span>${completed ? "✓ Completado" : "Pendiente"}</span>
                </div>

                <button class="btn btn-primary"
                        data-open-challenge="${challenge.id}">
                    ${completed ? "Volver a practicar" : "Resolver reto"}
                </button>
            </article>
        `;
    }).join("");

    $$("[data-open-challenge]", container).forEach(button => {
        button.addEventListener("click", () => {
            openChallenge(button.dataset.openChallenge);
        });
    });
}

function openChallenge(challengeId) {
    const challenge = challenges.find(item => item.id === challengeId);
    if (!challenge) return;

    const container = $("#challenge-workspace") || $("#reto-workspace");

    if (!container) {
        notify("No se encuentra el espacio de resolución del reto.", "error");
        return;
    }

    container.hidden = false;
    container.innerHTML = `
        <div class="challenge-workspace-inner">
            <div class="challenge-workspace-header">
                <div>
                    <span class="challenge-category">${challenge.category}</span>
                    <h2>${challenge.title}</h2>
                </div>
                <button class="btn btn-secondary" id="close-challenge">
                    Cerrar ✕
                </button>
            </div>

            <div class="challenge-instructions">
                ${challenge.description}
            </div>

            <label for="challenge-code">Tu código</label>
            <textarea id="challenge-code"
                      rows="12"
                      spellcheck="false"
                      placeholder="${escapeHTML(challenge.placeholder)}">${escapeHTML(challenge.starter)}</textarea>

            <div class="challenge-actions">
                <button class="btn btn-primary" id="check-challenge">
                    Comprobar solución
                </button>
                <button class="btn btn-secondary" id="reset-challenge">
                    Restaurar código
                </button>
            </div>

            <div id="challenge-feedback" aria-live="polite"></div>
        </div>
    `;

    $("#close-challenge")?.addEventListener("click", () => {
        container.hidden = true;
    });

    $("#reset-challenge")?.addEventListener("click", () => {
        $("#challenge-code").value = challenge.starter;
        $("#challenge-feedback").innerHTML = "";
    });

    $("#check-challenge")?.addEventListener("click", () => {
        checkChallenge(challenge);
    });

    container.scrollIntoView({ behavior: "smooth", block: "start" });
}

function checkChallenge(challenge) {
    const code = $("#challenge-code")?.value || "";
    const result = challenge.validate(code);
    const checks = result.checks;

    const passed = checks.filter(item => item[1]).length;
    const total = checks.length;
    const complete = passed === total;

    const feedback = $("#challenge-feedback");
    if (!feedback) return;

    feedback.innerHTML = `
        <div class="challenge-result ${complete ? "success" : "partial"}">
            <h3>${complete ? "¡Reto superado!" : "Sigue intentándolo"}</h3>
            <p>Has superado ${passed} de ${total} comprobaciones.</p>
            <div class="checklist">
                ${checks.map(([label, success]) => `
                    <div class="check-item ${success ? "passed" : "failed"}">
                        <span>${success ? "✓" : "✗"}</span>
                        ${label}
                    </div>
                `).join("")}
            </div>
        </div>
    `;

    if (complete && !progress.completedChallenges.includes(challenge.id)) {
        progress.completedChallenges.push(challenge.id);
        saveProgress();
        renderChallenges();
        notify(`¡Reto superado! Has conseguido ${challenge.xp} XP.`);
    } else if (complete) {
        notify("¡Perfecto! Ya tenías este reto completado.");
    }
}

/* ==========================================================
   7. QUIZ DE 12 PREGUNTAS
   ========================================================== */

const quizQuestions = [
    {
        question: "¿Qué significa HTML?",
        answers: [
            "HyperText Markup Language",
            "HighText Machine Language",
            "HyperTool Multi Language",
            "Home Text Markup Language"
        ],
        correct: 0,
        explanation: "HTML significa HyperText Markup Language. Es un lenguaje de marcado."
    },
    {
        question: "¿Qué etiqueta contiene el contenido visible de una página?",
        answers: ["head", "body", "meta", "title"],
        correct: 1,
        explanation: "El elemento body contiene el contenido visible del documento."
    },
    {
        question: "¿Qué atributo proporciona un texto alternativo a una imagen?",
        answers: ["title", "src", "alt", "href"],
        correct: 2,
        explanation: "El atributo alt proporciona una alternativa textual a la imagen."
    },
    {
        question: "¿Qué etiqueta HTML representa el contenido principal?",
        answers: ["main", "aside", "footer", "span"],
        correct: 0,
        explanation: "main identifica el contenido principal del documento."
    },
    {
        question: "¿Qué propiedad CSS cambia el color del texto?",
        answers: ["background", "font-style", "color", "text-decoration"],
        correct: 2,
        explanation: "La propiedad color establece el color del texto."
    },
    {
        question: "¿Qué sistema permite distribuir elementos en dos dimensiones?",
        answers: ["Float", "CSS Grid", "Inline", "Position"],
        correct: 1,
        explanation: "CSS Grid permite organizar elementos en filas y columnas."
    },
    {
        question: "¿Qué propiedad activa Flexbox?",
        answers: [
            "position: flex",
            "display: flex",
            "flex: enabled",
            "layout: flex"
        ],
        correct: 1,
        explanation: "display: flex convierte un elemento en un contenedor flexible."
    },
    {
        question: "¿Qué unidad CSS es relativa al tamaño de fuente raíz?",
        answers: ["px", "vw", "rem", "cm"],
        correct: 2,
        explanation: "rem se calcula en relación con el tamaño de fuente del elemento raíz."
    },
    {
        question: "¿Qué palabra clave declara una variable que no se puede reasignar?",
        answers: ["var", "let", "const", "static"],
        correct: 2,
        explanation: "const impide reasignar el identificador, aunque el contenido de un objeto puede modificarse."
    },
    {
        question: "¿Qué operador compara valor y tipo sin conversión implícita?",
        answers: ["=", "==", "===", "!="],
        correct: 2,
        explanation: "El operador === realiza una comparación estricta."
    },
    {
        question: "¿Qué método permite escuchar un evento en JavaScript?",
        answers: [
            "addEventListener()",
            "createEvent()",
            "listen()",
            "eventClick()"
        ],
        correct: 0,
        explanation: "addEventListener() registra una función que se ejecutará cuando ocurra un evento."
    },
    {
        question: "¿Qué método permite guardar una cadena en el almacenamiento local del navegador?",
        answers: [
            "sessionStorage.save()",
            "localStorage.setItem()",
            "document.store()",
            "browser.write()"
        ],
        correct: 1,
        explanation: "localStorage.setItem(clave, valor) guarda una cadena en el almacenamiento local."
    }
];

let quizSubmitted = false;

function renderQuiz() {
    const container = $("#quiz-container") || $("#quiz-content");
    if (!container) return;

    quizSubmitted = false;

    const previousAnswers = progress.quizAnswers || {};

    container.innerHTML = `
        <div class="quiz-header">
            <h2>Evaluación final</h2>
            <p>12 preguntas para comprobar lo que has aprendido.</p>
            <div class="quiz-progress">
                <span id="quiz-progress-text">0 / 12 respondidas</span>
                <div class="progress-track">
                    <div class="progress-fill" id="quiz-progress-fill"></div>
                </div>
            </div>
        </div>

        <form id="quiz-form">
            ${quizQuestions.map((question, index) => `
                <article class="quiz-question" data-question="${index}">
                    <h3>
                        <span class="question-number">${index + 1}</span>
                        ${question.question}
                    </h3>

                    <div class="quiz-answers">
                        ${question.answers.map((answer, answerIndex) => `
                            <label class="quiz-option">
                                <input type="radio"
                                       name="question-${index}"
                                       value="${answerIndex}"
                                       ${Number(previousAnswers[index]) === answerIndex &&
                                         previousAnswers[index] !== undefined ? "checked" : ""}>
                                <span>${answer}</span>
                            </label>
                        `).join("")}
                    </div>

                    <div class="quiz-explanation" id="explanation-${index}"></div>
                </article>
            `).join("")}

            <div class="quiz-actions">
                <button type="submit" class="btn btn-primary" id="submit-quiz">
                    Corregir evaluación
                </button>
                <button type="button" class="btn btn-secondary" id="reset-quiz">
                    Reiniciar quiz
                </button>
            </div>
        </form>

        <div id="quiz-result" aria-live="polite"></div>
    `;

    $$('input[type="radio"]', container).forEach(input => {
        input.addEventListener("change", updateQuizProgress);
    });

    $("#quiz-form")?.addEventListener("submit", event => {
        event.preventDefault();
        submitQuiz();
    });

    $("#reset-quiz")?.addEventListener("click", resetQuiz);

    updateQuizProgress();

    if (progress.quizCompleted) {
        showQuizResult(progress.quizScore, true);
    }
}

function updateQuizProgress() {
    const answered = quizQuestions.filter((question, index) =>
        $(`input[name="question-${index}"]:checked`)
    ).length;

    const text = $("#quiz-progress-text");
    const fill = $("#quiz-progress-fill");

    if (text) text.textContent = `${answered} / ${quizQuestions.length} respondidas`;
    if (fill) fill.style.width = `${answered / quizQuestions.length * 100}%`;
}

function submitQuiz() {
    if (quizSubmitted) return;

    const answers = {};
    let answered = 0;

    quizQuestions.forEach((question, index) => {
        const selected = $(`input[name="question-${index}"]:checked`);

        if (selected) {
            answers[index] = Number(selected.value);
            answered++;
        }
    });

    if (answered < quizQuestions.length) {
        notify(`Te faltan ${quizQuestions.length - answered} preguntas por responder.`, "error");
        return;
    }

    let score = 0;

    quizQuestions.forEach((question, index) => {
        const selected = answers[index];
        const correct = selected === question.correct;

        if (correct) score++;

        const explanation = $(`#explanation-${index}`);
        if (explanation) {
            explanation.className = `quiz-explanation show ${correct ? "correct" : "incorrect"}`;
            explanation.innerHTML = `
                <strong>${correct ? "✓ Correcto" : "✗ Incorrecto"}</strong>
                <p>${question.explanation}</p>
                ${!correct ? `<p>Respuesta correcta: <strong>${escapeHTML(question.answers[question.correct])}</strong></p>` : ""}
            `;
        }

        $$(`input[name="question-${index}"]`).forEach(input => {
            input.disabled = true;
        });
    });

    quizSubmitted = true;

    progress.quizAnswers = answers;
    progress.quizCompleted = true;
    progress.quizScore = score;
    saveProgress();

    showQuizResult(score, false);
}

function showQuizResult(score, restored = false) {
    const result = $("#quiz-result");
    if (!result) return;

    const percentage = Math.round(score / quizQuestions.length * 100);

    let message = "¡Buen intento! Sigue practicando.";
    if (percentage >= 90) {
        message = "¡Excelente! Dominas los fundamentos del desarrollo web.";
    } else if (percentage >= 70) {
        message = "¡Muy bien! Tienes una buena base de desarrollo web.";
    } else if (percentage >= 50) {
        message = "¡Vas por buen camino! Repasa algunos conceptos.";
    }

    result.innerHTML = `
        <div class="quiz-result-card">
            <div class="quiz-score">${percentage}%</div>
            <h2>${score} de ${quizQuestions.length} respuestas correctas</h2>
            <p>${message}</p>
            ${restored ? "<small>Resultado recuperado de tu progreso anterior.</small>" : ""}
        </div>
    `;
}

function resetQuiz() {
    progress.quizAnswers = {};
    progress.quizCompleted = false;
    progress.quizScore = 0;

    saveProgress();
    renderQuiz();
    notify("Quiz reiniciado.");
}

/* ==========================================================
   8. PROGRESO Y ESTADÍSTICAS
   ========================================================== */

function updateDashboard() {
    const totalLessons = modules.reduce(
        (total, module) => total + module.lessons.length, 0
    );

    const completedLessons = progress.completedLessons.length;
    const completedChallenges = progress.completedChallenges.length;
    const totalChallenges = challenges.length;

    const totalActivities = totalLessons + totalChallenges + 1;
    const completedActivities = completedLessons + completedChallenges +
        (progress.quizCompleted ? 1 : 0);

    const percentage = Math.round(
        completedActivities / totalActivities * 100
    );

    const xpLessons = completedLessons * 10;
    const xpChallenges = challenges
        .filter(challenge => progress.completedChallenges.includes(challenge.id))
        .reduce((total, challenge) => total + challenge.xp, 0);

    const xpQuiz = progress.quizCompleted
        ? Math.round(progress.quizScore / quizQuestions.length * 100)
        : 0;

    const xp = xpLessons + xpChallenges + xpQuiz;

    const values = {
        "progress-percent": `${percentage}%`,
        "progress-bar": `${percentage}%`,
        "completed-lessons": completedLessons,
        "completed-challenges": `${completedChallenges}/${totalChallenges}`,
        "total-xp": xp,
        "quiz-score": progress.quizCompleted
            ? `${progress.quizScore}/${quizQuestions.length}`
            : "Pendiente"
    };

    Object.entries(values).forEach(([id, value]) => {
        const element = document.getElementById(id);
        if (!element) return;

        if (id === "progress-bar") {
            element.style.width = value;
            element.setAttribute("aria-valuenow", percentage);
        } else {
            element.textContent = value;
        }
    });

    $$("[data-progress]").forEach(element => {
        element.textContent = `${percentage}%`;
    });

    $$("[data-progress-bar]").forEach(element => {
        element.style.width = `${percentage}%`;
    });

    $$("[data-xp]").forEach(element => {
        element.textContent = xp;
    });

    const lessonCount = $("#lesson-count");
    if (lessonCount) {
        lessonCount.textContent = `${completedLessons}/${totalLessons}`;
    }

    const challengeCount = $("#challenge-count");
    if (challengeCount) {
        challengeCount.textContent = `${completedChallenges}/${totalChallenges}`;
    }
}

/* ==========================================================
   9. REINICIO DEL PROGRESO
   ========================================================== */

function setupResetProgress() {
    const resetButtons = [
        "#reset-progress",
        "#reset-all",
        "[data-reset-progress]"
    ];

    resetButtons.forEach(selector => {
        $$(selector).forEach(button => {
            button.addEventListener("click", () => {
                const confirmed = confirm(
                    "¿Seguro que quieres borrar todo tu progreso? Esta acción no se puede deshacer."
                );

                if (!confirmed) return;

                localStorage.removeItem(STORAGE_KEY);

                progress = {
                    completedLessons: [],
                    completedChallenges: [],
                    quizAnswers: {},
                    quizCompleted: false,
                    quizScore: 0
                };

                renderModuleMenu();
                renderLesson();
                renderChallenges();
                updateDashboard();

                notify("Progreso reiniciado.");
            });
        });
    });
}

/* ==========================================================
   10. INICIALIZACIÓN
   ========================================================== */

function initializeApp() {
    setupNavigation();
    setupSandbox();
    setupResetProgress();

    renderModuleMenu();
    renderLesson();
    renderChallenges();
    updateDashboard();

    const initialView = $(".view.active")?.id
        ?.replace("view-", "") || "temario";

    showView(initialView);

    console.log("🚀 Aula Web iniciada correctamente.");
}

document.addEventListener("DOMContentLoaded", initializeApp);
