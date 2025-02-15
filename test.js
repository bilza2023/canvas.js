

import Assets from "taleem-assets";
import TaleemCanvas from "./index.js";
import loadImages from "./loadImages.js";

let canvas;
let addedItems = []; // Store references to added items

async function init() {
    console.log("🔹 Initializing TaleemCanvas...");

    const assets = new Assets();
    assets.images = await loadImages(['/images/scene.png']);

    const canvasElement = document.getElementById("myCanvas");
    const ctx = canvasElement.getContext("2d");
    canvas = new TaleemCanvas(canvasElement, ctx, assets);
    canvas.assets = assets;

    console.log("✅ Canvas initialized");

    // Attach event listeners
    document.getElementById("addText").addEventListener("click", addTextItem);
    document.getElementById("addImage").addEventListener("click", addImageItem);
    document.getElementById("deleteLast").addEventListener("click", deleteLastItem);
}

// ✅ Adds a text item to the canvas
function addTextItem() {
    const textItem = canvas.add.text();
    textItem.x = Math.random() * 800;
    textItem.y = Math.random() * 300;
    textItem.set("text", "New Text");
    textItem.color = "black";
    textItem.fontSize = 24;
    textItem.fontFamily = "Arial";

    addedItems.push(textItem); // Store reference
    canvas.draw();
    console.log("✅ Added Text Item:", textItem.itemExtra);
}

// ✅ Adds an image item to the canvas
function addImageItem() {
    const imageItem = canvas.add.image();
    imageItem.x = Math.random() * 800;
    imageItem.y = Math.random() * 300;
    imageItem.set("src", "scene.png");
    imageItem.width = 150;
    imageItem.height = 100;

    addedItems.push(imageItem); // Store reference
    canvas.draw();
    console.log("✅ Added Image Item:", imageItem.itemExtra);
}

// ✅ Deletes the last added item
function deleteLastItem() {
    if (addedItems.length === 0) {
        console.warn("⚠️ No items to delete.");
        return;
    }
    const lastItem = addedItems.pop(); // Get last added item
    canvas.deleteItem(lastItem);
    canvas.draw();
    console.log("✅ Deleted Last Item");
}

// Run test setup
await init();
