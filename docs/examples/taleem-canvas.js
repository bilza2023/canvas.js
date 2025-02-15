class DrawModule {
  constructor(ctx, canvas, incomingSlideExtra = {}, assets) {
    this.ctx = ctx;
    this.canvas = canvas;
    this.slideExtra = { ...this.getSlideExtra(), ...incomingSlideExtra };
    this.assets = assets;
  }
  getSlideExtra() {
    return {
      backgroundColor: "#efebb8",
      canvasWidth: 1e3,
      canvasHeight: 360,
      cellHeight: 25,
      cellWidth: 25,
      bgImg: "black_mat",
      bgGlobalAlpha: 1,
      xFactor: 0,
      yFactor: 0,
      ///////////////////
      showGrid: false,
      gridLineWidth: 1,
      gridLineColor: "gray"
    };
  }
  clear() {
    const { ctx, canvas, slideExtra } = this;
    const bgColor = slideExtra.backgroundColor || "gray";
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
      gridLineColor = "black"
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
    items.forEach((item) => {
      if (typeof item.draw === "function") {
        item.draw(ctx, assets);
      }
    });
  }
  draw(items = []) {
    this.drawBackground();
    this.drawItems(items);
  }
}
class EventModule {
  constructor(canvas, items) {
    this.canvas = canvas;
    this.items = items;
    this.callbacks = {
      click: null,
      dblclick: null,
      mousedown: null,
      mousemove: null,
      mouseup: null
    };
    this.initListeners();
  }
  initListeners() {
    this.canvas.addEventListener("click", (e) => this.handleEvent(e, "click"));
    this.canvas.addEventListener("dblclick", (e) => this.handleEvent(e, "dblclick"));
    this.canvas.addEventListener("mousedown", (e) => this.handleEvent(e, "mousedown"));
    this.canvas.addEventListener("mousemove", (e) => this.handleEvent(e, "mousemove"));
    this.canvas.addEventListener("mouseup", (e) => this.handleEvent(e, "mouseup"));
  }
  handleEvent(event, type) {
    const rect = this.canvas.getBoundingClientRect();
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;
    let hitItem = null;
    for (let item of this.items) {
      if (item.isHit(mouseX, mouseY)) {
        hitItem = item;
        break;
      }
    }
    if (this.callbacks[type]) {
      this.callbacks[type](event, hitItem);
    }
  }
  on(eventType, callback) {
    if (this.callbacks[eventType] !== void 0) {
      this.callbacks[eventType] = callback;
    }
  }
}
class InputModule {
  constructor() {
    this.callbacks = {
      keydown: null,
      keyup: null
    };
    this.initListeners();
  }
  initListeners() {
    document.addEventListener("keydown", (e) => this.handleEvent(e, "keydown"));
    document.addEventListener("keyup", (e) => this.handleEvent(e, "keyup"));
  }
  handleEvent(event, type) {
    if (this.callbacks[type]) {
      this.callbacks[type](event);
    }
  }
  on(eventType, callback) {
    if (this.callbacks[eventType] !== void 0) {
      this.callbacks[eventType] = callback;
    }
  }
}
class BaseItem {
  constructor(itemExtra = {}) {
    this.itemExtra = itemExtra;
  }
  // Subclasses should override this to provide their default properties.
  static itemExtraData() {
    return {};
  }
  // Abstract method: subclasses must implement their own drawing.
  draw(ctx) {
    throw new Error("draw() must be implemented by subclasses");
  }
  // Returns the bounding rectangle using standardized methods
  getBoundingRectangle() {
    return {
      x: this.boundingRectangleX(),
      y: this.boundingRectangleY(),
      width: this.boundingRectangleWidth(),
      height: this.boundingRectangleHeight()
    };
  }
  // Default bounding rectangle calculations. Override in subclasses if needed.
  boundingRectangleX() {
    return this.x;
  }
  boundingRectangleY() {
    return this.y;
  }
  boundingRectangleWidth() {
    return this.width;
  }
  boundingRectangleHeight() {
    return this.height;
  }
  // Standardized hit detection based on bounding rectangle.
  // Only override if an item cannot define an accurate bounding rectangle.
  isHit(mouseX, mouseY) {
    const { x, y, width, height } = this.getBoundingRectangle();
    return mouseX >= x && mouseX <= x + width && mouseY >= y && mouseY <= y + height;
  }
  // Basic property accessors—subclasses can override these to implement shape-specific logic.
  get x() {
    return this.itemExtra.x || 0;
  }
  set x(newX) {
    this.itemExtra.x = newX;
  }
  get y() {
    return this.itemExtra.y || 0;
  }
  set y(newY) {
    this.itemExtra.y = newY;
  }
  get width() {
    return this.itemExtra.width || 0;
  }
  set width(newWidth) {
    this.itemExtra.width = newWidth;
  }
  get height() {
    return this.itemExtra.height || 0;
  }
  set height(newHeight) {
    this.itemExtra.height = newHeight;
  }
  set(key, value) {
    if (key in this.itemExtra) {
      this.itemExtra[key] = value;
      return value;
    }
    return false;
  }
  ///////////////////////////////////
  align(position, offsetX = 0, offsetY = 0) {
    if (!this.env) {
      console.warn("Environment is not set for this item.");
      return;
    }
    const canvasWidth = BaseItem.env.getCanvasWidth();
    const canvasHeight = BaseItem.env.getCanvasHeight();
    switch (position) {
      case "top":
        this.x = (canvasWidth - this.width) / 2 + offsetX;
        this.y = 0 + offsetY;
        break;
      case "bottom":
        this.x = (canvasWidth - this.width) / 2 + offsetX;
        this.y = canvasHeight - this.height + offsetY;
        break;
      case "left":
        this.x = 0 + offsetX;
        this.y = (canvasHeight - this.height) / 2 + offsetY;
        break;
      case "right":
        this.x = canvasWidth - this.width + offsetX;
        this.y = (canvasHeight - this.height) / 2 + offsetY;
        break;
      case "center":
        this.x = (canvasWidth - this.width) / 2 + offsetX;
        this.y = (canvasHeight - this.height) / 2 + offsetY;
        break;
      case "top-left":
        this.x = 0 + offsetX;
        this.y = 0 + offsetY;
        break;
      case "top-right":
        this.x = canvasWidth - this.width + offsetX;
        this.y = 0 + offsetY;
        break;
      case "bottom-left":
        this.x = 0 + offsetX;
        this.y = canvasHeight - this.height + offsetY;
        break;
      case "bottom-right":
        this.x = canvasWidth - this.width + offsetX;
        this.y = canvasHeight - this.height + offsetY;
        break;
      default:
        console.warn(`Invalid alignment: ${position}`);
        break;
    }
  }
  ///////////////////////////////////
}
function uuid$1() {
  const randomHex = () => Math.floor(Math.random() * 16).toString(16);
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(c) {
    const r = randomHex();
    const v = c === "x" ? r : r & 3 | 8;
    return v.toString(16);
  });
}
class Rectangle extends BaseItem {
  constructor(itemExtra) {
    super(itemExtra || Rectangle.itemExtraData());
  }
  static itemExtraData() {
    return {
      uuid: uuid$1(),
      type: "rectangle",
      x: 100,
      y: 100,
      width: 100,
      height: 100,
      filled: true,
      lineWidth: 1,
      dash: 0,
      gap: 0,
      color: "red",
      globalAlpha: 1
    };
  }
  draw(ctx, assets = {}) {
    ctx.save();
    ctx.lineWidth = this.itemExtra.lineWidth;
    ctx.globalAlpha = this.itemExtra.globalAlpha;
    if (this.itemExtra.dash > 0 || this.itemExtra.gap > 0) {
      ctx.setLineDash([this.itemExtra.dash, this.itemExtra.gap]);
    } else {
      ctx.setLineDash([]);
    }
    if (this.itemExtra.filled) {
      ctx.fillStyle = this.itemExtra.color;
      ctx.fillRect(this.x, this.y, this.width, this.height);
    } else {
      ctx.strokeStyle = this.itemExtra.color;
      ctx.strokeRect(this.x, this.y, this.width, this.height);
    }
    ctx.restore();
  }
}
class Circle extends BaseItem {
  constructor(itemExtra) {
    super(itemExtra || Circle.itemExtraData());
  }
  static itemExtraData() {
    return {
      uuid: uuid$1(),
      type: "circle",
      x: 150,
      y: 150,
      radius: 50,
      startAngle: 0,
      endAngle: 2 * Math.PI,
      lineWidth: 1,
      dash: 0,
      gap: 0,
      filled: false,
      color: "gray",
      globalAlpha: 1
    };
  }
  boundingRectangleWidth() {
    return this.itemExtra.radius * 2;
  }
  boundingRectangleHeight() {
    return this.itemExtra.radius * 2;
  }
  // Override bounding calculations for a circle.
  boundingRectangleX() {
    return this.x - this.itemExtra.radius;
  }
  boundingRectangleY() {
    return this.y - this.itemExtra.radius;
  }
  // Use radius to compute width and height.
  get width() {
    return this.itemExtra.radius * 2;
  }
  set width(newWidth) {
    this.itemExtra.radius = newWidth / 2;
  }
  get height() {
    return this.itemExtra.radius * 2;
  }
  set height(newHeight) {
    this.itemExtra.radius = newHeight / 2;
  }
  draw(ctx, assets = {}) {
    ctx.save();
    ctx.lineWidth = this.itemExtra.lineWidth;
    ctx.globalAlpha = this.itemExtra.globalAlpha;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.itemExtra.radius, this.itemExtra.startAngle, this.itemExtra.endAngle);
    if (this.itemExtra.filled) {
      ctx.fillStyle = this.itemExtra.color;
      ctx.fill();
    } else {
      ctx.strokeStyle = this.itemExtra.color;
      ctx.stroke();
    }
    ctx.restore();
  }
}
class Ellipse extends BaseItem {
  constructor(itemExtra) {
    super(itemExtra || Ellipse.itemExtraData());
  }
  static itemExtraData() {
    return {
      uuid: uuid$1(),
      type: "ellipse",
      x: 100,
      y: 100,
      radiusX: 50,
      radiusY: 75,
      rotation: 0,
      startAngle: 0,
      endAngle: 2 * Math.PI,
      lineWidth: 1,
      filled: false,
      color: "red",
      globalAlpha: 1
    };
  }
  boundingRectangleWidth() {
    return this.itemExtra.radiusX * 2;
  }
  boundingRectangleHeight() {
    return this.itemExtra.radiusY * 2;
  }
  // Override bounding calculations using respective radii.
  boundingRectangleX() {
    return this.x - this.itemExtra.radiusX;
  }
  boundingRectangleY() {
    return this.y - this.itemExtra.radiusY;
  }
  // Use radii to compute width and height.
  get width() {
    return this.itemExtra.radiusX * 2;
  }
  set width(newWidth) {
    this.itemExtra.radiusX = newWidth / 2;
  }
  get height() {
    return this.itemExtra.radiusY * 2;
  }
  set height(newHeight) {
    this.itemExtra.radiusY = newHeight / 2;
  }
  draw(ctx, assets = {}) {
    ctx.save();
    ctx.lineWidth = this.itemExtra.lineWidth;
    ctx.globalAlpha = this.itemExtra.globalAlpha;
    ctx.beginPath();
    ctx.ellipse(this.x, this.y, this.itemExtra.radiusX, this.itemExtra.radiusY, this.itemExtra.rotation, this.itemExtra.startAngle, this.itemExtra.endAngle);
    if (this.itemExtra.filled) {
      ctx.fillStyle = this.itemExtra.color;
      ctx.fill();
    } else {
      ctx.strokeStyle = this.itemExtra.color;
      ctx.stroke();
    }
    ctx.restore();
  }
}
class Line extends BaseItem {
  constructor(itemExtra) {
    super(itemExtra || Line.itemExtraData());
  }
  static itemExtraData() {
    return {
      uuid: uuid$1(),
      type: "line",
      x1: 100,
      y1: 100,
      x2: 300,
      y2: 200,
      lineWidth: 2,
      dash: 0,
      gap: 0,
      color: "blue",
      globalAlpha: 1
    };
  }
  boundingRectangleWidth() {
    return this.width;
  }
  boundingRectangleHeight() {
    return this.height;
  }
  boundingRectangleX() {
    return Math.min(this.itemExtra.x1, this.itemExtra.x2);
  }
  boundingRectangleY() {
    return Math.min(this.itemExtra.y1, this.itemExtra.y2);
  }
  get width() {
    return Math.abs(this.itemExtra.x2 - this.itemExtra.x1);
  }
  set width(newWidth) {
    this.itemExtra.x2 = this.itemExtra.x1 + newWidth;
  }
  get height() {
    return Math.abs(this.itemExtra.y2 - this.itemExtra.y1);
  }
  set height(newHeight) {
    this.itemExtra.y2 = this.itemExtra.y1 + newHeight;
  }
  draw(ctx) {
    ctx.save();
    ctx.lineWidth = this.itemExtra.lineWidth;
    ctx.globalAlpha = this.itemExtra.globalAlpha;
    ctx.strokeStyle = this.itemExtra.color;
    ctx.setLineDash([this.itemExtra.dash, this.itemExtra.gap]);
    ctx.beginPath();
    ctx.moveTo(this.x, this.y);
    ctx.lineTo(this.x + this.width, this.y + this.height);
    ctx.stroke();
    ctx.restore();
  }
}
class Ray extends BaseItem {
  constructor(itemExtra) {
    super(itemExtra || Ray.itemExtraData());
  }
  static itemExtraData() {
    return {
      uuid: uuid$1(),
      type: "ray",
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
  boundingRectangleWidth() {
    return this.width;
  }
  boundingRectangleHeight() {
    return this.height;
  }
  boundingRectangleX() {
    return Math.min(this.itemExtra.x1, this.itemExtra.x2);
  }
  boundingRectangleY() {
    return Math.min(this.itemExtra.y1, this.itemExtra.y2);
  }
  get width() {
    return Math.abs(this.itemExtra.x2 - this.itemExtra.x1);
  }
  set width(newWidth) {
    this.itemExtra.x2 = this.itemExtra.x1 + newWidth;
  }
  get height() {
    return Math.abs(this.itemExtra.y2 - this.itemExtra.y1);
  }
  set height(newHeight) {
    this.itemExtra.y2 = this.itemExtra.y1 + newHeight;
  }
  draw(ctx) {
    ctx.save();
    ctx.lineWidth = this.itemExtra.lineWidth;
    ctx.globalAlpha = this.itemExtra.globalAlpha;
    ctx.strokeStyle = this.itemExtra.color;
    ctx.fillStyle = this.itemExtra.color;
    ctx.setLineDash([this.itemExtra.dash, this.itemExtra.gap]);
    ctx.beginPath();
    ctx.moveTo(this.x, this.y);
    ctx.lineTo(this.x + this.width, this.y + this.height);
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
    ctx.save();
    ctx.translate(x2, y2);
    ctx.rotate(angle);
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(-arrowHeight, arrowWidth / 2);
    ctx.lineTo(-arrowHeight, -arrowWidth / 2);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    ctx.restore();
  }
}
class Triangle extends BaseItem {
  constructor(itemExtra) {
    super(itemExtra || Triangle.itemExtraData());
  }
  static itemExtraData() {
    return {
      uuid: uuid$1(),
      type: "triangle",
      x1: 100,
      y1: 100,
      x2: 50,
      y2: 200,
      x3: 200,
      y3: 200,
      lineWidth: 2,
      filled: false,
      dash: 0,
      gap: 0,
      color: "red",
      globalAlpha: 1
    };
  }
  boundingRectangleWidth() {
    return Math.max(this.itemExtra.x1, this.itemExtra.x2, this.itemExtra.x3) - this.boundingRectangleX();
  }
  boundingRectangleHeight() {
    return Math.max(this.itemExtra.y1, this.itemExtra.y2, this.itemExtra.y3) - this.boundingRectangleY();
  }
  get width() {
    return this.boundingRectangleWidth();
  }
  get height() {
    return this.boundingRectangleHeight();
  }
  boundingRectangleX() {
    return Math.min(this.itemExtra.x1, this.itemExtra.x2, this.itemExtra.x3);
  }
  boundingRectangleY() {
    return Math.min(this.itemExtra.y1, this.itemExtra.y2, this.itemExtra.y3);
  }
  get width() {
    return Math.max(this.itemExtra.x1, this.itemExtra.x2, this.itemExtra.x3) - this.boundingRectangleX();
  }
  get height() {
    return Math.max(this.itemExtra.y1, this.itemExtra.y2, this.itemExtra.y3) - this.boundingRectangleY();
  }
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
    ctx.lineTo(this.itemExtra.x3, this.itemExtra.y3);
    ctx.closePath();
    if (this.itemExtra.filled) ctx.fill();
    ctx.stroke();
    ctx.restore();
  }
}
class ImageItem extends BaseItem {
  constructor(itemExtra) {
    super(itemExtra || ImageItem.itemExtraData());
  }
  static itemExtraData() {
    return {
      uuid: uuid$1(),
      type: "image",
      x: 50,
      y: 50,
      src: "wood.jpg",
      // This is just the reference name
      width: 200,
      height: 200,
      globalAlpha: 1
    };
  }
  draw(ctx) {
    ctx.save();
    ctx.globalAlpha = this.itemExtra.globalAlpha;
    const imageObj = this.env.assets.getImage(this.itemExtra.src);
    const image = imageObj ? imageObj.img : null;
    if (image) {
      ctx.drawImage(
        image,
        this.x,
        this.y,
        this.width,
        this.height
      );
    } else {
      ctx.fillStyle = "gray";
      ctx.fillRect(
        this.x,
        this.y,
        this.width,
        this.height
      );
      ctx.fillStyle = "white";
      ctx.font = "16px Arial";
      ctx.textAlign = "center";
      ctx.fillText(`${this.itemExtra.src}: not found`, this.x + this.width / 2, this.y + this.height / 2);
    }
    ctx.restore();
  }
  boundingRectangleX() {
    return this.x;
  }
  boundingRectangleY() {
    return this.y;
  }
  boundingRectangleWidth() {
    return this.width;
  }
  boundingRectangleHeight() {
    return this.height;
  }
}
function uuid() {
  const randomHex = () => Math.floor(Math.random() * 16).toString(16);
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(c) {
    const r = randomHex();
    const v = c === "x" ? r : r & 3 | 8;
    return v.toString(16);
  });
}
class TextItem extends BaseItem {
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
  draw(ctx, assets = {}) {
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
  // Use the environment's text measurement function for width.
  get width() {
    if (this.itemExtra.width === 0) {
      this.itemExtra.width = this.env.getTextWidth(
        this.itemExtra.text,
        this.itemExtra.fontSize,
        this.itemExtra.fontFamily
      );
    }
    return this.itemExtra.width;
  }
  get height() {
    return this.env.getTextWidth("W", this.itemExtra.fontSize, this.itemExtra.fontFamily);
  }
  boundingRectangleX() {
    return this.x;
  }
  boundingRectangleY() {
    return this.y;
  }
  boundingRectangleWidth() {
    return this.width;
  }
  boundingRectangleHeight() {
    return this.height;
  }
  // Setters that adjust the fontSize, then reset cached dimensions.
  set width(newWidth) {
    this.itemExtra.fontSize += newWidth / 10;
    this.itemExtra.width = 0;
  }
  set height(newHeight) {
    this.itemExtra.fontSize += newHeight / 10;
    this.itemExtra.height = 0;
  }
}
class List extends BaseItem {
  constructor(itemExtra) {
    super(itemExtra || List.itemExtraData());
  }
  static itemExtraData() {
    return {
      uuid: uuid$1(),
      type: "list",
      x: 100,
      y: 100,
      listArray: [
        "First item",
        "Second item",
        "Third item"
      ],
      fontSize: 20,
      fontFamily: "Arial",
      color: "black",
      lineGap: 5,
      indentation: 5,
      globalAlpha: 1
    };
  }
  draw(ctx) {
    ctx.save();
    ctx.globalAlpha = this.itemExtra.globalAlpha;
    ctx.fillStyle = this.itemExtra.color;
    ctx.font = `${this.itemExtra.fontSize}px ${this.itemExtra.fontFamily}`;
    let { x, y, listArray, lineGap, indentation } = this.itemExtra;
    let currentIndent = 0;
    let lineHeight = this.itemExtra.fontSize + lineGap;
    listArray.forEach((text, index) => {
      ctx.fillText(text, x + currentIndent, y + index * lineHeight);
      currentIndent += indentation;
    });
    ctx.restore();
  }
}
class PieChart extends BaseItem {
  constructor(itemExtra) {
    super(itemExtra || PieChart.itemExtraData());
  }
  static itemExtraData() {
    return {
      uuid: uuid$1(),
      type: "piechart",
      x: 200,
      y: 200,
      radius: 100,
      data: [
        { label: "A", percentage: 30, color: "red" },
        { label: "B", percentage: 50, color: "blue" },
        { label: "C", percentage: 20, color: "green" }
      ],
      showLabels: true,
      labelFontSize: 14,
      labelColor: "black",
      globalAlpha: 1
    };
  }
  draw(ctx) {
    ctx.save();
    ctx.globalAlpha = this.itemExtra.globalAlpha;
    let { x, y, radius, data, showLabels, labelFontSize, labelColor } = this.itemExtra;
    let startAngle = 0;
    data.forEach((item) => {
      let sliceAngle = item.percentage / 100 * 2 * Math.PI;
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.arc(x, y, radius, startAngle, startAngle + sliceAngle);
      ctx.closePath();
      ctx.fillStyle = item.color;
      ctx.fill();
      ctx.stroke();
      if (showLabels) {
        let midAngle = startAngle + sliceAngle / 2;
        let labelX = x + Math.cos(midAngle) * (radius * 0.7);
        let labelY = y + Math.sin(midAngle) * (radius * 0.7);
        ctx.fillStyle = labelColor;
        ctx.font = `${labelFontSize}px Arial`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(item.label, labelX, labelY);
      }
      startAngle += sliceAngle;
    });
    ctx.restore();
  }
}
class Sprite extends BaseItem {
  constructor(itemExtra) {
    super(itemExtra || Sprite.itemExtraData());
    this.setDefaultSelectedItem();
  }
  static itemExtraData() {
    return {
      uuid: uuid$1(),
      type: "sprite",
      src: "unknown",
      // Default until set dynamically
      selectedItem: null,
      width: 200,
      height: 200,
      globalAlpha: 1
    };
  }
  setDefaultSelectedItem() {
    if (!this.env || !this.env.assets) return;
    const spriteObj = this.env.assets.getSprite(this.itemExtra.src);
    if (spriteObj && spriteObj.data.length > 0) {
      this.setSelectedItem(spriteObj.data[0].name);
    }
  }
  getAvailableItems() {
    if (!this.env || !this.env.assets) return [];
    const spriteObj = this.env.assets.getSprite(this.itemExtra.src);
    return spriteObj ? spriteObj.data.map((item) => item.name) : [];
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
    if (spriteObj && !this.itemExtra.selectedItem && spriteObj.data.length > 0) {
      this.setSelectedItem(spriteObj.data[0].name);
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
class Add {
  constructor(items, env) {
    this.items = items;
    this.env = env;
  }
  sprite() {
    const item = new Sprite();
    item.env = this.env;
    this.items.push(item);
    return item;
  }
  piechart() {
    const item = new PieChart();
    item.env = this.env;
    this.items.push(item);
    return item;
  }
  list() {
    const item = new List();
    item.env = this.env;
    this.items.push(item);
    return item;
  }
  list() {
    const item = new List();
    item.env = this.env;
    this.items.push(item);
    return item;
  }
  rectangle() {
    const item = new Rectangle();
    item.env = this.env;
    this.items.push(item);
    return item;
  }
  circle() {
    const item = new Circle();
    item.env = this.env;
    this.items.push(item);
    return item;
  }
  ellipse() {
    const item = new Ellipse();
    item.env = this.env;
    this.items.push(item);
    return item;
  }
  line() {
    const item = new Line();
    item.env = this.env;
    this.items.push(item);
    return item;
  }
  ray() {
    const item = new Ray();
    item.env = this.env;
    this.items.push(item);
    return item;
  }
  triangle() {
    const item = new Triangle();
    item.env = this.env;
    this.items.push(item);
    return item;
  }
  image() {
    const item = new ImageItem();
    item.env = this.env;
    this.items.push(item);
    return item;
  }
  text() {
    const item = new TextItem();
    item.env = this.env;
    this.items.push(item);
    return item;
  }
}
class RenderContext {
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
async function loadImagesLocal(imagesUrlArray) {
  if (typeof window === "undefined") {
    return /* @__PURE__ */ new Map();
  }
  if (!Array.isArray(imagesUrlArray)) {
    throw new Error("Invalid input: 'imagesUrlArray' must be an array of URLs.");
  }
  async function loadSingleImage(imageUrl) {
    return new Promise((resolve, reject) => {
      if (typeof window === "undefined") {
        reject(new Error("Cannot load images in SSR mode."));
        return;
      }
      const img = new Image();
      img.onload = () => resolve({ url: imageUrl, img });
      img.onerror = () => reject(new Error(`Failed to load image: ${imageUrl}`));
      img.src = imageUrl;
    });
  }
  try {
    const results = await Promise.allSettled(
      imagesUrlArray.map((imageUrl) => loadSingleImage(imageUrl))
    );
    const imagesMap = /* @__PURE__ */ new Map();
    results.forEach((result) => {
      if (result.status === "fulfilled") {
        const { url, img } = result.value;
        const fileName = url.substring(url.lastIndexOf("/") + 1);
        imagesMap.set(fileName, { url, img });
      } else {
        console.error(result.reason);
      }
    });
    return imagesMap;
  } catch (error) {
    console.error("Unexpected error loading images:", error);
    return /* @__PURE__ */ new Map();
  }
}
class TaleemCanvas {
  constructor(canvas, ctx, assets = null, slideExtra = {}, width = 1e3, height = 360) {
    if (!canvas || !ctx) {
      console.error("TaleemCanvas requires both a canvas element and a 2D rendering context.");
      throw new Error("TaleemCanvas requires both `canvas` and `ctx`.");
    }
    this.canvas = canvas;
    this.ctx = ctx;
    this.assets = assets;
    this.width = width;
    this.height = height;
    this.canvas.width = this.width;
    this.canvas.height = this.height;
    this.items = [];
    const env = new RenderContext(this.ctx, assets);
    this.add = new Add(this.items, env);
    this.drawModule = new DrawModule(this.ctx, this.canvas, slideExtra, assets);
    this.eventModule = new EventModule(this.canvas, this.items);
    this.inputModule = new InputModule();
    this._isRunning = false;
    this._frameId = null;
  }
  async loadImages(imagesArray = []) {
    if (this.assets) {
      this.assets.images = await loadImagesLocal(imagesArray);
      return true;
    } else {
      return false;
    }
  }
  onMouse(eventType, callback) {
    this.eventModule.on(eventType, callback);
  }
  onKey(eventType, callback) {
    this.inputModule.on(eventType, callback);
  }
  draw() {
    this.drawModule.draw(this.items);
  }
  start() {
    if (this._isRunning) return;
    this._isRunning = true;
    const loop = () => {
      if (!this._isRunning) return;
      this.draw();
      this._frameId = requestAnimationFrame(loop);
    };
    loop();
  }
  stop() {
    this._isRunning = false;
    if (this._frameId) {
      cancelAnimationFrame(this._frameId);
      this._frameId = null;
    }
  }
  addItems(itemExtrasArray) {
    for (let i = 0; i < itemExtrasArray.length; i++) {
      const extra = itemExtrasArray[i];
      let item = this.add[extra.type]();
      item.itemExtra = extra;
    }
    this.draw();
  }
  // Delete a single item using the item (BaseItem object).
  deleteItem(item) {
    const index = this.items.findIndex((i) => i.itemExtra.uuid === item.itemExtra.uuid);
    if (index !== -1) {
      this.items.splice(index, 1);
      this.draw();
    }
  }
  // Remove all items.
  deleteAllItems() {
    this.items.splice(0, this.items.length);
    this.draw();
  }
  // Clone an item: deep copy its itemExtra, generate a new uuid,
  // then create a new item using the appropriate Add.js method.
  cloneItem(item) {
    const newItemExtra = JSON.parse(JSON.stringify(item.itemExtra));
    newItemExtra.uuid = uuid$1();
    if (!newItemExtra.type) {
      console.error("Original item missing type for clone:", item);
      throw new Error("Missing 'type' in original item's itemExtra.");
    }
    if (typeof this.add[newItemExtra.type] !== "function") {
      console.error(`No Add method for type: ${newItemExtra.type}`);
      throw new Error(`No Add method for type: ${newItemExtra.type}`);
    }
    let newItem = this.add[newItemExtra.type]();
    newItem.itemExtra = newItemExtra;
    this.draw();
    return newItem;
  }
  // Log the itemExtra data to the console.
  logItem(item) {
    console.log(item.itemExtra);
  }
  // Save returns an array of itemExtra objects that can be used with addItems.
  save() {
    return this.items.map((item) => item.itemExtra);
  }
}
export {
  TaleemCanvas as default
};
