import BaseItem from "./BaseItem.js";
import uuid from "../utils/uuid.js";

export default class TextItem extends BaseItem {
  constructor(itemExtra) {
    super(itemExtra || TextItem.itemExtraData());
  }

  // Default properties remain static.
  static itemExtraData() {
    return {
      uuid: uuid(),
      type: "text",
      x: 100,
      y: 100,
      text: "Add text..",
      fontSize: 30,
      fontFamily: "Arial",
      color: "black",
      globalAlpha: 1,
      width: 0,
      height: 0
    };
  }

  // Instance draw method: uses the environment (this.env) to get ctx.
  draw(ctx,assets={}) {
    // Ensure defaults for font settings.
    if (!this.itemExtra.fontSize) this.itemExtra.fontSize = 40;
    if (!this.itemExtra.fontFamily) this.itemExtra.fontFamily = "Arial";

    ctx.save();

    const { text, x, y, globalAlpha, color, fontSize, fontFamily } = this.itemExtra;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 0;
    ctx.shadowBlur = 0;
    ctx.globalAlpha = globalAlpha;
    ctx.fillStyle = color;
    ctx.font = `${fontSize}px ${fontFamily}`;
    ctx.textBaseline = "top";

    ctx.fillText(text, x, y);
    ctx.restore();
  }

  // Instance method for hit detection.
  isHit(mouseX, mouseY) {
    const width = this.width;
    const height = this.height;
    return (
      mouseX >= this.itemExtra.x &&
      mouseX <= this.itemExtra.x + width &&
      mouseY >= this.itemExtra.y &&
      mouseY <= this.itemExtra.y + height
    );
  }

  // Optionally, these getters could be inherited from BaseItem.
  get boundingRectangleX() {
    return this.itemExtra.x;
  }
  get boundingRectangleY() {
    return this.itemExtra.y;
  }

  // Use the environment's text measurement function for width.
  get width() {
    if (this.itemExtra.width === 0) {
      // If not cached, compute text width.
      this.itemExtra.width = this.env.getTextWidth(
        this.itemExtra.text,
        this.itemExtra.fontSize,
        this.itemExtra.fontFamily
      );
    }
    return this.itemExtra.width;
  }

  // For height, a simple approximation: the fontSize.
  get height() {
    if (this.itemExtra.height === 0) {
      this.itemExtra.height = this.itemExtra.fontSize;
    }
    return this.itemExtra.height;
  }

  // Setters that adjust the fontSize, then reset cached dimensions.
  set width(newWidth) {
    this.itemExtra.fontSize += newWidth / 10;
    this.itemExtra.width = 0;  // Reset cache.
  }

  set height(newHeight) {
    this.itemExtra.fontSize += newHeight / 10;
    this.itemExtra.height = 0;  // Reset cache.
  }
}
