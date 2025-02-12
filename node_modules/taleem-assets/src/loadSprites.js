import { students } from "./spriteObjects/students.js";
import { figs } from "./spriteObjects/figs.js";
import { alphabets } from "./spriteObjects/alphabets.js";
import { people } from "./spriteObjects/people.js";

const spriteList = { students, figs, alphabets, people };

export default function loadSprites() {
    try {
        // Assign base64 directly to the Image object (no need to load separately)
        Object.values(spriteList).forEach(spriteInstance => {
            const img = new Image();
            img.src = spriteInstance.url; // ✅ Directly set base64 source
            spriteInstance.img = img; // ✅ Assign the image object immediately
        });

        // Convert the object into a Map for easy lookup
        return new Map(Object.entries(spriteList));
    } catch (error) {
        console.error("Error loading sprites:", error);
        throw error;
    }
}
