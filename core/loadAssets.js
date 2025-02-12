
import {  
    loadBackgroundImages,
    loadSprites,
    loadSound,
    loadImages,
    Icons
} from "taleem-assets";

//    loadSound not required in this lib
export default async function loadAssets(presentationImagesArray =[]){

    const backgroundImages = await loadBackgroundImages();
    const sprites = await loadSprites();
    const presentationImages = await loadImages(presentationImagesArray);
 
    return {
    backgroundImages,
    sprites,
    presentationImages,
    Icons
 }
 
}