import DrawModule from "../core/DrawModule.js";
import EventModule from "../core/EventModule.js";
import InputModule from "../core/InputModule.js";
import Add from "./Add.js";
import Env from "../core/Env.js";
import uuid from "../items/uuid.js"; // Used to generate unique IDs
import loadImagesLocal from "./loadImagesLocal.js";

export default class TaleemCanvas {
  constructor(canvas, ctx, assets = null, slideExtra = {}, width = 1000, height = 360) {
    if (!canvas || !ctx) {
      console.error("TaleemCanvas requires both a canvas element and a 2D rendering context.");
      throw new Error("TaleemCanvas requires both `canvas` and `ctx`.");
    }

    this.canvas = canvas;
    this.ctx = ctx;
    this.assets = assets; // may be this is wrong
    this.width = width;
    this.height = height;
    this.canvas.width = this.width;
    this.canvas.height = this.height;

    this.items = [];
    const env = new Env(this.ctx, assets);
    this.add = new Add(this.items, env); // Use Add.js as a wrapper for creating new items

    this.drawModule = new DrawModule(this.ctx, this.canvas, slideExtra, assets);
    this.eventModule = new EventModule(this.canvas, this.items);
    this.inputModule = new InputModule();

    this._isRunning = false;
    this._frameId = null;
  }

 async loadImages(imagesArray=[]){
  if(this.assets){
    this.assets.images =  await loadImagesLocal(imagesArray);
    return true;
  }else {return false;}
 }

  onMouse(eventType, callback) {
    this.eventModule.on(eventType, callback);
  }

  onKey(eventType, callback) {
    this.inputModule.on(eventType, callback);
  }

  draw() {
    this.drawModule.draw(this.items);
  }

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

  stop() {
    this._isRunning = false;
    if (this._frameId) {
      cancelAnimationFrame(this._frameId);
      this._frameId = null;
    }
  }

  addItems(itemExtrasArray) {

    for (let i = 0; i < itemExtrasArray.length; i++) {
      const extra =   itemExtrasArray[i];
      let item = this.add[extra.type]();
      item.itemExtra = extra; 
    }
    this.draw();
   
  }

  // Delete a single item using the item (BaseItem object).
  deleteItem(item) {
    const index = this.items.findIndex(i => i.itemExtra.uuid === item.itemExtra.uuid);
    if (index !== -1) {
      this.items.splice(index, 1);
      this.draw();
    }
  }

  // Remove all items.
  deleteAllItems() {
    this.items.splice(0, this.items.length);
    this.draw();
  }

  // Clone an item: deep copy its itemExtra, generate a new uuid,
  // then create a new item using the appropriate Add.js method.
  cloneItem(item) {
    const newItemExtra = JSON.parse(JSON.stringify(item.itemExtra));
    newItemExtra.uuid = uuid();
    if (!newItemExtra.type) {
      console.error("Original item missing type for clone:", item);
      throw new Error("Missing 'type' in original item's itemExtra.");
    }
    if (typeof this.add[newItemExtra.type] !== "function") {
      console.error(`No Add method for type: ${newItemExtra.type}`);
      throw new Error(`No Add method for type: ${newItemExtra.type}`);
    }
    let newItem = this.add[newItemExtra.type]();
    newItem.itemExtra = newItemExtra;
    this.draw();
    return newItem;
  }

  // Log the itemExtra data to the console.
  logItem(item) {
    console.log(item.itemExtra);
  }

  // Save returns an array of itemExtra objects that can be used with addItems.
  save() {
    return this.items.map(item => item.itemExtra);
  }
}
