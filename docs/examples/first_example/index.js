
import TaleemCanvas from "../taleem-canvas.js";

async function run() {
    
    const canvasElement = document.getElementById("myCanvas");
    const ctx = canvasElement.getContext("2d");
    const canvas = new TaleemCanvas(canvasElement, ctx);
    await canvas.loadImages(['../assets/images/scene.png']);

    const backgrundImagesList = canvas.background.getBackgroundImages();
    canvas.background.set("backgroundImage" , backgrundImagesList[6]);
    // console.log("getBackgroundImages",backgrundImagesList);
    
    const mainImage = canvas.add.image();
    if (mainImage) {
        mainImage.x = 300;
        mainImage.y = 120;
        mainImage.set("src", "scene.png");
        mainImage.width = 600;
        mainImage.height = 250;
    }

  
    const sprite = canvas.add.sprite();
    const getAvailableSprites = sprite.getAvailableSprites();
    const getSpriteItems = sprite.getSpriteItems("people");

    console.log("getAvailableSprites",getAvailableSprites);
    console.log("getSpriteItems",getSpriteItems);
    
    sprite.set("src" , getAvailableSprites[3]);
    sprite.set("selectedItem" , getSpriteItems[2]);

 
    canvas.draw();
}

await run();
