var States;
(function (States) {
    States[States["SITTING"] = 0] = "SITTING";
    States[States["RUNNING"] = 1] = "RUNNING";
    States[States["JUMPING"] = 2] = "JUMPING";
    States[States["FALLING"] = 3] = "FALLING";
})(States || (States = {}));
class PlayerStates {
    constructor(state) {
        this.state = state;
    }
    enter() { }
    handleInput(keys) { }
}
export class Sitting extends PlayerStates {
    constructor(player) {
        super(States.SITTING);
        this.player = player;
    }
    enter() {
        console.log("SITTING");
        this.player.setFrameX(0);
        this.player.setFrameY(1);
    }
    handleInput(input) {
        if (input.includes("ArrowLeft") || input.includes("ArrowRight")) {
            this.player.setState(States.RUNNING, 1);
        }
        if (input.includes("ArrowUp")) {
            this.player.setState(States.JUMPING, 1);
        }
    }
}
export class Running extends PlayerStates {
    constructor(player) {
        super(States.RUNNING);
        this.player = player;
    }
    enter() {
        console.log("RUNNING");
        this.player.maxFrame = 6;
        this.player.setFrameX(0);
        this.player.setFrameY(7);
    }
    handleInput(input) {
        if (input.includes("ArrowDown")) {
            this.player.setState(States.SITTING, 0);
        }
        if (input.includes("ArrowUp")) {
            this.player.setState(States.JUMPING, 1);
        }
    }
}
export class Jumping extends PlayerStates {
    constructor(player) {
        super(States.RUNNING);
        this.player = player;
    }
    enter() {
        console.log("JUMPING");
        this.player.maxFrame = 10;
        this.player.setFrameX(0);
        this.player.setFrameY(6);
        // this.player.setFrameX(1);
    }
    handleInput(input) {
        if (this.player.onGround())
            this.player.velocityY -= 30;
        if (this.player.velocityY > this.player.weight) {
            this.player.setState(States.FALLING, 1);
        }
    }
}
export class Falling extends PlayerStates {
    constructor(player) {
        super(States.FALLING);
        this.player = player;
    }
    enter() {
        console.log("FALLING");
        this.player.setFrameX(0);
        this.player.setFrameY(2);
    }
    handleInput(input) {
        if (this.player.onGround())
            this.player.setState(States.RUNNING, 1);
    }
}
export default PlayerStates;
