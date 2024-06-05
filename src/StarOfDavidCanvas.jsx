import React, { useState, useEffect } from "react";
import "./App.css";

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

  const startX = Math.floor((width - starMatrixWidth) / 2);
  const startY = Math.floor((height - starMatrixHeight) / 2);

  for (let i = 0; i < starMatrix.length; i++) {
    const row = starMatrix[i];
    for (let j = 0; j < row.length; j++) {
      if (row[j] === "*" || row[j] === "0") {
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
        row += "0";
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
        row += "0";
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
        row += "0";
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

const App = () => {
  const [canvasWidth, setCanvasWidth] = useState(40);
  const [canvasHeight, setCanvasHeight] = useState(20);
  const [canvas, setCanvas] = useState([]);

  useEffect(() => {
    const generatedCanvas = placeStarOfDavidInCanvas(canvasWidth, canvasHeight);
    setCanvas(generatedCanvas);
  }, [canvasWidth, canvasHeight]);

  return (
    <div className="app">
      <div className="controls">
        <label>
          Width:
          <input
            type="number"
            value={canvasWidth}
            onChange={(e) => setCanvasWidth(Number(e.target.value))}
            min="10"
            max="100"
          />
        </label>
        <label>
          Height:
          <input
            type="number"
            value={canvasHeight}
            onChange={(e) => setCanvasHeight(Number(e.target.value))}
            min="10"
            max="100"
          />
        </label>
      </div>
      <div className="canvas-container">
        <div className="canvas-grid">
          {canvas.map((row, rowIndex) => (
            <div className="canvas-row" key={rowIndex}>
              {row.split("").map((cell, cellIndex) => (
                <div
                  key={cellIndex}
                  className={`canvas-cell ${cell === "*" ? "filled" : ""}`}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default App;
