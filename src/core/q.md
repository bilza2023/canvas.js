
What we know
so now i am clear about how the event module works it 1: allow us to dynamically connect callbacks with mouse event and 2: when that event happenit return an item if is-hit so that we can work with items.
we can attach seperate callbacks to differen mouse event
==============================================================
Mission:

    1 want to create a module/class/code (a class will be much better i think "canvasEditor class") which use the taleem-canvas mouse event is a special way

        1: on dbl-click if an item has been isHit then it saved the reference of this item in "selectedItem" variable.
        2: if on dbl-click there is no item selected then return "selectedItem" to null
        3: when "selectedItem" is not null add 3 15pxX15px rectangles in 3 colors on left-top cornor , right-top cornor and bottom-right cornor of the "selectedItem". 
        4: let call these 3 rectangles Handles. they will be used to move and scale the item.they are the Move-Handle Width-handel and height-handle
        5: the handles will also register mouse-down event (not the dbl-click just mouse down) and mouse-move events. 
        6: if there is "mouse-down" on any of the handle (it means there is "selectedItem" present since there are handles on the screen).we will set some flag to identify which handle was clicked/grabbed (the Move-Handle Width-handel or height-handle). this handle is locked (set some flag for it lets call it drag=true) and will remain locked unless there is mouse-up event
        7: during the time when drag == true the Handles will listen to mouse-move and then based on which handle is picked edit the selected-item x,y or width or height

Please read and the discuss befroe any code no ucs         

