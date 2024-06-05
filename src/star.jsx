import React, { useEffect, useRef } from "react";
import styled, { keyframes } from "styled-components";

const CanvasContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #282c34;
`;

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: scale(0.5);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
`;

const StyledCanvas = styled.canvas`
  animation: ${fadeIn} 2s ease-out;
`;

const generateCanvasContent = (width, height) => {
  // (Your existing generate functions here)
};

const createCanvas = (canvas, width, height, matrix) => {
  const ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "white";
  ctx.font = "16px monospace";

  matrix.forEach((row, rowIndex) => {
    for (let colIndex = 0; colIndex < row.length; colIndex++) {
      ctx.fillText(row[colIndex], colIndex * 10, rowIndex * 20);
    }
  });
};

const AnimatedCanvas = ({ width, height }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const matrix = generateCanvasContent(width, height);
    createCanvas(canvas, width, height, matrix);
  }, [width, height]);

  return (
    <StyledCanvas ref={canvasRef} width={width * 10} height={height * 20} />
  );
};

const App = () => {
  return (
    <CanvasContainer>
      <AnimatedCanvas width={50} height={20} />
    </CanvasContainer>
  );
};

export default App;
