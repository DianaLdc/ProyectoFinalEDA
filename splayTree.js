class Node {
    constructor(value) {
        this.value = value;
        this.left = null;
        this.right = null;
    }
}

function rotateRight(x) {
    let y = x.left;
    x.left = y.right;
    y.right = x;
    return y;
}

function rotateLeft(x) {
    let y = x.right;
    x.right = y.left;
    y.left = x;
    return y;
}

function splay(root, value) {
    if (!root || root.value === value) return root;

    // Zig-Zig (left-left)
    if (value < root.value) {
        if (!root.left) return root;
        if (value < root.left.value) {
            root.left.left = splay(root.left.left, value);
            root = rotateRight(root);
        } else if (value > root.left.value) { // Zig-Zag (left-right)
            root.left.right = splay(root.left.right, value);
            if (root.left.right) {
                root.left = rotateLeft(root.left);
            }
        }
        return root.left ? rotateRight(root) : root;
    } else { // value > root.value
        if (!root.right) return root;
        if (value > root.right.value) { // Zag-Zag (right-right)
            root.right.right = splay(root.right.right, value);
            root = rotateLeft(root);
        } else if (value < root.right.value) { // Zag-Zig (right-left)
            root.right.left = splay(root.right.left, value);
            if (root.right.left) {
                root.right = rotateRight(root.right);
            }
        }
        return root.right ? rotateLeft(root) : root;
    }
}

function splayInsert(root, value) {
    if (!root) return new Node(value);
    root = splay(root, value);
    if (root.value === value) return root; 

    let newNode = new Node(value);
    if (value < root.value) {
        newNode.right = root;
        newNode.left = root.left;
        root.left = null;
    } else {
        newNode.left = root;
        newNode.right = root.right;
        root.right = null;
    }
    return newNode;
}

function splayDelete(root, value) {
    if (!root) return null;
    root = splay(root, value);
    if (root.value !== value) return root;

    if (!root.left) {
        return root.right;
    } else {
        let newRoot = splay(root.left, value);
        newRoot.right = root.right;
        return newRoot;
    }
}

const canvas = document.getElementById("treeCanvas");
const ctx = canvas.getContext("2d");

function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function drawTree(root) {
    clearCanvas();
    if (!root) return;
    drawNode(root, canvas.width / 2, 40, canvas.width / 4);
}

function drawNode(node, x, y, offset) {
    if (!node) return;
    ctx.beginPath();
    ctx.arc(x, y, 20, 0, 2 * Math.PI);
    ctx.fillStyle = "#90caf9";
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = "#000";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.font = "16px Arial";
    ctx.fillText(node.value, x, y);

    if (node.left) {
        ctx.beginPath();
        ctx.moveTo(x, y + 20);
        ctx.lineTo(x - offset, y + 80 - 20);
        ctx.stroke();
        drawNode(node.left, x - offset, y + 80, offset / 2);
    }

    if (node.right) {
        ctx.beginPath();
        ctx.moveTo(x, y + 20);
        ctx.lineTo(x + offset, y + 80 - 20);
        ctx.stroke();
        drawNode(node.right, x + offset, y + 80, offset / 2);
    }
}

function insertNode() {
    const value = parseInt(document.getElementById("inputValue").value);
    if (!isNaN(value)) {
        splayRoot = splayInsert(splayRoot, value);
        drawTree(splayRoot);
    }
}

function deleteNode() {
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
