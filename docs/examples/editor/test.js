

import TaleemCanvas from "../taleem-canvas.js";
import CanvasEditor from "./CanvasEditor.js";

async function run() {

    const canvasElement = document.getElementById("myCanvas");
    const ctx = canvasElement.getContext("2d");
    const canvas = new TaleemCanvas(canvasElement, ctx);

    // Add a background color
    canvas.backgroundColor = "#5e0a0a";

    // Add three rectangles
    const rect1 = canvas.add.rectangle();
    rect1.x = 50;
    rect1.y = 50;
    rect1.width = 100;
    rect1.height = 80;
    rect1.set("color", "red");

    const rect2 = canvas.add.rectangle();
    rect2.x = 200;
    rect2.y = 100;
    rect2.width = 120;
    rect2.height = 90;
    rect2.set("color", "blue");

    const rect3 = canvas.add.rectangle();
    rect3.x = 400;
    rect3.y = 150;
    rect3.width = 140;
    rect3.height = 100;
    rect3.set("color", "green");

    // Start rendering
    canvas.draw();
    let canvasEditor = new CanvasEditor(canvas);
}

await run();
