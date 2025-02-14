
export default class EventModule {
    constructor(canvas, items) {
        this.canvas = canvas;
        this.items = items;
        this.callbacks = {
            click: null,
            dblclick: null,
            mousedown: null,
            mousemove: null,
            mouseup: null
        };

        this.initListeners();
    }

    initListeners() {
        this.canvas.addEventListener("click", (e) => this.handleEvent(e, "click"));
        this.canvas.addEventListener("dblclick", (e) => this.handleEvent(e, "dblclick"));
        this.canvas.addEventListener("mousedown", (e) => this.handleEvent(e, "mousedown"));
        this.canvas.addEventListener("mousemove", (e) => this.handleEvent(e, "mousemove"));
        this.canvas.addEventListener("mouseup", (e) => this.handleEvent(e, "mouseup"));
    }

    handleEvent(event, type) {
        const rect = this.canvas.getBoundingClientRect();
        const mouseX = event.clientX - rect.left;
        const mouseY = event.clientY - rect.top;

        for (let item of this.items) {
            if (item.isHit(mouseX, mouseY)) {
                if (this.callbacks[type]) {
                    this.callbacks[type](event, item);
                }
            }
        }
    }
// so we dynamically take callback from the user and find them to the call-back-names which are already tied to event 
    on(eventType, callback) {
        if (this.callbacks[eventType] !== undefined) {
            this.callbacks[eventType] = callback;
        }
    }
}
