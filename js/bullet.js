import Entity from './entity.js'
import { Vec2 } from './math.js';
import Rect from "./Rectangle.js"


const BULLET_DAMAGE = 10;

export default class Bullet extends Entity {
  constructor(shooter, start_pos = {...shooter.getBarrelPoint()}/*{...shooter.barrelPoint}*/, bv = 2000){

    super("bullet", start_pos, new Vec2(bv*Math.cos(shooter.angle), bv*Math.sin(shooter.angle)));

    this.bv = bv//17.5 /// bullet velocity // 343 m/s
    this.damage = (this.bv*BULLET_DAMAGE)/1000

    this.radius = 2;
    this.shooter = shooter;
    this.spent = false;

  }

  draw(ctx, camera = {pos: new Vec2}){

    let pos = new Vec2(this.pos.x - camera.pos.x, this.pos.y - camera.pos.y);

    // if(!camera) {
    //   pos = this.pos;
    // }



    ctx.beginPath();
    ctx.arc(pos.x, pos.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = "#f2c60a";
    ctx.fill();
    ctx.closePath();
  }
  update(dt = 1){
    let {x : px, y : py} = this.pos;
    let {x : spx,y : spy} = this.shooter.pos;
    let disx = Math.abs(px - spx);
    let disy = Math.abs(py - spy);

    if( disy > 2000  &&  disx > 2000) { // delete object
      this.pos.x = NaN;
      this.pos.y = NaN;
      this.spent = true;
      console.warn("bullet despawned!");
      return false;
    }

    this.pos.x += this.vel.x * dt;
    this.pos.y += this.vel.y * dt;
  }
}
