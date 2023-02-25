const registerKeys = [
  "ArrowLeft",
  "ArrowUp",
  "ArrowRight",
  "ArrowDown",
  "Enter",
];
class InputHandler {
  constructor() {
    this.keys = [];
    document.addEventListener("keydown", (event) => {
      if (!registerKeys.includes(event.key)) return; // check allowed key
      if (this.keys.includes(event.key)) return; // check if key is already pressed
      this.keys.push(event.key);
      // console.log(this.keys);
    });
    document.addEventListener("keyup", (event) => {
      if (!registerKeys.includes(event.key)) return; // check allowed key
      if (!this.keys.includes(event.key)) return; // check if key is already pressed
      this.keys = this.keys.filter((key) => key !== event.key);
      //   console.log(this.keys);
    });
  }
}
export default InputHandler;
