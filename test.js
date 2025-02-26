


import TaleemCanvas from "./index.js";


async function run() {

    const canvasElement = document.getElementById("myCanvas");
    const ctx = canvasElement.getContext("2d");
    const canvas = new TaleemCanvas(canvasElement, ctx);
    await canvas.loadImages(['./images/scene.png']);

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

    let slideExtra = {
        uuid: "0000asldkfj",
        type: 'background',  
        backgroundColor: 'green',
        cellHeight: 25,
        cellWidth: 25,
        backgroundImage: null,
        globalAlpha: 1,
        showGrid: false,
        gridLineWidth: 1,
        gridLineColor: '#685454'
      };
    canvas.setCanvasExtra(slideExtra);
    const canvasExtra = canvas.getCanvasExtra();
    console.log("canvasExtra" , canvasExtra);    
    canvas.draw();
}

await run();
