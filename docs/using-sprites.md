# **How Taleem Canvas Uses the Sprite Object from Taleem Assets**

## **Introduction**
The `taleem-canvas` library integrates with `taleem-assets` to draw **sprites** dynamically on an HTML canvas. This document explains **step by step** how `taleem-canvas` retrieves, selects, and draws **specific sprite parts** from a sprite sheet.

We will cover:
- How sprites are retrieved from `taleem-assets`.
- How sprite items (individual parts) are selected.
- How the `draw()` function properly renders only the selected sprite item.

---

## **1️⃣ Retrieving the Sprite Object from Taleem Assets**
Each sprite in `taleem-assets` is an instance of the `Sprite` class, which contains:
- `img`: The **full sprite sheet** (base64 image).
- `data`: An **array of items** (each containing `sx, sy, sw, sh` coordinates).
- `selectedData`: The **currently selected item** (defaults to the first item).

### **Code: Retrieving a Sprite**
When `taleem-canvas` initializes a sprite, it fetches it using `getSprite(name)`. This ensures we get access to the **sprite sheet image and item data**.

```js
const assets = new Assets();
const sprite = assets.getSprite("people"); // ✅ Get the sprite object

console.log(sprite);
```

### **Expected Output**
```js
Sprite {
    name: "people",
    img: [HTMLImageElement],
    data: [
        { name: "man_tblt_stndg", sx: 0, sy: 0, sw: 115, sh: 258 },
        { name: "mf_wlk_biz", sx: 150, sy: 0, sw: 200, sh: 250 },
        ...
    ],
    selectedData: { name: "man_tblt_stndg", sx: 0, sy: 0, sw: 115, sh: 258 }
}
```

By default, the **first item** (`man_tblt_stndg`) is selected.

---

## **2️⃣ Selecting a Specific Sprite Item**
To select a specific **part** of the sprite sheet, we use `applyItem(name)`, which updates `selectedData`.

### **Code: Selecting a Sprite Item**
```js
sprite.applyItem("mf_wlk_biz"); // ✅ Select a different item
console.log(sprite.selectedData);
```

### **New Output:**
```js
{ name: "mf_wlk_biz", sx: 150, sy: 0, sw: 200, sh: 250 }
```

Now, **only this portion of the sprite sheet will be drawn**.

---

## **3️⃣ How Taleem Canvas Draws the Selected Sprite Item**
The `draw(ctx)` function in `Sprite.js` is responsible for rendering the **selected** sprite item.

### **Code: `draw()` Function in `Sprite.js`**
```js
  draw(ctx) {
    ctx.save();
    ctx.globalAlpha = this.itemExtra.globalAlpha;

    const spriteObj = this.env.assets.getSprite(this.itemExtra.src);
    const sprite = spriteObj ? spriteObj.img : null;

    if (sprite && this.itemExtra.selectedItem) {
      const { sx, sy, sw, sh } = this.itemExtra.selectedItem;
      ctx.drawImage(sprite, sx, sy, sw, sh, this.x, this.y, this.width, this.height);
    } else {
      ctx.fillStyle = "gray";
      ctx.fillRect(this.x, this.y, this.width, this.height);
      ctx.fillStyle = "white";
      ctx.font = "16px Arial";
      ctx.textAlign = "center";
      ctx.fillText(`${this.itemExtra.src}: not found`, this.x + this.width / 2, this.y + this.height / 2);
    }

    ctx.restore();
  }
```

### **Step-by-Step Breakdown:**
1. **Retrieve the sprite object** from `taleem-assets`.
2. **Get the selected item’s coordinates (`sx, sy, sw, sh`)**.
3. **Use `ctx.drawImage()` to crop and draw only that portion**.
4. If the sprite is missing, it **draws a placeholder**.

---

## **4️⃣ Expected Rendering Behavior**
Now, when we add a sprite in `taleem-canvas`, it will:
1. Retrieve the **full sprite sheet**.
2. Select **the first item** by default.
3. Draw **only the selected sprite part** inside its defined area.

### **Final Usage Example**
```js
const sprite = canvas.add.sprite();
sprite.x = 100;
sprite.y = 100;
sprite.set("src", "people");

// Select a specific item
sprite.setSelectedItem("mf_wlk_biz");
canvas.draw();
```

This will **draw only** the `mf_wlk_biz` part of the sprite sheet, correctly cropped and positioned.

---

## **Conclusion**
- **Taleem Canvas fetches sprites from Taleem Assets.**
- **Each sprite sheet contains multiple items.**
- **`applyItem(name)` selects a specific item, updating `selectedData`.**
- **`draw(ctx)` ensures only the selected part is rendered.**

This integration allows **efficient sprite usage**, reducing memory usage and improving rendering performance! 🚀

