import { loadBackgroundImages, loadSprites, loadSound, loadImages, Icons } from './index.js';

async function testLibrary() {
    try {
        // Load Background Images
        const bgImages = await loadBackgroundImages();
        console.log('Background Images:', bgImages);

        // Load Sprites
        const sprites = await loadSprites();
        console.log('Sprites:', sprites);

        // Load Sound
        const sound = await loadSound("music.opus");
        console.log('Sound:', sound);
        window.soundInstance = sound; // Store globally for button access

        // Load Test Image
        const images = await loadImages(['./scene.png']);
        console.log('Loaded Images:', images);

        const container = document.getElementById('layer-container');

        // Display Background Images
        bgImages.slice(0, 3).forEach(({ img }) => {
            const card = document.createElement('div');
            card.classList.add('card');
            card.appendChild(img);
            container.appendChild(card);
        });

        // Display Sprites
        sprites.slice(0, 3).forEach(sprite => {
            const card = document.createElement('div');
            card.classList.add('card');
            card.appendChild(sprite.img);
            container.appendChild(card);
        });

        // Display Image
        images.forEach(({ img }) => {
            const card = document.createElement('div');
            card.classList.add('card');
            card.appendChild(img);
            container.appendChild(card);
        });

        // Test Icons
        console.log('Icons:', Icons);
        document.getElementById('icon-display').textContent = Icons.ROCKET;
    } catch (error) {
        console.error('Error testing Taleem Assets:', error);
    }
}

window.playSound = function() {
    if (window.soundInstance) {
        window.soundInstance.play();
    } else {
        console.warn("Sound is not loaded yet.");
    }
};
window.stopSound = function() {
    if (window.soundInstance) {
        window.soundInstance.stop();
    }
};


window.onload = testLibrary;
