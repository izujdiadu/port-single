import React, { useRef, useEffect, useState } from "react";

const DrawingBackground = () => {
  const canvasRef = useRef(null);
  const ctxRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const ctx = canvas.getContext("2d");
    ctx.strokeStyle = "white"; // Couleur du trait
    ctx.lineWidth = 3; // Épaisseur du trait
    ctx.lineJoin = "round";
    ctx.lineCap = "round";

    ctxRef.current = ctx;
  }, []);

  const startDrawing = (e) => {
    const ctx = ctxRef.current;
    if (!ctx) return;

    setIsDrawing(true);
    ctx.beginPath();
    ctx.moveTo(e.clientX, e.clientY);
  };

  const draw = (e) => {
    const ctx = ctxRef.current;
    if (!isDrawing || !ctx) return;

    ctx.lineTo(e.clientX, e.clientY);
    ctx.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  return (
    <canvas
      ref={canvasRef}
      onMouseDown={startDrawing}
      onMouseMove={draw}
      onMouseUp={stopDrawing}
      onMouseLeave={stopDrawing}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        zIndex: 0, // Derrière tout le reste
        pointerEvents: "none", // Permet de cliquer sur les boutons normalement
      }}
    />
  );
};

export default DrawingBackground;
