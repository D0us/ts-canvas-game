var PlayerStates;
(function (PlayerStates) {
    PlayerStates[PlayerStates["SITTING"] = 0] = "SITTING";
    PlayerStates[PlayerStates["RUNNING"] = 1] = "RUNNING";
    PlayerStates[PlayerStates["JUMPING"] = 2] = "JUMPING";
})(PlayerStates || (PlayerStates = {}));
class State {
    constructor(state) {
        this.state = state;
    }
}
export class Sitting extends State {
    constructor(player) {
        super(PlayerStates.SITTING);
        this.player = player;
    }
}
