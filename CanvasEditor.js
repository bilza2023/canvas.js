export default class CanvasEditor {
    constructor(canvas) {
        this.canvas = canvas;  // ✅ Reference to TaleemCanvas
        this.selectedItem = null;
        this.handles = [];
        this.drag = false;
        this.activeHandle = null;
        this.lastMouseX = 0;
        this.lastMouseY = 0;

        // Attach event listeners to the canvas
        this.canvas.onMouse("dblclick", this.handleDoubleClick.bind(this));
        this.canvas.onMouse("mousedown", this.handleMouseDown.bind(this));
        this.canvas.onMouse("mousemove", this.handleMouseMove.bind(this));
        this.canvas.onMouse("mouseup", this.handleMouseUp.bind(this));
    }

    handleDoubleClick(event, item) {
        if (item) {
            if (this.selectedItem !== item) {
                this.clearSelection();
            }
            this.selectedItem = item;
            this.createHandles();
        } else {
            this.clearSelection();
        }
    }

    handleMouseDown(event, item) {
        if (!this.selectedItem) return;

        for (let handle of this.handles) {
            if (handle.isHit(event.clientX, event.clientY)) {
                this.activeHandle = handle;
                this.drag = true;
                this.lastMouseX = event.clientX; // ✅ Track exact position
                this.lastMouseY = event.clientY;
                handle.set("color", "black");
                return;
            }
        }

        if (!item || item !== this.selectedItem) {
            this.clearSelection();
        }
    }

    handleMouseMove(event) {
        if (!this.drag || !this.activeHandle) return;
    
        const mouseX = event.clientX;
        const mouseY = event.clientY;
    
        const dx = mouseX - this.lastMouseX; // ✅ Exact delta
        const dy = mouseY - this.lastMouseY;
    
        if (this.activeHandle.type === "move") {
            this.selectedItem.x += dx;  // ✅ Moves correctly in all directions
            this.selectedItem.y += dy;
        } else if (this.activeHandle.type === "width") {
            this.selectedItem.width = Math.max(10, this.selectedItem.width + dx);
        } else if (this.activeHandle.type === "height") {
            this.selectedItem.height = Math.max(10, this.selectedItem.height + dy);
        }
    
        this.lastMouseX = mouseX; // ✅ Track exact position
        this.lastMouseY = mouseY;
    
        this.createHandles();
    }
    

    handleMouseUp(event) {
        this.drag = false; // ✅ Ensure drag stops
        if (this.activeHandle) {
            this.activeHandle.set("color", this.getHandleColor(this.activeHandle.type));
        }
        this.activeHandle = null;
    }

    createHandles() {
        this.clearHandles(); 

        this.handles = [
            this.createHandle(this.selectedItem.x, this.selectedItem.y, "move", "yellow"),
            this.createHandle(this.selectedItem.x + this.selectedItem.width, this.selectedItem.y, "width", "blue"),
            this.createHandle(this.selectedItem.x + this.selectedItem.width, this.selectedItem.y + this.selectedItem.height, "height", "purple")
        ];
    }

    createHandle(x, y, type, color) {
        const handle = this.canvas.add.rectangle();
        handle.x = x - 7;
        handle.y = y - 7;
        handle.width = 15;
        handle.height = 15;
        handle.set("color", color);
        handle.type = type;
        return handle;
    }

    getHandleColor(type) {
        return type === "move" ? "yellow" : type === "width" ? "blue" : "purple";
    }

    clearHandles() {
        this.handles.forEach(handle => this.canvas.remove(handle));
        this.handles = [];
    }

    clearSelection() {
        this.clearHandles();
        this.selectedItem = null;
    }
}
