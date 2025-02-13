
import TaleemCanvas from "./user/TaleemCanvas.js";
import Assets from "taleem-assets";

async function run() {
    const assets = new Assets();
    await new Promise(resolve => setTimeout(resolve, 100)); // Ensure async loading is completed

    const canvas = new TaleemCanvas("myCanvas", assets);
    canvas.assets = assets; // ✅ Ensure assets are properly assigned

    // Add heading text
    const heading = canvas.add.text();
    heading.x = 400;
    heading.y = 50;
    heading.set("text", "Welcome to the Presentation");
    heading.color = "black";
    heading.fontSize = 32;
    heading.fontFamily = "Arial";

    // Add main display image under the heading
    const mainImage = canvas.add.image();
    mainImage.x = 300;
    mainImage.y = 120;
    mainImage.set("src", "scene.png");
    mainImage.width = 600;
    mainImage.height = 250;

    // Add a list
    const list = canvas.add.list();
    list.x = 100;
    list.y = 100;
    list.set("listArray", ["First item", "Second item", "Third item"]);
    list.set("fontSize", 20);
    list.set("fontFamily", "Arial");
    list.set("color", "red");
    list.set("lineGap", 5);
    list.set("indentation", 5);

    // Add a PieChart
    const pieChart = canvas.add.piechart();
    pieChart.x = 500;
    pieChart.y = 180;
    pieChart.set("radius", 80);
    pieChart.set("data", [
        { label: "A", percentage: 5, color: "red" },
        { label: "B", percentage: 15, color: "blue" },
        { label: "C", percentage: 80, color: "green" }
    ]);
    pieChart.set("showLabels", true);
    pieChart.set("labelFontSize", 14);
    pieChart.set("labelColor", "black");

    // ✅ Correctly retrieve sprite sheets
    // const availableSprites = assets.spritesList;
    // if (availableSprites.length === 0) {
    //     console.error("No sprite sheets available.");
    // } else {
    //     console.log("Available sprite sheets:", availableSprites);

    //     // Create a Sprite
    //     const sprite = canvas.add.sprite();
    //     sprite.x = 100;
    //     sprite.y = 100;

    //     // Set the first available sprite sheet
    //     const selectedSpriteSheet = availableSprites[0];
    //     sprite.set("src", selectedSpriteSheet);

    //     // Get available items for the selected sprite sheet
    //     const spriteObject = assets.getSprite(selectedSpriteSheet);
    //     const availableItems = spriteObject.getItemNames(); // ✅ Correct method to get item names

    //     if (availableItems.length === 0) {
    //         console.error(`No items found in sprite sheet: ${selectedSpriteSheet}`);
    //     } else {
    //         console.log(`Available items in ${selectedSpriteSheet}:`, availableItems);

    //         // Automatically select the first available item
    //         spriteObject.applyItem(availableItems[0]); // ✅ Select the first item
    //     }
    // }

////////////////////////////////////////////////////////
// Get available sprites
const availableSprites = canvas.assets.spritesList;
if (availableSprites.length === 0) {
    console.error("No sprite sheets available.");
} else {
    console.log("Available sprite sheets:", availableSprites);

    // Create a Sprite
    const sprite = canvas.add.sprite();
    sprite.x = 100;
    sprite.y = 100;

    // Set the first available sprite sheet
    const selectedSpriteSheet = availableSprites[0];
    sprite.set("src", selectedSpriteSheet);

    // Get available items for the selected sprite sheet
    const spriteObject = canvas.assets.getSprite(selectedSpriteSheet);
    const availableItems = spriteObject.getItemNames();

    if (availableItems.length === 0) {
        console.error(`No items found in sprite sheet: ${selectedSpriteSheet}`);
    } else {
        console.log(`Available items in ${selectedSpriteSheet}:`, availableItems);

        // Change the displayed sprite item dynamically
        sprite.setSelectedItem(availableItems[1]); // ✅ Change to another sprite item
    }
}

////////////////////////////////////////////////////////



    canvas.draw();
}

await run();
