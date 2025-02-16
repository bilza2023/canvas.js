
import TaleemCanvas from "../taleem-canvas.js";


async function testTaleemCanvas() {
    console.log("🔹 Running TaleemCanvas Test...");

    
    const canvasElement = document.getElementById("myCanvas");
    const ctx = canvasElement.getContext("2d");
    const canvas = new TaleemCanvas(canvasElement, ctx);
    await canvas.loadImages(['../assets/images/scene.png']);

    console.log("✅ Canvas initialized");

    // Add a text item
    const textItem = canvas.add.text();
    textItem.x = 400;
    textItem.y = 50;
    textItem.set("text", "Test Text");
    textItem.color = "black";
    textItem.fontSize = 24;
    textItem.fontFamily = "Arial";

    // Add an image item
    const imageItem = canvas.add.image();
    imageItem.x = 300;
    imageItem.y = 120;
    imageItem.set("src", "scene.png");
    imageItem.width = 600;
    imageItem.height = 250;

    console.log("✅ Items added");

    // 🔥 **Test Save Method**
    const savedData = canvas.save();
    console.log("🔹 Saved Data:", savedData);

    // Validate saved data structure
    if (!Array.isArray(savedData)) {
        console.error("❌ Save method did not return an array");
        return;
    }

    if (savedData.length !== 2) {
        console.error(`❌ Expected 2 items, got ${savedData.length}`);
        return;
    }

    if (!savedData[0].type || !savedData[1].type) {
        console.error("❌ Missing 'type' field in saved data");
        return;
    }

    console.log("✅ Save method test passed!");

    canvas.draw();
}

// Run test
await testTaleemCanvas();
