
import loadBackgroundImages from "./loadBackgroundImages.js";
import loadImages from "./loadImages.js";
import loadSound from "./loadSound.js";
import loadSprites from "./loadSprites.js";
import Icons from "./Icons.js";

export default class Assets {
    constructor() {
        this.assets = {
            backgroundImages: new Map(loadBackgroundImages()), // ✅ Loaded directly
            images: new Map(), // ✅ Manually loaded
            sprites: new Map(loadSprites()), // ✅ Loaded directly
            sound: null, // ✅ Manually loaded
            icons: Icons, // Static icons
        };
    }

    // Manually load images
    async loadImages(imageList) {
        this.assets.images = await loadImages(imageList);
    }

    // Manually load sound
    async loadSound(soundUrl) {
        this.assets.sound = await loadSound(soundUrl);
    }

    // Get background image by name
    getbackgroundImage(name) {
        return this.assets.backgroundImages.get(name) || null;
    }

    // Get regular image by name
    getImage(name) {
        return this.assets.images.get(name) || null;
    }

    // Get sprite by name
    getSprite(name) {
        return this.assets.sprites.get(name) || null;
    }

    // List of all background image names
    get backgroundImagesList() {
        return Array.from(this.assets.backgroundImages.keys());
    }

    // List of all loaded image names
    get imagesList() {
        return Array.from(this.assets.images.keys());
    }

    // List of all available icons
    get iconsList() {
        return Object.keys(Icons);
    }

    // List of all sprites
    get spritesList() {
        return Array.from(this.assets.sprites.keys());
    }

    // Static methods to return assets directly (no instance needed)
    // static async getBackgroundImages() {
    //     return loadBackgroundImages();
    // }

    // static async getImages(imageList) {
    //     return loadImages(imageList);
    // }

    // static async getSound(soundUrl) {
    //     return loadSound(soundUrl);
    // }

    // static async getSprites() {
    //     return loadSprites();
    // }
}
