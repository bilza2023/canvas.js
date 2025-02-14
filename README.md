
# TaleemCanvas - JavaScript Canvas Drawing Library

## Introduction
**TaleemCanvas** is a lightweight JavaScript library for structured **drawing on an HTML5 canvas**. It provides an easy-to-use API for adding and managing graphical elements like text, shapes, images, and sprites. The library is designed for **scalability**, allowing future enhancements such as animations and user interactions.


## Documentation
For **detailed documentation and examples**, visit:  
👉 **[TaleemCanvas Docs](https://bilza2023.github.io/taleem-canvas.js/)**  

>The library is not fully tested and documented, wait till version 1.0 before serious use.

```
## Installation
Install via npm:  
```sh
npm install taleem-canvas
```

## Basic Usage
Create a canvas and add items dynamically:  
```js
import TaleemCanvas from "taleem-canvas";

const canvas = new TaleemCanvas("myCanvas");
const rect = canvas.add.rectangle();
rect.set("fillColor", "blue");
rect.x = 100;
rect.y = 100;

canvas.draw();
```

## Available Items
TaleemCanvas provides various drawable items:
- **Text** (`text()`)
- **Image** (`image()`)
- **Sprite** (`sprite()`)
- **List** (`list()`)
- **Pie Chart** (`piechart()`)
- **Circle** (`circle()`)
- **Ellipse** (`ellipse()`)
- **Line** (`line()`)
- **Ray** (`ray()`)
- **Rectangle** (`rectangle()`)
- **Triangle** (`triangle()`)

Each item follows a **consistent API**, allowing properties like `x`, `y`, `width`, and `height` to be set dynamically.

## API Reference
TaleemCanvas provides the following key methods:
- `new TaleemCanvas(canvasId)` → Initialize a new canvas.
- `canvas.draw()` → Render all items on the canvas.
- `canvas.add.text()` → Add a text item.
- `canvas.add.image()` → Add an image item.
- `canvas.add.sprite()` → Add a sprite item.
- And many more…

## Works Without External Assets
TaleemCanvas **can be used without** external asset libraries like `taleem-assets`. However, if needed, you can preload assets separately.

### **Changes Made:**
✅ Removed deep technical details (now covered in the online docs).  
✅ Simplified descriptions while keeping key info.  
✅ Added **docs URL prominently**.  

🚀 **Ready to publish! Let me know if you want changes.**