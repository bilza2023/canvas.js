import Assets from "taleem-assets";
import TaleemCanvas from "./index.js";
import loadImages from "./src/utils/loadImages.js";

async function run() {
    // const assets = new Assets();
    
    const canvasElement = document.getElementById("myCanvas");
    const ctx = canvasElement.getContext("2d");
    const canvas = new TaleemCanvas(canvasElement, ctx, assets);

    // ✅ Ensure assets exist before adding image and sprite
    if (assets) {
        // Add main display image under the heading
        const mainImage = canvas.add.image();
        if (mainImage) {
            mainImage.x = 300;
            mainImage.y = 120;
            mainImage.set("src", "scene.png");
            mainImage.width = 600;
            mainImage.height = 250;
        }

        // ✅ Correctly retrieve sprite sheets
        const availableSprites = assets.spritesList || [];
        if (availableSprites.length === 0) {
            console.warn("No sprite sheets available.");
        } else {
            console.log("Available sprite sheets:", availableSprites);

            // Create a Sprite
            const sprite = canvas.add.sprite();
            if (sprite) {
                sprite.x = 100;
                sprite.y = 100;

                // Set the first available sprite sheet
                const selectedSpriteSheet = availableSprites[0];
                sprite.set("src", selectedSpriteSheet);

                // ✅ Use `canvas.getSprite()` instead of direct asset access
                const spriteObject = canvas.getSprite(selectedSpriteSheet);
                if (!spriteObject) {
                    console.error(`Sprite sheet not found: ${selectedSpriteSheet}`);
                    return;
                }

                const availableItems = spriteObject.getItemNames();
                if (availableItems.length === 0) {
                    console.warn(`No items found in sprite sheet: ${selectedSpriteSheet}`);
                } else {
                    console.log(`Available items in ${selectedSpriteSheet}:`, availableItems);
                    sprite.setSelectedItem(availableItems[1]); // ✅ Change to another sprite item
                }
            }
        }
    } else {
        console.warn("Skipping image and sprite creation: No assets provided.");
    }

    canvas.draw();
}

await run();
