import Assets from "./dist/taleem-assets.es.js"; // ✅ Load from built library


async function testAssets() {
    console.log("Initializing Assets...");

    // Create an instance
    const assets = new Assets();

    // Select elements for displaying assets
    const bgContainer = document.getElementById("bg-images");
    const imgContainer = document.getElementById("images");
    const spriteContainer = document.getElementById("sprites");
    const iconContainer = document.getElementById("icons");
    const spriteItemsContainer = document.getElementById("sprite-items");
////////////////////////////////////////////////////////////////////////////
await assets.loadImages(["/images/scene.png"]);
////////////////////////////////////////////////////////////////////////////
    
    // Display background images with names
    assets.backgroundImagesList.forEach(name => {
        const bgData = assets.getbackgroundImage(name);
        if (bgData) {
            const wrapper = document.createElement("div");
            wrapper.classList.add("image-wrapper");

            const imgElement = document.createElement("img");
            imgElement.src = bgData;
            imgElement.width = 100;
            imgElement.alt = name;

            const label = document.createElement("span");
            label.classList.add("image-label");
            label.textContent = name;

            wrapper.appendChild(imgElement);
            wrapper.appendChild(label);
            bgContainer.appendChild(wrapper);
        }
    });

    // Display regular images
    assets.imagesList.forEach(name => {
        const imgData = assets.getImage(name);
        if (imgData) {
            const wrapper = document.createElement("div");
            wrapper.classList.add("image-wrapper");

            const imgElement = document.createElement("img");
            imgElement.src = imgData.img.src; // ✅ Correct access to the image
            imgElement.width = 100;
            imgElement.alt = name;

            const label = document.createElement("span");
            label.classList.add("image-label");
            label.textContent = name;

            wrapper.appendChild(imgElement);
            wrapper.appendChild(label);
            imgContainer.appendChild(wrapper);
        }
    });

    // Display sprites (Show full sprite sheets)
// Display sprites (Show full sprite sheets)
assets.spritesList.forEach(name => {
    const sprite = assets.getSprite(name);
    if (sprite) {
        const wrapper = document.createElement("div");
        wrapper.classList.add("image-wrapper");

        const imgElement = document.createElement("img");
        imgElement.src = sprite.img.src; // ✅ Correctly access sprite image
        imgElement.width = 200; // Show a larger preview
        imgElement.alt = name;

        const label = document.createElement("span");
        label.classList.add("image-label");
        label.textContent = name;

        wrapper.appendChild(imgElement);
        wrapper.appendChild(label);
        spriteContainer.appendChild(wrapper);
    }
});

//////////////sound and icons

    // Display 20 icons
    assets.iconsList.slice(0, 20).forEach(iconName => {
        const iconSpan = document.createElement("span");
        iconSpan.textContent = `${iconName}: ${assets.assets.icons[iconName]}`;
        iconSpan.classList.add("icon-item");
        iconContainer.appendChild(iconSpan);
    });

    // Select sound control buttons
const playButton = document.getElementById("play-sound");
const stopButton = document.getElementById("stop-sound");

// Load sound dynamically
await assets.loadSound("/sounds/music.opus");

// Play sound
playButton.addEventListener("click", () => {
    if (assets.assets.sound) {
        assets.assets.sound.play();
    }
});

// Stop sound
stopButton.addEventListener("click", () => {
    if (assets.assets.sound) {
        assets.assets.sound.stop();
    }
});

//////////////Sprites
// Display Sprite Items (Render selected part of the sprite)
assets.spritesList.forEach(name => {
    const sprite = assets.getSprite(name);
    if (sprite && sprite.data.length > 0) {
        const spriteWrapper = document.createElement("div");
        spriteWrapper.classList.add("image-wrapper");

        const title = document.createElement("h3");
        title.textContent = `Items in ${name}`;
        spriteWrapper.appendChild(title);

        sprite.data.forEach(item => {
            const itemDiv = document.createElement("div");
            itemDiv.classList.add("sprite-item");

            // Create a canvas to render the cropped sprite part
            const canvas = document.createElement("canvas");
            canvas.width = item.sw;
            canvas.height = item.sh;
            const ctx = canvas.getContext("2d");

            // Draw only the selected part of the sprite
            ctx.drawImage(
                sprite.img, 
                item.sx, item.sy, item.sw, item.sh, // Crop from sprite sheet
                0, 0, item.sw, item.sh // Draw to canvas
            );

            const label = document.createElement("span");
            label.textContent = item.name;

            itemDiv.appendChild(canvas);
            itemDiv.appendChild(label);
            spriteWrapper.appendChild(itemDiv);
        });

        spriteItemsContainer.appendChild(spriteWrapper);
    }
});



    console.log("All assets loaded successfully!");
}

// Run test
testAssets();
