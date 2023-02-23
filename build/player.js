const playerWidth = 50;
const playerHeight = 50;
class Player {
    // fix
    constructor(game) {
        this.game = game;
        this.width = playerWidth;
        this.height = playerHeight;
        this.posX = 0;
        this.posY = this.game.height - playerHeight;
        this.speed = 0;
        this.maxSpeed = 10;
        this.velocityY = 0;
        this.weight = 3;
    }
    draw(ctx) {
        ctx.fillStyle = "red";
        ctx.fillRect(this.posX, this.posY, this.width, this.height);
    }
    update(keys) {
        // horizontal movement
        this.posX += this.speed;
        if (keys.includes("ArrowLeft"))
            this.speed = -this.maxSpeed;
        else if (keys.includes("ArrowRight"))
            this.speed = this.maxSpeed;
        else
            this.speed = 0;
        if (this.posX < 0)
            this.posX = 0; // left wall
        if (keys.includes("ArrowUp") && this.onGround())
            this.velocityY -= 30;
        this.posY += this.velocityY;
        if (!this.onGround())
            this.velocityY += this.weight;
        else
            this.velocityY = 0;
        // if (this.posX > this.co) this.posY = 0;
        // if (keys.includes("ArrowUp")) this.posY -= 1 * this.velocity;
        // if (keys.includes("ArrowDown")) this.posY += 1 * this.velocity;
    }
    onGround() {
        return this.posY >= this.game.height - this.height;
    }
}
export default Player;
