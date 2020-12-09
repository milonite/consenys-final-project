import React from "react";
import Sketch from "react-p5";

export default function art(props) {
  let pnts;
  let n = 1000;
  let terminate;
  let color_offset;

  const setup = (p, canvasParentRef) => {
    function init() {
      terminate = false;
      pnts = [];
      p.randomSeed(1 * 10000);
      p.noiseSeed(1 * 10000);
      color_offset = p.random(360);
      for (var i = 0; i < n / 1.5; i++) {
        pnts.push({ x: i + 100, y: 1, px: i + 100, py: 0 });
      }
    }

    p.createCanvas(750, 450).parent(canvasParentRef);
    p.colorMode(p.HSB);
    p.background("#000000");

    init();
  };

  function display(p) {
    for (var i = 0; i < pnts.length; i++) {
      p.stroke(
        (pnts[i].y * 0.01 + color_offset + (i / n) * 220) % 360,
        80,
        100,
        0.07
      );
      p.line(pnts[i].px, pnts[i].py, pnts[i].x, pnts[i].y);
    }
  }

  function step(p) {
    for (var i = 0; i < pnts.length; i++) {
      pnts[i].px = pnts[i].x;
      pnts[i].py = pnts[i].y;
      pnts[i].x += p.noise(i / 100, pnts[i].y / 300) * 2 - 1;
      pnts[i].y = pnts[i].y + 1;
    }
    return false;
  }

  const draw = (p) => {
    if (!terminate) {
      display(p);
      step(p);
      display(p);
      terminate = step(p);
    }
    if (p.frameCount === 550) {
      terminate = true;
      p.noLoop();
    }
  };

  return <Sketch setup={setup} draw={draw} />;
}
