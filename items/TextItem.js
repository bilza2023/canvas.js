import BaseItem from "../core/BaseItem.js";
import uuid from "../utils/uuid.js";

export default class TextItem extends BaseItem {
    constructor(itemExtra) {
        super(itemExtra || TextItem.itemExtraData());
    }

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

    get width() {
        if (this.itemExtra.width === 0) {
            this.itemExtra.width = this.env.getTextWidth(this.itemExtra.text, this.itemExtra.fontSize, this.itemExtra.fontFamily);
        }
        return this.itemExtra.width;
    }

    get height() {
        if (this.itemExtra.height === 0) {
            this.itemExtra.height = this.env.getTextWidth("W", this.itemExtra.fontSize, this.itemExtra.fontFamily);
        }
        return this.itemExtra.height;
    }
}
