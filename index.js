import Rectangle from './canvasItems/Rectangle.js';
import Circle from './canvasItems/Circle.js';
import Ellipse from './canvasItems/Ellipse.js';
import Ray from './canvasItems/Ray.js';
import Line from './canvasItems/Line.js';
import DrawModule from './DrawModule.js';

document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById("myCanvas");
  const ctx = canvas.getContext("2d");

  // Define slide settings and assets for the DrawModule
  const slideExtra = {
    backgroundColor: "#333", // Dark gray background
    bgImg: null,             // No background image for now
    bgGlobalAlpha: 1,
    showGrid: false,
    cellWidth: 100,
    cellHeight: 100,
    gridLineWidth: 2,
    gridLineColor: "black"
  };

  const assets = {
    bgImages: [] // Could be populated with { name, img } objects later
  };

  // Create items with default properties
  const rectangle = new Rectangle();
  rectangle.x = 10;
  rectangle.y = 10;
  rectangle.width = 40;
  rectangle.height = 40;

  const circle = new Circle();
  circle.x = 300;
  circle.y = 100;
  
  const ellipse = new Ellipse();
  ellipse.x = 600;
  ellipse.y = 100;

const line = new Line();
line.x = 200;
line.y = 250;
line.color = 'yellow';

const ray = new Ray();
ray.x = 400;
ray.y = 250;
ray.color = 'yellow';

  const items = [rectangle, circle, ellipse,line, ray];

  // Instantiate the DrawModule with context, canvas, slideExtra, and assets
  const drawModule = new DrawModule(ctx, canvas, slideExtra, assets);

  // Draw background and items using the draw module
  drawModule.draw(items);

  // Handle double-click for hit detection
  canvas.addEventListener("dblclick", (event) => {
    const rect = canvas.getBoundingClientRect();
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;
  
    if (rectangle.isHit(mouseX, mouseY)) {
      console.log("Rectangle was double-clicked!");
    }
    if (circle.isHit(mouseX, mouseY)) {
      console.log("Circle was double-clicked!");
    }
    if (ellipse.isHit(mouseX, mouseY)) {
      console.log("Ellipse was double-clicked!");
    }
    if (line.isHit(mouseX, mouseY)) {
        console.log("Line was double-clicked!");
      }
      if (ray.isHit(mouseX, mouseY)) {
        console.log("Ray was double-clicked!");
      }
  });
});
