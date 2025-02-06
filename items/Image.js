import BaseItem from './BaseItem.js';
import uuid from './uuid.js';

export default class ImageItem extends BaseItem {
    constructor(itemExtra) {
        super(itemExtra || ImageItem.itemExtraData());
    }

    static itemExtraData() {
        return {
            uuid: uuid(),
            type: 'image',
            x: 50,
            y: 50,
            src: 'wood.jpg', // This is just the reference name
            width: 200,
            height: 200,
            globalAlpha: 1
        };
    }

    draw(ctx, assets) {
        ctx.save();
        ctx.globalAlpha = this.itemExtra.globalAlpha;

        // ✅ Get the image from assets
        const image = assets.presentationImages.get(this.itemExtra.src);

        if (image) {
            // ✅ Draw the image if found
            ctx.drawImage(
                image,
                this.itemExtra.x,
                this.itemExtra.y,
                this.itemExtra.width,
                this.itemExtra.height
            );
        } else {
            // ❌ Draw Placeholder if Image is Missing
            ctx.fillStyle = "red";
            ctx.fillRect(
                this.itemExtra.x,
                this.itemExtra.y,
                this.itemExtra.width,
                this.itemExtra.height
            );
            ctx.fillStyle = "white";
            ctx.font = "16px Arial";
            ctx.fillText("Image not found", this.itemExtra.x + 10, this.itemExtra.y + 20);
        }

        ctx.restore();
    }
}
