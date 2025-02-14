
import Assets from "./dist/taleem-assets.js"; // Load from built library

async function testAssets() {
  console.log("Initializing Assets...");

  // Create an instance
  const assets = new Assets();

  // Select DOM elements
  const bgContainer = document.getElementById("bg-images");
  const spriteContainer = document.getElementById("sprites");
  const spriteItemsContainer = document.getElementById("sprite-items");
  const iconContainer = document.getElementById("icons");

  // Display background images with names
  assets.backgroundImagesList.forEach(name => {
    const bgData = assets.getBackgroundImage(name);
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

  // Display sprites (full sprite sheets)
  assets.spritesList.forEach(name => {
    const sprite = assets.getSprite(name);
    if (sprite) {
      const wrapper = document.createElement("div");
      wrapper.classList.add("image-wrapper");

      const imgElement = document.createElement("img");
      imgElement.src = sprite.img.src;
      imgElement.width = 200;
      imgElement.alt = name;

      const label = document.createElement("span");
      label.classList.add("image-label");
      label.textContent = name;

      wrapper.appendChild(imgElement);
      wrapper.appendChild(label);
      spriteContainer.appendChild(wrapper);
    }
  });

  // Display icons (first 20)
  assets.iconsList.slice(0, 20).forEach(iconName => {
    const iconSpan = document.createElement("span");
    iconSpan.textContent = `${iconName}: ${assets.icons[iconName]}`;
    iconSpan.classList.add("icon-item");
    iconContainer.appendChild(iconSpan);
  });

  // Display Sprite Items (render a selected part of each sprite)
  assets.spritesList.forEach(name => {
    const sprite = assets.getSprite(name);
    if (sprite && sprite.data && sprite.data.length > 0) {
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
          0, 0, item.sw, item.sh              // Draw to canvas
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
