import Player from "./player";

enum States {
  SITTING,
  RUNNING,
  JUMPING,
  FALLING,
}

class PlayerStates {
  state: States;
  constructor(state: States) {
    this.state = state;
  }
  enter() {}
  handleInput(keys: string[]) {}
}

export class Sitting extends PlayerStates {
  player: Player;
  constructor(player: Player) {
    super(States.SITTING);
    this.player = player;
  }

  enter() {
    console.log("SITTING");
    this.player.setFrameY(1);
    this.player.setFrameX(4);
  }

  handleInput(input: string[]) {
    if (input.includes("ArrowLeft") || input.includes("ArrowRight")) {
      this.player.setState(States.RUNNING);
    }
  }
}

export class Running extends PlayerStates {
  player: Player;
  constructor(player: Player) {
    super(States.RUNNING);
    this.player = player;
  }

  enter() {
    console.log("RUNNING");
    this.player.maxFrame = 2;
    this.player.setFrameY(1);
    // this.player.setFrameX(0);
  }

  handleInput(input: string[]) {
    if (input.includes("ArrowDown")) {
      this.player.setState(States.SITTING);
    }
    if (input.includes("ArrowUp")) {
      this.player.setState(States.JUMPING);
    }
  }
}

export class Jumping extends PlayerStates {
  player: Player;
  constructor(player: Player) {
    super(States.RUNNING);
    this.player = player;
  }

  enter() {
    console.log("JUMPING");
    this.player.maxFrame = 10;
    this.player.setFrameY(6);
    // this.player.setFrameX(1);
  }

  handleInput(input: string[]) {
    if (this.player.onGround()) this.player.velocityY -= 30;
    if (this.player.velocityY > this.player.weight) {
      this.player.setState(States.FALLING);
    }
  }
}

export class Falling extends PlayerStates {
  player: Player;
  constructor(player: Player) {
    super(States.FALLING);
    this.player = player;
  }

  enter() {
    console.log("FALLING");
    this.player.setFrameY(2);
    this.player.setFrameX(3);
  }

  handleInput(input: string[]) {
    if (this.player.onGround()) this.player.setState(States.RUNNING);
  }
}

export default PlayerStates;
