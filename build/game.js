import Player from "./player.js";
import Background from "./background.js";
import InputHandler from "./inputHandler.js";
window.addEventListener("load", () => {
    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");
    canvas.width = 500;
    canvas.height = 500;
    if (!ctx)
        throw new Error("No context found!");
    const game = new Game(canvas, ctx);
    // Animation loop
    function animate() {
        ctx === null || ctx === void 0 ? void 0 : ctx.clearRect(0, 0, canvas.width, canvas.height);
        game.update();
        game.draw();
        requestAnimationFrame(animate);
    }
    animate();
});
class Game {
    constructor(canvas, ctx) {
        this.ctx = ctx;
        this.canvas = canvas;
        this.width = canvas.width;
        this.height = canvas.height;
        this.player = new Player(this);
        this.background = new Background(this, "blue");
        this.input = new InputHandler();
    }
    update() {
        this.background.update();
        this.player.update(this.input.keys);
    }
    draw() {
        this.background.draw(this.ctx);
        this.player.draw(this.ctx);
    }
}
export default Game;
