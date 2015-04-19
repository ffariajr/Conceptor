/*jslint vars: true */
/*global sys */

/**
 * In order to adjust for resizing, the following vars can be considered
 * screen coefficients.  On a canvas size of 1000x600, the coefficient will
 * be 1 for height and width.
 * p.text(100, 100, document.getElementById("conceptor-layer").offsetWidth);
 * p.text(100, 110, window.innerHeight - 150);
 */
function setCoefs(coefficients) {
    "use strict";
    coefficients.height_coefficient = (window.innerHeight - 150) / 600;
    coefficients.width_coefficient = document.getElementById("conceptor-layer").offsetWidth / 1000;
}


/**
 * This function actually draws the components of the toolbar.
 * It populates the objects attributes so that they render correctly.
 * It draws...
 * 1) The bounding box of the toolbar
 * 2) The tool components.
 * 3) The initial tools.
 */
function redrawToolbar(wcoef, hcoef) {
    "use strict";
    
    var concept = sys.concepts[sys.c_index];
    var p = sys.p;
    
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
    concept.toolbar.helptool.ht_dot.attr("cy", 40 * hcoef);
    concept.toolbar.helptool.ht_dot.attr("r", 1);
    concept.toolbar.helptool.ht_dot.attr("stroke-width", 4);
    concept.toolbar.helptool.ht_qmark.attr("path", "M" + (30 * wcoef) + "," + (30 * hcoef + 5 * wcoef) + "l0,-" + (5 * hcoef) + "S" + (30 * wcoef) + "," + (30 * hcoef) + "," + (32 * wcoef) + "," + (30 * hcoef) + "c" + (10 * wcoef) + ",0," + (10 * wcoef) + ",-" + (10 * hcoef) + ",-" + (5 * wcoef) + ",-" + (10 * hcoef));
    concept.toolbar.helptool.ht_qmark.attr("stroke-width", 2);
    
    // Tool selector
    concept.toolbar.tools.bbox.attr("x", 2 * wcoef);
    concept.toolbar.tools.bbox.attr("y", 50 * hcoef);
    concept.toolbar.tools.bbox.attr("height", 250 * hcoef);
    concept.toolbar.tools.bbox.attr("width", 195 * wcoef);
    concept.toolbar.tools.bbox.attr("stroke-width", 2);
    concept.toolbar.tools.bbox.attr("r", 2);
    concept.toolbar.tools.bbox.attr("fill", "black");
    
    // Tool selector drop down list options
    var x = 0;
    for (x; x < 5; x += 1) {
        concept.toolbar.tools.options[x].opbox.attr("x", 2 * wcoef);
        concept.toolbar.tools.options[x].opbox.attr("y", (50 + x * 50) * hcoef);
        concept.toolbar.tools.options[x].opbox.attr("width", 195 * wcoef);
        concept.toolbar.tools.options[x].opbox.attr("height", 50 * hcoef);
        concept.toolbar.tools.options[x].opbox.attr("fill", "white");
        if (concept.toolbar.tools.options[x].chosen) {
            concept.toolbar.tools.options[x].opbox.attr("fill-opacity", 0.75);
        } else {
            concept.toolbar.tools.options[x].opbox.attr("fill-opacity", 1);
        }
        
        concept.toolbar.tools.options[x].optext.attr("x", 122 * wcoef);
        concept.toolbar.tools.options[x].optext.attr("y", (75 + x * 50) * hcoef);
        concept.toolbar.tools.options[x].optext.attr("font-size", 30 * 0.5 * wcoef);
        concept.toolbar.tools.options[x].icon.attr("stroke-width", 2);
    }
    
    // Make icons and texts
    concept.toolbar.tools.options[0].icon.attr("path", "M" + (27 * wcoef) + "," + (60 * hcoef) + "c" + (-20 * wcoef) + ",0," + (-20 * wcoef) + "," + (30 * hcoef) + "," + (-5 * wcoef) + "," + (30 * hcoef) + "l" + (-3 * wcoef) + "," + (-4 * hcoef) + "m" + (3 * wcoef) + "," + (4 * hcoef) + "l" + (-3 * wcoef) + "," + (3 * hcoef) + "m" + (3 * wcoef) + "," + (-3 * hcoef) + "m" + (5 * wcoef) + ",0c" + (20 * wcoef) + ",0," + (20 * wcoef) + "," + (-30 * hcoef) + "," + (5 * wcoef) + "," + (-30 * hcoef) + "l" + (3 * wcoef) + "," + (4 * hcoef) + "m" + (-3 * wcoef) + "," + (-4 * hcoef) + "l" + (4 * wcoef) + "," + (-2 * hcoef));
    concept.toolbar.tools.options[0].optext.attr("text", "Rotate:\npress 'r' then\n't'   or   'e'");
    
    concept.toolbar.tools.options[1].icon.attr("path", "M" + (12 * wcoef) + "," + (140 * hcoef) + "l0," + (-30 * hcoef) + "l" + (3 * wcoef) + "," + (3 * hcoef) + "m" + (-3 * wcoef) + "," + (-3 * hcoef) + "l" + (-3 * wcoef) + "," + (3 * hcoef) + "M" + (12 * wcoef) + "," + (140 * hcoef) + "l" + (30 * wcoef) + ",0l" + (-3 * wcoef) + "," + (-3 * hcoef) + "m" + (3 * wcoef) + "," + (3 * hcoef) + "l" + (-3 * wcoef) + "," + (3 * hcoef));
    concept.toolbar.tools.options[1].optext.attr("text", "Resize:\npress '=' or '-'\n(+ is =)");
    
    concept.toolbar.tools.options[2].icon.attr("path", "M" + (12 + wcoef) + "," + (190 * hcoef) + "l" + (5 * wcoef) + ",0l0," + (-30 * hcoef) + "l" + (-5 * wcoef) + ",0m" + (5 * wcoef) + "," + (15 * hcoef) + "l" + (20 * wcoef) + ",0m" + (5 * wcoef) + "," + (15 * hcoef) + "l" + (-5 * wcoef) + ",0l0," + (-30 * hcoef) + "l" + (5 * wcoef) + ",0");
    concept.toolbar.tools.options[2].optext.attr("text", "Link:\nclick two\nobjects");
    
    concept.toolbar.tools.options[3].icon.attr("path", "M" + (25 * wcoef) + "," + (225 * hcoef) + "l" + (-15 * wcoef) + "," + (-15 * hcoef) + "l" + (5 * wcoef) + ",0m" + (-5 * wcoef) + ",0l0," + (5 * hcoef) + "M" + (25 * wcoef) + "," + (225 * hcoef) + "l" + (-15 * wcoef) + "," + (15 * hcoef) + "l" + (5 * wcoef) + ",0m" + (-5 * wcoef) + ",0l0," + (-5 * hcoef) + "M" + (25 * wcoef) + "," + (225 * hcoef) + "l" + (15 * wcoef) + "," + (-15 * hcoef) + "l" + (-5 * wcoef) + ",0m" + (5 * wcoef) + ",0l0," + (5 * hcoef) + "M" + (25 * wcoef) + "," + (225 * hcoef) + "l" + (15 * wcoef) + "," + (15 * hcoef) + "l" + (-5 * wcoef) + ",0m" + (5 * wcoef) + ",0l0," + (-5 * hcoef));
    concept.toolbar.tools.options[3].optext.attr("text", "Zoom:\nuse mouse\nwheel");
    
    concept.toolbar.tools.options[4].icon.attr("path", "M" + (20 * wcoef) + "," + (275 * hcoef) + "m" + (-10 * wcoef) + ",0l" + (10 * wcoef) + ",0l" + (-3 * wcoef) + "," + (-3 * hcoef) + "m0," + (6 * hcoef) + "l" + (3 * wcoef) + "," + (-3 * hcoef) + "c0," + (15 * hcoef) + "," + (20 * wcoef) + "," + (15 * hcoef) + "," + (20 * wcoef) + ",0c0," + (-15 * hcoef) + "," + (-20 * wcoef) + "," + (-15 * hcoef) + "," + (-20 * wcoef) + ",0z");
    concept.toolbar.tools.options[4].icon.attr("fill", concept.toolbar.color_sltr.color);
    concept.toolbar.tools.options[4].optext.attr("text", "Recolor:\nchoose new \ncolor first");
    
    // Color Selector
    concept.toolbar.color_sltr.bbox.attr("x", 90 * wcoef);
    concept.toolbar.color_sltr.bbox.attr("y", 15 * hcoef);
    concept.toolbar.color_sltr.bbox.attr("width", 80 * wcoef);
    concept.toolbar.color_sltr.bbox.attr("height", 30 * hcoef);
    concept.toolbar.color_sltr.bbox.attr("r", 2);
    concept.toolbar.color_sltr.bbox.attr("stroke-width", 2);
    concept.toolbar.color_sltr.bbox.attr("fill", concept.toolbar.color_sltr.color);
    concept.toolbar.color_sltr.dropbox.attr("x", 154 * wcoef);
    concept.toolbar.color_sltr.dropbox.attr("y", 15 * hcoef);
    concept.toolbar.color_sltr.dropbox.attr("width", 16 * wcoef);
    concept.toolbar.color_sltr.dropbox.attr("height", 30 * hcoef);
    concept.toolbar.color_sltr.dropbox.attr("r", 2);
    concept.toolbar.color_sltr.dropbox.attr("stroke-width", 2);
    concept.toolbar.color_sltr.dropbox.attr("fill", "white");
    concept.toolbar.color_sltr.arrow.attr("path", "M" + (156 * wcoef) + "," + (26 * hcoef) + "l" + (12 * wcoef) + ",0l" + (-6 * wcoef) + "," + (12 * hcoef) + "l" + (-6 * wcoef) + "," + (-12 * hcoef) + "z");
    concept.toolbar.color_sltr.arrow.attr("fill", "black");
    
    concept.toolbar.color_sltr.droplist.attr("x", 2 * wcoef);
    concept.toolbar.color_sltr.droplist.attr("y", 50 * hcoef);
    concept.toolbar.color_sltr.droplist.attr("width", 194 * wcoef);
    concept.toolbar.color_sltr.droplist.attr("height", 70 * hcoef);
    concept.toolbar.color_sltr.droplist.attr("r", 2);
    concept.toolbar.color_sltr.droplist.attr("stroke-width", 2);
    concept.toolbar.color_sltr.droplist.attr("fill", "black");
    
    // Make color boxes
    x = 0;
    for (x; x < 6; x += 1) {
        concept.toolbar.color_sltr.options[x].opbox.attr("x", (2 + x * 32) * wcoef);
        concept.toolbar.color_sltr.options[x].opbox.attr("y", 50 * hcoef);
        concept.toolbar.color_sltr.options[x].opbox.attr("width", 32 * wcoef);
        concept.toolbar.color_sltr.options[x].opbox.attr("height", 70 * hcoef);
        concept.toolbar.color_sltr.options[x].opbox.attr("stroke-width", 2);
        concept.toolbar.color_sltr.options[x].opbox.attr("fill", concept.toolbar.color_sltr.options[x].color);
        if (concept.toolbar.color_sltr.options[x].chosen) {
            concept.toolbar.color_sltr.options[x].opbox.attr("fill-opacity", 0.5);
        } else {
            concept.toolbar.color_sltr.options[x].opbox.attr("fill-opacity", 1);
        }
    }
    
    // If color selector window is open
    if (concept.toolbar.color_sltr.open) {
        concept.toolbar.color_sltr.opset.show();
    } else {
        concept.toolbar.color_sltr.opset.hide();
    }
    
    // Draw Object Tabs
    // Draw bboxes first because they are similar
    concept.toolbar.obj_sltr.objecttab.bbox.attr("path", "M" + (wcoef) + "," + (310 * hcoef) + "l" + (44 * wcoef) + ",0l0," + (15 * hcoef) + "l" + (150 * wcoef) + ",0l0," + (270 * hcoef) + "l" + (-194 * wcoef) + ",0l0," + (-285 * hcoef));
    concept.toolbar.obj_sltr.objecttab.bbox.attr("stroke-width", 2);
    concept.toolbar.obj_sltr.objecttab.bbox.attr("fill", "white");
    concept.toolbar.obj_sltr.objecttab.bbox.attr("title", "Object");
    concept.toolbar.obj_sltr.picstab.bbox.attr("path", "M" + (51 * wcoef) + "," + (310 * hcoef) + "l" + (44 * wcoef) + ",0l0," + (15 * hcoef) + "l" + (100 * wcoef) + ",0l0," + (270 * hcoef) + "l" + (-194 * wcoef) + ",0l0," + (-270 * hcoef) + "l" + (50 * wcoef) + ",0l0," + (-15 * hcoef));
    concept.toolbar.obj_sltr.picstab.bbox.attr("stroke-width", 2);
    concept.toolbar.obj_sltr.picstab.bbox.attr("fill", "white");
    concept.toolbar.obj_sltr.picstab.bbox.attr("title", "Picture");
    concept.toolbar.obj_sltr.containertab.bbox.attr("path", "M" + (101 * wcoef) + "," + (310 * hcoef) + "l" + (44 * wcoef) + ",0l0," + (15 * hcoef) + "l" + (50 * wcoef) + ",0l0," + (270 * hcoef) + "l" + (-194 * wcoef) + ",0l0," + (-270 * hcoef) + "l" + (100 * wcoef) + ",0l0," + (-15 * hcoef));
    concept.toolbar.obj_sltr.containertab.bbox.attr("stroke-width", 2);
    concept.toolbar.obj_sltr.containertab.bbox.attr("fill", "white");
    concept.toolbar.obj_sltr.containertab.bbox.attr("title", "Container");
    concept.toolbar.obj_sltr.viewtab.bbox.attr("path", "M" + (151 * wcoef) + "," + (310 * hcoef) + "l" + (44 * wcoef) + ",0l0," + (15 * hcoef) + "l0," + (270 * hcoef) + "l" + (-194 * wcoef) + ",0l0," + (-270 * hcoef) + "l" + (150 * wcoef) + ",0l0," + (-15 * hcoef));
    concept.toolbar.obj_sltr.viewtab.bbox.attr("stroke-width", 2);
    concept.toolbar.obj_sltr.viewtab.bbox.attr("fill", "white");
    concept.toolbar.obj_sltr.viewtab.bbox.attr("title", "View");
    
    // Draw the Text
    concept.toolbar.obj_sltr.objecttab.text.attr("text", "Obj");
    concept.toolbar.obj_sltr.objecttab.text.attr("font-size", 12);
    concept.toolbar.obj_sltr.objecttab.text.attr("x", 23 * wcoef);
    concept.toolbar.obj_sltr.objecttab.text.attr("y", 317 * hcoef);
    concept.toolbar.obj_sltr.objecttab.text.attr("title", "Object");
    concept.toolbar.obj_sltr.picstab.text.attr("text", "Pic");
    concept.toolbar.obj_sltr.picstab.text.attr("font-size", 12);
    concept.toolbar.obj_sltr.picstab.text.attr("x", 73 * wcoef);
    concept.toolbar.obj_sltr.picstab.text.attr("y", 317 * hcoef);
    concept.toolbar.obj_sltr.picstab.text.attr("title", "Picture");
    concept.toolbar.obj_sltr.containertab.text.attr("text", "Cont");
    concept.toolbar.obj_sltr.containertab.text.attr("font-size", 12);
    concept.toolbar.obj_sltr.containertab.text.attr("x", 123 * wcoef);
    concept.toolbar.obj_sltr.containertab.text.attr("y", 317 * hcoef);
    concept.toolbar.obj_sltr.containertab.text.attr("title", "Container");
    concept.toolbar.obj_sltr.viewtab.text.attr("text", "View");
    concept.toolbar.obj_sltr.viewtab.text.attr("font-size", 12);
    concept.toolbar.obj_sltr.viewtab.text.attr("x", 173 * wcoef);
    concept.toolbar.obj_sltr.viewtab.text.attr("y", 317 * hcoef);
    concept.toolbar.obj_sltr.viewtab.text.attr("title", "View");
    
    // Draw the Scrollbar
    var scroll_arr = [concept.toolbar.obj_sltr.objecttab.scrollbar, concept.toolbar.obj_sltr.picstab.scrollbar,  concept.toolbar.obj_sltr.containertab.scrollbar, concept.toolbar.obj_sltr.viewtab.scrollbar];
    for (x = 0; x < 4; x += 1) {
        scroll_arr[x].bbox.attr("x", 185 * wcoef);
        scroll_arr[x].bbox.attr("y", 330 * hcoef);
        scroll_arr[x].bbox.attr("width", 10 * wcoef);
        scroll_arr[x].bbox.attr("height", 260 * hcoef);
        scroll_arr[x].bbox.attr("r", 1);
        
        scroll_arr[x].upbox.attr("x", 185 * wcoef);
        scroll_arr[x].upbox.attr("y", 330 * hcoef);
        scroll_arr[x].upbox.attr("width", 10 * wcoef);
        scroll_arr[x].upbox.attr("height", 15 * hcoef);
        scroll_arr[x].upbox.attr("r", 1);
        
        scroll_arr[x].downbox.attr("x", 185 * wcoef);
        scroll_arr[x].downbox.attr("y", 575 * hcoef);
        scroll_arr[x].downbox.attr("width", 10 * wcoef);
        scroll_arr[x].downbox.attr("height", 15 * hcoef);
        scroll_arr[x].downbox.attr("r", 1);
        
        scroll_arr[x].uparrow.attr("path", "M" + (190 * wcoef) + "," + (343 * hcoef) + "l0," + (-10 * hcoef) + "l" + (-3 * wcoef) + "," + (3 * hcoef) + "m" + (6 * wcoef) + ",0l" + (-3 * wcoef) + "," + (-3 * hcoef));
        scroll_arr[x].uparrow.attr("stroke-width", 2);
        
        scroll_arr[x].downarrow.attr("path", "M" + (190 * wcoef) + "," + (577 * hcoef) + "l0," + (10 * hcoef) + "l" + (-3 * wcoef) + "," + (-3 * hcoef) + "m" + (6 * wcoef) + ",0l" + (-3 * wcoef) + "," + (3 * hcoef));
        scroll_arr[x].downarrow.attr("stroke-width", 2);
        
        scroll_arr[x].bar.attr("x", 185 * wcoef);
        scroll_arr[x].bar.attr("y", (330 + scroll_arr[x].position) * hcoef);
        scroll_arr[x].bar.attr("width", 10);
        scroll_arr[x].bar.attr("height", 80);
        scroll_arr[x].bar.attr("r", 2);
        
        scroll_arr[x].lines.attr("path", "M" + (187 * wcoef) + "," + ((365 + scroll_arr[x].position) * hcoef) + "l" + (6 * wcoef) + ",0m0," + (5 * hcoef) + "l" + (-6 * wcoef) + ",0m0," + (5 * hcoef) + "l" + (6 * wcoef) + ",0");
    }
    
    
    
    
    // Draw Default Objects: Object
    concept.toolbar.obj_sltr.objecttab.options[0].obj.attr("x", 8 * wcoef);
    concept.toolbar.obj_sltr.objecttab.options[0].obj.attr("y", 340 * hcoef);
    concept.toolbar.obj_sltr.objecttab.options[0].obj.attr("width", 80 * wcoef);
    concept.toolbar.obj_sltr.objecttab.options[0].obj.attr("height", 50 * hcoef);
    concept.toolbar.obj_sltr.objecttab.options[0].obj.attr("stroke-width", 2);
    concept.toolbar.obj_sltr.objecttab.options[0].obj.attr("fill", "grey");
    
    concept.toolbar.obj_sltr.objecttab.options[1].obj.attr("x", 97 * wcoef);
    concept.toolbar.obj_sltr.objecttab.options[1].obj.attr("y", 340 * hcoef);
    concept.toolbar.obj_sltr.objecttab.options[1].obj.attr("width", 80 * wcoef);
    concept.toolbar.obj_sltr.objecttab.options[1].obj.attr("height", 50 * hcoef);
    concept.toolbar.obj_sltr.objecttab.options[1].obj.attr("stroke-width", 2);
    concept.toolbar.obj_sltr.objecttab.options[1].obj.attr("fill", "grey");
    concept.toolbar.obj_sltr.objecttab.options[1].obj.attr("r", 10);
    
    concept.toolbar.obj_sltr.objecttab.options[2].obj.attr("cx", 48 * wcoef);
    concept.toolbar.obj_sltr.objecttab.options[2].obj.attr("cy", 445 * hcoef);
    concept.toolbar.obj_sltr.objecttab.options[2].obj.attr("r", 30 * hcoef * wcoef);
    concept.toolbar.obj_sltr.objecttab.options[2].obj.attr("fill", "grey");
    concept.toolbar.obj_sltr.objecttab.options[2].obj.attr("stroke-width", 2);
    
    concept.toolbar.obj_sltr.objecttab.options[3].obj.attr("cx", 133 * wcoef);
    concept.toolbar.obj_sltr.objecttab.options[3].obj.attr("cy", 445 * hcoef);
    concept.toolbar.obj_sltr.objecttab.options[3].obj.attr("rx", 45 * wcoef);
    concept.toolbar.obj_sltr.objecttab.options[3].obj.attr("ry", 25 * hcoef);
    concept.toolbar.obj_sltr.objecttab.options[3].obj.attr("fill", "grey");
    concept.toolbar.obj_sltr.objecttab.options[3].obj.attr("stroke-width", 2);
    
    //triangle
    
    //speech bubble
    
    //pics
    //container
    //view
    
    
    
    
    
    //object hide/show based on scroll
    
    
    concept.toolbar.obj_sltr.objectset.toFront();
    //concept.toolbar.obj_sltr.picsset.toFront();
    //concept.toolbar.obj_sltr.containerset.toFront();
    //concept.toolbar.obj_sltr.viewset.toFront();
}



/**
 * This function is in charge of drawing whatever concept is given to it.
 *
 */
function update_view() {
    "use strict";
    
    var coefs = {width_coefficient: 0, height_coefficient: 0};
    setCoefs(coefs);
    redrawToolbar(coefs.width_coefficient, coefs.height_coefficient);
    
}