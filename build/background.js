class Background {
    constructor(game, colour) {
        this.game = game;
        this.colour = colour;
        this.width = game.width;
        this.height = game.height;
    }
    draw(ctx) {
        ctx.fillStyle = this.colour;
        ctx.fillRect(0, 0, this.width, this.height);
    }
    update() {
        // Static for now - should scroll left to right l8er
    }
}
export default Background;
