// (function() {

// TOPDOWNSHITTYSHOOTER
// no images, pure canvas and drawing and maths and collision and shite
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');


resizeCanvas();

document.addEventListener("resize", resizeCanvas, false);

// keyboard event handlers
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
// mouse movement / aiming handler
document.addEventListener("mousemove", mouseHandler, false);
// mouse click / shooting handlers
document.addEventListener("mousedown",mouseDownHandler,false)
document.addEventListener("mouseup", mouseDownHandler, false);



const controls = {
  left: false,
  right: false,
  up: false,
  down: false,
}



const map = {};



const player = {
  radius: 25,
  shooting: false,
  x: 250,
  y: 500,
  dx: 0,
  dy: 0,
  vx: 1.75,
  vy: 1.75,
  decelX: 0.75,
  decelY: 0.75,
  gunlength: 50,
  bulletX: 0,
  bulletY: 0,
  angle: 0,
  draw: function() {
    let self = this;

    // circle
    ctx.beginPath();
    ctx.arc(self.x, self.y, self.radius, 0, Math.PI * 2);
    ctx.strokeStyle = "#1459c8";
    ctx.stroke();
    ctx.fillStyle = "#1459c8";
    ctx.fill();
    ctx.closePath();

    // GUN
    ctx.strokeStyle = "#d6d2d2";
    ctx.beginPath();
    ctx.moveTo(player.x, player.y);
    ctx.lineTo(self.x + self.gunlength*Math.cos(self.angle), self.y +self.gunlength*Math.sin(self.angle));
    ctx.lineWidth = 5;
    ctx.stroke();
    ctx.closePath();

    ctx.beginPath();
    ctx.arc(self.x, self.y, self.radius/(self.radius/2), 0, Math.PI * 2);
    ctx.strokeStyle = "#1459c8";
    ctx.stroke();
    // ctx.fillStyle = "#d6d2d2";
    ctx.fillStyle = "#32d91d";
    ctx.fill();
    ctx.closePath();

  }
}

player.bulletX = player.x;
player.bulletY = player.y;

function draw(){
  canvasClear();
  // map.platform.draw();
  player.draw();

  movement();
  fire();

  requestAnimationFrame(draw);
}

draw();


function movement(){
  if(controls.left){
    player.dx-=player.vx;
  }
  if(controls.right){
    player.dx+=player.vx;
  }
  if(controls.up){
    player.dy-=player.vy;
  }
  if(controls.down){
    player.dy+=player.vy;
  }
  player.x+=player.dx;
  player.y+=player.dy;

  player.dy*=player.decelY;
  player.dx*=player.decelX;
}


function canvasClear(){
  ctx.beginPath();
  ctx.rect(0,0,canvas.width,canvas.height);
  ctx.fillStyle = "#393f40";
  ctx.fill();
  ctx.closePath();
}



























function resizeCanvas(){
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

function keyDownHandler(e){
  switch (e.key) {
    case "w":case "ArrowUp":
      controls.up = true;
      break;
    case "a":case "ArrowLeft":
      controls.left = true;
      break;
    case "s":case "ArrowDown":
      controls.down = true;
      break;
    case "d":case "ArrowRight":
      controls.right = true;
  }
}

function keyUpHandler(e){
  switch (e.key) {
    case "w":case "ArrowUp":
      controls.up = false;
      break;
    case "a":case "ArrowLeft":
      controls.left = false;
      break;
    case "s":case "ArrowDown":
      controls.down = false;
      break;
    case "d":case "ArrowRight":
      controls.right = false;
  }
}

function mouseHandler(e){
  // console.log(`Mouse X: ${e.clientX} Mouse Y: ${e.clientY}`);
  let deltaX = e.clientX - player.x; // change in x
  let deltaY = e.clientY - player.y; // change in y
  let radians = Math.atan2(deltaY, deltaX);
  // arctan2 to work out radians to a point (eg. when deltaX is 10 and deltaY is 10, angle in degrees is 45.)
  // then the line to method draws to the angle. Draws line at that angle. https://www.youtube.com/watch?v=Idxeo49szW0
  player.angle = radians;
  let deg = 180*(radians/Math.PI);
  console.log(`Gun angle in degrees: ${deg}°`);
}

function text(txt, x, y, font){
  ctx.font = font;
  ctx.fillStyle = "white"
  ctx.fillText(txt, x, y);

}

function mouseDownHandler(){
  player.shooting = true;
}

function mouseUpHandler(){
  player.shooting = false;
}


function fire(){
  if (player.shooting){
    drawBullet();
    moveBullet();
  }
}

// function Bullets(){
//
// }

function drawBullet(){
  // var angle = player.angle;
  ctx.beginPath();
  ctx.arc(player.bulletX*Math.cos(player.angle), player.bulletY*Math.sin(player.angle), 2, 0, Math.PI * 2);
  ctx.strokeStyle = "white";
  ctx.fillStyle = "white";
  ctx.stroke();
  ctx.fill();
  ctx.closePath();
}

function moveBullet() {
  player.bulletX+=5;
  player.bulletY+=5;
}



// })();
