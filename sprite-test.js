
import TaleemCanvas from "./user/TaleemCanvas.js";
import Assets from "taleem-assets";

async function run() {
    const assets = new Assets();
    const canvas = new TaleemCanvas("myCanvas", assets);
    canvas.assets = assets; // Assign assets to canvas

    const spriteSheetSelect = document.getElementById("spriteSheetSelect");
    const spriteItemSelect = document.getElementById("spriteItemSelect");

    // Get available sprites
    const availableSprites = assets.spritesList;
    if (availableSprites.length === 0) {
        console.error("No sprite sheets available.");
        return;
    }

    // Populate sprite sheets dropdown
    availableSprites.forEach(spriteName => {
        const option = document.createElement("option");
        option.value = spriteName;
        option.textContent = spriteName;
        spriteSheetSelect.appendChild(option);
    });

    // Create a sprite
    const sprite = canvas.add.sprite();
    sprite.x = 100;
    sprite.y = 100;

    // Function to update sprite items dropdown
    function updateSpriteItems(selectedSprite) {
        const spriteObject = assets.getSprite(selectedSprite);
        if (!spriteObject) return;

        const availableItems = spriteObject.getItemNames();
        spriteItemSelect.innerHTML = ""; // Clear previous items

        availableItems.forEach(itemName => {
            const option = document.createElement("option");
            option.value = itemName;
            option.textContent = itemName;
            spriteItemSelect.appendChild(option);
        });

        // Set default selected item
        sprite.set("src", selectedSprite);
        sprite.setSelectedItem(availableItems[0]);
        canvas.draw();
    }

    // Set default sprite and items
    updateSpriteItems(availableSprites[0]);

    // Event listener for sprite sheet selection change
    spriteSheetSelect.addEventListener("change", function () {
        updateSpriteItems(this.value);
    });

    // Event listener for sprite item selection change
    spriteItemSelect.addEventListener("change", function () {
        sprite.setSelectedItem(this.value);
        canvas.draw();
    });
}

await run();
