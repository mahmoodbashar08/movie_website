import React, { useState, useEffect } from "react";

const RainyBackground = () => {
  const [drops, setDrops] = useState([]);

  useEffect(() => {
    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");

    const createRainDrop = () => {
      return {
        x: Math.floor(Math.random() * canvas.width),
        y: Math.floor(Math.random() * canvas.height),
        radius: Math.floor(Math.random() * 10) + 2,
        speed: Math.floor(Math.random() * 5) + 1,
      };
    };

    const drawRainDrop = (drop) => {
      ctx.beginPath();
      ctx.arc(drop.x, drop.y, drop.radius / 2, 0, 2 * Math.PI);
      ctx.fillStyle = "white";
      ctx.fill();
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < drops.length; i++) {
        let drop = drops[i];
        drop.y += drop.speed;

        if (drop.y > canvas.height) {
          drop.y = 0;
        }

        drawRainDrop(drop);
      }

      requestAnimationFrame(animate);
    };

    const startRain = () => {
      setDrops(
        Array(100)
          .fill()
          .map(() => createRainDrop())
      );
      animate();
    };

    startRain();
  }, []);

  return (
    <canvas
      style={{ backgroundColor: "black", width: "100%" }}
      id="canvas"
      width="800"
      height="600"></canvas>
  );
};

export default RainyBackground;
