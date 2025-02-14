# Taleem Canvas - Item Rules & Standards

## **1. Item Dimension Table**
This table defines how each item manages its **width and height** and whether it relies on an alternative property.

| **Item Type**   | **Uses width/height directly?** | **Alternative Property** |
|---------------|------------------------|----------------------|
| **Rectangle** | ✅ Yes                     | ❌ No alternative  |
| **TextItem** | ⚠️ Computed from `fontSize` | `width` auto-computed |
| **Circle** | ❌ No                     | `radius` determines both `width` & `height` |
| **Ellipse** | ❌ No                     | `radiusX`, `radiusY` control size |
| **Line** | ⚠️ Derived from length & angle | Uses `startX, startY, endX, endY` |

👉 **This is the most important table in the library. It will be updated regularly as we add more items. Completing this table for every item ensures the system remains predictable and extendable.**

---

## **2. Standard Bounding Box API**
Every item must implement the following methods to ensure correct hit detection and rendering boundaries:

| **Method Name**              | **Purpose** |
|-----------------------------|------------|
| `boundingRectangleX()` | Returns **X-coordinate** of the bounding box. |
| `boundingRectangleY()` | Returns **Y-coordinate** of the bounding box. |
| `boundingRectangleWidth()` | Returns the **bounding box width**. |
| `boundingRectangleHeight()` | Returns the **bounding box height**. |
| `getBoundingRectangle()` | Returns `{ x, y, width, height }` using the above methods. |

### **Enforcement Rules:**
- ✅ `getBoundingRectangle()` **must NOT be overridden** by child classes.
- ✅ Child classes **MUST implement** the individual bounding rectangle functions (`boundingRectangleX()`, etc.).
- ✅ If an item **cannot compute an accurate bounding box**, its documentation **must explicitly mention this limitation.**

### **Bounding Box Validation Helper**
A debugging function is added to `BaseItem` to ensure `getBoundingRectangle()` returns valid values:

```js
validateBoundingBox() {
    const bounds = this.getBoundingRectangle();
    if (bounds.width <= 0 || bounds.height <= 0) {
        console.warn(`Invalid bounding box detected for ${this.itemExtra.type}:`, bounds);
    }
}
```

---

## **3. Required API for Every Item**
Every new item **MUST** implement the following methods, as `BaseItem` **expects them**:

| **Method Name**        | **Purpose** |
|------------------------|------------|
| `static itemExtraData()` | Returns the **default data** for the item. |
| `draw(ctx, assets)` | Handles **drawing** the item on the canvas. |
| `get width()` | Retrieves the width of the item. |
| `set width(value)` | Modifies the width (implementation varies per item). |
| `get height()` | Retrieves the height of the item. |
| `set height(value)` | Modifies the height (implementation varies per item). |
| `isHit(mouseX, mouseY)` | Detects if the item was clicked/touched. |
| `boundingRectangleX()` | Returns the **X position** of the bounding box. |
| `boundingRectangleY()` | Returns the **Y position** of the bounding box. |
| `boundingRectangleWidth()` | Returns the **width** of the bounding box. |
| `boundingRectangleHeight()` | Returns the **height** of the bounding box. |
| `getBoundingRectangle()` | Returns an object `{ x, y, width, height }` using the bounding rectangle values. |

---

## **4. Methods That Child Items Must NOT Override**
Some methods in `BaseItem` **should never be modified**, as they provide core functionality.

| **Method Name**      | **Reason** |
|----------------------|------------|
| `getBoundingRectangle()` | Ensures a uniform bounding box calculation for all items. |
| `setEnv(env)` | Assigns a shared rendering context (Env.js). |
| `isHit(mouseX, mouseY)` | Should only be overridden if the item cannot define a predictable bounding rectangle. By default, all items use a standard rectangle-based `isHit()`. |

### **New `isHit()` Rule**
- **All items should inherit `isHit()` from `BaseItem`, unless absolutely necessary.**
- If an item can accurately determine its `getBoundingRectangle()`, then `isHit()` should work correctly without modifications.
- **Only irregular shapes (like lines, polygons, or rotated objects) should override `isHit()`.**

```js
isHit(mouseX, mouseY) {
    const { x, y, width, height } = this.getBoundingRectangle();
    return (
        mouseX >= x &&
        mouseX <= x + width &&
        mouseY >= y &&
        mouseY <= y + height
    );
}
```

---

### **Final Notes**
This document serves as a **quick reference** for implementing new items in Taleem Canvas. **Any new item must conform to these rules.** If any rules are unclear, they should be discussed before implementation.

