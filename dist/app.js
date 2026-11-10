const $ = id => document.getElementById(id);
const lessons = [
  {
    title: 'El título principal',
    explanation: 'h1 marca el título principal de una página. Escribís el texto entre la etiqueta de apertura y la de cierre.',
    example: '<h1>Mi tienda de plantas</h1>',
    caption: 'El navegador muestra el texto. Las etiquetas le dan significado.',
    taskTitle: 'Poné tu propio título', file: 'index.html',
    task: 'Buscá el h1 de la portada y cambiá su texto por “Mi rincón verde”.',
    expected: 'El título de la portada debe decir “Mi rincón verde”.',
    solution: '<h1>Mi rincón verde</h1>'
  },
  {
    title: 'Un enlace a otra página',
    explanation: 'a crea un enlace. href indica el archivo de destino y el texto entre las etiquetas es lo que se puede pulsar.',
    example: '<a href="./pages/faq.html">Preguntas</a>',
    caption: './pages/ significa entrar en la carpeta pages desde index.html.',
    taskTitle: 'Conectá con Contacto', file: 'index.html',
    task: 'Dentro de nav, cambiá el enlace Contacto para que diga “Escribinos” y apunte a ./pages/contacto.html.',
    expected: 'Al pulsar “Escribinos”, se abre Contacto.',
    solution: '<a href="./pages/contacto.html">Escribinos</a>'
  },
  {
    title: 'Una lista de elementos',
    explanation: 'ul agrupa una lista con viñetas. Cada elemento de la lista va dentro de un li.',
    example: '<ul>\n  <li>Macetas</li>\n  <li>Regaderas</li>\n</ul>',
    caption: 'Una etiqueta li por cada elemento.',
    taskTitle: 'Listá tus plantas favoritas', file: 'index.html',
    task: 'Justo antes de </main>, agregá una lista ul con dos plantas que te gusten.',
    expected: 'Al final del contenido aparecen tus dos plantas con viñetas.',
    solution: '<ul>\n  <li>Monstera</li>\n  <li>Potus</li>\n</ul>'
  },
  {
    title: 'La etiqueta de un campo',
    explanation: 'label nombra un campo. Su atributo for se conecta con el id del input cuando ambos tienen el mismo valor.',
    example: '<label for="nombre">Nombre</label>\n<input id="nombre">',
    caption: 'Pulsar la etiqueta activa el campo asociado.',
    taskTitle: 'Conectá la etiqueta Email', file: 'pages/contacto.html',
    task: 'Agregá id="email" al input de email y for="email" a su label.',
    expected: 'Al pulsar “Email”, el cursor se coloca en ese campo.',
    solution: '<label for="email">Email\n  <input id="email" required type="email"\n    name="email" autocomplete="email">\n</label>'
  },
  {
    title: 'Un estilo en el HTML',
    explanation: 'El atributo style cambia el aspecto de un elemento. color es la propiedad y blue es el valor.',
    example: '<p style="color: blue">Texto azul</p>',
    caption: 'Esta declaración afecta solamente a ese párrafo.',
    taskTitle: 'Pintá el título de verde', file: 'index.html',
    task: 'Agregá style="color: green" al h1 de la portada.',
    expected: 'El título se ve verde.',
    solution: '<h1 style="color: green">Mi rincón verde</h1>'
  },
  {
    title: 'Una regla en CSS',
    explanation: 'Una regla elige elementos y les aplica estilos. El selector p elige los párrafos. Entre llaves escribís qué cambiar.',
    example: 'p {\n  color: blue;\n}',
    caption: 'Brote ya conecta sus páginas con styles.css mediante una etiqueta link.',
    taskTitle: 'Compartí el color del título', file: 'styles.css',
    task: 'Quitá el style del h1 en index.html. Después, al final de styles.css, agregá una regla h1 con color: #193e30.',
    expected: 'Los títulos principales de Brote se ven verde oscuro.',
    solution: 'h1 {\n  color: #193e30;\n}'
  },
  {
    title: 'Una clase reutilizable',
    explanation: 'class asigna un nombre a un elemento. En CSS, un punto seguido de ese nombre selecciona todos los elementos con esa clase.',
    example: '<a class="aviso">Novedades</a>\n\n/* En styles.css */\n.aviso { color: blue; }',
    caption: 'En HTML escribís aviso. En CSS escribís .aviso.',
    taskTitle: 'Dale color al botón', file: 'styles.css',
    task: 'Agregá al final una regla .boton con background: #193e30 y color: white. El enlace “Ver plantas” ya tiene esa clase.',
    expected: '“Ver plantas” tiene fondo verde oscuro y texto blanco.',
    solution: '.boton {\n  background: #193e30;\n  color: white;\n}'
  },
  {
    title: 'Un elemento por su ID',
    explanation: 'id identifica un elemento único. En CSS lo seleccionás con #. La propiedad padding agrega espacio interior.',
    example: '<section id="ofertas">…</section>\n\n/* En styles.css */\n#ofertas { padding: 16px; }',
    caption: '16px agrega espacio en los cuatro lados.',
    taskTitle: 'Dale aire a la portada', file: 'styles.css',
    task: 'Agregá al final #portada { padding: 32px; }. La sección de portada ya tiene id="portada".',
    expected: 'Aparece espacio interior alrededor del contenido de la portada.',
    solution: '#portada {\n  padding: 32px;\n}'
  }
];
const fileDescriptions = {
  'index.html': 'Portada y navegación.',
  'pages/plantas.html': 'Catálogo de plantas.',
  'pages/cuidados.html': 'Guía de cuidados.',
  'pages/faq.html': 'Preguntas frecuentes.',
  'pages/contacto.html': 'Formulario de contacto.',
  'styles.css': 'Estilos compartidos por las cinco páginas.'
};
let state = { index: 0, done: [] };
try {
  const saved = JSON.parse(localStorage.getItem('taller-brote-v1'));
  if (saved) {
    if (Number.isInteger(saved.index) && lessons[saved.index]) state.index = saved.index;
    if (Array.isArray(saved.done)) state.done = [...new Set(saved.done.filter(index => Number.isInteger(index) && lessons[index]))];
  }
} catch {}
let project;
let referenceFile;
function save() {
  try { localStorage.setItem('taller-brote-v1', JSON.stringify(state)); }
  catch { $('feedback').textContent = 'El navegador no pudo guardar tu avance.'; }
}
function setStage(practice, focus = false) {
  $('theory').hidden = practice;
  $('practice').hidden = !practice;
  $('theoryTab').setAttribute('aria-pressed', String(!practice));
  $('practiceTab').setAttribute('aria-pressed', String(practice));
  if (focus) $(practice ? 'practiceTab' : 'theoryTab').focus();
}
function render() {
  const lesson = lessons[state.index];
  for (const key of ['title', 'explanation', 'example', 'caption', 'taskTitle', 'task', 'expected']) $(key).textContent = lesson[key];
  $('file').textContent = 'brote/' + lesson.file;
  $('solution').textContent = lesson.solution;
  $('hint').open = false;
  $('feedback').textContent = '';
  $('position').textContent = `Clase ${state.index < 4 ? '1 · HTML' : '2 · CSS'} / Paso ${state.index % 4 + 1} de 4`;
  $('progress').value = state.done.length;
  $('count').textContent = `${state.done.length} de 8 completados`;
  $('previous').disabled = state.index === 0;
  $('complete').textContent = state.index === lessons.length - 1 ? 'Terminé la guía ✓' : 'Lo hice · siguiente →';
  $('lessonList').replaceChildren();
  lessons.forEach((item, index) => {
    const button = document.createElement('button');
    button.textContent = `${state.done.includes(index) ? '✓' : index + 1} · ${item.title}`;
    if (index === state.index) button.setAttribute('aria-current', 'step');
    button.onclick = () => { state.index = index; save(); render(); $('roadmap').close(); };
    $('lessonList').append(button);
  });
  setStage(false);
}
function showFile(file) {
  referenceFile = file;
  $('fileInfo').textContent = 'brote/' + file + ' · ' + fileDescriptions[file];
  $('source').textContent = project ? project.files[file] : 'Cargando referencia…';
}
Object.keys(fileDescriptions).forEach(file => {
  const button = document.createElement('button');
  button.textContent = file;
  button.onclick = () => showFile(file);
  $('files').append(button);
});
document.querySelectorAll('[data-dialog]').forEach(button => {
  button.onclick = () => {
    const id = button.dataset.dialog;
    if (id === 'map') showFile(lessons[state.index].file);
    if (id === 'reference') $('preview').src = 'brote/';
    $(id).showModal();
  };
});
document.querySelectorAll('[data-close]').forEach(button => {
  button.onclick = () => button.closest('dialog').close();
});
$('apply').onclick = () => setStage(true, true);
$('practiceTab').onclick = () => setStage(true);
$('theoryTab').onclick = () => setStage(false);
$('back').onclick = () => setStage(false, true);
$('previous').onclick = () => { if (state.index > 0) { state.index--; save(); render(); } };
$('complete').onclick = () => {
  if (!state.done.includes(state.index)) state.done.push(state.index);
  if (state.index < lessons.length - 1) {
    state.index++;
    save(); render(); $('theoryTab').focus();
  } else {
    save();
    $('progress').value = state.done.length;
    $('count').textContent = `${state.done.length} de 8 completados`;
    $('feedback').textContent = state.done.length === 8 ? '¡Completaste la guía! Podés repasar cualquier paso desde el recorrido.' : 'Paso completado. En el recorrido podés volver a los que te faltan.';
  }
};
$('uncomplete').onclick = () => {
  state.done = state.done.filter(index => index !== state.index);
  save(); render();
};
$('desktop').onclick = () => { $('preview').style.width = '100%'; };
$('mobile').onclick = () => { $('preview').style.width = '375px'; };
render();
fetch('project.json').then(response => {
  if (!response.ok) throw new Error('Referencia no disponible');
  return response.json();
}).then(data => { project = data; if (referenceFile) showFile(referenceFile); }).catch(() => {
  $('source').textContent = 'No se pudo cargar la referencia. Podés abrir los archivos en VS Code.';
});
