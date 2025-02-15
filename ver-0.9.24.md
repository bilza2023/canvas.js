

version 0.9.24
==============
 1. taleem-assets is just dev dependency
 2. the "build" command not only builds the dist but also place it in docs/examples folder
 3. the docs are not updated
 4. the docs/examples work with static files which is great keep them such, for dynamic examples i can use routes since the library is served from dist/taleem-canvas so routes etc makes no change to it.
 5. Next : add the addItems,clone,delete log etc
 6. Create tests.
 7. The taleem-assets in the docs/examples folder must be updated when required, you can update is from node_modules/taleem-assets
 8. there should be no taleem-assets in dist and also in normal dependencies (it is a dev dependency).

 Actions
 =======
  1: removed static from BaseItem and all its child classes.
    - turns out the static in BaseItem itemExtraData is useful since when it is called in contructor of the child class by that time "this" is not available.
    
  2: removed ->  this.dialogueBox = dialogueBox; from BaseItem
