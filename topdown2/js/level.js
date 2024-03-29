import {Vec2} from "./math.js"
import Rect from "./Rectangle.js"

export function loadMap(map){
  return fetch(`../maps/${map}.json`)
  .then(r => r.json())
  // .catch(e => console.log(e))
}


// export function createLevel(level){
//
// }

class TDSMapComponent {
  constructor(componentObject){
    this.id = componentObject.id;
    this.info = componentObject.info || "";
    this.health = componentObject.health || Infinity;
    this.colour = componentObject.colour;
    if(this.colour == atob("bmlnZ2Vy")) this.colour = "black";
    let [x,y] = componentObject.pos;
    let [width, height] = componentObject.size;
    this.pos = new Vec2(x,y);
    this.size = new Vec2(width, height)
    this.bounds = new Rect(this.pos, this.size);
  }
  draw(ctx, camera){
    ctx.beginPath();
    ctx.rect(this.pos.x - camera.pos.x, this.pos.y - camera.pos.y, this.size.x, this.size.y);
    ctx.fillStyle = this.colour;
    ctx.fill();
    ctx.closePath();
  }
  draw_info(ctx, camera){
    ctx.beginPath();
    ctx.fillText(`${this.id}:${this.info}`, this.pos.x - camera.pos.x, this.pos.y - camera.pos.y);
    ctx.fillStyle = "green";
    ctx.fill();
    ctx.closePath();
  }

  collision(entity){
    // if(this.bounds.collides(entity.bounds) && entity.bounds.collides(this.bounds)) {
    if(this.bounds.overlaps(entity.bounds)) {
      this.collisionResponse(entity)
      return true
    };
  }

  collisionResponse(entity){
    if(entity.type == "soldier"){ // == soldier
      console.log(true);

      let entityCenter = new Vec2(entity.bounds.left + entity.bounds.width/2, entity.bounds.top + entity.bounds.height/2)
      let componentCenter = new Vec2(this.pos.x + this.size.x/2, this.pos.y + this.size.y/2)

      let d = Vec2.subtraction(componentCenter, entityCenter);

      let aV = new Vec2((entity.bounds.width + this.size.x)/2, (entity.bounds.height + this.size.y)/2)

      if(Math.abs(d.x) > aV.x || Math.abs(d.y) > aV.y ) return false;

      if( Math.abs(d.y / this.size.y) > Math.abs(d.x / this.size.x)){
        if(d.y > 0) entity.pos.y = this.bounds.top - entity.bounds.height/2;
        else entity.pos.y = this.bounds.bottom + entity.bounds.height/2;
      } else {
        if (d.x > 0) entity.pos.x = this.bounds.left - entity.bounds.width/2;
        else entity.pos.x = this.bounds.right + entity.bounds.width/2;
      }

    }
    if(entity.type == "bullet"){
      entity.spent = true;
      this.health--;
    }
  }
}



export class TDSMap {
  constructor(map){
    this.name = map.name;
    let [x,y] = map.dimensions;
    // no position map cannot move and will alwauys be at 0,0
    this.size = new Vec2(x,y);
    if(!map.dimensions) this.size = new Vec2(5000,5000);
    this.bounds = new Rect(new Vec2, this.size);
    this.objects = new Set();

    map.objects.forEach(object => {
      this.objects.add(new TDSMapComponent(object));
    })

  }
  draw(ctx, camera){
    this.objects.forEach(object => {
      object.draw(ctx, camera);
      // if(this.show_info) object.draw_info(ctx, camera)
    })
  }
  draw_info(ctx, camera){
    this.objects.forEach(object => {
      if(this.show_info) object.draw_info(ctx, camera);
    })
  }

  collisions(entities){
    this.objects.forEach(object => {
      entities.forEach(entity => {
        this.boundCheck(entity);
        object.collision(entity)
      })
    })
  }

  boundCheck(entity){
    if(entity.bounds.left < 0){
    	// entity.pos.x = entity.bounds.width/2;
      this.boundResponse(entity, "left");

    }
    if(entity.bounds.top < 0){
    	// entity.pos.y = entity.bounds.height/2;
      this.boundResponse(entity, "top");
    }
    if(entity.bounds.right > this.size.x){
    	// entity.pos.x = this.size.x - entity.bounds.width/2;
      this.boundResponse(entity, "right");
    }
    if(entity.bounds.bottom > this.size.y){
    	// entity.pos.y = this.size.y - entity.bounds.height/2;
      this.boundResponse(entity, "bottom");
    }
  }

  boundResponse(entity, dir){
    if(entity.type == "bullet") entity.spent = true;
    if(entity.type == "soldier"){
      switch (dir) {
        case "left":
          entity.pos.x = entity.bounds.width/2;
          break;
        case "top":
          entity.pos.y = entity.bounds.height/2;
          break;
        case "right":
          entity.pos.x = this.size.x - entity.bounds.width/2;
          break;
        case "bottom":
          entity.pos.y = this.size.y - entity.bounds.height/2;
      }
    }
  }


  destruction(){
    this.objects.forEach(object => {
      if(object.health <= 0) this.objects.delete(object)
    });
  }

}


// function drawRect(obj, ctx){
//   // if(!obj.rect && this.objects.length === 1) throw new Error;
//   obj.forEach(r => {
//     let [x,y] = r.pos;
//     let [width,height] = r.size;
//     ctx.beginPath();
//     ctx.fillStyle = r.colour;
//     ctx.rect(x, y, width, height);
//     ctx.fill();
//     ctx.closePath()
//   })
// }
