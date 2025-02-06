import TaleemCanvas from "./user/TaleemCanvas.js";

const canvas = new TaleemCanvas("myCanvas");

const rect = canvas.add.rectangle();
rect.x = 100;
rect.y = 100;

const circle = canvas.add.circle();
circle.x = 300;
circle.y = 100;

// const text = canvas.add.text();
// text.x = 500;
// text.y = 100;
// text.text = "Hello Taleem!";

canvas.redraw();
