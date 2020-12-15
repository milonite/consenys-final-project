import Sketch from "react-p5";

export default function art(props: any) {
  let colors = ["#ed1c24", "#fdfffc", "#235789", "#f1d302", "#020100"];

  const setup = (p: any, canvasParentRef: any) => {
    p.randomSeed(props.entropy * 1000);
    p.createCanvas(450, 450).parent(canvasParentRef);
    p.background(p.random(colors));

    for (let i = 0; i < 100; i++) {
      let x = p.randomGaussian(0.5, 0.18) * p.width;
      let y = p.randomGaussian(0.5, 0.18) * p.height;
      let s = p.random(p.random(p.random(100))) + 10;
      splash(x, y, s);
    }

    for (let i = 0; i < 400; i++) {
      let x = p.random(p.width);
      let y = p.random(p.height);
      let s = p.random(p.random(p.random(35)));
      p.fill(p.random(colors));
      p.noStroke();
      p.circle(x, y, s);
    }

    function splash(x: number, y: number, s: number) {
      let col = p.random(colors);
      let cc = p.int(p.random(150, 2000));
      p.push();
      p.translate(x, y);
      p.fill(col);
      p.noStroke();
      p.circle(0, 0, s);
      for (let i = 0; i < cc; i++) {
        let a = p.random(p.TAU);
        let xx = s * 0.45 * p.cos(a) * p.random();
        let yy = s * 0.45 * p.sin(a) * p.random();
        let len = p.random(s * 10) * p.random(p.random(p.random()));
        p.push();
        p.translate(xx, yy);
        p.rotate(p.random(100));
        if (p.random() < 0.3) {
          p.noStroke();
          myLine(0, 0, 0, len);
        } else {
          p.stroke(col);
          p.strokeWeight(p.random(s * 0.05));
          p.line(0, 0, 0, len);
        }
        p.pop();
      }
      p.pop();
    }

    function myLine(x1: number, y1: number, x2: number, y2: number) {
      let w = p.random(3, 20);
      p.beginShape();
      p.vertex(x1, y1);
      p.bezierVertex(x2, y2 - w * 0.5, x2 - w * 0.5, y2 - w * 0.1, x2, y2);
      p.bezierVertex(x2 + w * 0.5, y2 - w * 0.1, x2, y2 - w * 0.5, x1, y1);
      p.endShape();
    }
  };

  return <Sketch setup={setup} />;
}
