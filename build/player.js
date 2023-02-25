import { Sitting, Running, Jumping, Falling, } from "./playerStates.js";
const playerWidth = 48;
const playerHeight = 32;
class Player {
    // fix
    constructor(game) {
        this.maxFrame = 0;
        this.game = game;
        this.image = document.getElementById("player");
        this.width = playerWidth;
        this.height = playerHeight;
        this.posX = 0;
        this.posY = this.game.height - playerHeight - this.game.groundMargin;
        this.speed = 0;
        this.maxSpeed = 10;
        this.velocityY = 0;
        this.weight = 3;
        this.states = [
            new Sitting(this),
            new Running(this),
            new Jumping(this),
            new Falling(this),
        ];
        this.currentState = this.states[0];
        this.currentState.enter();
        this.frameX = 0;
        this.frameY = 5;
        this.fps = 20;
        this.frameInterval = 1000 / this.fps;
        this.frameTimer = 0;
    }
    draw(ctx) {
        ctx.fillStyle = "red";
        // ctx.fillRect(this.posX, this.posY, this.width, this.height);
        ctx.drawImage(this.image, this.width * this.frameX, this.height * this.frameY, this.width, this.height, this.posX, this.posY, this.width, this.height);
    }
    update(deltaTime, keys) {
        this.currentState.handleInput(keys);
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
        // vertical movement - only jump on ground
        // if (keys.includes("ArrowUp") && this.onGround()) this.velocityY -= 30;
        this.posY += this.velocityY;
        if (!this.onGround())
            this.velocityY += this.weight;
        else
            this.velocityY = 0;
        // if (this.posY > this.game.height - this.height)
        //   this.posY = this.game.height - this.height; // bottom
        if (this.frameTimer > this.frameInterval) {
            this.frameTimer = 0;
            if (this.frameX < this.maxFrame) {
                this.frameX++;
            }
            else {
                this.frameX = 0;
            }
        }
        else {
            this.frameTimer += deltaTime;
        }
        // // Flappy
        // if (keys.includes("ArrowUp") && this.posY > this.height)
        //   this.velocityY -= 8;
        // this.posY += this.velocityY;
        // if (!this.onGround()) this.velocityY += this.weight;
        // else this.velocityY = 0;
        // if (this.posY > this.game.height - this.height)
        //   this.posY = this.game.height - this.height; // bottom
        // if (this.posY < 0) this.posY = 0; // top
    }
    onGround() {
        return this.posY >= this.game.height - this.height - this.game.groundMargin;
    }
    setFrameX(frameX) {
        this.frameX = frameX;
    }
    setFrameY(frameY) {
        this.frameY = frameY;
    }
    setState(stateIndex, speed) {
        this.currentState = this.states[stateIndex];
        this.game.speed = speed * this.game.maxSpeed;
        console.log(this.currentState);
        this.currentState.enter();
    }
}
export default Player;
