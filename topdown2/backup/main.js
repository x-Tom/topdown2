// (function() {

// TOPDOWNSHITTYSHOOTER
// no images, pure canvas and drawing and maths and collision and shite
const CANVAS = document.getElementById('canvas');
const CTX = CANVAS.getContext('2d');
let clearCanvas = () => {
  CTX.beginPath()
  CTX.rect(0,0,CANVAS.width.CANVAS.height),
  CTX.fillStyle = "#393f40";
  CTX.fill();
  CTX.closePath();
};
 

let resizeCanvas = () => {
  CANVAS.height = window.innerHeight;
  CANVAS.width  = window.innerWidth;
}

resizeCanvas(); // Immediate resize on page load and after canvas is grabbed

// EVENT LISTENERS
document.addEventListener("resize", resizeCanvas, false);












// MAIN DRAW FUNCTION
function draw(){
  // CTX.clearRect(0,0,canvas.width,canvas.height);
  clearCanvas();


  requestAnimationFrame(draw);
}

draw();













function Player(radius, gunlength, body_colour,){
  this.x = 10;
  this.y = 10;

  this.dx = 0,
  this.dy = 0,
  this.vx = 1.75;
  this.vy = 1.75;
  // this.decelX = 0.75;
  // this.decelY = 0.75;
  this.decel = 0.75;
  
  this.angle = 0;

  this.gunlength = gunlength || 50;

  this.radius = radius || 25,


  this.body_colour = body_colour ||  "#1459c8"; // colour of circle
  this.eye_colour = eye_colour || {stroke: "#1459c8", fill: "#32d91d"};
  this.gun_colour = gun_colour || "#d6d2d2";

  
  this.shooting = false,
  
}

Player.prototype.draw = () => {
    let self = this;

    // circle
    CTX.beginPath();
    CTX.arc(self.x, self.y, self.radius, 0, Math.PI * 2);
    CTX.strokeStyle = self.body_colour;
    CTX.stroke();
    CTX.fillStyle = self.body_colour;
    CTX.fill();
    CTX.closePath();

    // GUN
    CTX.strokeStyle = self.gun_colour;
    CTX.beginPath();
    CTX.moveTo(player.x, player.y);
    CTX.lineTo(self.x + self.gunlength*Math.cos(self.angle), self.y +self.gunlength*Math.sin(self.angle));
    CTX.lineWidth = 5;
    CTX.stroke();
    CTX.closePath();


    // innercircle / eye
    CTX.beginPath();
    CTX.arc(self.x, self.y, self.radius/(self.radius/2), 0, Math.PI * 2);
    CTX.strokeStyle = self.eye_colour.stroke;
    CTX.stroke();
    // CTX.fillStyle = "#d6d2d2";
    CTX.fillStyle = self.eye_colour.fill;
    CTX.fill();
    CTX.closePath();
};

Player.prototype.fire = () => {
  let bullet = new Bullet(this);
};



function Bullet(playerref){ // playerref is link back to class; //donotreassignselfasthisintheobject - ignore
  let startPosX = playerref.x;
  let startPosY = playerref.y;

}









































