export default class Rect {
  constructor(posVec, sizeVec){
    this.left = posVec.x;
    this.width = sizeVec.x;
    this.right = this.left + this.width;
    this.top = posVec.y;
    this.height = sizeVec.y;
    this.bottom = this.top + this.height;
  }
  set(posVec){
    this.left = posVec.x;
    this.top = posVec.y;
    this.right = this.left + this.width;
    this.bottom = this.top + this.height;
  }
  within(r) {
	  return (r.left <= this.left && r.right >= this.right && r.top <= this.top && r.bottom >= this.bottom);
  }
  overlaps(r) {
		return (this.left < r.right && r.left < this.right && this.top < r.bottom && r.top < this.bottom);
	}
  circleCollision(circle){
    return (false);
  }
}
