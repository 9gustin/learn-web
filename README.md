# Taller Web · Brote

Guía de HTML y CSS para practicar con archivos reales en VS Code.

## Ejecutar localmente

Requiere Node.js 18 o posterior y Git.

1. Ejecutá `git clone https://github.com/9gustin/learn-web.git` y después `cd learn-web`.
2. Ejecutá `npm start`. Levanta el servidor y abre VS Code, la guía y Brote en el navegador predeterminado. No hay dependencias que instalar.
3. Seguí las instrucciones de la guía. La terminal muestra las direcciones elegidas.
4. Modificá los archivos de `brote/` desde VS Code.
5. Editá los archivos de `brote/`, guardá y recargá el navegador.

`npm run dev` inicia solamente el servidor. `npm start -- --port 4000` elige otro puerto. Si el puerto está ocupado se elige uno libre. Ctrl+C detiene el servidor. Requiere VS Code y un navegador instalados. En Windows y Linux, el comando `code` debe estar en el PATH. En macOS se usa la aplicación Visual Studio Code. Si una aplicación no se puede abrir, la terminal muestra cómo continuar manualmente.

## Archivos

- `brote/index.html` es la portada.
- `brote/pages/plantas.html` es el catálogo.
- `brote/pages/cuidados.html` contiene la guía de cuidados.
- `brote/pages/faq.html` contiene las preguntas frecuentes.
- `brote/pages/contacto.html` contiene el formulario de demostración.
- `brote/styles.css` contiene los estilos compartidos.
- `dist/index.html` y `dist/app.js` implementan la guía educativa.
- `scripts/dev.mjs` sirve la guía y los archivos editables de Brote.
- `scripts/build.mjs` copia Brote a la salida de publicación y actualiza sus referencias.

Brote viene terminado como referencia. La guía propone cambios concretos sobre esos archivos. El progreso se marca manualmente en la guía y se guarda en el navegador. La guía publicada no puede leer los archivos locales de VS Code. El formulario no envía mensajes.

Para preparar una publicación ejecutá `npm run build`. La configuración de Sites pertenece al sitio original. Clonar y ejecutar localmente no requiere una cuenta de Sites.

## Recorrido

44 temas breves en seis módulos. El selector global permite elegir cualquier tema. Cada uno separa Entender y Aplicar, con un ejemplo, una práctica en VS Code y una pista opcional. El avance anterior se conserva al actualizar.

- HTML, primeros pasos. Navegador, etiquetas, atributos, documento, metadatos y títulos.
- HTML, contenido y navegación. Jerarquía, listas, enlaces, rutas, imágenes y epígrafes.
- HTML, estructura y formularios. Semántica, contenedores, desplegables, tablas, etiquetas y campos.
- CSS, primeros estilos. Estilos en línea, hoja externa, reglas, clases, IDs y selectores.
- CSS, apariencia y espacio. Cascada, herencia, colores, texto, caja, tamaños, desbordamiento y unidades.
- CSS, distribución y pantallas. Flujo, Flexbox, Grid, responsive, posición, estados, variables e inspección. Incluye una práctica integradora.

El contenido está en `dist/lessons.js`. Cada tema tiene un ID estable para conservar el progreso aunque cambie el orden. Se puede enlazar directamente con su fragmento, por ejemplo `/#css-grid`.

## Referencias educativas

La selección de conceptos se contrastó con MDN y la propuesta de aprender mediante proyectos de freeCodeCamp. Las explicaciones y ejercicios de Brote son propios.

- [MDN, estructura HTML](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Structuring_content)
- [MDN, fundamentos de CSS](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Styling_basics)
- [MDN, distribución con CSS](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/CSS_layout)
- [freeCodeCamp, aprendizaje mediante proyectos](https://www.freecodecamp.org/news/responsive-web-design-certification-redesigned/)
