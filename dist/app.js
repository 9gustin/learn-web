import { lessons } from './lessons.js';

const $ = id => document.getElementById(id);
const fileDescriptions = {
  'index.html': 'Portada y navegación.',
  'pages/plantas.html': 'Catálogo de plantas.',
  'pages/cuidados.html': 'Guía de cuidados.',
  'pages/faq.html': 'Preguntas frecuentes.',
  'pages/contacto.html': 'Formulario de contacto.',
  'styles.css': 'Estilos compartidos por las cinco páginas.'
};
const legacyIds = ['html-heading', 'html-links', 'html-lists', 'html-label', 'css-inline', 'css-rule', 'css-class', 'css-id'];
let state = { index: 0, done: [] };
try {
  const current = JSON.parse(localStorage.getItem('taller-brote-v2'));
  const legacy = current ? null : JSON.parse(localStorage.getItem('taller-brote-v1'));
  const selectedId = current?.lessonId || legacyIds[legacy?.index];
  const index = lessons.findIndex(lesson => lesson.id === selectedId);
  if (index >= 0) state.index = index;
  const completedIds = current?.done || legacy?.done?.map(index => legacyIds[index]) || [];
  if (Array.isArray(completedIds)) {
    state.done = lessons.flatMap((lesson, index) => completedIds.includes(lesson.id) ? [index] : []);
  }
} catch {}
const hashId = location.hash.slice(1);
const hashIndex = lessons.findIndex(lesson => lesson.id === hashId);
if (hashIndex >= 0) state.index = hashIndex;
const modules = [...new Set(lessons.map(lesson => lesson.module))];
for (const module of modules) {
  const group = document.createElement('optgroup');
  group.label = module;
  lessons.forEach((lesson, index) => {
    if (lesson.module !== module) return;
    const option = document.createElement('option');
    option.value = lesson.id;
    option.textContent = `${index + 1}. ${lesson.title}`;
    group.append(option);
  });
  $('topic').append(group);
}
function selectLesson(index) {
  state.index = index;
  save();
  render();
}
$('topic').onchange = () => selectLesson(lessons.findIndex(lesson => lesson.id === $('topic').value));
window.addEventListener('hashchange', () => {
  const index = lessons.findIndex(lesson => lesson.id === location.hash.slice(1));
  if (index >= 0) selectLesson(index);
});
let project;
let referenceFile;
function save() {
  try { localStorage.setItem('taller-brote-v2', JSON.stringify({ lessonId: lessons[state.index].id, done: state.done.map(index => lessons[index].id) })); }
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
  const moduleLessons = lessons.filter(item => item.module === lesson.module);
  $('position').textContent = `${lesson.module} · ${moduleLessons.indexOf(lesson) + 1} de ${moduleLessons.length}`;
  $('topic').value = lesson.id;
  $('reading').href = lesson.source;
  $('progress').max = lessons.length;
  history.replaceState(null, '', '#' + lesson.id);
  $('progress').value = state.done.length;
  $('count').textContent = `${state.done.length} de ${lessons.length} completados`;
  $('previous').disabled = state.index === 0;
  $('complete').textContent = state.index === lessons.length - 1 ? 'Terminé la guía ✓' : 'Lo hice · siguiente →';
  $('lessonList').replaceChildren();
  lessons.forEach((item, index) => {
    const button = document.createElement('button');
    button.textContent = `${state.done.includes(index) ? '✓' : index + 1} · ${item.title}`;
    if (index === state.index) button.setAttribute('aria-current', 'step');
    button.onclick = () => { selectLesson(index); $('roadmap').close(); };
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
    render();
    setStage(true);
    $('progress').value = state.done.length;
    $('count').textContent = `${state.done.length} de ${lessons.length} completados`;
    $('feedback').textContent = state.done.length === lessons.length ? '¡Completaste la guía! Podés repasar cualquier paso desde el recorrido.' : 'Paso completado. En el recorrido podés volver a los que te faltan.';
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
