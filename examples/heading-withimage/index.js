
import loadAssets from "./assets/loadAssets.js";
import TaleemCanvas from "./user/TaleemCanvas.js";

async function init() {
    const assets = await loadAssets();
    const canvas = new TaleemCanvas("myCanvas", assets);
    
    // Adjusting canvas size
    canvas.canvas.width = 1000;
    canvas.canvas.height = 360;
    
    // Add heading text
    const heading = canvas.add.text();
    heading.x = 400;
    heading.y = 50;
    heading.text = "Welcome to the Presentation";
    heading.color = "black";
    heading.fontSize = 32;
    heading.fontFamily = "Arial";
    
    // Add main display image under the heading
    const mainImage = canvas.add.image();
    mainImage.x = 300;
    mainImage.y = 120;
    mainImage.set("src", "scene.png");
    mainImage.width = 400;
    mainImage.height = 200;
    
    canvas.draw();
    return canvas;
}

const canvas = await init();
