# Taleem Canvas Library - In-Depth Overview

## 1. Introduction

### 1.1 Overview
**Taleem Canvas** is a lightweight JavaScript library designed for structured **drawing** on an HTML5 canvas. It provides a robust API for adding and managing graphical elements ("items") while ensuring a scalable foundation for future enhancements such as **user interactions, animations, and component extensibility**.

At its core, the library handles:
1. **Loading assets** such as images and icons.
2. **Providing a structured drawing API** through a `TaleemCanvas` class.
3. **Managing drawable objects** using an internal `add` module.
4. **Rendering objects efficiently** while keeping code modular and extensible.

This document explores the design, structure, and rationale behind Taleem Canvas.

---

## 2. High-Level Architecture

### 2.1 Key Design Decisions
- **Separation of Concerns:** Drawing, event handling, and input management are separate modules.
- **Structured API:** Users add items through a centralized system (`add` object), not manually.
- **No Direct Manipulation:** Prevents uncontrolled mutations, ensuring predictable behavior.
- **Future-Proofing:** The base architecture allows extending the library with new shapes and features without breaking compatibility.

### 2.2 Library Flow
1. **Canvas Initialization:** `TaleemCanvas` takes a canvas element and asset bundle.
2. **Item Creation:** Users instantiate new drawable objects via `add`.
3. **Rendering:** The `DrawModule` processes and renders items onto the canvas.
4. **Event Handling:** Mouse and keyboard interactions are managed separately (future feature).

---

## 3. Core Modules Overview

### 3.1 TaleemCanvas.js
This is the entry point and primary class, responsible for:
- **Managing the Canvas:** Creates an internal `canvas` reference.
- **Handling Drawable Items:** Uses an `items` array to track graphical elements.
- **Initializing Modules:** Includes `drawModule`, `eventModule`, and `inputModule`.
- **Rendering Items:** Calls `draw()` to batch render all objects.

### 3.2 Asset Management (loadAssets.js)
Taleem Canvas includes built-in **assets** to simplify testing and development. The assets include:
- Background images
- Sprites
- Presentation images
- Icons
- Sound files (optional)

These assets are injected into each item, allowing easy access to media.

### 3.3 DrawModule.js
Responsible for rendering elements onto the canvas. It performs:
- **Canvas clearing:** Ensures a clean slate before drawing.
- **Background rendering:** Applies a background color or image.
- **Grid drawing:** (If enabled) Renders an optional visual grid.
- **Item drawing:** Iterates over `items` and calls their `draw()` functions.

### 3.4 EventModule.js
This module will handle **mouse interactions**. Currently, it:
- Attaches **event listeners** to the canvas.
- Detects **mouse position** relative to the canvas.
- Checks if an item is "hit" using `isHit(x, y)`.
- Triggers user-defined callbacks (`click`, `mousedown`, `mousemove`, etc.).

### 3.5 Env.js (Rendering Context)
Provides a shared environment for all items:
- Stores the **canvas context (`ctx`)**.
- Stores the **loaded assets**.
- Provides helper functions like `getTextWidth()` (for text measurement).

`BaseItem.setEnv(env);` ensures all items have access to this shared context.

---

## 4. How Items Are Managed

### 4.1 BaseItem.js - The Foundation
All drawable objects inherit from `BaseItem.js`, which standardizes:
- **Positioning (`x`, `y`)**
- **Sizing (`width`, `height`)**
- **Opacity (`globalAlpha`)**
- **Rendering (`draw(ctx)`)**
- **Hit Detection (`isHit(mouseX, mouseY)`)**

Every item subclass (e.g., `Rectangle`, `TextItem`) **inherits** these common properties.

### 4.2 Add.js - Centralized Item Creation
Users add items via the `add` object instead of instantiating them manually:

```js
const rect = canvas.add.rectangle();
rect.x = 100;
rect.y = 100;
canvas.draw();
```

This approach ensures:
1. **Asset Injection:** Every item has access to shared images/icons.
2. **Default Configuration:** Objects start with sensible defaults.
3. **Consistency:** Centralized item management prevents inconsistencies.

**Available Items:**
- `rectangle()` - A basic rectangle.
- `circle()` - A filled/stroked circle.
- `ellipse()` - An elliptical shape.
- `text()` - A text object with font customization.

Each item type follows the same API contract.

---

## 5. Drawing Process & Canvas Integration

### 5.1 Drawing Flow
1. **Clearing:** The canvas is wiped before each frame.
2. **Background Rendering:** A background color/image is applied.
3. **Item Rendering:** Each item’s `draw(ctx, assets)` method is invoked.

### 5.2 Example: Rectangle Drawing

Each item implements its `draw()` function. Example from `Rectangle.js`:

```js
export default class Rectangle extends BaseItem {
  draw(ctx) {
    ctx.fillStyle = this.itemExtra.color;
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }
}
```

The `drawModule` calls `item.draw(ctx)`, ensuring all items are painted onto the canvas.

---

## 6. Event Handling & Future Expansion

### 6.1 Current Event System (Mouse Support)
`EventModule.js` attaches event listeners to the canvas and determines whether an item is clicked or hovered.

Example event binding:
```js
canvas.onMouse("click", (event, item) => {
  console.log("Clicked on:", item);
});
```

### 6.2 Planned Enhancements
Future iterations will include:
- **Drag-and-Drop Support**
- **Item Resizing**
- **Layering & Z-Index Management**

---

## 7. Conclusion & Next Steps

### 7.1 Summary
Taleem Canvas is structured around:
1. **A core canvas management system (`TaleemCanvas`)**
2. **Modular drawing and event handling (`DrawModule`, `EventModule`)**
3. **A uniform API for items (`BaseItem`, `Add`)**

This foundation enables **scalability**, allowing future expansion into interactivity and animation.

### 7.2 Next Steps
- **Complete the core item library (basic shapes, text, images).**
- **Polish the drawing system (optimize performance, improve asset handling).**
- **Begin working on user interactions (dragging, resizing).**

For now, the focus remains **strictly on drawing** before integrating interactions and advanced features.

---

This document serves as a **technical reference** for Taleem Canvas. Future updates will be added as the library evolves.

