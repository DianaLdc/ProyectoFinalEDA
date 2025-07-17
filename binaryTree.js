// Referencia al canvas y su contexto
const canvas = document.getElementById("treeCanvas");
const ctx = canvas.getContext("2d");

// Clase Nodo del Árbol Binario
class TreeNode {
  constructor(value, x = 0, y = 0) {
    this.value = value;
    this.left = null;
    this.right = null;
    this.x = x;
    this.y = y;
  }
}

// Clase Árbol Binario
class BinaryTree {
  constructor() {
    this.root = null;
  }

  insert(value) {
    this.root = this._insertNode(this.root, value);
    this.draw();
  }

  _insertNode(node, value) {
    if (node === null) return new TreeNode(value);

    if (value < node.value) node.left = this._insertNode(node.left, value);
    else if (value > node.value) node.right = this._insertNode(node.right, value);
    return node;
  }

  delete(value) {
    this.root = this._deleteNode(this.root, value);
    this.draw();
  }

  _deleteNode(node, value) {
    if (node === null) return null;

    if (value < node.value) node.left = this._deleteNode(node.left, value);
    else if (value > node.value) node.right = this._deleteNode(node.right, value);
    else {
      if (!node.left) return node.right;
      if (!node.right) return node.left;

      let minLargerNode = this._findMin(node.right);
      node.value = minLargerNode.value;
      node.right = this._deleteNode(node.right, minLargerNode.value);
    }
    return node;
  }

  _findMin(node) {
    while (node.left) node = node.left;
    return node;
  }

  clear() {
    this.root = null;
    this.draw();
  }

  draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (this.root) this._drawNode(this.root, canvas.width / 2, 40, canvas.width / 4);
  }

  _drawNode(node, x, y, offset) {
    node.x = x;
    node.y = y;

    ctx.fillStyle = "#0288d1";
    ctx.strokeStyle = "#000";
    ctx.beginPath();
    ctx.arc(x, y, 20, 0, 2 * Math.PI);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = "#fff";
    ctx.font = "16px Arial";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(node.value, x, y);

    if (node.left) {
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(x - offset, y + 60);
      ctx.stroke();
      this._drawNode(node.left, x - offset, y + 60, offset / 1.8);
    }

    if (node.right) {
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(x + offset, y + 60);
      ctx.stroke();
      this._drawNode(node.right, x + offset, y + 60, offset / 1.8);
    }
  }
}

// Instancia global del árbol
const tree = new BinaryTree();

// Funciones conectadas al HTML
function insertNode() {
  const value = parseInt(document.getElementById("inputValue").value);
  if (!isNaN(value)) {
    tree.insert(value);
    document.getElementById("inputValue").value = "";
  }
}

function deleteNode() {
  const value = parseInt(document.getElementById("inputValue").value);
  if (!isNaN(value)) {
    tree.delete(value);
    document.getElementById("inputValue").value = "";
  }
}

function clearTree() {
  tree.clear();
}
