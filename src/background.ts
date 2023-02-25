import Game from "./game";

class Layer {
  game: Game;
  width: number;
  height: number;
  image: CanvasImageSource;
  posX: number;
  posY: number;
  speedModifier: number;

  constructor(
    game: Game,
    width: number,
    height: number,
    image: CanvasImageSource,
    speedModifier: number
  ) {
    this.game = game;
    this.width = width;
    this.height = height;
    this.image = image;
    this.posX = 0;
    this.posY = 0;
    this.speedModifier = speedModifier;
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.drawImage(this.image, this.posX, 0, this.width, this.height);
    ctx.drawImage(
      this.image,
      this.posX + this.width,
      0,
      this.width,
      this.height
    );
  }
  update() {
    if (this.posX < -this.width) {
      this.posX = 0;
    } else {
      this.posX = this.posX - this.game.speed * this.speedModifier;
    }
  }
}

class Background {
  game: Game;
  layers: Layer[];
  constructor(game: Game) {
    this.game = game;
    this.layers = [
      new Layer(
        game,
        480,
        270,
        document.getElementById("layer-1") as CanvasImageSource,
        4
      ),
      new Layer(
        game,
        480,
        270,
        document.getElementById("layer-2") as CanvasImageSource,
        3
      ),
      new Layer(
        game,
        480,
        270,
        document.getElementById("layer-3") as CanvasImageSource,
        2
      ),
      new Layer(
        game,
        480,
        270,
        document.getElementById("layer-4") as CanvasImageSource,
        1
      ),
      new Layer(
        game,
        480,
        270,
        document.getElementById("layer-5") as CanvasImageSource,
        1
      ),
      //   new Layer(
      //     480,
      //     270,
      //     document.getElementById("layer-6") as CanvasImageSource,
      //     1
      //   ),
      new Layer(
        game,
        480,
        270,
        document.getElementById("layer-7") as CanvasImageSource,
        1
      ),
    ];
  }

  draw(ctx: CanvasRenderingContext2D) {
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
