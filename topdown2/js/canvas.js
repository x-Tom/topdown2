export const canvas = document.getElementById('canvas');
export const ctx = canvas.getContext('2d');

export const clearcanvas = () => {
  ctx.beginPath()
  ctx.rect(0,0,canvas.width,canvas.height),
  ctx.fillStyle = "#393f40";
  ctx.fill();
  ctx.closePath();
};


export const resizecanvas = () => {
  canvas.height = window.innerHeight;
  canvas.width  = window.innerWidth;
}

resizecanvas(); // Immediate resize on page load and after canvas is grabbed

// EVENT LISTENERS
document.addEventListener("resize", resizecanvas, false);


/*

class Canvas{
  constructor(){
    this.canvas = document.getElementById('canvas');
    this.ctx = this.canvas.getContext('2d');
  }
  clearCanvas(){
    ctx.beginPath()
    ctx.rect(0,0,canvas.width,canvas.height),
    ctx.fillStyle = "#393f40";
    ctx.fill();
    ctx.closePath();
  }
  resizecanvas(){
    canvas.height = window.innerHeight;
    canvas.width  = window.innerWidth;
  }
}

*/
