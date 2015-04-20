/*global sys */
/*global update_view */

/**
 * Resize canvas with current browser window dimensions.
 * Calls setCoefs() so that new size coefficients are calculated.
 * Redraws (recalculates) the toolbar object attributes.
 */
function windowResized() {
    "use strict";
    sys.p.setSize(document.getElementById("conceptor-layer").offsetWidth, window.innerHeight - 200);
    update_view();
}

function draggedOff() {
    "use strict";
    
    
}

function scrolled(wheel) {
    "use strict";
    //IE: MouseWheelEvent
    //Opera: MouseEvent
    //Safari: WheelEvent
    //Chrome: WheelEvent
    //Firefox: WheelEvent
    
}

function keyUpped(keyEve) {
    "use strict";
    
    
    
    
    
}

function keyDowned(keyEve) {
    "use strict";
    
    
    
    
}

function init_handlers() {
    "use strict";
    
    // Add listener for browser window resize
    window.addEventListener("resize", windowResized);
    
    window.addEventListener("dragexit", draggedOff);
    window.addEventListener("dragleave", draggedOff);
    
    window.addEventListener("scroll", scrolled);
    
    window.addEventListener("keydown", keyDowned);
    window.addEventListener("keyup", keyUpped);
    
    
}