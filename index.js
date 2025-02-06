import TaleemCanvas from "./user/TaleemCanvas.js";
import Rectangle from "./items/Rectangle.js";
import Circle from "./items/Circle.js";
import Ellipse from "./items/Ellipse.js";
import Line from "./items/Line.js";
import Ray from "./items/Ray.js";
import Triangle from "./items/Triangle.js";
// import ImageItem from "./items/Image.js";
// import TextItem from "./items/";

document.addEventListener("DOMContentLoaded", () => {
    const canvas = new TaleemCanvas("myCanvas");

    // Add Items
    canvas.addItem(new Rectangle());
    canvas.addItem(new Circle());
    canvas.addItem(new Ellipse());
    canvas.addItem(new Line());
    canvas.addItem(new Ray());
    canvas.addItem(new Triangle());
    // canvas.addItem(new ImageItem());
    // canvas.addItem(new TextItem());

    // Handle Mouse Events
    canvas.onMouse("dblclick", (event, item) => {
        console.log("Double-clicked:", item.itemExtra.type);
    });

    // Handle Keyboard Events
    canvas.onKey("keydown", (event) => {
        console.log("Key Pressed:", event.key);
    });
});
