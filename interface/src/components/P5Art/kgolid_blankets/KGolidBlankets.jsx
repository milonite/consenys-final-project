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
      color_offset = p.random(360);
      for (var i = 0; i < n; i++) {
        pnts.push({ x: i + 200, y: 1, px: i + 200, py: 0 });
      }
    }

    p.createCanvas(1000, 1000).parent(canvasParentRef);
    p.colorMode(p.HSB);
    p.background("#000000");

    init();
  };

  function display(p) {
    for (var i = 0; i < pnts.length; i++) {
      p.stroke(
        (pnts[i].y * 20 + color_offset + (i / n) * 120) % 360,
        80,
        100,
        0.07
      );
      p.line(pnts[i].px, pnts[i].py, pnts[i].x, pnts[i].y);
    }
  }

  function step(p) {
    if (pnts[0].y > p.height) return true;
    for (var i = 0; i < pnts.length; i++) {
      pnts[i].px = pnts[i].x;
      pnts[i].py = pnts[i].y;
      pnts[i].x += p.noise(i / 100, pnts[i].y / 250) * 1.9 - 1;
      pnts[i].y++;
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
  };

  return <Sketch setup={setup} draw={draw} />;
}
