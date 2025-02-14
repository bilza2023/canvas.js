
import DrawModule from "../core/DrawModule.js";
import EventModule from "../core/EventModule.js";
import InputModule from "../core/InputModule.js";
import Add from "./Add.js";
import Env from "../core/Env.js"

export default class TaleemCanvas {
  constructor(canvasId, assets = {}, width = 1000, height = 360, slideExtra = {}) {
    this.canvas = document.getElementById(canvasId);
    this.ctx = this.canvas.getContext("2d");
    this.width = width;
    this.height = height;

    this.canvas.width = this.width;
    this.canvas.height = this.height;

    this.items = []; // main drawable items
    const env = new Env(this.ctx, assets);
    this.add = new Add(this.items, env); // reference to this.items AND env 

    // Pass slideExtra to DrawModule; it will merge defaults automatically.
    this.drawModule = new DrawModule(this.ctx, this.canvas, slideExtra, assets);
    this.eventModule = new EventModule(this.canvas, this.items);
    this.inputModule = new InputModule();
  }

  remove(item) {
    const index = this.items.findIndex(i => i.itemExtra.uuid === item.itemExtra.uuid);
    if (index !== -1) {
      this.items.splice(index, 1); // Remove from items array
      this.draw(); // Redraw canvas after removal
    }
  }
  
  onMouse(eventType, callback) {
    this.eventModule.on(eventType, callback);
  }

  onKey(eventType, callback) {
    this.inputModule.on(eventType, callback);
  }


  
  draw() {
    // Delegates to drawModule
    this.drawModule.draw(this.items);
  }
}
