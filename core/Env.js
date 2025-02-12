export default class RenderContext {
    constructor(ctx, assets) {
        this.ctx = ctx;
        this.assets = assets;
    }

    getAssets() {
        return this.assets;
    }

    getTextWidth(text, fontSize, fontFamily) {
        this.ctx.font = `${fontSize}px ${fontFamily}`;
        return this.ctx.measureText(text).width;
    }

    getCanvasWidth() {
        return this.ctx.canvas.width;
    }

    getCanvasHeight() {
        return this.ctx.canvas.height;
    }
}
