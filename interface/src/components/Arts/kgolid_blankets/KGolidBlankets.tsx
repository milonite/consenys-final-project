import Sketch from "react-p5";

export default function art(props: any) {
  let pnts: any[];
  let n = 1000;
  let terminate: boolean;
  let color_offset: number;

  const setup = (p: any, canvasParentRef: any) => {
    function init() {
      terminate = false;
      pnts = [];
      p.randomSeed(props.entropy * 10000);
      p.noiseSeed(props.entropy * 10000);
      color_offset = p.random(360);
      for (var i = 0; i < n / 1.5; i++) {
        pnts.push({ x: i + 100, y: 1, px: i + 100, py: 0 });
      }
    }

    p.createCanvas(700, 450).parent(canvasParentRef);
    p.colorMode(p.HSB);
    p.background("#000000");

    init();
  };

  function display(p: any) {
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

  function step(p: any) {
    for (var i = 0; i < pnts.length; i++) {
      pnts[i].px = pnts[i].x;
      pnts[i].py = pnts[i].y;
      pnts[i].x += p.noise(i / 100, pnts[i].y / 300) * 2 - 1;
      pnts[i].y = pnts[i].y + 1;
    }
    return false;
  }

  const draw = (p: any) => {
    try {
      if (!terminate) {
        display(p);
        step(p);
        display(p);
        terminate = step(p);
      }
      if (p.frameCount === 300) {
        terminate = true;
        p.noLoop();
        props.enableButton();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return <Sketch setup={setup} draw={draw} />;
}
