
import DrawModule from "../core/DrawModule.js";
import EventModule from "../core/EventModule.js";
import InputModule from "../core/InputModule.js";
import Add from "./Add.js";
import Env from "../core/Env.js"

export default class TaleemCanvas {
    constructor(canvasId,assets={},width=1000,height=360) {
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext("2d");
        this.width = width;
        this.height = height;

        this.canvas.width = this.width ;
        this.canvas.height = this.height;

        this.items = []; // the add item obj is in here so cant have items
        const env = new Env(this.ctx,assets)
        this.add = new Add(this.items,env); //reference to this.items AND env 
        this.drawModule = new DrawModule(this.ctx, this.canvas, {}, {});
        this.eventModule = new EventModule(this.canvas, this.items);
        this.inputModule = new InputModule();

    }

    addItem(item) {
        this.items.push(item);
        this.drawModule.draw(this.items);
    }

    onMouse(eventType, callback) {
        this.eventModule.on(eventType, callback);
    }

    onKey(eventType, callback) {
        this.inputModule.on(eventType, callback);
    }

    clear() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    draw() {
        this.clear();
        this.drawModule.draw(this.items);
    }
}
