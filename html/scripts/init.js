/*global Raphael */
// Create canvas to fit the area
var p = new Raphael(document.getElementById("conceptor-layer"), document.getElementById("conceptor-layer").offsetWidth, window.innerHeight - 150);

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
var mouse;
var keyb;
var concept;
var loading = true;

concept = {
    toolbar: "",
    screen: ""
};


concept.toolbar = {
    toolbar_rect: "",
    helptool: "",
    tool_sltr: "",
    color_sltr: "",
    graphic: "",
    text: "",
    object: ""
};

concept.toolbar.helptool = {
    ht_circle: "",
    ht_dot: "",
    ht_qmark: ""
};

concept.toolbar.tool_sltr = {
    bbox: "",
    dropbox: "",
    arrow: "",
    bboxtext: "",
    optionsbox: "",
    options: ""
};

function makeOptions(option, n) {
    "use strict";
    var op = [], x;
    for (x = n; n > 0; n -= 1) {
        op[op.length] = option;
    }
    return op;
}

var tool_sltr_options = {
    opbox: "",
    icon: "",
    optext: "",
    show: ""
};

concept.toolbar.tool_sltr.options = makeOptions(tool_sltr_options, 5);

concept.toolbar.color_sltr = {
    bbox: "",
    color: "",
    dropbox: "",
    arrow: "",
    droplist: "",
    colorboxes: "",
    colors: ""
};

concept.toolbar.graphic = {
    previewbox: "",
    icon: "",
    listbox: "",
    lboxtext: "",
    dropbox: "",
    arrow: "",
    droplist: "",
    iconboxes: "",
    icons: ""
};
    
concept.toolbar.text = {
    bbox: "",
    text: ""
};

concept.toolbar.object = {
    bounds: "",
    viewtab: "",
    containertab: "",
    objecttab: ""
};

function newscrollbar(scrollbar) {
    "use strict";
    scrollbar = {
        bbox: "",
        upbox: "",
        uparrow: "",
        downbox: "",
        downarrow: "",
        bar: "",
        lines: "",
        position: ""
    };
}

function newtab(tab) {
    "use strict";
    tab = {
        bbox: "",
        viewbox: "",
        objects: "",
        scrollbar: ""
    };
    newscrollbar(tab.scrollbar);
}

newtab(concept.toolbar.object.viewtab);
newtab(concept.toolbar.object.containertab);
newtab(concept.toolbar.object.objecttab);

/**
 * This function creates the objects on the paper object of the canvas.
 * It creates...
 * 1) The bounding box of the toolbar
 * 2) The tool components.
 * 3) The initial tools.
 */
function makeToolbar() {
    "use strict";

    // Toolbar bounding box
    concept.toolbar.toolbar_rect = p.rect(0, 0, 0, 0, 0);
    
    // Help tool
    concept.toolbar.helptool.ht_circle = p.ellipse(0, 0, 0, 0);
    concept.toolbar.helptool.ht_dot = p.circle(0, 0, 0);
    concept.toolbar.helptool.ht_qmark = p.path("");
    
    // Tool selector
    concept.toolbar.tool_sltr.bbox = p.rect(0, 0, 0, 0, 0);
    concept.toolbar.tool_sltr.dropbox = p.rect(0, 0, 0, 0, 0);
    concept.toolbar.tool_sltr.arrow = p.path("");
    concept.toolbar.tool_sltr.bboxtext = p.text(0, 0, "");
    concept.toolbar.tool_sltr.optionsbox = p.rect(0, 0, 0, 0, 0);
    concept.toolbar.tool_sltr.options.show = false;
    
    // Tool selector drop down list options
    concept.toolbar.tool_sltr.options[0].opbox = p.rect(0, 0, 0, 0, 0);
    concept.toolbar.tool_sltr.options[0].icon = p.path("");
    concept.toolbar.tool_sltr.options[0].optext = p.text(0, 0, "");
    concept.toolbar.tool_sltr.options[1].opbox = p.rect(0, 0, 0, 0, 0);
    concept.toolbar.tool_sltr.options[1].icon = p.path("");
    concept.toolbar.tool_sltr.options[1].optext = p.text(0, 0, "");
    concept.toolbar.tool_sltr.options[2].opbox = p.rect(0, 0, 0, 0, 0);
    concept.toolbar.tool_sltr.options[2].icon = p.path("");
    concept.toolbar.tool_sltr.options[2].optext = p.text(0, 0, "");
    concept.toolbar.tool_sltr.options[3].opbox = p.rect(0, 0, 0, 0, 0);
    concept.toolbar.tool_sltr.options[3].icon = p.path("");
    concept.toolbar.tool_sltr.options[3].optext = p.text(0, 0, "");
    concept.toolbar.tool_sltr.options[4].opbox = p.rect(0, 0, 0, 0, 0);
    concept.toolbar.tool_sltr.options[4].icon = p.path("");
    concept.toolbar.tool_sltr.options[4].optext = p.text(0, 0, "");
    
}

function drawArrow(down, x, y) {
    "use strict";
    return "M" + x + "," + y + "h" + (10 * wcoef) + "l" + (-5 * wcoef) + "," + (down * 10 * hcoef) + "z";
}

function makeBoxes(x, y, rows, cols, w, h) {
    "use strict";
    
    
}

/**
 * This function actually draws the components of the toolbar.
 * It populates the objects attributes so that they render correctly.
 * It draws...
 * 1) The bounding box of the toolbar
 * 2) The tool components.
 * 3) The initial tools.
 */
function redrawToolbar() {
    "use strict";
    
    // Toolbar bounding box
    concept.toolbar.toolbar_rect.attr("x", -2);
    concept.toolbar.toolbar_rect.attr("y", -2);
    concept.toolbar.toolbar_rect.attr("width", document.getElementById("conceptor-layer").offsetWidth / 5);
    concept.toolbar.toolbar_rect.attr("height", window.innerHeight - 146);
    concept.toolbar.toolbar_rect.attr("stroke-width", 2);
    
    // Help tool
    concept.toolbar.helptool.ht_circle.attr("cx", 30 * wcoef);
    concept.toolbar.helptool.ht_circle.attr("cy", 30 * hcoef);
    concept.toolbar.helptool.ht_circle.attr("rx", 15 * wcoef);
    concept.toolbar.helptool.ht_circle.attr("ry", 15 * hcoef);
    concept.toolbar.helptool.ht_circle.attr("stroke-width", 2);
    concept.toolbar.helptool.ht_dot.attr("cx", 30 * wcoef);
    concept.toolbar.helptool.ht_dot.attr("cy", 30 * hcoef + 10 * hcoef);
    concept.toolbar.helptool.ht_dot.attr("r", 1);
    concept.toolbar.helptool.ht_dot.attr("stroke-width", 4);
    concept.toolbar.helptool.ht_qmark.attr("path", "M" + (30 * wcoef) + "," + (30 * hcoef + 5 * wcoef) + "l0,-" + (5 * hcoef) + "S" + (30 * wcoef) + "," + (30 * hcoef) + "," + (32 * wcoef) + "," + (30 * hcoef) + "c" + (10 * wcoef) + ",0," + (10 * wcoef) + ",-" + (10 * hcoef) + ",-" + (5 * wcoef) + ",-" + (10 * hcoef));
    concept.toolbar.helptool.ht_qmark.attr("stroke-width", 2);
    
    // Tool selector
    concept.toolbar.tool_sltr.bbox.attr("x", 55 * wcoef);
    concept.toolbar.tool_sltr.bbox.attr("y", 10 * hcoef);
    concept.toolbar.tool_sltr.bbox.attr("height", 40 * hcoef);
    concept.toolbar.tool_sltr.bbox.attr("width", 90 * wcoef);
    concept.toolbar.tool_sltr.bbox.attr("stroke-width", 2);
    concept.toolbar.tool_sltr.bbox.attr("r", 2);
    concept.toolbar.tool_sltr.dropbox.attr("x", 125 * wcoef);
    concept.toolbar.tool_sltr.dropbox.attr("y", 10 * hcoef);
    concept.toolbar.tool_sltr.dropbox.attr("height", 40 * hcoef);
    concept.toolbar.tool_sltr.dropbox.attr("width", 20 * wcoef);
    concept.toolbar.tool_sltr.dropbox.attr("stroke-width", 2);
    concept.toolbar.tool_sltr.dropbox.attr("r", 2);
    concept.toolbar.tool_sltr.arrow.attr("path", drawArrow(1, 130 * wcoef, 25 * hcoef));
    concept.toolbar.tool_sltr.arrow.attr("fill", "black");
    concept.toolbar.tool_sltr.bboxtext.attr("x", 90 * wcoef);
    concept.toolbar.tool_sltr.bboxtext.attr("y", 30 * hcoef);
    concept.toolbar.tool_sltr.bboxtext.attr("text", "test");
    concept.toolbar.tool_sltr.bboxtext.attr("font-size", 20 * wcoef);
    concept.toolbar.tool_sltr.optionsbox.attr("x", 2 * wcoef);
    concept.toolbar.tool_sltr.optionsbox.attr("y", 50 * hcoef);
    concept.toolbar.tool_sltr.optionsbox.attr("height", 300 * hcoef);
    concept.toolbar.tool_sltr.optionsbox.attr("width", 192 * wcoef);
    concept.toolbar.tool_sltr.optionsbox.attr("stroke-width", 2);
    concept.toolbar.tool_sltr.optionsbox.attr("r", 2);
    concept.toolbar.tool_sltr.optionsbox.hide();
    
    // Tool selector drop down list options
    concept.toolbar.tool_sltr.options[0].opbox = p.rect(0, 0, 0, 0, 0);
    concept.toolbar.tool_sltr.options[0].icon = p.path("");
    concept.toolbar.tool_sltr.options[0].optext = p.text(0, 0, "");
    concept.toolbar.tool_sltr.options[1].opbox = p.rect(0, 0, 0, 0, 0);
    concept.toolbar.tool_sltr.options[1].icon = p.path("");
    concept.toolbar.tool_sltr.options[1].optext = p.text(0, 0, "");
    concept.toolbar.tool_sltr.options[2].opbox = p.rect(0, 0, 0, 0, 0);
    concept.toolbar.tool_sltr.options[2].icon = p.path("");
    concept.toolbar.tool_sltr.options[2].optext = p.text(0, 0, "");
    concept.toolbar.tool_sltr.options[3].opbox = p.rect(0, 0, 0, 0, 0);
    concept.toolbar.tool_sltr.options[3].icon = p.path("");
    concept.toolbar.tool_sltr.options[3].optext = p.text(0, 0, "");
    concept.toolbar.tool_sltr.options[4].opbox = p.rect(0, 0, 0, 0, 0);
    concept.toolbar.tool_sltr.options[4].icon = p.path("");
    concept.toolbar.tool_sltr.options[4].optext = p.text(0, 0, "");
    
    
    
    
    
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
    setCoefs();
    redrawToolbar();
    

}

/**
 * Resize canvas with current browser window dimensions.
 * Calls setCoefs() so that new size coefficients are calculated.
 * Redraws (recalculates) the toolbar object attributes.
 */
function windowResized() {
    "use strict";
    p.setSize(document.getElementById("conceptor-layer").offsetWidth, window.innerHeight - 200);
    setCoefs();
    redrawToolbar();
}

// Add listener for browser window resize
window.addEventListener('resize', windowResized);


init();


