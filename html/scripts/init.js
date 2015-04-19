/*global Raphael */
/*jslint vars: true */
/*global make_concept */
/*global update_view */
/*global makeToolbar */
/*global windowResized */
/*global init_handlers */

/**
 * This file is run by the html page when it processes the page's 
 *      area where my app will function
 * It creates the global variable sys.
 * This program uses the MVC architecture.
 *
 * Model:
 *      The model is the object sys.  Sys is a structure composed
 *      of a heirarchy of objects and primitives.  Each leaf is
 *      either a primitive type, or a Raphael element.
 *
 * View:
 *      The view component is the Raphael library.  All of the on-
 *      screen rendering is performed by RaphaelJS.  The controller
 *      employs a driver to translate system state changes to a way
 *      RaphaelJS can render. As long as any new versions of
 *      RaphaelJS provides backward compatibility, it can be used.
 *
 * Controller:
 *      The controller is composed of two files.  One is in charge
 *      of manipulating RaphaelJS Elements so that it reflects
 *      the model, and the other is in charge of manipulating the
 *      model to comply with user input.  User input comes from
 *      the standard global javascript object window.  Event
 *      handlers are established for certain user actions, and
 *      the appropriate functions are invoked to handle those
 *      events.  
 *
 */


var sys;


/**
 * This function is in charge of starting the application.
 * Steps required to start app:
 * 1) Initialize system
 * 2) Create the root screen.
 * 3) Add event listeners
 */
function init() {
    "use strict";

    sys.concepts = [];
    sys.c_index = 0;
    
    sys.concepts[sys.c_index] = make_concept();
    
    makeToolbar();
    init_handlers();
    update_view();
}


sys = {
    p: "",
    concepts: "",
    c_index: ""
};

// Create canvas to fit the area
sys.p = new Raphael(document.getElementById("conceptor-layer"), document.getElementById("conceptor-layer").offsetWidth, window.innerHeight - 150);


init();


