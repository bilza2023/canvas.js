import Assets from "../taleem-assets.js";
import TaleemCanvas from "../taleem-canvas.js";
import loadImages from "../loadImages.js";

async function testAddItems() {
    console.log("🔹 Running addItems() Test...");

    const assets = new Assets();
    
    const canvasElement = document.getElementById("myCanvas");
    const ctx = canvasElement.getContext("2d");
    
    const canvas = new TaleemCanvas(canvasElement, ctx, assets);

    await canvas.loadImages(['../assets/images/scene.png']);
    // canvas.assets = assets; 

    console.log("✅ Canvas initialized");

    // 🔥 **Test AddItems Method**
    const savedData = [
        {
            "uuid": "7b16dca3-c521-4661-823c-cb63f2fa8711",
            "type": "text",
            "x": 400,
            "y": 50,
            "text": "Test Text",
            "fontSize": 30,
            "fontFamily": "Arial",
            "color": "black",
            "globalAlpha": 1,
            "width": 118.3740234375,
            "height": 0
        },
        {
            "uuid": "bb4e92be-8a57-4410-813c-c665e4e4c096",
            "type": "image",
            "x": 300,
            "y": 120,
            "src": "scene.png",
            "width": 600,
            "height": 250,
            "globalAlpha": 1
        }
    ];

    canvas.addItems(savedData);
    console.log("✅ addItems() called successfully");

    // Validate items array length
    if (canvas.items.length !== 2) {
        console.error(`❌ Expected 2 items, but found ${canvas.items.length}`);
        return;
    }

    // Validate first item's properties
    const firstItem = canvas.items[0];
    if (firstItem.itemExtra.type !== "text" || firstItem.itemExtra.text !== "Test Text") {
        console.error("❌ First item does not match expected text properties");
        return;
    }

    // Validate second item's properties
    const secondItem = canvas.items[1];
    if (secondItem.itemExtra.type !== "image" || secondItem.itemExtra.src !== "scene.png") {
        console.error("❌ Second item does not match expected image properties");
        return;
    }

    console.log("✅ addItems() test passed!");

    canvas.draw(); // Ensure items are rendered
}

// Run test
await testAddItems();
