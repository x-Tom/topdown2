import { Vec2 } from './math.js';
import Entity from './entity.js';
import Rect from './Rectangle.js';
import Bullet from './bullet.js';


export default class Soldier extends Entity {
  constructor(pos = new Vec2, body_colour = "#1459c8", eye_colour = {stroke: "#1459c8", fill: "#32d91d"}, isPlayer = true, radius = 25, gunlength = 50){
    super("soldier", pos);

    this.last_bullet;

    // TEMP PROPERTIES
    this.kill_count = 0;
    this.damage = 10;
    // ----------------
    this.BASE_RECOIL = 0.02; // 0.02
    this.recoil_multiplier = this.BASE_RECOIL;

    this.recoil = true

    // this.bounds = {
    //   left: this.pos.x - radius;
    //   right:
    // }


    // this.bounds =  // square

    this.clip_size = 30;
    this.ammo = this.clip_size;
    this.RPM = 600; // RPM AK = 600
    this.secElapsed = 0;

    this.score = 0;
     // is the player / user / not AI

    this.shooting = false;

    this.mass = 8;

    this.health = 100;

    this.move_speed = 100 * (4/this.mass);
    this.crouched = false;
    // this.bullets;
    // this.force = new Vec2; // force felt
    // this.friction = new Vec2(0.75, 0.75);
    this.angle = 0;
    this.aimCoords = new Vec2;
    this.gunlength = gunlength;

    this._barrelpoint = new Vec2;
    // this.realBarrelPoint = new Vec2(this.pos.x + this.gunlength*Math.cos(this.angle) , this.pos.y + this.gunlength*Math.sin(this.angle));
    this.realBarrelPoint = this.getBarrelPoint(this.pos);
    this.radius = radius;
    this.body_colour = body_colour; // colour of circle
    this.eye_colour = eye_colour;
    this.gun_colour = "#d6d2d2";
    // this.shooting = false;

  }

  getBarrelPoint(pos = this.pos){
    this._barrelpoint.x = pos.x + this.gunlength*Math.cos(this.angle);
    this._barrelpoint.y = pos.y + this.gunlength*Math.sin(this.angle);
    // return new Vec2(pos.x + this.gunlength*Math.cos(this.angle) , this.pos.y + this.gunlength*Math.sin(this.angle));
    return this._barrelpoint;
  }


  draw(CTX, camera = {pos: new Vec2}) {
    // TRANSLATED POSITIONS RELATIVE TO CAMERA

    let pos = new Vec2(this.pos.x - camera.pos.x, this.pos.y - camera.pos.y)
    // let barrelPoint = new Vec2(this.barrelPoint.x - camera.pos.x, this.pos.y - camera.pos.y);
    let barrelPoint = this.getBarrelPoint(pos);

    this.draw_body(CTX, pos);
    this.draw_barrel(CTX, pos, barrelPoint);
    this.draw_eye(CTX, pos);
    this.draw_info(CTX, pos);
    // this.draw_bounding_rect(CTX, camera);


  }
  draw_info(ctx, pos){
    // health
    ctx.beginPath();
    ctx.fillStyle = this.eye_colour.fill;
    ctx.font = "20px Arial";
    ctx.fillText(`Health: ${this.health}`, pos.x - this.radius*2, pos.y - this.radius*2);
    ctx.fillText(`Ammo: ${this.ammo}`, pos.x - this.radius*2, pos.y - this.radius*3);
    ctx.closePath();
  }

  draw_body(CTX, pos) {
    CTX.beginPath();
    CTX.arc(pos.x, pos.y, this.radius, 0, Math.PI * 2);
    CTX.strokeStyle = this.body_colour;
    CTX.stroke();
    CTX.fillStyle = this.body_colour;
    CTX.fill();
    CTX.closePath();
  }
  draw_barrel(CTX, pos, barrelPoint) {
    // GUN
    CTX.strokeStyle = this.gun_colour;
    CTX.beginPath();
    CTX.moveTo(pos.x, pos.y);
    // CTX.lineTo(this.pos.x + this.gunlength*Math.cos(this.angle), this.pos.y + this.gunlength*Math.sin(this.angle));
    CTX.lineTo(barrelPoint.x, barrelPoint.y);
    CTX.lineWidth = 5;
    CTX.stroke();
    CTX.closePath();
  }
  draw_eye(CTX, pos) {
    // innercircle / eye
    CTX.beginPath();
    CTX.arc(pos.x, pos.y, this.radius/(this.radius/2), 0, Math.PI * 2);
    CTX.strokeStyle = this.eye_colour.stroke;
    CTX.stroke();
    // CTX.fillStyle = "#d6d2d2";
    CTX.fillStyle = this.eye_colour.fill;
    CTX.fill();
    CTX.closePath();
  }

  draw_bounding_rect(CTX, camera){
    CTX.beginPath();
    CTX.rect(this.bounds.left - camera.pos.x, this.bounds.top - camera.pos.y, this.bounds.width, this.bounds.height);
    CTX.strokeStyle = this.eye_colour.fill;
    CTX.lineWidth = "1";
    CTX.stroke();
    CTX.closePath();
  }

  update(dt = 1){

    // Fk = -μk Fn (v/|v|);
    // let velocity_unit_vec = Vec2.multiply_scalar(this.vel, 1/this.vel.magnitude);
    // if (!this.vel.magnitude) velocity_unit_vec = new Vec2;
    // this.friction_acc = Vec2.multiply_scalar(velocity_unit_vec,-100.35*9.81);

    //
    // this.force = Vec2.addition(this.force, this.friction);
    // Vec2.addition(this.force, this.friction, 1);
    // this.force.x += this.friction.x;
    // this.force.y += this.friction.y;

    // this.bounds.set

    // this.acc.x = this.friction_acc.x;
    // this.acc.y = this.friction_acc.y;

    // this.vel.x += this.acc.x * dt;
    // this.vel.y += this.acc.y * dt;

    // if(this.pos.x - this.size.x/2 < 0){
    // 	this.pos.x = this.size.x/2;
    // }
    // if(this.pos.y - this.size.y/2 < 0){
    // 	this.pos.y = this.size.y/2;
    // }
    // if(this.pos.x + this.width/2 > 5000){
    // 	this.pos.x = worldWidth - this.width/2;
    // }
    // if(this.pos,y + this.height/2 > 5000){
    // 	this.pos.y = worldHeight - this.height/2;
    // }




    this.vel.x *= 0.83;
    this.vel.y *= 0.83;

    this.pos.x += this.vel.x * dt;
    this.pos.y += this.vel.y * dt;


  }

  move(controlSet){

    if(controlSet.move_up.state) this.vel.y-=this.move_speed;
    if(controlSet.move_left.state) this.vel.x-=this.move_speed;
    if(controlSet.move_down.state) this.vel.y+=this.move_speed;
    if(controlSet.move_right.state) this.vel.x+=this.move_speed;

    // if(controlSet.move_up.state) this.force.y--;
    // if(controlSet.move_left.state) this.force.x--;
    // if(controlSet.move_down.state) this.force.y++;
    // if(controlSet.move_right.state) this.force.x++;

    // if(controlSet.turn_clock.state) this.angle += 0.02;
    // if(controlSet.turn_anti.state) this.angle -= 0.02;

  }

  shoot(controlSet, dt, recoil = this.recoil){

    let secondsPerRound = 60/this.RPM;
    // if(this.secElapsed < secondsPerRound)

    if(controlSet.fire.state && this.ammo > 0 && this.secElapsed >= secondsPerRound) {
      // await sleep(secondsPerRound*1000);
      this.shooting = true;
      this.ammo--;
      this.secElapsed = 0;
      if(recoil) {
        this.angle += this.recoil_multiplier*(2*Math.random()-1);
        this.recoil_multiplier+=0.005;
      }
      return new Bullet(this);
    } else {
      this.shooting = false;
      if(recoil) this.recoil_multiplier = this.BASE_RECOIL;
    }

    // if(this.secElapsed > dt) this.secElapsed = 0;


    this.secElapsed += dt;
    // console.log(this.secElapsed >= dt);
  }

  reload(controlSet, dt = 1) {
    if(controlSet.reload.state && (this.ammo != this.clip_size)) {
      this.ammo = this.clip_size;
      console.log("reloaded!");
    };
  }

  destruct(){
    this.pos.x = NaN;
    this.pos.y = NaN;
  }



  set realBarrelPoint(vec){
    this._realbarrelpoint = vec
  }
  get realBarrelPoint(){
     this._realbarrelpoint.x = this.pos.x + this.gunlength*Math.cos(this.angle);
     this._realBarrelPoint.y = this.pos.y + this.gunlength*Math.sin(this.angle);
     return this._realBarrelPoint;
  }

}
