
1: Great ->Adding handles to the normal drawable items isn’t ideal for an editor.but what are the options?
  1: I think we should have another array of "items" collection (just like we have items) called "postdrawItems" (or itemsPostDraw etc etc) we can draw them but they are out of isHis but then how do we  found out mouse down ????
  2: since taleem-canvas is just drawing items so we at the canvas-editor end --> if we get a Handle as a result of a dbouble click we can simple ignore it. 

The point is i want to keep taleem-canvas as a dumb display which display what ever is in the items array (and manage the canvas with slideExtra data). But which item is clickable or which is not is not related to display. it should be solved at cavas-editor level where the taleem-cavas just return what dbl-clicked whats mouse-down etc.


2: I also think this is the main reason ..i think we should redraw in the game-loop just like a game-engine.-->The EventModule fires events only if a hit is detected on an item

3: Integrating slideExtra into the Draw Module:
  the draw module should be the slideExtra from out side but if not then should assign the given default values also if the incomming slideExtra has some fields missing they should also be added.


  discuss these question one by one each once we reach a conclusion then we talk of code