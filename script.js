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
  let width = parseInt(document.getElementById("canvasWidth").value, 10);
  let height = parseInt(document.getElementById("canvasHeight").value, 10);

  // Ensure the width and height do not exceed the maximum values
  if (width > 400) width = 400;
  if (height > 200) height = 200;

  const canvas = placeStarOfDavidInCanvas(width, height);
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
}

document.getElementById("canvasWidth").addEventListener("input", drawCanvas);
document.getElementById("canvasHeight").addEventListener("input", drawCanvas);

window.addEventListener("resize", drawCanvas);

// Initial draw
drawCanvas();
