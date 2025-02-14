
export default class DrawModule {
  constructor(ctx, canvas, incomingSlideExtra = {}, assets) {
    this.ctx = ctx;
    this.canvas = canvas;
    // Merge default slideExtra with the incoming one:
    this.slideExtra = { ...this.getSlideExtra(), ...incomingSlideExtra };
    this.assets = assets;
  }

  getSlideExtra(){
    return {
      backgroundColor: '#efebb8',
      canvasWidth: 1000,
      canvasHeight: 360,
      cellHeight: 25,
      cellWidth: 25,
      bgImg: 'black_mat',
      bgGlobalAlpha: 1,
      xFactor: 0,
      yFactor: 0,
      ///////////////////
      showGrid: false,
      gridLineWidth: 1,
      gridLineColor: 'gray'
    };
  }
  
  clear() {
    const { ctx, canvas, slideExtra } = this;
    const bgColor = slideExtra.backgroundColor || 'gray';
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = bgColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }

  drawBackground() {
    if (!this.slideExtra.bgGlobalAlpha) {
      this.slideExtra.bgGlobalAlpha = 1;
    }
    this.clear();
    this.drawBackgroundImage();
    if (this.slideExtra.showGrid) {
      this.drawGrid();
    }
  }

  drawBackgroundImage() {
    const { slideExtra, assets } = this;
    if (slideExtra.bgImg && assets.bgImages) {
      for (const element of assets.bgImages) {
        if (element.name === slideExtra.bgImg) {
          this.bgImage(element.img, slideExtra.bgGlobalAlpha);
          break;
        }
      }
    }
  }

  bgImage(img, alpha = 1) {
    const { ctx, canvas } = this;
    ctx.globalAlpha = alpha;
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    ctx.globalAlpha = 1;
  }

  drawGrid() {
    const { ctx, canvas, slideExtra } = this;
    const {
      cellWidth = 100,
      cellHeight = 100,
      gridLineWidth = 2,
      gridLineColor = 'black'
    } = slideExtra;
    ctx.save();
    ctx.translate(0.5, 0.5);
    ctx.imageSmoothingEnabled = false;
    ctx.strokeStyle = gridLineColor;
    ctx.lineWidth = gridLineWidth;
    for (let x = cellWidth; x < canvas.width; x += cellWidth) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, canvas.height);
      ctx.stroke();
    }
    for (let y = cellHeight; y < canvas.height; y += cellHeight) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(canvas.width, y);
      ctx.stroke();
    }
    ctx.restore();
  }

  drawItems(items = []) {
    const { ctx, assets } = this;
    items.forEach(item => {
      if (typeof item.draw === 'function') {
        item.draw(ctx, assets);
      }
    });
  }

  draw(items = []) {
    this.drawBackground();
    this.drawItems(items);
  }
}
