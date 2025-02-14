import Assets from "taleem-assets";
import TaleemCanvas from "./src/user/TaleemCanvas.js";
import CanvasEditor from "./CanvasEditor.js"; 

async function run() {
  const assets = new Assets();
  // Optionally, provide a custom slideExtra object here:
  const customSlideExtra = {
    showGrid: true,
    gridLineColor: "lightgray",
    gridLineWidth: 0.5,
    backgroundColor: "#efebb8"
  };

  const canvas = new TaleemCanvas("myCanvas", assets, 1000, 360, customSlideExtra);
  canvas.backgroundColor = "#5e0a0a";
  
  const editor = new CanvasEditor(canvas); 

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

  // Continuous redraw loop for smooth rendering (like a game engine)
  function gameLoop() {
    canvas.draw();
    requestAnimationFrame(gameLoop);
  }
  
  gameLoop(); // Start loop

  window.editor = editor; // (Optional for debugging)
}

await run();
