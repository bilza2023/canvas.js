


export default class BaseItem {
    constructor(itemExtra = {}, dialogueBox = []) {
      this.itemExtra = itemExtra;
      this.dialogueBox = dialogueBox;
    }
  
    // Subclasses should override this to provide their default properties.
    itemExtraData() {
      return {};
    }
  
    // Abstract method: subclasses must implement their own drawing.
    draw(ctx) {
      throw new Error("draw() must be implemented by subclasses");
    }
  
    // Returns the bounding rectangle using shape-specific calculations.
    getBounds() {
      return {
        x: this.boundingRectangleX(),
        y: this.boundingRectangleY(),
        width: this.width,
        height: this.height
      };
    }
  
    // Default calculations for the bounding rectangle. Override in subclasses if needed.
    boundingRectangleX() {
      return this.x;
    }
    boundingRectangleY() {
      return this.y;
    }
  
    // Hit detection based on the bounding rectangle.
    isHit(mouseX, mouseY) {
      const { x, y, width, height } = this.getBounds();
      return (
        mouseX >= x &&
        mouseX <= x + width &&
        mouseY >= y &&
        mouseY <= y + height
      );
    }
  
    // Basic property accessors—subclasses can override these to implement shape-specific logic.
    get x() {
      return this.itemExtra.x;
    }
    set x(newX) {
      this.itemExtra.x = newX;
    }
    get y() {
      return this.itemExtra.y;
    }
    set y(newY) {
      this.itemExtra.y = newY;
    }
    get width() {
      return this.itemExtra.width;
    }
    set width(newWidth) {
      this.itemExtra.width = newWidth;
    }
    get height() {
      return this.itemExtra.height;
    }
    set height(newHeight) {
      this.itemExtra.height = newHeight;
    }
  }
  