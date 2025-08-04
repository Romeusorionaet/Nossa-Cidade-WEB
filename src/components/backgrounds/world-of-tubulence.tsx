"use client";

import { useEffect, useRef } from "react";

export function WorldOfTurbulence() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let width = canvas.width;
    let height = canvas.height;
    let dataToImageRatio = Math.max(width, height) / 1000;
    let xC = width / 2;
    let yC = height / 2;
    let stepCount = 0;

    ctx.globalCompositeOperation = "darken";
    ctx.imageSmoothingEnabled = false;

    const lifespan = 300;
    const popPerBirth = 5;
    const maxPop = 1500;
    const birthFreq = 1;

    interface Particle {
      hue: number;
      sat: number;
      lum: number;
      x: number;
      y: number;
      xLast: number;
      yLast: number;
      xSpeed: number;
      ySpeed: number;
      age: number;
      name: string;
      speed?: number;
    }

    let particles: Particle[] = [];

    const segmentAngleRad = (
      Xstart: number,
      Ystart: number,
      Xtarget: number,
      Ytarget: number,
      realOrWeb: boolean,
    ): number => {
      // biome-ignore lint/suspicious/noImplicitAnyLet: <explanation>
      let result;
      if (Xstart === Xtarget) {
        if (Ystart === Ytarget) {
          result = 0;
        } else if (Ystart < Ytarget) {
          result = Math.PI / 2;
        } else {
          result = (3 * Math.PI) / 2;
        }
      } else if (Xstart < Xtarget) {
        result = Math.atan((Ytarget - Ystart) / (Xtarget - Xstart));
      } else {
        result = Math.PI + Math.atan((Ytarget - Ystart) / (Xtarget - Xstart));
      }
      result = (result + 2 * Math.PI) % (2 * Math.PI);
      if (!realOrWeb) {
        result = 2 * Math.PI - result;
      }
      return result;
    };

    const dataXYtoCanvasXY = (x: number, y: number) => {
      const zoom = 0.72;
      // biome-ignore lint/style/useConst: <explanation>
      let xx = xC + x * zoom * dataToImageRatio;
      // biome-ignore lint/style/useConst: <explanation>
      let yy = yC + y * zoom * dataToImageRatio;
      return { x: xx, y: yy };
    };

    const birth = () => {
      // biome-ignore lint/style/useConst: <explanation>
      let x = -800 + 1600 * Math.random();
      // biome-ignore lint/style/useConst: <explanation>
      let y = -800 + 1600 * Math.random();
      const particle: Particle = {
        hue: 195 + 3 * Math.floor(3 * Math.random()),
        sat: 65 + 30 * Math.random(),
        lum: 15 + Math.floor(50 * Math.random()),
        x,
        y,
        xLast: x,
        yLast: y,
        xSpeed: 0,
        ySpeed: 0,
        age: 0,
        // biome-ignore lint/style/useTemplate: <explanation>
        name: "seed-" + Math.ceil(10000000 * Math.random()),
      };
      particles.push(particle);
    };

    const move = () => {
      particles.forEach((p) => {
        p.xLast = p.x;
        p.yLast = p.y;
        p.xSpeed = 0;
        p.ySpeed = 0;

        const eddies = [
          { x: -300, y: -300, K: 70, r0: 180 },
          { x: 300, y: -300, K: 105, r0: 150 },
          { x: 300, y: 300, K: 70, r0: 250 },
          { x: -300, y: 300, K: 105, r0: 150 },
          { x: 0, y: 0, K: 35, r0: 20 },
        ];

        for (const eddy of eddies) {
          // biome-ignore lint/style/useConst: <explanation>
          let dx = p.x - eddy.x;
          // biome-ignore lint/style/useConst: <explanation>
          let dy = p.y - eddy.y;
          // biome-ignore lint/style/useConst: <explanation>
          let r = Math.sqrt(dx * dx + dy * dy);
          // biome-ignore lint/style/useConst: <explanation>
          let theta = segmentAngleRad(0, 0, dx, dy, true);
          // biome-ignore lint/style/useConst: <explanation>
          let cos = Math.cos(theta);
          // biome-ignore lint/style/useConst: <explanation>
          let sin = Math.sin(theta);

          // biome-ignore lint/style/useConst: <explanation>
          let er = { x: cos, y: sin };
          // biome-ignore lint/style/useConst: <explanation>
          let eO = { x: -sin, y: cos };

          // biome-ignore lint/style/useConst: <explanation>
          let radialVelocity = (-0.003 * eddy.K * Math.abs(dx * dy)) / 3000;
          // biome-ignore lint/style/useConst: <explanation>
          let sigma = 100;
          // biome-ignore lint/style/useConst: <explanation>
          let azimutalVelocity =
            // biome-ignore lint/style/useExponentiationOperator: <explanation>
            eddy.K * Math.exp(-Math.pow((r - eddy.r0) / sigma, 2));

          p.xSpeed += radialVelocity * er.x + azimutalVelocity * eO.x;
          p.ySpeed += radialVelocity * er.y + azimutalVelocity * eO.y;
        }

        p.speed = Math.sqrt(p.xSpeed * p.xSpeed + p.ySpeed * p.ySpeed);

        p.x += 0.1 * p.xSpeed;
        p.y += 0.1 * p.ySpeed;

        p.age++;
      });

      // remove dead
      particles = particles.filter((p) => p.age <= lifespan);
    };

    const draw = () => {
      ctx.beginPath();
      ctx.rect(0, 0, width, height);
      ctx.fillStyle = "rgba(255, 255, 255, 0.02)";
      ctx.fill();
      ctx.closePath();

      for (const p of particles) {
        const h = p.hue;
        const s = p.sat;
        const l = p.lum;
        const a = 0.3 + (p.speed ?? 0) / 400;

        const last = dataXYtoCanvasXY(p.xLast, p.yLast);
        const now = dataXYtoCanvasXY(p.x, p.y);

        ctx.beginPath();
        ctx.strokeStyle = `hsla(${h}, ${s}%, ${l}%, ${a})`;
        ctx.moveTo(last.x, last.y);
        ctx.lineTo(now.x, now.y);
        ctx.lineWidth = 0.4 * (3 - (4 * p.age) / 500) * dataToImageRatio;
        ctx.stroke();
        ctx.closePath();
      }
    };

    const loop = () => {
      stepCount++;
      if (
        stepCount % birthFreq === 0 &&
        particles.length + popPerBirth < maxPop
      ) {
        for (let n = 0; n < popPerBirth; n++) {
          birth();
        }
      }
      move();
      draw();
      requestAnimationFrame(loop);
    };

    // start
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, width, height);
    loop();

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      width = canvas.width;
      height = canvas.height;
      dataToImageRatio = Math.max(width, height) / 1000;
      xC = width / 2;
      yC = height / 2;
    };

    window.addEventListener("resize", resize);

    return () => {
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 -z-10" />;
}
