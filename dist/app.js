const $=id=>document.getElementById(id);
const lessons=[
['HTML','Tu primera estructura','Creá el título principal','HTML describe el contenido. Agregá un h1 con el texto que quieras para presentar Brote. La página debería tener un título principal claro.','<h1>Un poco más de verde en casa</h1>','<main>\n  <!-- Escribí tu título acá -->\n</main>',d=>!!d.querySelector('h1')?.textContent.trim()],
['HTML','Conectá las páginas','Sumá la navegación','Dentro de nav, agregá un enlace a ./pages/contacto.html. Una ruta relativa se resuelve desde el archivo actual. Desde una página interna usarías ../index.html para volver al inicio.','<nav><a href="./pages/contacto.html">Contacto</a></nav>','<header>\n  <strong>Brote</strong>\n  <nav></nav>\n</header>\n<main><h1>Un poco más de verde en casa</h1></main>',d=>[...d.querySelectorAll('nav a')].some(a=>['./pages/contacto.html','pages/contacto.html'].includes(a.getAttribute('href')))],
['HTML','Contenido con sentido','Creá una sección de plantas','Agregá una section con un h2 y una lista ul que tenga al menos dos plantas dentro de elementos li. Los títulos organizan el contenido para todas las personas.','<section><h2>Nuestras plantas</h2><ul><li>Monstera</li><li>Potus</li></ul></section>','<main>\n  <h1>Brote</h1>\n  <!-- Tu sección va acá -->\n</main>',d=>!!d.querySelector('section h2')&&d.querySelectorAll('section ul li').length>=2],
['HTML','Tu primera consulta','Armá un campo accesible','Agregá un label asociado mediante for al id de un input. El campo debe ser type="email" y required. Así el navegador puede comprobar el formato y exigir que se complete.','<label for="email">Tu email</label>\n<input id="email" type="email" required>','<h1>Contacto</h1>\n<form>\n  <!-- Agregá el campo y su etiqueta -->\n  <button>Enviar</button>\n</form>',d=>[...d.querySelectorAll('input[type=email][required]')].some(i=>i.id&&[...d.querySelectorAll('label')].some(l=>l.htmlFor===i.id))],
['CSS','Un primer toque de color','Probá un estilo en línea','El atributo style aplica CSS a un elemento. Agregá color: green al h1 y mirá cómo cambia. Después vamos a reutilizar estilos con selectores.','<h1 style="color: green">Brote</h1>','<h1>Brote</h1>\n<p>Un poco más de verde en casa.</p>',d=>d.querySelector('h1')?.style.color==='green'],
['CSS','Estilos compartidos','Dale color al título','Ahora trabajás en styles.css. Seleccioná h1 y asignale color: #193e30. Una hoja externa se conecta con link rel="stylesheet" y permite reutilizar reglas entre las cinco páginas.','h1 { color: #193e30; }','/* Escribí tu regla */',(_,s)=>checkRule(s,'h1','color','#193e30')],
['CSS','Una clase, muchos elementos','Estilizá los botones','La clase boton ya está en los enlaces del ejemplo. Creá .boton con background: #193e30 y color: white. Las clases se pueden repetir en varios elementos.','.boton { background: #193e30; color: white; }','h1 { color: #193e30; }\n\n/* Tu clase acá */',(_,s)=>checkRule(s,'.boton','background','#193e30')&&checkRule(s,'.boton','color','white')],
['CSS','Un elemento único','Destacá la portada','El hero tiene id="portada". Usá #portada para agregar padding: 32px. El padding crea espacio interior. Un ID debe ser único dentro de cada página.','#portada { padding: 32px; }','h1 { color: #193e30; }\n.boton { background: #193e30; color: white; }\n',(_,s)=>checkRule(s,'#portada','padding','32px')]
];
function checkRule(source,selector,property,value){try{const sheet=new CSSStyleSheet();sheet.replaceSync(source);return [...sheet.cssRules].some(r=>r.selectorText===selector&&r.style?.getPropertyValue(property).trim()===value)}catch{return false}}
const teaching = [
  {goal:'Al terminar vas a poder agregar el título principal de una página.', explanation:'HTML usa etiquetas para darle significado al contenido. <h1> abre un título principal y </h1> lo cierra. El texto entre ambas etiquetas es lo que muestra el navegador. <main> contiene el contenido principal.', example:'<main>\n  <h1>Bienvenidos a mi tienda</h1>\n</main>', detail:'main agrupa el contenido. h1 indica qué texto es el título más importante. Las etiquetas no se muestran en la página.', expected:'Deberías ver tu título con el tamaño que le da el navegador.'},
  {goal:'Al terminar vas a poder conectar dos archivos HTML mediante un enlace.', explanation:'nav agrupa la navegación. a crea un enlace y href indica el destino. Desde index.html, ./pages/contacto.html significa entrar en la carpeta pages y abrir contacto.html. El texto entre <a> y </a> es lo que se puede pulsar.', example:'<nav>\n  <a href="./pages/faq.html">Preguntas frecuentes</a>\n</nav>', detail:'Este ejemplo apunta a FAQ. Para tu ejercicio tenés que cambiar el destino y el texto para ir a Contacto. Desde pages/contacto.html, ../index.html vuelve a la carpeta superior.', expected:'Deberías ver un enlace Contacto dentro de la navegación. La preview aísla el ejercicio; las páginas completas se recorren desde Ver Brote terminado.'},
  {goal:'Al terminar vas a poder agrupar contenido relacionado y crear una lista.', explanation:'section agrupa un tema. h2 le da un subtítulo debajo del h1. ul abre una lista sin orden numérico y cada li representa un elemento. Cada etiqueta abierta tiene que cerrarse en el orden correcto.', example:'<section>\n  <h2>Accesorios</h2>\n  <ul>\n    <li>Macetas</li>\n    <li>Regaderas</li>\n  </ul>\n</section>', detail:'La lista está dentro de la sección. Cada accesorio está dentro de su propio li. Vas a aplicar la misma estructura a las plantas.', expected:'Deberías ver un subtítulo y al menos dos plantas con viñetas.'},
  {goal:'Al terminar vas a poder pedir un email con una etiqueta accesible.', explanation:'input crea el campo. type="email" indica su formato y required lo hace obligatorio. label nombra el campo. Su atributo for debe coincidir exactamente con el id del input para asociarlos.', example:'<label for="nombre">Tu nombre</label>\n<input id="nombre" type="text" required>', detail:'for="nombre" conecta la etiqueta con id="nombre". En el ejercicio vas a usar un campo de email y mantener esa coincidencia. No escribas datos personales reales en la práctica.', expected:'Deberías ver una etiqueta y un campo de email. La demostración no envía mensajes.'},
  {goal:'Al terminar vas a poder cambiar el color de un elemento desde su HTML.', explanation:'style es un atributo de HTML que recibe declaraciones CSS. Cada declaración tiene una propiedad, dos puntos y un valor. color cambia el color del texto. El punto y coma separa las declaraciones.', example:'<p style="color: blue">Una frase azul</p>', detail:'La propiedad color afecta solamente a este párrafo. En tu ejercicio aplicás la misma idea al h1 y elegís green.', expected:'Deberías ver el título Brote en verde.'},
  {goal:'Al terminar vas a poder escribir una regla CSS en una hoja compartida.', explanation:'Una regla combina un selector y declaraciones entre llaves. h1 selecciona los títulos h1. La hoja styles.css se vincula desde el head de cada HTML con <link rel="stylesheet" href="styles.css">. Las páginas de pages usan ../styles.css.', example:'p {\n  color: #555555;\n}', detail:'p selecciona los párrafos. color define su color. En el ejercicio vas a seleccionar h1. El HTML de referencia queda disponible en el explorador para que veas qué estás estilizando.', expected:'Deberías ver el título en verde oscuro. Los estilos que todavía no escribiste siguen con el aspecto del navegador.'},
  {goal:'Al terminar vas a poder reutilizar un mismo estilo con una clase.', explanation:'En HTML, class="boton" asigna un nombre a un elemento. En CSS, .boton selecciona todos los elementos con esa clase. El punto va en el selector CSS. background cambia el fondo y color cambia el texto.', example:'<!-- HTML -->\n<a class="aviso">Novedades</a>\n\n/* CSS */\n.aviso {\n  background: orange;\n  color: black;\n}', detail:'El nombre aviso conecta ambos fragmentos. En Brote el enlace Ver plantas ya tiene class="boton". Abrí index.html en el explorador para encontrarlo.', expected:'Deberías ver Ver plantas con fondo verde oscuro y texto blanco.'},
  {goal:'Al terminar vas a poder seleccionar un elemento único y darle espacio interior.', explanation:'id="portada" identifica una sección. El selector #portada usa ese ID para encontrarla. padding agrega espacio entre el borde del elemento y su contenido. px es una unidad de longitud.', example:'/* HTML de referencia: <section id="ofertas"> */\n#ofertas {\n  padding: 16px;\n}', detail:'El numeral selecciona un ID. 16px agrega espacio en los cuatro lados. En Brote usás #portada y el valor pedido de 32px.', expected:'Deberías ver espacio interior alrededor del contenido de la portada.'}
];
const localTasks = [
  'Abrí brote/index.html. Buscá el h1 de la portada y cambiá su texto por «Mi rincón verde». Conservá las etiquetas de apertura y cierre.',
  'Abrí brote/index.html. Dentro de nav, encontrá el enlace a Contacto. Cambiá su texto a «Escribinos» y su href a ./pages/contacto.html. Hacé clic en él desde tu Brote local.',
  'Abrí brote/index.html. Antes del cierre de main, agregá una section con el h2 «Mis favoritas» y una lista ul con dos plantas en elementos li.',
  'Abrí brote/pages/contacto.html. El input de email ya tiene type="email" y required. Agregale id="email" y a su label agregale for="email". Luego pulsá la etiqueta para comprobar que activa el campo.',
  'Abrí brote/index.html. Agregá style="color: green" al h1 de la portada. Observá cómo el estilo en línea cambia el color del título.',
  'En brote/index.html, quitá el style del h1 que agregaste antes. Abrí brote/styles.css y agregá al final h1 { color: #193e30; }. Abrí otra página de Brote y observá que sus títulos comparten ese color.',
  'Abrí brote/styles.css. Al final, agregá una regla .boton con background: #193e30 y color: white. En brote/index.html, buscá class="boton" para entender qué enlace recibe el estilo.',
  'Abrí brote/styles.css y agregá #portada { padding: 32px; }. En brote/index.html comprobá que la sección hero tiene id="portada". Observá el espacio interior nuevo.'
];
teaching[0].expected = 'El título principal de tu Brote local dice «Mi rincón verde».';
teaching[1].expected = 'El enlace dice «Escribinos» y abre la página Contacto.';
teaching[2].expected = 'Al final de la portada aparece Mis favoritas con dos plantas en una lista.';
teaching[3].expected = 'Al pulsar la etiqueta Email, el cursor se coloca en el campo de email.';
const fileInfo = {
  'index.html':'Portada de Brote. Contiene la navegación, la sección portada y el enlace con class="boton".',
  'pages/plantas.html':'Catálogo de plantas. Comparte styles.css con las otras páginas.',
  'pages/cuidados.html':'Guía de cuidados con secciones y subtítulos.',
  'pages/faq.html':'Preguntas frecuentes con details y summary.',
  'pages/contacto.html':'Formulario de ejemplo. Es el archivo que practicás en el paso 4.',
  'styles.css':'Hoja de estilos compartida. Desde index.html se enlaza como styles.css y desde pages como ../styles.css.'
};
let state = {index:0, codes:{}, done:[], view:'split'};
try {
  const saved = JSON.parse(localStorage.getItem('taller-brote-v1'));
  if (saved && Number.isInteger(saved.index) && saved.index >= 0 && saved.index < lessons.length) {
    state = {...state, ...saved, codes:saved.codes || {}, done:Array.isArray(saved.done) ? saved.done : []};
  }
} catch {}
let project;
let referenceFile = null;
function exerciseFile() {
  if (state.index === 3) return 'pages/contacto.html';
  return state.index > 4 ? 'styles.css' : 'index.html';
}
function save() {
  try { localStorage.setItem('taller-brote-v1', JSON.stringify(state)); }
  catch { $('feedback').textContent = 'El navegador no permite guardar el avance.'; }
}
function exerciseCode() { return state.codes[state.index] ?? lessons[state.index][5]; }
function showCode() {
  const file = referenceFile || exerciseFile();
  $('filename').textContent = file + (referenceFile ? ' · referencia terminada' : ' · abrilo en VS Code');
  $('code').value = project.files[file];
  $('code').readOnly = true;
  $('code').setAttribute('aria-label', referenceFile ? 'Código de referencia' : 'Editor del ejercicio');
  $('backToExercise').hidden = !referenceFile;
  $('fileDescription').textContent = fileInfo[file] + (referenceFile ? ' Estás leyendo la versión terminada.' : ' Abrí brote/' + file + ' en VS Code para hacer la práctica.');
  $('check').disabled = false;
  $('reset').disabled = false;
  $('files').replaceChildren();
  Object.keys(fileInfo).forEach(path => {
    const button = document.createElement('button');
    button.textContent = path + (path === exerciseFile() ? ' · Ejercicio' : '');
    button.className = path === file ? 'active' : '';
    button.onclick = () => { referenceFile = path === exerciseFile() ? null : path; showCode(); setView('split'); };
    $('files').append(button);
  });
}
function render() {
  const lesson = lessons[state.index];
  const content = teaching[state.index];
  referenceFile = null;
  $('title').textContent = state.index < 4 ? 'Clase 1 · HTML' : 'Clase 2 · CSS básico';
  $('task').textContent = lesson[2];
  $('goal').textContent = content.goal;
  $('explanation').textContent = content.explanation;
  $('example').textContent = content.example;
  $('exampleExplanation').textContent = content.detail;
  $('expected').textContent = content.expected;
  $('description').textContent = localTasks[state.index];
  $('hint').textContent = lesson[4];
  $('hint').hidden = true;
  $('step').textContent = `Paso ${state.index % 4 + 1} de 4 · ${exerciseFile()}`;
  $('feedback').textContent = '';
  $('lessons').replaceChildren();
  lessons.forEach((lesson, index) => {
    const button = document.createElement('button');
    button.textContent = `${state.done.includes(index) ? '✓' : String(index + 1).padStart(2,'0')} ${lesson[1]}`;
    button.className = index === state.index ? 'active' : '';
    button.onclick = () => { state.index = index; save(); render(); };
    $('lessons').append(button);
  });
  $('progress').value = state.done.length;
  $('count').textContent = `${state.done.length} de 8 ejercicios completados`;
  $('next').disabled = state.index === 7;
  showCode();
  setView(state.view);
  preview();
}
function preview() {
  $('preview').removeAttribute('srcdoc');
  $('preview').src = 'brote/' + (state.index === 3 ? 'pages/contacto.html' : 'index.html');
}
function setView(view) {
  state.view = ['split','editor','preview'].includes(view) ? view : 'split';
  document.body.dataset.view = state.view;
  document.querySelectorAll('[data-view]').forEach(button => {
    if (button.tagName !== 'BUTTON') return;
    button.classList.toggle('active', button.dataset.view === state.view);
    button.setAttribute('aria-pressed', String(button.dataset.view === state.view));
  });
  save();
}
$('showHint').onclick = () => { $('hint').hidden = !$('hint').hidden; };
$('backToExercise').onclick = () => { referenceFile = null; showCode(); };
$('size').onchange = () => { $('preview').style.width = $('size').value; $('preview').style.maxWidth = '100%'; };
document.querySelectorAll('button[data-view]').forEach(button => { button.onclick = () => setView(button.dataset.view); });
$('focus').onclick = () => { const active = document.body.classList.toggle('focus'); $('focus').textContent = active ? 'Mostrar mapa y recorrido' : 'Ampliar espacio'; };
$('next').onclick = () => { if (state.index < 7) { state.index++; save(); render(); } };
$('reset').onclick = () => { delete state.codes[state.index]; state.done = state.done.filter(index => index !== state.index); save(); render(); };
$('check').onclick = () => {
  if (!state.done.includes(state.index)) state.done.push(state.index);
  save(); render();
  $('feedback').textContent = '✓ Paso marcado por vos. La guía no verifica los archivos de VS Code.';
};
fetch('project.json').then(response => {
  if (!response.ok) throw new Error('No se pudo cargar el proyecto');
  return response.json();
}).then(data => { project = data; render(); }).catch(() => {
  $('feedback').textContent = 'No se pudo cargar el proyecto. Recargá la página desde el servidor local o Sites.';
});
