class Layer {
    constructor(game, width, height, image, speedModifier) {
        this.game = game;
        this.width = width;
        this.height = height;
        this.image = image;
        this.posX = 0;
        this.posY = 0;
        this.speedModifier = speedModifier;
    }
    draw(ctx) {
        ctx.drawImage(this.image, this.posX, 0, this.width, this.height);
        ctx.drawImage(this.image, this.posX + this.width, 0, this.width, this.height);
    }
    update() {
        if (this.posX < -this.width) {
            this.posX = 0;
        }
        else {
            this.posX = this.posX - this.game.speed * this.speedModifier;
        }
    }
}
class Background {
    constructor(game) {
        this.game = game;
        this.layers = [
            new Layer(game, 480, 270, document.getElementById("layer-1"), 4),
            new Layer(game, 480, 270, document.getElementById("layer-2"), 3),
            new Layer(game, 480, 270, document.getElementById("layer-3"), 2),
            new Layer(game, 480, 270, document.getElementById("layer-4"), 1),
            new Layer(game, 480, 270, document.getElementById("layer-5"), 1),
            //   new Layer(
            //     480,
            //     270,
            //     document.getElementById("layer-6") as CanvasImageSource,
            //     1
            //   ),
            new Layer(game, 480, 270, document.getElementById("layer-7"), 1),
        ];
    }
    draw(ctx) {
        this.layers.forEach((layer) => {
            layer.draw(ctx);
        });
    }
    update() {
        this.layers.forEach((layer) => {
            layer.update();
        });
    }
}
export default Background;
