import { Vec2 } from './math.js';
import Entity from './entity.js';
import Soldier from './soldier.js';
import Rect from './Rectangle.js';
import Bullet from './bullet.js';

export default class Player extends Soldier {
    constructor(pos = new Vec2(2500, 2000)){
      super(pos);
    }
}
