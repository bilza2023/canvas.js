import BaseItem from './BaseItem.js';
import uuid from './uuid.js';

export default class Ray extends BaseItem {
    constructor(itemExtra) {
        super(itemExtra ||  Ray.itemExtraData() );
    }

    static itemExtraData() {
        return {
            uuid: uuid(),
            type: 'ray',
            x1: 150,
            y1: 150,
            x2: 350,
            y2: 250,
            arrowWidth: 8,
            arrowHeight: 12,
            startArrow: true,
            endArrow: true,
            lineWidth: 2,
            dash: 0,
            gap: 0,
            color: "red",
            globalAlpha: 1
        };
    }

    getBounds() {
        return {
            x: this.boundingRectangleX(),
            y: this.boundingRectangleY(),
            width: this.width,
            height: this.height
        };
    }

    boundingRectangleX() { return Math.min(this.itemExtra.x1, this.itemExtra.x2); }
    boundingRectangleY() { return Math.min(this.itemExtra.y1, this.itemExtra.y2); }
    get width() { return Math.abs(this.itemExtra.x2 - this.itemExtra.x1); }
    set width(newWidth) { this.itemExtra.x2 = this.itemExtra.x1 + newWidth; }
    get height() { return Math.abs(this.itemExtra.y2 - this.itemExtra.y1); }
    set height(newHeight) { this.itemExtra.y2 = this.itemExtra.y1 + newHeight; }

    draw(ctx) {
        ctx.save();
        ctx.lineWidth = this.itemExtra.lineWidth;
        ctx.globalAlpha = this.itemExtra.globalAlpha;
        ctx.strokeStyle = this.itemExtra.color;
        ctx.fillStyle = this.itemExtra.color;
        ctx.setLineDash([this.itemExtra.dash, this.itemExtra.gap]);

        ctx.beginPath();
        ctx.moveTo(this.itemExtra.x1, this.itemExtra.y1);
        ctx.lineTo(this.itemExtra.x2, this.itemExtra.y2);
        ctx.stroke();

        if (this.itemExtra.startArrow) {
            this.drawArrowHead(ctx, this.itemExtra.x2, this.itemExtra.y2, this.itemExtra.x1, this.itemExtra.y1);
        }

        if (this.itemExtra.endArrow) {
            this.drawArrowHead(ctx, this.itemExtra.x1, this.itemExtra.y1, this.itemExtra.x2, this.itemExtra.y2);
        }

        ctx.restore();
    }

    drawArrowHead(ctx, x1, y1, x2, y2) {
        const angle = Math.atan2(y2 - y1, x2 - x1);
        const arrowWidth = this.itemExtra.arrowWidth;
        const arrowHeight = this.itemExtra.arrowHeight;

        ctx.beginPath();
        ctx.moveTo(x2, y2);
        ctx.lineTo(
            x2 - arrowHeight * Math.cos(angle) + arrowWidth * Math.sin(angle),
            y2 - arrowHeight * Math.sin(angle) - arrowWidth * Math.cos(angle)
        );
        ctx.lineTo(
            x2 - arrowHeight * Math.cos(angle) - arrowWidth * Math.sin(angle),
            y2 - arrowHeight * Math.sin(angle) + arrowWidth * Math.cos(angle)
        );
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
    }
}
