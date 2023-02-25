import Player from "./player.js";
import Background from "./background.js";
import InputHandler from "./inputHandler.js";
window.addEventListener("load", () => {
    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");
    canvas.width = 480;
    canvas.height = 270;
    if (!ctx)
        throw new Error("No context found!");
    const game = new Game(canvas, ctx);
    let lastTime = 0;
    // Animation loop
    function animate(timeStamp) {
        const deltaTime = timeStamp - lastTime; // time in ms since last frame
        lastTime = timeStamp;
        ctx === null || ctx === void 0 ? void 0 : ctx.clearRect(0, 0, canvas.width, canvas.height);
        game.update(deltaTime);
        game.draw();
        requestAnimationFrame(animate);
    }
    animate(0);
});
var GameState;
(function (GameState) {
    GameState[GameState["RUNNING"] = 0] = "RUNNING";
    GameState[GameState["PAUSED"] = 1] = "PAUSED";
    GameState[GameState["MENU"] = 2] = "MENU";
    GameState[GameState["GAME_OVER"] = 3] = "GAME_OVER";
})(GameState || (GameState = {}));
class Game {
    constructor(canvas, ctx) {
        this.state = GameState.RUNNING;
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
    update(deltaTime) {
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
