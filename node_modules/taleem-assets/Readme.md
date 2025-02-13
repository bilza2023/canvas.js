
# Taleem Assets - JavaScript Asset Management Library

## 📌 Overview
**Taleem Assets** is a JavaScript library (made for https://taleem.help) designed to efficiently manage and load assets such as:
- **Icons** (predefined symbols)
- **Background Images** (base64 images loaded instantly)
- **Regular Images** (dynamically loaded as needed)
- **Sound Files** (loaded on demand)

## 🚀 Installation
To install the package, use:
```sh
npm install taleem-assets
```

## 📖 Usage
First, import the `Assets` class and create an instance:
```javascript
import Assets from "taleem-assets";
const assets = new Assets();
```

### **1️⃣ Fetching Icons**
Icons are predefined and accessible directly:
```javascript
console.log(assets.iconsList); // List of available icons
console.log(assets.icons.ADD); // ➕
```

### **2️⃣ Fetching Background Images**
Background images are preloaded and can be retrieved using `getbackgroundImage(name)`:
```javascript
const bgImage = assets.getbackgroundImage("paper01");
if (bgImage) {
    const imgElement = document.createElement("img");
    imgElement.src = bgImage;  // ✅ Assign the base64 string
    document.body.appendChild(imgElement);
}
```

### **3️⃣ Fetching and Using Sprites**
For detailed information on how sprites work, refer to the dedicated documentation:
[How Sprites Work in taleem-assets](./how-sprites-work.md)

### **4️⃣ Loading Regular Images Dynamically**
Use `loadImages()` to load external images dynamically:
```javascript
await assets.loadImages(["/images/scene.png"]);
const imgData = assets.getImage("scene.png");
if (imgData) {
    const imgElement = document.createElement("img");
    imgElement.src = imgData.img.src;
    document.body.appendChild(imgElement);
}
```

### **5️⃣ Loading Sound Files Dynamically**
Use `loadSound()` to load a sound file:
```javascript
await assets.loadSound("/sounds/music.opus");
console.log(assets.assets.sound); // Sound object is now available
```

---

## 🎯 Example Test Page
To see the library in action, open the `index.html` file:
[Click here to open `index.html`](index.html)

This page visually loads and displays **background images, icons, and dynamically loaded assets.**

To view the test.js code in text:
[test.js](./test.md)
---

## 🛠 Available Methods in `Assets`

| Method | Description |
|--------|-------------|
| `getbackgroundImage(name)` | Retrieves a background image by name (returns a base64 string). |
| `getImage(name)` | Retrieves a loaded regular image. |
| `iconsList` | Returns a list of available icons. |
| `backgroundImagesList` | Returns a list of available background images. |
| `loadImages(imageList)` | Dynamically loads external images. |
| `loadSound(soundUrl)` | Dynamically loads a sound file. |

---

## ✅ Summary
- **Preloaded:** Icons and background images are **instantly available**.
- **Dynamic Loading:** Images and sound files can be **loaded manually** when needed.
- **Easy Asset Retrieval:** Simple methods to fetch and display assets.

Now, you can easily **manage and use assets** in your JavaScript projects with **Taleem Assets!** 🚀

