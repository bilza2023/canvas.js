
import BaseItem from "./BaseItem.js";
import uuid from "./uuid.js";

export default class Sprite extends BaseItem {
  constructor(itemExtra) {
    super(itemExtra || Sprite.itemExtraData());
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

  getDefaultSprite() {
    if (!this.env || !this.env.assets) {
      console.warn("Environment or assets are not available.");
      return "unknown";
    }

    const spriteList = this.env.assets.spritesList;
    return spriteList.length > 0 ? spriteList[0] : "unknown";
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

    if (sprite) {
      if (this.itemExtra.selectedItem) {
        const { sx, sy, sw, sh } = this.itemExtra.selectedItem;
        ctx.drawImage(sprite, sx, sy, sw, sh, this.x, this.y, this.width, this.height);
      } else {
        ctx.drawImage(sprite, this.x, this.y, this.width, this.height);
      }
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
