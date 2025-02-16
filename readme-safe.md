# TaleemCanvas

TaleemCanvas is a JavaScript library for rendering structured graphical elements on an HTML5 canvas. It enables users to create **shapes, text, images, sprites, and pie charts**, making it particularly useful for educational slides and presentations.

## Features
- **Simple API** for adding and customizing canvas elements.
- **No Dependencies** - Works with vanilla JavaScript.
- **Supports Multiple Elements** - Shapes, text, images, sprites, and more.
- **Event Handling** - Supports mouse and keyboard interactions.

## Documentation
Complete documentation is available at:
👉 **[TaleemCanvas Documentation](https://bilza2023.github.io/taleem-canvas/)**

The documentation includes detailed explanations of **all available items, properties, and methods**, along with code examples and usage instructions.

## Installation
Install via npm:
```sh
npm install taleem-canvas
```

## Getting Started
Initialize **TaleemCanvas** and add items to a `<canvas>`:

```javascript
import TaleemCanvas from "taleem-canvas";

const canvasElement = document.getElementById("myCanvas");
const ctx = canvasElement.getContext("2d");
const canvas = new TaleemCanvas(canvasElement, ctx);

const text = canvas.add.text();
text.set("text", "Welcome to TaleemCanvas");
text.x = 100;
text.y = 50;

canvas.draw();
```

## Available Items
TaleemCanvas supports the following graphical elements:
- **Shapes**: Line, Rectangle, Circle, Ellipse, Triangle, Ray
- **Text**: Customizable text elements
- **Images**: Load and render images
- **Sprites**: Display selected sections of a sprite sheet
- **Pie Charts**: Render labeled pie charts
- **Lists**: Display formatted lists

## API Reference
TaleemCanvas provides the following methods:

- `canvas.draw()` - Draws all items on the canvas.
- `canvas.start()` - Starts an animation loop.
- `canvas.stop()` - Stops the animation loop.
- `canvas.add.text()` - Adds a text element.
- `canvas.add.image()` - Adds an image.
- `canvas.add.sprite()` - Adds a sprite.
- `canvas.add.piechart()` - Adds a pie chart.
- `canvas.add.list()` - Adds a formatted list.
- `canvas.add.circle()` - Adds a circle.
- `canvas.add.rectangle()` - Adds a rectangle.

## Event Handling
TaleemCanvas supports mouse and keyboard interactions:

```javascript
canvas.onMouse("click", (event, item) => {
    if (item) {
        console.log("Clicked on:", item);
    }
});

canvas.onKey("keydown", (event) => {
    console.log("Key pressed:", event.key);
});
```

## Saving & Loading Canvas State
Save the current state of the canvas:
```javascript
const savedState = canvas.save();
canvas.addItems(savedState);
```

## License
TaleemCanvas is licensed under the **MIT License**. It can be used and modified for personal and commercial projects.

---

⭐ **Star this repository on GitHub if you find it useful!**