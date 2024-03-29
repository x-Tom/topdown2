import {Vec2} from "./math.js"
import Rect from "./Rectangle.js"
import {canvas, ctx} from "./canvas.js"



export default class Camera {
  constructor( worldSize = new Vec2(5000, 5000), size = new Vec2(canvas.width, canvas.height), pos = new Vec2 ){
    this.pos = pos;
    this.size = size;
    this.worldSize = worldSize;

    this.cameraRect = new Rect(pos, size);
    // this.bounds;

    this.worldRect = new Rect(pos, worldSize);
    // world/level/map.bounds
  }

  follow(object, deadZone = new Vec2(canvas.width/2, canvas.height/2)){
    this.object = object;
    // this.object.camera = this;
    this.deadZone = deadZone;
  }

  update(){
    if(!this.object) throw new Error;

    if(this.object.pos.x - this.pos.x  + this.deadZone.x > this.size.x)
		this.pos.x = this.object.pos.x - (this.size.x - this.deadZone.x);
		else if(this.object.pos.x  - this.deadZone.x < this.pos.x)
		this.pos.x = this.object.pos.x  - this.deadZone.x;

    if(this.object.pos.y - this.pos.y + this.deadZone.y > this.size.y)
		this.pos.y = this.object.pos.y - (this.size.y - this.deadZone.y);
		else if(this.object.pos.y - this.deadZone.y < this.pos.y)
		this.pos.y = this.object.pos.y - this.deadZone.y;


    this.cameraRect.set(this.pos);

    if(!this.cameraRect.within(this.worldRect)) {
				if(this.cameraRect.left < this.worldRect.left)
					this.pos.x = this.worldRect.left;
				if(this.cameraRect.top < this.worldRect.top)
					this.pos.y = this.worldRect.top;
				if(this.cameraRect.right > this.worldRect.right)
					this.pos.x = this.worldRect.right - this.size.x;
				if(this.cameraRect.bottom > this.worldRect.bottom)
					this.pos.y = this.worldRect.bottom - this.size.y;
		}



  }
}
