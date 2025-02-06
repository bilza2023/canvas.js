import TaleemCanvas from "./user/TaleemCanvas.js";
import loadAssets from "./assets/loadAssets.js";

async function init() {

    debugger;
    const assets = await loadAssets()

    const canvas = new TaleemCanvas("myCanvas" , assets);

    const rect = canvas.add.rectangle();
    rect.x = 100;
    rect.y = 100;

    const circle = canvas.add.circle();
    circle.x = 300;
    circle.y = 100;
    
    const text = canvas.add.text();
    text.x = 500;
    text.y = 100;

    canvas.redraw();
}

init().catch(console.error); // Start the async function and handle errors
