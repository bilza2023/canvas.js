

function draw(ctx,items=[],slideExtra,assets) {
    try {
      drawBackground(ctx,slideExtra,assets);
      drawItems(ctx,items=[]);
    } catch (error) {
      // console.error("Error during drawItems:", error);
    }
  }
function drawItems(ctx,items=[],assets) {
    try {
      for (let i = 0; i < items.length; i++) {
        items[i].draw(ctx,assets);
      }
    } catch (error) {
      console.error("Error during drawItems:", error);
    }
  }
///////////////////////////
function drawBackground(ctx,slideExtra,assets) {
  if(!slideExtra.bgGlobalAlpha) {
    slideExtra.bgGlobalAlpha = 1;
  }

  clear(slideExtra.backgroundColor);
// debugger;
 drawBackgroundImage(slideExtra,assets.bgImages);

  if(slideExtra.showGrid) {
    grid(
      slideExtra.cellWidth, 
      slideExtra.cellHeight, 
      slideExtra.gridLineWidth, 
      slideExtra.gridLineColor
    );
  }
}  
function drawGrid(cellWidth = 100, cellHeight = 100, lineWidth = 2, lineColor = 'black') {
  ctx.save(); // Save the current context state

  // Adjust canvas settings for sharp lines
  ctx.translate(0.5, 0.5);
  ctx.imageSmoothingEnabled = false;

  ctx.strokeStyle = lineColor;
  ctx.lineWidth = lineWidth;

  // Draw vertical lines
  for (let x = cellWidth; x < canvas.width; x += cellWidth) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, canvas.height);
      ctx.stroke();
  }

  // Draw horizontal lines
  for (let y = cellHeight; y < canvas.height; y += cellHeight) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(canvas.width, y);
      ctx.stroke();
  }

  ctx.restore(); // Restore the context state
}   
function drawBackgroundImage(slideExtra,bgImages){
  if(slideExtra.bgImg !== "null") {
    for (let i = 0; i < bgImages.length; i++) {
      const element = bgImages[i];
      if(element.name === slideExtra.bgImg) {
        bgImage(element.img, slideExtra.bgGlobalAlpha || 1);
        break;
      }
    }
  }
}

function clear(ctx,width,height,backgroundColor='gray') {
  ctx.clearRect(0, 0, width, canvas.height);
  ctx.fillStyle = backgroundColor; 
  ctx.fillRect(0, 0, width, height); 
  }  


  export {
    draw,
    drawItems,
    clear,
    drawBackgroundImage,
    drawGrid
  }
