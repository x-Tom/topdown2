import { Vec2 } from "./math.js"
import Rect from './Rectangle.js'

/*
Entity:
Default shape = "circle"
Default mass = 10 - not really used.
*/


export default class Entity {
  constructor(type, pos = new Vec2, vel = new Vec2, acc = new Vec2, mass = 10, shape = "circle", sizeVec = new Vec2(50,50)){
    this.pos = pos;
    this.vel = vel;
    this.acc = acc;
    this.type = type;
    this.mass = 8;
    this.shape = shape;
    if(this.shape == "rect") this.size = sizeVec;
    this.speed;
    this.name = !!1;

  }

  draw(CTX, camera = {pos: new Vec2}) {
    throw new Error("No draw method in subclass, superclass draw method called!")
  }
  update(dt = 1) {
    throw new Error("No update method in subclass, superclass method called!")
  }

  draw_info(CTX, pos){
    ctx.beginPath();
    ctx.font = "20px Arial";
    ctx.fillText(`Entity type: ${this.type}`, pos.x - this.radius*2, pos.y - this.radius*2);
    ctx.fillText(`Entity name: ${this.name}`, pos.x - this.radius*2, pos.y - this.radius*3);
    ctx.closePath();
  }

  getRectVec(){
    let temPosVec = {...this.pos};
    temPosVec.x -= this.radius;
    temPosVec.y -= this.radius;
    return temPosVec;
  }

  set bounds(rect){} // bounding_rect

  get bounds(){ // rename to bounding_rect
    if(this.shape == "circle") return new Rect(this.getRectVec(), {x:this.radius*2, y:this.radius*2});
    else return new Rect(this.getRectVec(), this.sizeVec);
  }
}
