
export default class RenderContext {
    constructor(ctx) {
        this.ctx = ctx;
    }

    getTextWidth(text, fontSize, fontFamily) {
        this.ctx.font = `${fontSize}px ${fontFamily}`;
        return this.ctx.measureText(text).width;
    }
}
