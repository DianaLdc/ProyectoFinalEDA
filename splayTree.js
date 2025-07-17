// Splay Tree implementation placeholder

let splayRoot = null;

function insertValue() {
  const value = parseInt(document.getElementById("inputValue").value);
  if (!isNaN(value)) {
    splayRoot = splayInsert(splayRoot, value);
    drawTree(splayRoot);
  }
}

function deleteValue() {
  const value = parseInt(document.getElementById("inputValue").value);
  if (!isNaN(value)) {
    splayRoot = splayDelete(splayRoot, value);
    drawTree(splayRoot);
  }
}

function clearTree() {
  splayRoot = null;
  clearCanvas();
}

// Placeholder para las funciones reales
function splayInsert(node, value) {
  // Implementa la inserción con splay aquí
  return node;
}

function splayDelete(node, value) {
  // Implementa la eliminación con splay aquí
  return node;
}
