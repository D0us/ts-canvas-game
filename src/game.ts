import Player from "./player.js";
import Background from "./background.js";
import InputHandler from "./inputHandler.js";

window.addEventListener("load", () => {
  const canvas = document.getElementById("canvas") as HTMLCanvasElement;
  const ctx = canvas.getContext("2d");
  canvas.width = 480;
  canvas.height = 270;

  if (!ctx) throw new Error("No context found!");

  const game = new Game(canvas, ctx);

  let lastTime = 0;
  // Animation loop
  function animate(timeStamp: number) {
    const deltaTime = timeStamp - lastTime; // time in ms since last frame
    lastTime = timeStamp;
    ctx?.clearRect(0, 0, canvas.width, canvas.height);
    game.update(deltaTime);
    game.draw();
    requestAnimationFrame(animate);
  }

  animate(0);
});

enum GameState {
  RUNNING,
  PAUSED,
  MENU,
  GAME_OVER,
}

class Game {
  width: number;
  height: number;
  player: Player;
  background: Background;
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  input: InputHandler;
  state: GameState = GameState.RUNNING;
  groundMargin: number;
  speed: number;
  maxSpeed: number;

  constructor(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
    this.ctx = ctx;
    this.canvas = canvas;
    this.width = canvas.width;
    this.height = canvas.height;
    this.groundMargin = 10;
    this.speed = 0;
    this.maxSpeed = 1;
    this.background = new Background(this);
    this.player = new Player(this);
    this.input = new InputHandler();
  }

  update(deltaTime: number) {
    this.background.update();
    this.player.update(deltaTime, this.input.keys);
  }

  draw() {
    this.background.draw(this.ctx);
    this.player.draw(this.ctx);
  }

  end() {
    // Game over
    this.state = GameState.GAME_OVER;
  }
}

export default Game;
