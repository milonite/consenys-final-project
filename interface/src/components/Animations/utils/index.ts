export const random = (min:number, max:number):number => Math.floor(Math.random() * (max - min)) + min;

export const range = (start:number, end:number=start, step:number = 1):number[] => {
    let output = [];
    start = 0;
    
    for (let i = start; i < end; i += step) {
      output.push(i);
    }
    return output;
  };

  