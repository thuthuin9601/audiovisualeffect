const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
canvas.width = 500;
canvas.height = 700;
const explosions = [];
let canvasPosition = canvas.getBoundingClientRect();

ctx.fillStyle = 'white';
ctx.fillRect(50, 50, 100, 150);

class Explosion {
    constructor(x, y){
        this.spriteWidth = 200;
        this.spriteHeight = 179;
        this.width = this.spriteWidth/2;
        this.height = this.spriteHeight/2;
        this.x = x - this.width/2;
        this.y = y - this.height/2;
        this.image = new Image();
        this.image.src = 'boom.png';
        this.frame = 0;
        this.timer = 0;
    }
    update(){
        this.timer++;
        if(this.timer % 10 === 0){
            this.frame++;
        }
    }
    draw(){
        ctx.drawImage(this.image, this.spriteWidth*this.frame, 0, this.spriteWidth, this.spriteHeight, this.x, this.y, this.width, this.height)
    }
}

function createAnimation(e){
    let positionX = e.x - canvasPosition.left;
    let positionY = e.y - canvasPosition.top; 
    explosions.push( new Explosion(positionX, positionY));
}

window.addEventListener('click', function(e){
    createAnimation(e)
    console.log(explosions);
    // ctx.fillStyle = 'white';
    // ctx.fillRect(e.x - canvasPosition.left - 25, e.y - canvasPosition.top - 25, 50, 50);// lệch có thể do tọa độ hình = tọa độ canvas + tọa độ chuột khi click (có thể tọa dộ cg]huột đc lấy khi click);
});

function animate(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for(let i=0; i < explosions.length; i++){
        explosions[i].update();
        explosions[i].draw();
        if(explosions[i].frame > 5){
            explosions.splice(i, 1);
            i--;
        }
    }
    requestAnimationFrame(animate);
};
animate();