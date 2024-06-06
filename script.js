function debounce(func, wait) {
  let timeout;
  return function (...args) {
    const context = this;
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(context, args), wait);
  };
}

function showLoader() {
  document.getElementById("loader").classList.remove("hidden");
}

function hideLoader() {
  document.getElementById("loader").classList.add("hidden");
}

function createCanvas(width, height) {
  const canvas = [];
  for (let i = 0; i < height; i++) {
    let row = "";
    for (let j = 0; j < width; j++) {
      if (i < height / 10 || i >= (height * 9) / 10) row += "*";
      else row += ` `;
    }
    canvas.push(row);
  }
  return canvas;
}

function placeStarOfDavidInCanvas(width, height) {
  if (width < 10 || height < 10) {
    width = 10;
    height = 10;
  }
  const canvas = createCanvas(width, height);
  const starHeight = Math.min(Math.floor(width / 4), Math.floor(height / 4));
  const starMatrix = generateStarOfDavid(starHeight);

  const starMatrixHeight = starMatrix.length;
  const starMatrixWidth = starMatrix[Math.floor(starMatrixHeight / 2)].length;

  console.log(
    "%cStar Matrix Dimensions:",
    "color: blue;",
    starMatrixWidth,
    starMatrixHeight
  );

  const startX = Math.floor((width - starMatrixWidth) / 2);
  const startY = Math.floor((height - starMatrixHeight) / 2);

  console.log("Start Position:", startX, startY);

  for (let i = 0; i < starMatrix.length; i++) {
    const row = starMatrix[i];
    for (let j = 0; j < row.length; j++) {
      if (row[j] === "*" || row[j] === "*") {
        const canvasRowIndex = startY + i;
        const canvasColIndex = startX + j;
        if (
          canvasRowIndex >= 0 &&
          canvasRowIndex < height &&
          canvasColIndex >= 0 &&
          canvasColIndex < width
        ) {
          canvas[canvasRowIndex] = replaceCharAt(
            canvas[canvasRowIndex],
            canvasColIndex,
            row[j]
          );
        }
      }
    }
  }

  return canvas;
}

function replaceCharAt(str, index, char) {
  if (index > str.length - 1) return str;
  return str.substring(0, index) + char + str.substring(index + 1);
}

function generateStarOfDavid(height) {
  if (height < 4) height = 4;
  height = Math.floor(height / 2);
  const width = 2 * height - 1;
  const spaceWidth = width;
  const matrix = [];

  generateUpperTriangles(matrix, height, width, spaceWidth);
  generateMiddleSection(matrix, height, width, spaceWidth);
  generateLowerTriangles(matrix, height, width, spaceWidth);
  return matrix;
}

function generateUpperTriangles(matrix, height, width, spaceWidth) {
  for (let i = 0; i < height; i++) {
    let row = "";
    row += " ".repeat(spaceWidth);
    for (let j = 0; j < width; j++) {
      if (i === height - 1 || j === height - i - 1 || j === height + i - 1) {
        row += "*";
      } else {
        row += " ";
      }
    }
    if (i !== height - 1) matrix.push(row);
  }
}

function generateMiddleSection(matrix, height, width, spaceWidth) {
  for (let i = 0; i < height; i++) {
    let row = "";
    for (let j = 0; j < width; j++) {
      if (j === width - i - 1 || i === 0 || j === i) {
        row += "*";
      } else {
        row += " ";
      }
    }
    if (i === 0) row += "*".repeat(spaceWidth);
    else row += " ".repeat(spaceWidth);
    for (let j = 0; j < width; j++) {
      if (i === 0 || j === i || j === width - i - 1) {
        row += "*";
      } else if (j === width - i - 1 || i === 0) {
        row += "*";
      } else {
        row += " ";
      }
    }
    matrix.push(row);
  }

  for (let i = 1; i < height; i++) {
    let row = "";
    for (let j = 0; j < width; j++) {
      if (j === height - i - 1 || j === height + i - 1 || i === height - 1) {
        row += "*";
      } else if (j === height + i - 1 || i === height - 1) {
        row += "*";
      } else {
        row += " ";
      }
    }
    if (i !== height - 1) row += " ".repeat(spaceWidth);
    else row += "*".repeat(spaceWidth);
    for (let j = 0; j < width; j++) {
      if (j === height - i - 1 || j === height + i - 1 || i === height - 1) {
        row += "*";
      } else if (j === height - i - 1 || i === height - 1) {
        row += "*";
      } else {
        row += " ";
      }
    }
    matrix.push(row);
  }
}

function generateLowerTriangles(matrix, height, width, spaceWidth) {
  for (let i = 0; i < height; i++) {
    let row = "";
    row += " ".repeat(spaceWidth);
    for (let j = 0; j < width; j++) {
      if (i === 0 || j === i || j === width - i - 1) {
        row += "*";
      } else {
        row += " ";
      }
    }
    if (i !== 0) matrix.push(row);
  }
}

function drawCanvas() {
  showLoader();
  setTimeout(() => {
    let width = parseInt(document.getElementById("canvasWidth").value, 10);
    let height = parseInt(document.getElementById("canvasHeight").value, 10);

    // Ensure the width and height do not exceed the maximum values
    if (width > 1000) width = 1000;
    if (height > 1000) height = 1000;

    const canvas = placeStarOfDavidInCanvas(width, height);
    //log the canvas
    canvas.forEach((row) => {
      console.log(row);
    });
    const canvasGrid = document.getElementById("canvasGrid");

    const container = document.getElementById("canvasContainer");
    const containerWidth = container.offsetWidth;
    const containerHeight = container.offsetHeight;

    const cellSize = Math.min(containerWidth / width, containerHeight / height);

    canvasGrid.innerHTML = "";
    canvas.forEach((row) => {
      const rowElement = document.createElement("div");
      rowElement.className = "canvas-row";
      row.split("").forEach((cell) => {
        const cellElement = document.createElement("div");
        cellElement.className = `canvas-cell ${cell === "*" ? "filled" : ""}`;
        cellElement.style.width = `${cellSize}px`;
        cellElement.style.height = `${cellSize}px`;
        rowElement.appendChild(cellElement);
      });
      canvasGrid.appendChild(rowElement);
    });

    // Display the matrix in the matrixPage
    const matrixDisplay = document.getElementById("matrixDisplay");
    matrixDisplay.textContent = canvas.join("\n");

    // Adjust font size based on matrix size
    const fontSize = Math.min(20, width / height);
    matrixDisplay.style.fontSize = `${fontSize}px`;

    hideLoader();
  }, 1000);
}

const debouncedDrawCanvas = debounce(drawCanvas, 100);

document.getElementById("startButton").addEventListener("click", drawCanvas);

// Add active class to the current nav link
document.querySelectorAll("nav a").forEach((link) => {
  link.addEventListener("click", function (event) {
    event.preventDefault();
    document.querySelectorAll("nav a").forEach((navLink) => {
      navLink.classList.remove("active");
    });
    this.classList.add("active");

    document.querySelectorAll("main > section").forEach((page) => {
      page.classList.add("hidden");
    });
    const targetPage = document.querySelector(this.getAttribute("href"));
    targetPage.classList.remove("hidden");
  });
});

function init() {
  drawCanvas();
}
