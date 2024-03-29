// // keyboard event handlers
document.addEventListener("keydown", keyHandler, false);
document.addEventListener("keyup", keyHandler, false);
// mouse click / shooting handlers
document.addEventListener("mousedown",mouseClickHandler,false)
document.addEventListener("mouseup", mouseClickHandler, false);
// mouse movement / aiming handler
// document.addEventListener("mousemove", mouseHandler, false);


const default_binds = {
  move_up    :  "w",
  move_left  :  "a",
  move_down  :  "s",
  move_right :  "d",
  fire       :  "f", // fire is always left mouse, this is alternate key bind
  reload     :  "r",
}

let binds = default_binds;

const controls = {};

for(let prop in binds){
  controls[prop] = {
    key : binds[prop],
    state: false
  }
}


export {controls, mouseHandler};

function mouseClickHandler(e){
  (e.type == 'mousedown') ? controls.fire.state = true : controls.fire.state = false;
  console.log("clicked");
}



function keyHandler(e){
  let bool = (e.type == "keydown");
  switch (e.key) {
    case controls.move_up.key:
      controls.move_up.state = bool;
      break;
    case controls.move_left.key:
      controls.move_left.state = bool;
      break;
    case controls.move_down.key:
      controls.move_down.state = bool;
      break;
    case controls.move_right.key:
      controls.move_right.state = bool;
      break;
    case controls.fire.key:
      controls.fire.state = bool;
      break;
    case controls.reload.key:
      controls.reload.state = bool;
  }
}






function mouseHandler(e, player, camera){
  // console.log(player);
  // console.log(`Mouse X: ${e.clientX} Mouse Y: ${e.clientY}`);
  let deltaX = e.clientX - (player.pos.x - camera.pos.x); // change in x
  let deltaY = e.clientY - (player.pos.y - camera.pos.y); // change in y
  let radians = Math.atan2(deltaY, deltaX);

  // camera.pos.x+=deltaX;
  // camera.pos.y+=deltaY;

  // arctan2 to work out radians to a point (eg. when deltaX is 10 and deltaY is 10, angle in degrees is 45.)
  // then the line to method draws to the angle. Draws line at that angle. https://www.youtube.com/watch?v=Idxeo49szW0
  player.angle = radians;
  let deg = 180*(radians/Math.PI);
  // console.log(`Gun angle in degrees: ${deg+180}°`);
  // console.log(player.barrelPoint);
}










// ------------------------------------------ \\

// function movement(player){
//   if(this.states.left){
//     player.vx-=player.ax;
//   }
//   if(this.states.right){
//     player.vx+=player.ax;
//   }
//   if(this.states.up){
//     player.vy-=player.ay;
//   }
//   if(this.states.down){
//     player.vy+=player.ay;
//   }
//   player.x+=player.dx;
//   player.y+=player.dy;
//
//   player.dy*=player.decelY;
//   player.dx*=player.decelX;
// }
// console.log(document);


/*

const default_binds = {
  move_up    :  "w",
  move_left  :  "a",
  move_down  :  "s",
  move_right :  "d",
}

const alternate_binds = {
  move_up    :  "ArrowUp",
  move_left  :  "ArrowLeft",
  move_down  :  "ArrowDown",
  move_right :  "ArrowRight",
}


const default_states = {
  move_up     :  false,
  move_left   :  false,
  move_down   :  false,
  move_right  :  false,
}

export default class ControlSet {
  constructor(player, keybinds) {
    this.player = player;
    this.binds = keybinds ||
  {
    move_up    :  "w",
    move_left  :  "a",
    move_down  :  "s",
    move_right :  "d",
  };
    this.states = {
      move_up     :  false,
      move_left   :  false,
      move_down   :  false,
      move_right  :  false,
    };

    document.addEventListener("keydown", this.keyDownHandler, false);
    document.addEventListener("keyup", this.keyUpHandler, false);
    document.addEventListener("mousemove", this.mouseHandler, false);
    // document.addEventListener("mousedown",mouseDownHandler,false)
    // document.addEventListener("mouseup", mouseDownHandler, false);


  }

  keyDownHandler(e){
    switch (e.key) {
      case this.binds.move_up:
        this.states.move_up = true;
        break;
      case this.binds.move_left:
        this.states.move_left = true;
        break;
      case this.binds.move_down:
        this.states.move_down = true;
        break;
      case this.binds.move_right:
        this.states.move_right = true;
    }
  }

  keyUpHandler(e){
    switch (e.key) {
      case this.binds.move_up:
        this.states.move_up = false;
        break;
      case this.binds.move_left:
        this.states.move_left = false;
        break;
      case this.binds.move_down:
        this.states.move_down = false;
        break;
      case this.binds.move_right:
        this.states.move_right = false;
    }
  }

  mouseHandler(e){
    // console.log(player);
    let player = this.player;
    // console.log(`Mouse X: ${e.clientX} Mouse Y: ${e.clientY}`);
    let deltaX = e.clientX - this.player.pos.x; // change in x
    let deltaY = e.clientY - this.player.pos.y; // change in y
    let radians = Math.atan2(deltaY, deltaX);
    // arctan2 to work out radians to a point (eg. when deltaX is 10 and deltaY is 10, angle in degrees is 45.)
    // then the line to method draws to the angle. Draws line at that angle. https://www.youtube.com/watch?v=Idxeo49szW0
    this.player.angle = radians;
    let deg = 180*(radians/Math.PI);
    console.log(`Gun angle in degrees: ${deg}°`);
  }

}

*/
