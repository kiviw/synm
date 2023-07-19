const canvas = document.getElementById('matrix');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const cols = Math.floor(canvas.width / 20);
const rows = Math.floor(canvas.height / 20);

const matrix = createMatrix(cols, rows);

const link = 'cryptosynapse.ru'; // Hidden link

function createMatrix(cols, rows) {
  const matrix = [];
  for (let i = 0; i < cols; i++) {
    matrix[i] = [];
    for (let j = 0; j < rows; j++) {
      matrix[i][j] = getRandomCharacter();
    }
  }
  return matrix;
}

function draw() {
  ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = '#00FF00'; // Green color

  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      ctx.fillText(matrix[i][j], i * 20, j * 20);
      if (j * 20 > canvas.height && Math.random() > 0.975) {
        matrix[i][j] = getRandomCharacter();
      }
    }
    matrix[i][rows - 1] = getRandomCharacter();
  }

  requestAnimationFrame(draw);
}

function getRandomCharacter() {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  return characters[Math.floor(Math.random() * characters.length)];
}

function addLink() {
  const linkCols = Math.floor(link.length / rows);
  const startIndex = Math.floor(Math.random() * (cols - linkCols));

  for (let i = 0; i < link.length; i++) {
    matrix[startIndex + i][0] = link.charAt(i);
  }
}

// Initial setup
addLink();
draw();

// Re-add link after 1 minute
setTimeout(() => {
  addLink();
}, 60000);
    
