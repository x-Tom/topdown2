import Timer from "./time.js"
import {Vec2, square_wave} from "./math.js"
import {loadMap, TDSMap} from "./level.js"
import Player from "./player.js"
import Camera from "./Camera.js"
import Bot from "./bots.js"
import Turret from "./Turret.js"
import {canvas, ctx, clearcanvas, resizecanvas} from "./canvas.js"
import {controls, mouseHandler} from "./controls.js"
// import * from "./canvas.js"
// class TopDownShooter{}






async function main(){

  let mapJSON = await loadMap("level1");
  let map = new TDSMap(mapJSON);
  map.show_info = false;

  let player = new Player;
  // let camera;
  // let enemies = new Set(Array.from(Array(10), x => new Player(1, _enemy_colour.body_colour, _enemy_colour.eye_colour, false)));
  let enemies = new Set(Array.from(Array(100), x => new Bot ));
  // console.log(enemies.entries());
  let turret = new Turret(new Vec2(2500, 600));
  // turret.RPM = Infinity;
  let bullets = new Set;

  // let controls = new ControlSet(player);

  window.player = player;
  window.turret = turret;
  window.enemies = enemies;


  let camera = new Camera(map.size);
  document.addEventListener("mousemove", e => mouseHandler(e, player, camera), false);
  camera.follow(player);

  let timer = new Timer;

  timer.update = function update(dt){
    // console.log(accTime)
    // accTime += (time - prevTime) / 1000;
    // while(accTime > dt){
      // ctx.clearRect(0,0,canvas.width,canvas.height);


    clearcanvas();
    HUD(this.time)

    map.draw(ctx, camera);
    map.draw_info(ctx, camera);

    player.draw(ctx, camera);
    // player.draw_info(ctx);
    turret.draw(ctx, camera);




    player.move(controls);
    let bullet = player.shoot(controls, dt);
    player.reload(controls);
    if(bullet) bullets.add(bullet);
          // console.log(player);
          // if(player.pos.x == NaN) console.log("here!");
    player.update(dt);

    if(player.health <= 0) player.destruct();

    let turret_bullet = turret.shoot(turret.controlSet, dt);
    if(turret_bullet) bullets.add(turret_bullet);

    turret.update(dt);

    if(turret.health <= 0) turret.destruct();


    enemies.forEach(enemy => {
      enemy.draw(ctx, camera);
      // enemy.draw_info(ctx);
      // ai(enemy);
      enemy.update(dt);
      // enemy.controlSet.fire.state = true;
      let bullet = enemy.shoot(enemy.controlSet);
      if(bullet) bullets.add(bullet);
      if(enemy.health <= 0) {
        enemies.delete(enemy);
        if(enemy.last_bullet.shooter == player) player.kill_count++;
        console.log("ENEMY KILLED 100");
      };

    })


    bullets.forEach(bullet => {
      bullet.draw(ctx, camera);
      bullet.update(dt);
      // if(bullet.spent) bullets.delete(bullet);
      if(collision(player,bullet)) {
        player.health--;
        bullet.spent = true;
      };

      if(collision(turret,bullet)) {
        turret.health--;
        bullet.spent = true;
      };

      enemies.forEach(enemy => {
        if (collision(enemy, bullet)) {
          // console.log("collided");
          enemy.health-=player.damage;
          enemy.last_bullet = bullet;
          bullet.spent = true;

        };

      })
      if(bullet.spent) bullets.delete(bullet);
    })

    // accTime -= dt;
    // }
    // requestAnimationFrame(update);

    map.collisions([player, ...bullets]);
    map.destruction();

    camera.follow(player);
    camera.update();

  }

  timer.start();

}


main();






function collision(entity1,entity2, prop = "radius"){
  if( Vec2.subtraction(entity1.pos,entity2.pos).magnitude < entity1[prop] + entity2[prop] ) {
    return true;
  }
  return false;
}

function HUD(secsPerFrame){
  let FPS = 1/secsPerFrame;
      // FPS COUNTER
  ctx.beginPath();
  ctx.font = "14px Monaco";
  ctx.fillStyle = "white";
  ctx.fillText(`${Math.round(FPS)} FPS`, canvas.width-70, 20);
  ctx.fillText(`${player.kill_count} Kills`, canvas.width-70, 45);
  // if() ctx.fillText("ENEMY KILLED 100", )
  ctx.closePath();
}

function ai(entity){
  if(!(FRAME_COUNT%10)) {
    velx = 4*Math.random()-2;
    vely = 4*Math.random()-2;
  }
  // entity.controlSet.move_up.state = !!Math.floor(Math.random()+1);
  // entity.controlSet.move_down.state = !!Math.floor(Math.random()+1);
  // entity.controlSet.move_left.state = !!Math.floor(Math.random()+1);
  // entity.controlSet.move_right.state = !!Math.floor(Math.random()+1);
  entity.vel.x += velx;
  entity.vel.y += vely;
  entity.angle = 2*Math.PI*Math.random();
  entity.controlSet.fire.state = !!Math.floor(Math.random()+1);
}
