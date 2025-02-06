
import loadImages from "./loadImages.js";

import {  
    loadBackgroundImages,
    loadSprites,
    loadSound,
    Icons
} from "taleem-assets";

export default async function loadAssets(){

    const backgroundImages = await loadBackgroundImages();
    const sprites = await loadSprites();
    const presentationImages = await loadImages(['./assets/scene.png']);

    const sound = await loadSound("https://taleem-media.blr1.cdn.digitaloceanspaces.com/sound/fbise9math2024_ch_1_ex_1.1_q_1_pt_5.opus");
    console.log("sound",sound);

    // console.log("backgroundImages",backgroundImages);
    // console.log("backgroundImages",backgroundImages);
    // console.log("sprites",sprites);
    // console.log("Icons",Icons);
    // console.log("presentationImages",presentationImages);

 return {
    backgroundImages,
    sprites,
    presentationImages,
    sound,
    Icons
 }
}