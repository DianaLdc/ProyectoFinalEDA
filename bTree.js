// B-Tree implementation placeholder

let bTreeRoot = null;

function insertValue() {
  const value = parseInt(document.getElementById("inputValue").value);
  if (!isNaN(value)) {
    bTreeRoot = bTreeInsert(bTreeRoot, value);
    drawTree(bTreeRoot);
  }
}

function deleteValue() {
  const value = parseInt(document.getElementById("inputValue").value);
  if (!isNaN(value)) {
    bTreeRoot = bTreeDelete(bTreeRoot, value);
    drawTree(bTreeRoot);
  }
}

function clearTree() {
  bTreeRoot = null;
  clearCanvas();
}

// Placeholder: Lógica de B-Tree va aquí
function bTreeInsert(node, value) {
  return node;
}

function bTreeDelete(node, value) {
  return node;
}
