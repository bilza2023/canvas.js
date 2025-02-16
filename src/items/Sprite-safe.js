
import BaseItem from "./BaseItem.js";
import uuid from "./uuid.js";

export default class Sprite extends BaseItem {
  constructor(itemExtra) {
    super(itemExtra || Sprite.itemExtraData());
    
    // Ensure the first available item is selected when the sprite is created
    this.setDefaultSelectedItem();
  }

  static itemExtraData() {
    return {
      uuid: uuid(),
      type: "sprite",
      src: "unknown", // Default until set dynamically
      selectedItem: null,
      width: 200,
      height: 200,
      globalAlpha: 1,
    };
  }

  setDefaultSelectedItem() {
    if (!this.env || !this.env.assets) return;

    const spriteObj = this.env.assets.getSprite(this.itemExtra.src);
    if (spriteObj && spriteObj.data.length > 0) {
      this.setSelectedItem(spriteObj.data[0].name); // ✅ Auto-select first item
    }
  }

  getAvailableItems() {
    if (!this.env || !this.env.assets) return [];

    const spriteObj = this.env.assets.getSprite(this.itemExtra.src);
    return spriteObj ? spriteObj.data.map(item => item.name) : [];
  }

  setSelectedItem(itemName) {
    if (!this.env || !this.env.assets) return;

    const spriteObj = this.env.assets.getSprite(this.itemExtra.src);
    if (spriteObj) {
      spriteObj.applyItem(itemName);
      this.itemExtra.selectedItem = spriteObj.selectedData;
    }
  }

  draw(ctx) {
    ctx.save();
    ctx.globalAlpha = this.itemExtra.globalAlpha;

    if (!this.env || !this.env.assets) {
      console.warn("Cannot draw sprite: environment or assets missing.");
      return;
    }

    const spriteObj = this.env.assets.getSprite(this.itemExtra.src);
    const sprite = spriteObj ? spriteObj.img : null;

    // ✅ Ensure a selected item exists before drawing
    if (spriteObj && !this.itemExtra.selectedItem && spriteObj.data.length > 0) {
      this.setSelectedItem(spriteObj.data[0].name); // Auto-select first if none
    }

    if (sprite && this.itemExtra.selectedItem) {
      const { sx, sy, sw, sh } = this.itemExtra.selectedItem;
      ctx.drawImage(sprite, sx, sy, sw, sh, this.x, this.y, this.width, this.height);
    } else {
      ctx.fillStyle = "gray";
      ctx.fillRect(this.x, this.y, this.width, this.height);
      ctx.fillStyle = "white";
      ctx.font = "16px Arial";
      ctx.textAlign = "center";
      ctx.fillText(`${this.itemExtra.src}: not found`, this.x + this.width / 2, this.y + this.height / 2);
    }

    ctx.restore();
  }
}
