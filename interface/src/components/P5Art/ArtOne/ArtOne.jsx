import React from "react";
import Sketch from "react-p5";
import BlockBuilder from './logic.js';

export default function art(props) {
    let THE_SEED= props.entropy;
    let xdim = 10;
    let ydim = 50;
    let radius = 23;
    let size = 3;
  
    let chance_start = 0.4;
    let chance_extend = 0.7;
    let chance_vertical = 0.4;
  
    let colors;
  
    let grid;
    let builder;


    const setup = (p, canvasParentRef) => {
        p.createCanvas(440, 400).parent(canvasParentRef);
        p.noLoop();
        p.fill('#eeeee8');
        p.background('white');
        colors = [
          p.color(142, 192, 124),
          p.color(250, 189, 47),
          p.color(251, 71, 44),
          p.color(211, 134, 147),
          p.color(49, 69, 80)
        ];
    
        builder = new BlockBuilder(xdim, ydim, radius, chance_start, chance_extend, chance_vertical, colors);
    };
 
    const draw = (p) => {
        p.translate(100, 10);
    for (let i = 0; i < 3; i++) {
      p.push();
      for (let j = 0; j < 5; j++) {
        builder.radius = (j + 3) * 3;
        builder.grid_dim_x = builder.radius * 2 + 2;
        grid = builder.generate();
        p.strokeWeight(1.1);
        display();
        p.strokeWeight(1.1);
        display();
        p.translate(20 + builder.radius * 0, 0);
      }
      p.pop();
      p.translate(0, 200);

      builder.chance_new += 0.3;
      builder.chance_extend += 0.08;
    }


    function display() {
        for (var i = 0; i < grid.length; i++) {
         

          for (var j = 0; j < grid[i].length; j++) {
            p.noStroke();
            if (grid[i][j].in && grid[i][j].col != null) {
              p.fill(grid[i][j].col);
              p.rect(j * size, i * size, size, size);
              p.ellipse(size, size, size,size)
            }
            p.stroke('#050505');
            if (grid[i][j].h) p.line(j * size, i * size, (j + 1) * size, i * size);
            if (grid[i][j].v) p.line(j * size, i * size, j * size, (i + 1) * size);

          }
        }
      }
    };
 
    return <Sketch setup={setup} draw={draw} />;
};