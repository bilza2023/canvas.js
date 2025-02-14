
import DrawModule from "../core/DrawModule.js";
import EventModule from "../core/EventModule.js";
import InputModule from "../core/InputModule.js";
import Add from "./Add.js";
import Env from "../core/Env.js";

export default class TaleemCanvas {
  constructor(canvasId, assets = {}, width = 1000, height = 360, slideExtra = {}) {
    this.canvas = document.getElementById(canvasId);
    this.ctx = this.canvas.getContext("2d");
    this.width = width;
    this.height = height;
    this.canvas.width = this.width;
    this.canvas.height = this.height;

    this.items = []; // Main drawable items.
    const env = new Env(this.ctx, assets);
    this.add = new Add(this.items, env); // Reference to items and env.

    // Initialize DrawModule with merged slideExtra defaults.
    this.drawModule = new DrawModule(this.ctx, this.canvas, slideExtra, assets);
    this.eventModule = new EventModule(this.canvas, this.items);
    this.inputModule = new InputModule();

    // Game loop properties.
    this._isRunning = false;
    this._frameId = null;
  }

  remove(item) {
    const index = this.items.findIndex(i => i.itemExtra.uuid === item.itemExtra.uuid);
    if (index !== -1) {
      this.items.splice(index, 1);
      this.draw(); // Redraw after removal.
    }
  }

  onMouse(eventType, callback) {
    this.eventModule.on(eventType, callback);
  }

  onKey(eventType, callback) {
    this.inputModule.on(eventType, callback);
  }

  // Delegate drawing to DrawModule.
  draw() {
    this.drawModule.draw(this.items);
  }

  // Start the internal game loop.
  start() {
    if (this._isRunning) return;
    this._isRunning = true;
    const loop = () => {
      if (!this._isRunning) return;
      this.draw();
      this._frameId = requestAnimationFrame(loop);
    };
    loop();
  }

  // Stop the internal game loop.
  stop() {
    this._isRunning = false;
    if (this._frameId) {
      cancelAnimationFrame(this._frameId);
      this._frameId = null;
    }
  }
}
