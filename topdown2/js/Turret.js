import Soldier from "./soldier.js"
import Bot from "./bots.js";
import { Vec2 } from './math.js'
import Bullet from "./bullet.js"

export default class Turret extends Bot {
  constructor(pos = new Vec2){
    super(pos);
    this.type = 'turret';
    this.clip_size = 10000000000
    this.ammo = this.clip_size;
    this.body_colour = "#1459c8"
    this.controlSet.fire.state = true;
  }
}
