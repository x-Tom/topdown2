export class Vec2 {
  constructor(x = 0,y = 0) {
    this.x = x;
    this.y = y;
    this.magnitude = Math.sqrt( ( (x*x) + (y*y) ) );
    this.angle = Math.atan2(y, x);
    // this.unit_vector = Vec2.multiply_scalar()
    // console.log(this.unit_vector);
  }

  get unit_vector() {
    if (!this.x && !this.y) return new Vec2;
    return Vec2.multiply_scalar(this, 1/this.magnitude);
  }

  static addition(vector1, vector2, m=0){ // m for mutate vector properties - dangerous
    if(!m) return new Vec2((vector1.x + vector2.x), (vector1.y + vector2.y));
    // vector1 = vector1 + vector2
    vector1.x+=vector2.x;
    vector1.y+=vector2.y;
  }

  static subtraction(vector1, vector2){
    return new Vec2((vector1.x - vector2.x), (vector1.y - vector2.y));
  }

  static multiply_scalar(vector, scalar){
    return new Vec2( (vector.x * scalar) , (vector.y * scalar) );
  }

}

export function square_wave(x){
  return Math.sign(Math.sin(2*Math.PI*x));
}

export function dampening_function(x,a=1,b=1){
  if(!a || !b) {throw new Error; return;}
  return (a*x/b) * Math.pow(Math.E, 1-(x/b));
}

export function dampening_function_complex(x, a=1, b=1, c=1) {
  return ( dampening_function(x,a,b) * (x*Math.pow(Math.E,1-Math.pow(x,c)/b)) / (Math.pow(b/c,1/c) * Math.pow(Math.E, 1-(1/c)) ));
}
