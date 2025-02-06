import Rectangle from "../items/Rectangle.js";
import Circle from "../items/Circle.js";
import Ellipse from "../items/Ellipse.js";
import Line from "../items/Line.js";
import Ray from "../items/Ray.js";
import Triangle from "../items/Triangle.js";
// import ImageItem from "../items/ImageItem.js";
// import TextItem from "../items/TextItem.js";

export default class Add {
    constructor(items) {
        this.items = items; // ✅ Store reference to TaleemCanvas.items
    }

    rectangle() {
        const item = new Rectangle();
        this.items.push(item);
        return item;
    }

    circle() {
        const item = new Circle();
        this.items.push(item);
        return item;
    }

    ellipse() {
        const item = new Ellipse();
        this.items.push(item);
        return item;
    }

    line() {
        const item = new Line();
        this.items.push(item);
        return item;
    }

    ray() {
        const item = new Ray();
        this.items.push(item);
        return item;
    }

    triangle() {
        const item = new Triangle();
        this.items.push(item);
        return item;
    }

    // image() {
    //     const item = new ImageItem();
    //     this.items.push(item);
    //     return item;
    // }

    // text() {
    //     const item = new TextItem();
    //     this.items.push(item);
    //     return item;
    // }
}
