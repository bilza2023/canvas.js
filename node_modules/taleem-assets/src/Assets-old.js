import loadBackgroundImages from "./loadBackgroundImages.js";
import loadImages from "./loadImages.js";
import loadPresentationImages from "./loadPresentationImages.js";
import loadSound from "./loadSound.js";
import loadSprites from "./loadSprites.js";
import Icons from "./Icons.js";

export default class Assets {
    constructor() {
        this.assets = {
            backgroundImages: new Map(), // Background images in base64
            images: new Map(), // Regular images
            sprites: new Map(), // Sprites as instances of Sprite class
            sound: null, // Sound
            icons: Icons // Static icons
        };
    }

    async init(imageList = [], soundUrl = null) {
        this.assets.backgroundImages.clear();
        this.assets.sprites.clear();
        this.assets.images.clear();
        this.assets.sound = null;

        // Load background images
        const bgImagesArray = await loadBackgroundImages();
        bgImagesArray.forEach(({ name, img }) => this.assets.backgroundImages.set(name, img));

        // Load sprites as a Map
        this.assets.sprites = await loadSprites();

        // Load sound (if provided)
        if (soundUrl) {
            this.assets.sound = await loadSound(soundUrl);
        }

        // Load images if imageList is provided
        if (imageList.length > 0) {
            this.assets.images = await loadImages(imageList);
        }
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

    // Static methods to load assets individually without creating an instance
    static async loadBackgroundImages() {
        return await loadBackgroundImages();
    }

    static async loadImages(imageList) {
        return await loadImages(imageList);
    }

    static async loadPresentationImages(imagesUrl, imageNames, isEditorMode) {
        return await loadPresentationImages(imagesUrl, imageNames, isEditorMode);
    }

    static async loadSound(soundUrl) {
        return await loadSound(soundUrl);
    }

    static async loadSprites() {
        return await loadSprites();
    }
}
