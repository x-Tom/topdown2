import Player from './player.js';
import { Vec2 } from './math.js';
import Soldier from './soldier.js';
import Bullet from './bullet.js';

let botControlSet = {
  move_up     :  {state: false},
  move_left   :  {state: false},
  move_down   :  {state: false},
  move_right  :  {state: false},
  fire        :  {state: false},
  turn_clock  :  {state: false},
  turn_anti   :  {state: false}
}

export default class Bot extends Soldier {
  constructor(pos = new Vec2(Math.random()*5000, Math.random()*3000), body_colour = "#000000", eye_colour = {stroke: "#000000", fill: "#af080d"} ){
    super(pos, body_colour, eye_colour, false);
    this.clip_size = 30;
    this.controlSet = {...botControlSet};
  }

  move(){

    // controlSet = this.controlSet;
    if(this.controlSet.move_up.state) this.vel.y-=this.move_speed;
    if(this.controlSet.move_left.state) this.vel.x-=this.move_speed;
    if(this.controlSet.move_down.state) this.vel.y+=this.move_speed;
    if(this.controlSet.move_right.state) this.vel.x+=this.move_speed;

    if(this.controlSet.turn_clock.state) this.angle += 0.02;
    if(this.controlSet.turn_anti.state) this.angle -= 0.02;

  }

  // shoot(dt = 1){
  //
  //   // if(this.controlSet.fire.state) {
  //   //   this.shooting = true;
  //   //   return new Bullet(this);
  //   // } else this.shooting = false;
  //
  //
  //
  //   };
  // }

}
