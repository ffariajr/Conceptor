
// Create canvas to fit the area
var p = Raphael(document.getElementById("conceptor-layer"), document.getElementById("conceptor-layer").offsetWidth, window.innerHeight - 150);

// Create a reference to Raphael object
var r = p.raphael;




// In order to adjust for resizing, the following vars can be considered
// screen coefficients.  On a canvas size of 1000x600, the coefficient will
// be 1 for height and width.
//p.text(100, 100, document.getElementById("conceptor-layer").offsetWidth);
//p.text(100, 110, window.innerHeight - 150);
var hcoef;
var wcoef;
function setCoefs() {
    "use strict";
    hcoef = (window.innerHeight - 150) / 600;
    wcoef = document.getElementById("conceptor-layer").offsetWidth / 1000;
}

setCoefs();



// Application Scope vars
var toolbar;
var mouse;
var keyb;
var concept;
var loading = true;

toolbar = {
    toolbar_rect: "",
    helptool: "",
    tool_sltr: "",
    color_sltr: "",
    graphic: "",
    text: "",
    object: ""
};

toolbar.helptool = {
    ht_circle: "",
    ht_dot: "",
    ht_qmark: ""
};

toolbar.tool_sltr = {
    bbox: "",
    dropbox: "",
    arrow: "",
    text: ""
};


    


/**
 * This is a simple function that gets run first before other components.
 * This is so that the user knows the program is loading.
 * It draws...
 * 1) The bounding box of the toolbar
 * 2) The tool sections.
 * 3) The tool containers.
 */
function makeToolbar() {
    "use strict";
// Create rectangle bounds of toolbar 
    toolbar.toolbar_rect = p.rect(-2, -2, document.getElementById("conceptor-layer").offsetWidth / 4, window.innerHeight - 146, 0);
    toolbar.toolbar_rect.attr("stroke-width", 2);
    toolbar.helptool = p.circle(30 * wcoef, 30 * hcoef, 20 * wcoef * hcoef);
    toolbar.helptool.attr("stroke-width", 2);
    //var helpt_qmarkdot = p.circle(30 * wcoef, 30 * hcoef 20);
    
}

function drawToolbar() {
    "use strict";
    toolbar.toolbar_rect.attr("width", document.getElementById("conceptor-layer").offsetWidth / 4);
    toolbar.toolbar_rect.attr("height", window.innerHeight - 146);
    
    toolbar.helptool.attr
    
    
}



/**
 * This function is in charge of starting the application.
 * Steps required to start app:
 * 1) Draw the toolbar and the default tools in it.
 * 2) Setup mouse and keyboard listeners.
 * 3) Create the root screen.
 * 4) Start the System
 */
function init() {
    "use strict";
    makeToolbar();
    

}

// Resize canvas with current browser window dimensions
function windowResized() {
    "use strict";
    p.setSize(document.getElementById("conceptor-layer").offsetWidth, window.innerHeight - 200);
    setCoefs();
    drawToolbar();
}

// Add listener for browser window resize
window.addEventListener('resize', windowResized);


init();


