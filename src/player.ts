import Game from "./game.js";
import PlayerStates, {
  Sitting,
  Running,
  Jumping,
  Falling,
} from "./playerStates.js";

const playerWidth = 48;
const playerHeight = 32;

class Player {
  game: Game;
  image: CanvasImageSource;
  width: number;
  height: number;
  posX: number;
  posY: number;
  speed: number;
  maxSpeed: number;
  velocityY: number;
  weight: number;
  states: PlayerStates[];
  currentState: PlayerStates;
  frameX: number;
  frameY: number;
  fps: number;
  frameInterval: number;
  frameTimer: number;
  maxFrame: number = 0;
  // fix
  constructor(game: Game) {
    this.game = game;
    this.image = document.getElementById("player") as CanvasImageSource;
    this.width = playerWidth;
    this.height = playerHeight;
    this.posX = 0;
    this.posY = this.game.height - playerHeight;
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

  draw(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = "red";
    // ctx.fillRect(this.posX, this.posY, this.width, this.height);
    ctx.drawImage(
      this.image,
      this.width * this.frameX,
      this.height * this.frameY,
      this.width,
      this.height,
      this.posX,
      this.posY,
      this.width,
      this.height
    );
  }

  update(deltaTime: number, keys: string[]) {
    this.currentState.handleInput(keys);
    // horizontal movement
    this.posX += this.speed;
    if (keys.includes("ArrowLeft")) this.speed = -this.maxSpeed;
    else if (keys.includes("ArrowRight")) this.speed = this.maxSpeed;
    else this.speed = 0;
    if (this.posX < 0) this.posX = 0; // left wall

    // vertical movement - only jump on ground
    // if (keys.includes("ArrowUp") && this.onGround()) this.velocityY -= 30;
    this.posY += this.velocityY;
    if (!this.onGround()) this.velocityY += this.weight;
    else this.velocityY = 0;

    // if (this.posY > this.game.height - this.height)
    //   this.posY = this.game.height - this.height; // bottom

    if (this.frameTimer > this.frameInterval) {
      this.frameTimer = 0;
      if (this.frameX < this.maxFrame) {
        this.frameX++;
      } else {
        this.frameX = 0;
      }
    } else {
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
    return this.posY >= this.game.height - this.height;
  }

  setFrameX(frameX: number) {
    this.frameX = frameX;
  }
  setFrameY(frameY: number) {
    this.frameY = frameY;
  }

  setState(stateIndex: number) {
    this.currentState = this.states[stateIndex];
    console.log(this.currentState);
    this.currentState.enter();
  }
}

export default Player;
