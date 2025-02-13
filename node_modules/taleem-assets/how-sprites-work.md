# **How Sprites Work in taleem-assets Library**

## **Introduction**
Sprites in the `taleem-assets` library are **base64-encoded sprite sheets** containing multiple small images (sprite items). Instead of rendering the entire sprite sheet, we can select specific parts to display individual sprite items.

The library provides methods to:
- Get a **full sprite object** (`getSprite(name)`).
- Get only the **sprite image** (`getSpriteImage(name)`).
- Get all **available sprite sheets**.
- Get all **sprite items within a sheet**.
- Select and apply a specific **sprite item**.

---

## **Getting and Using a Sprite**
A **sprite** represents a full sprite sheet that contains multiple images (items). To get a sprite instance:

```js
const assets = new Assets();
const peopleSprite = assets.getSprite("people");

console.log(peopleSprite);
```

### **What does `getSprite(name)` return?**
It returns a **Sprite instance**, which contains:
- `img` → The **sprite sheet image** (full sheet in base64).
- `data` → The **sprite items** (list of available parts inside the sheet).
- `selectedData` → The **currently selected sprite item** (default: first item).

Example Output:
```js
Sprite {
    name: "people",
    url: "data:image/png;base64,...", // Base64-encoded image
    img: [HTMLImageElement],
    data: [
        { name: "man_tblt_stndg", sx: 0, sy: 0, sw: 115, sh: 258 },
        { name: "mf_wlk_biz", sx: 150, sy: 0, sw: 200, sh: 250 },
        ...
    ],
    selectedData: { name: "man_tblt_stndg", sx: 0, sy: 0, sw: 115, sh: 258 }
}
```

By default, the **first item in the sprite sheet** is selected.

---

## **Getting Only the Sprite Image**
To get the full sprite **image only**, use `getSpriteImage(name)`.

```js
const peopleSpriteImage = assets.getSpriteImage("people");
document.body.appendChild(peopleSpriteImage); // Display full sprite sheet
```

This returns an `<img>` element containing the full sprite sheet.

---

## **Getting Sprite Item Coordinates**
Each sprite contains multiple **items**, each with specific coordinates (`sx, sy, sw, sh`).

To get the coordinates of the currently **selected item**:

```js
console.log(peopleSprite.selectedData);
```

Example Output:
```js
{ name: "man_tblt_stndg", sx: 0, sy: 0, sw: 115, sh: 258 }
```

---

## **Applying a Sprite Item**
To change the currently selected item in a sprite sheet:

```js
peopleSprite.applyItem("mf_wlk_biz");
console.log(peopleSprite.selectedData);
```

New Output:
```js
{ name: "mf_wlk_biz", sx: 150, sy: 0, sw: 200, sh: 250 }
```

This updates `selectedData`, which determines which part of the sprite sheet is in focus.

---

## **Getting All Available Sprite Sheets**
To get a **list of all available sprites** in the `Assets` object:

```js
console.log(assets.spritesList);
```

Example Output:
```js
["people", "students", "figs", "alphabets"]
```

---

## **Getting All Items in a Sprite Sheet**
Each sprite has multiple **items** (small images inside the sheet). To get all available items in a sprite sheet:

```js
console.log(peopleSprite.getItemNames());
```

Example Output:
```js
["man_tblt_stndg", "mf_wlk_biz", "mf_stnd_read", "gp_selfy", "boy_googles"]
```

---

## **Rendering a Specific Sprite Item**
If you want to **display only a specific sprite item**, crop it using a `<canvas>`.

```js
function renderSpriteItem(sprite) {
    if (!sprite.selectedData) return;

    const { sx, sy, sw, sh } = sprite.selectedData;
    const canvas = document.createElement("canvas");
    canvas.width = sw;
    canvas.height = sh;
    const ctx = canvas.getContext("2d");

    ctx.drawImage(sprite.img, sx, sy, sw, sh, 0, 0, sw, sh);

    document.body.appendChild(canvas);
}

renderSpriteItem(peopleSprite);
```

This **crops and displays only the selected sprite item** instead of the full sheet.

---

## **Conclusion**
- Use **`getSprite(name)`** to get a full sprite instance.
- Use **`getSpriteImage(name)`** to get only the sprite sheet image.
- Use **`applyItem(name)`** to select a specific sprite item.
- Use **`getItemNames()`** to list all available sprite items.
- Use **`spritesList`** to see all sprite sheets in `Assets`.
- Render sprite items using **a canvas** to show only part of the sprite sheet.

This system allows **efficient sprite management**, reducing unnecessary rendering and improving performance.

