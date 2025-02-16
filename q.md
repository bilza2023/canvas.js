
I have taleem-canvas (TaleemCanvas.js) a .js library
- in the past i have been injecting the "assets" bundle which contains the images etc by injecting the assets into each item (item object) this creates (i think) since the items were to be created time and again.

- Now i inject the assets bundle only at the time of draw

i am uploading the BaseItem and ImageItem and SpriteItem. the image is working fine since needs it needs assets only in draw but the Sprites is problematic since it needs assets in more than one place ? 
what to do you also need to understand the Sprite class and lets first understand the issue and then code