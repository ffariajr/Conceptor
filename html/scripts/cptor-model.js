/*jslint vars: true */
/*global sys */


// Name: Fernando Faria
// Course: CSC 415
// Semester: Spring 2015
// Instructor: Dr. Pulimood 
// Project name: Conceptor
// Description: Visual Concept Illustrator
// Filename: cptor-model.js


function clone_view(r_obj) {
    "use strict";
    return {
        bbox: r_obj === null ? sys.p.rect(0, 0, 0, 0, 0) : r_obj.clone(),
        focus: -1,
        chosen: false,
        elems: sys.p.set(),
        conts: sys.p.set(),
        views: sys.p.set(),
        parent: ""
    };
}

function clone_container(r_obj) {
    "use strict";
    return {
        bbox: r_obj.clone(),
        chosen: false,
        elems: sys.p.set(),
        parent: ""
    };
}

function clone_element(r_obj) {
    "use strict";
    return {
        bbox: r_obj.clone(),
        chosen: false,
        parent: ""
    };
}

function clone_text(r_elm, r_txt) {
    "use strict";
    return {
        bbox: r_elm.clone(),
        text: r_txt.clone(),
        hover: false,
        chosen: false,
        parent: ""
    };
}


/**
 * This function creates the objects on the paper object of the canvas.
 * It creates...
 * 1) The bounding box of the toolbar
 * 2) The tool components.
 * 3) The initial tools.
 */
function makeToolbar() {
    "use strict";
    
    var concept = sys.concepts[sys.c_index];
    var p = sys.p;

    // Make Toolbar BBox
    concept.toolbar.toolbar_rect = p.rect(0, 0, 0, 0, 0);
    
    // Help tool
    concept.toolbar.helptool.set = p.set();
    concept.toolbar.helptool.ht_circle = p.ellipse(0, 0, 0, 0);
    concept.toolbar.helptool.set.push(concept.toolbar.helptool.ht_circle);
    concept.toolbar.helptool.ht_dot = p.circle(0, 0, 0);
    concept.toolbar.helptool.set.push(concept.toolbar.helptool.ht_dot);
    concept.toolbar.helptool.ht_qmark = p.path("");
    concept.toolbar.helptool.set.push(concept.toolbar.helptool.ht_qmark);
    concept.toolbar.helptool.ht_circle.attr("cursor", "help");
    concept.toolbar.helptool.ht_dot.attr("cursor", "help");
    concept.toolbar.helptool.ht_qmark.attr("cursor", "help");
    
    // Tools
    concept.toolbar.tools.bbox = p.rect(0, 0, 0, 0, 0);
    
    //Tools Options
    concept.toolbar.tools.options[0].icon = p.path("");
    concept.toolbar.tools.options[0].optext = p.text(0, 0, "");
    concept.toolbar.tools.options[0].chosen = false;
    concept.toolbar.tools.options[0].type = "Rotate";
    concept.toolbar.tools.options[0].opbox = p.rect(0, 0, 0, 0, 0);
    concept.toolbar.tools.options[0].opbox.attr("cursor", "pointer");
    concept.toolbar.tools.options[1].icon = p.path("");
    concept.toolbar.tools.options[1].optext = p.text(0, 0, "");
    concept.toolbar.tools.options[1].chosen = false;
    concept.toolbar.tools.options[1].type = "Resize";
    concept.toolbar.tools.options[1].opbox = p.rect(0, 0, 0, 0, 0);
    concept.toolbar.tools.options[1].opbox.attr("cursor", "pointer");
    concept.toolbar.tools.options[2].icon = p.path("");
    concept.toolbar.tools.options[2].optext = p.text(0, 0, "");
    concept.toolbar.tools.options[2].chosen = false;
    concept.toolbar.tools.options[2].type = "Link";
    concept.toolbar.tools.options[2].opbox = p.rect(0, 0, 0, 0, 0);
    concept.toolbar.tools.options[2].opbox.attr("cursor", "pointer");
    concept.toolbar.tools.options[3].icon = p.path("");
    concept.toolbar.tools.options[3].optext = p.text(0, 0, "");
    concept.toolbar.tools.options[3].chosen = false;
    concept.toolbar.tools.options[3].type = "Zoom";
    concept.toolbar.tools.options[3].opbox = p.rect(0, 0, 0, 0, 0);
    concept.toolbar.tools.options[3].opbox.attr("cursor", "pointer");
    concept.toolbar.tools.options[4].icon = p.path("");
    concept.toolbar.tools.options[4].optext = p.text(0, 0, "");
    concept.toolbar.tools.options[4].chosen = false;
    concept.toolbar.tools.options[4].type = "Recolor";
    concept.toolbar.tools.options[4].opbox = p.rect(0, 0, 0, 0, 0);
    concept.toolbar.tools.options[4].opbox.attr("cursor", "pointer");
    
    // Color selector
    concept.toolbar.color_sltr.bbox = p.rect(0, 0, 0, 0, 0);
    concept.toolbar.color_sltr.bbox.attr("cursor", "pointer");
    concept.toolbar.color_sltr.color = "green";
    concept.toolbar.color_sltr.dropbox = p.rect(0, 0, 0, 0, 0);
    concept.toolbar.color_sltr.dropbox.attr("cursor", "pointer");
    concept.toolbar.color_sltr.arrow = p.path("");
    concept.toolbar.color_sltr.arrow.attr("cursor", "pointer");
    concept.toolbar.color_sltr.opset = p.set();
    concept.toolbar.color_sltr.droplistbkg = p.rect(0, 0, 0, 0, 0);
    concept.toolbar.color_sltr.opset.push(concept.toolbar.color_sltr.droplistbkg);
    concept.toolbar.color_sltr.open = false;
        
    // Color selector drop down list options
    concept.toolbar.color_sltr.options[0].opbox = p.rect(0, 0, 0, 0, 0);
    concept.toolbar.color_sltr.options[0].color = "blue";
    concept.toolbar.color_sltr.options[0].chosen = false;
    concept.toolbar.color_sltr.opset.push(concept.toolbar.color_sltr.options[0].opbox);
    concept.toolbar.color_sltr.options[1].opbox = p.rect(0, 0, 0, 0, 0);
    concept.toolbar.color_sltr.options[1].color = "green";
    concept.toolbar.color_sltr.options[1].chosen = false;
    concept.toolbar.color_sltr.opset.push(concept.toolbar.color_sltr.options[1].opbox);
    concept.toolbar.color_sltr.options[2].opbox = p.rect(0, 0, 0, 0, 0);
    concept.toolbar.color_sltr.options[2].color = "red";
    concept.toolbar.color_sltr.options[2].chosen = false;
    concept.toolbar.color_sltr.opset.push(concept.toolbar.color_sltr.options[2].opbox);
    concept.toolbar.color_sltr.options[3].opbox = p.rect(0, 0, 0, 0, 0);
    concept.toolbar.color_sltr.options[3].color = "yellow";
    concept.toolbar.color_sltr.options[3].chosen = false;
    concept.toolbar.color_sltr.opset.push(concept.toolbar.color_sltr.options[3].opbox);
    concept.toolbar.color_sltr.options[4].opbox = p.rect(0, 0, 0, 0, 0);
    concept.toolbar.color_sltr.options[4].color = "white";
    concept.toolbar.color_sltr.options[4].chosen = false;
    concept.toolbar.color_sltr.opset.push(concept.toolbar.color_sltr.options[4].opbox);
    concept.toolbar.color_sltr.options[5].opbox = p.rect(0, 0, 0, 0, 0);
    concept.toolbar.color_sltr.options[5].color = "black";
    concept.toolbar.color_sltr.options[5].chosen = false;
    concept.toolbar.color_sltr.opset.push(concept.toolbar.color_sltr.options[5].opbox);
    concept.toolbar.color_sltr.droplist = p.rect(0, 0, 0, 0, 0);
    concept.toolbar.color_sltr.opset.push(concept.toolbar.color_sltr.droplist);
    concept.toolbar.color_sltr.opset.attr("cursor", "pointer");
    
    concept.toolbar.text.bbox = p.rect(0, 0, 0, 0, 0);
    concept.toolbar.text.text = p.text(0, 0, "");
    concept.toolbar.text.text.attr("cursor", "cell");
    concept.toolbar.text.bbox.attr("cursor", "move");
    
    // Object Selector Default
    concept.toolbar.obj_sltr.chosen = "obj";
    
    // Object Tabs: Object
    p.setStart();
    concept.toolbar.obj_sltr.objecttab.bbox = p.path("");
    concept.toolbar.obj_sltr.objecttab.text = p.text(0, 0, "");
    concept.toolbar.obj_sltr.objecttab.text.attr("cursor", "pointer");
    concept.toolbar.obj_sltr.objecttab.scrollbar.bbox = p.rect(0, 0, 0, 0, 0);
    concept.toolbar.obj_sltr.objecttab.scrollbar.bbox.attr("fill", "white");
    concept.toolbar.obj_sltr.objecttab.scrollbar.bbox.attr("cursor", "pointer");
    concept.toolbar.obj_sltr.objecttab.scrollbar.upbox = p.rect(0, 0, 0, 0, 0);
    concept.toolbar.obj_sltr.objecttab.scrollbar.upbox.attr("cursor", "pointer");
    concept.toolbar.obj_sltr.objecttab.scrollbar.uparrow = p.path("");
    concept.toolbar.obj_sltr.objecttab.scrollbar.uparrow.attr("cursor", "pointer");
    concept.toolbar.obj_sltr.objecttab.scrollbar.downbox = p.rect(0, 0, 0, 0, 0);
    concept.toolbar.obj_sltr.objecttab.scrollbar.downbox.attr("cursor", "pointer");
    concept.toolbar.obj_sltr.objecttab.scrollbar.downarrow = p.path("");
    concept.toolbar.obj_sltr.objecttab.scrollbar.downarrow.attr("cursor", "pointer");
    concept.toolbar.obj_sltr.objecttab.scrollbar.bar = p.rect(0, 0, 0, 0, 0);
    concept.toolbar.obj_sltr.objecttab.scrollbar.bar.attr("cursor", "ns-resize");
    concept.toolbar.obj_sltr.objecttab.scrollbar.lines = p.path("");
    concept.toolbar.obj_sltr.objecttab.scrollbar.lines.attr("cursor", "ns-resize");
    concept.toolbar.obj_sltr.objecttab.scrollbar.position = 0;
    concept.toolbar.obj_sltr.objecttab.scrollbar.length = 0;
    concept.toolbar.obj_sltr.objecttab.options[0].obj = p.rect(0, 0, 0, 0, 0);
    concept.toolbar.obj_sltr.objecttab.options[0].type = "obj";
    concept.toolbar.obj_sltr.objecttab.options[0].name = "Sharp Rectangle";
    concept.toolbar.obj_sltr.objecttab.options[0].chosen = false;
    concept.toolbar.obj_sltr.objecttab.options[0].obj.attr("cursor", "move");
    concept.toolbar.obj_sltr.objecttab.options[1].obj = p.rect(0, 0, 0, 0, 0);
    concept.toolbar.obj_sltr.objecttab.options[1].type = "obj";
    concept.toolbar.obj_sltr.objecttab.options[1].name = "Round Rectangle";
    concept.toolbar.obj_sltr.objecttab.options[1].chosen = false;
    concept.toolbar.obj_sltr.objecttab.options[1].obj.attr("cursor", "move");
    concept.toolbar.obj_sltr.objecttab.options[2].obj = p.circle(0, 0, 0);
    concept.toolbar.obj_sltr.objecttab.options[2].type = "obj";
    concept.toolbar.obj_sltr.objecttab.options[2].name = "Circle";
    concept.toolbar.obj_sltr.objecttab.options[2].chosen = false;
    concept.toolbar.obj_sltr.objecttab.options[2].obj.attr("cursor", "move");
    concept.toolbar.obj_sltr.objecttab.options[3].obj = p.ellipse(0, 0, 0, 0);
    concept.toolbar.obj_sltr.objecttab.options[3].type = "obj";
    concept.toolbar.obj_sltr.objecttab.options[3].name = "Oval";
    concept.toolbar.obj_sltr.objecttab.options[3].chosen = false;
    concept.toolbar.obj_sltr.objecttab.options[3].obj.attr("cursor", "move");
    concept.toolbar.obj_sltr.objecttab.options[4].obj = p.path("");
    concept.toolbar.obj_sltr.objecttab.options[4].type = "obj";
    concept.toolbar.obj_sltr.objecttab.options[4].name = "Triangle";
    concept.toolbar.obj_sltr.objecttab.options[4].chosen = false;
    concept.toolbar.obj_sltr.objecttab.options[4].obj.attr("cursor", "move");
    concept.toolbar.obj_sltr.objecttab.options[5].obj = p.path("");
    concept.toolbar.obj_sltr.objecttab.options[5].type = "obj";
    concept.toolbar.obj_sltr.objecttab.options[5].name = "Speech Bubble";
    concept.toolbar.obj_sltr.objecttab.options[5].chosen = false;
    concept.toolbar.obj_sltr.objecttab.options[4].obj.attr("cursor", "move");
    concept.toolbar.obj_sltr.objectset = p.setFinish();

    // Object Tabs: Container
    p.setStart();
    concept.toolbar.obj_sltr.containertab.bbox = p.path("");
    concept.toolbar.obj_sltr.containertab.text = p.text(0, 0, "");
    concept.toolbar.obj_sltr.containertab.text.attr("cursor", "pointer");
    concept.toolbar.obj_sltr.containertab.scrollbar.bbox = p.rect(0, 0, 0, 0, 0);
    concept.toolbar.obj_sltr.containertab.scrollbar.bbox.attr("fill", "white");
    concept.toolbar.obj_sltr.containertab.scrollbar.bbox.attr("cursor", "pointer");
    concept.toolbar.obj_sltr.containertab.scrollbar.upbox = p.rect(0, 0, 0, 0, 0);
    concept.toolbar.obj_sltr.containertab.scrollbar.upbox.attr("cursor", "pointer");
    concept.toolbar.obj_sltr.containertab.scrollbar.uparrow = p.path("");
    concept.toolbar.obj_sltr.containertab.scrollbar.uparrow.attr("cursor", "pointer");
    concept.toolbar.obj_sltr.containertab.scrollbar.downbox = p.rect(0, 0, 0, 0, 0);
    concept.toolbar.obj_sltr.containertab.scrollbar.downbox.attr("cursor", "pointer");
    concept.toolbar.obj_sltr.containertab.scrollbar.downarrow = p.path("");
    concept.toolbar.obj_sltr.containertab.scrollbar.downarrow.attr("cursor", "pointer");
    concept.toolbar.obj_sltr.containertab.scrollbar.bar = p.rect(0, 0, 0, 0, 0);
    concept.toolbar.obj_sltr.containertab.scrollbar.bar.attr("cursor", "ns-resize");
    concept.toolbar.obj_sltr.containertab.scrollbar.lines = p.path("");
    concept.toolbar.obj_sltr.containertab.scrollbar.lines.attr("cursor", "ns-resize");
    concept.toolbar.obj_sltr.containertab.scrollbar.position = 0;
    concept.toolbar.obj_sltr.containertab.scrollbar.length = 0;
    concept.toolbar.obj_sltr.containertab.options[0].obj = p.rect(0, 0, 0, 0, 0);
    concept.toolbar.obj_sltr.containertab.options[0].type = "cont";
    concept.toolbar.obj_sltr.containertab.options[0].name = "Sharp Rectangle";
    concept.toolbar.obj_sltr.containertab.options[0].chosen = false;
    concept.toolbar.obj_sltr.containertab.options[0].obj.attr("cursor", "move");
    concept.toolbar.obj_sltr.containertab.options[1].obj = p.rect(0, 0, 0, 0, 0);
    concept.toolbar.obj_sltr.containertab.options[1].type = "cont";
    concept.toolbar.obj_sltr.containertab.options[1].name = "Round Rectangle";
    concept.toolbar.obj_sltr.containertab.options[1].chosen = false;
    concept.toolbar.obj_sltr.containertab.options[1].obj.attr("cursor", "move");
    concept.toolbar.obj_sltr.containertab.options[2].obj = p.circle(0, 0, 0);
    concept.toolbar.obj_sltr.containertab.options[2].type = "cont";
    concept.toolbar.obj_sltr.containertab.options[2].name = "Circle";
    concept.toolbar.obj_sltr.containertab.options[2].chosen = false;
    concept.toolbar.obj_sltr.containertab.options[2].obj.attr("cursor", "move");
    concept.toolbar.obj_sltr.containerset = p.setFinish();
    
    // Object Tabs: View
    p.setStart();
    concept.toolbar.obj_sltr.viewtab.bbox = p.path("");
    concept.toolbar.obj_sltr.viewtab.text = p.text(0, 0, "");
    concept.toolbar.obj_sltr.viewtab.text.attr("cursor", "pointer");
    concept.toolbar.obj_sltr.viewtab.scrollbar.bbox = p.rect(0, 0, 0, 0, 0);
    concept.toolbar.obj_sltr.viewtab.scrollbar.bbox.attr("fill", "white");
    concept.toolbar.obj_sltr.viewtab.scrollbar.bbox.attr("cursor", "pointer");
    concept.toolbar.obj_sltr.viewtab.scrollbar.upbox = p.rect(0, 0, 0, 0, 0);
    concept.toolbar.obj_sltr.viewtab.scrollbar.upbox.attr("cursor", "pointer");
    concept.toolbar.obj_sltr.viewtab.scrollbar.uparrow = p.path("");
    concept.toolbar.obj_sltr.viewtab.scrollbar.uparrow.attr("cursor", "pointer");
    concept.toolbar.obj_sltr.viewtab.scrollbar.downbox = p.rect(0, 0, 0, 0, 0);
    concept.toolbar.obj_sltr.viewtab.scrollbar.downbox.attr("cursor", "pointer");
    concept.toolbar.obj_sltr.viewtab.scrollbar.downarrow = p.path("");
    concept.toolbar.obj_sltr.viewtab.scrollbar.downarrow.attr("cursor", "pointer");
    concept.toolbar.obj_sltr.viewtab.scrollbar.bar = p.rect(0, 0, 0, 0, 0);
    concept.toolbar.obj_sltr.viewtab.scrollbar.bar.attr("cursor", "ns-resize");
    concept.toolbar.obj_sltr.viewtab.scrollbar.lines = p.path("");
    concept.toolbar.obj_sltr.viewtab.scrollbar.lines.attr("cursor", "ns-resize");
    concept.toolbar.obj_sltr.viewtab.scrollbar.position = 0;
    concept.toolbar.obj_sltr.viewtab.scrollbar.length = 0;
    concept.toolbar.obj_sltr.viewtab.options[0].obj = p.rect(0, 0, 0, 0, 0);
    concept.toolbar.obj_sltr.viewtab.options[0].type = "view";
    concept.toolbar.obj_sltr.viewtab.options[0].name = "Sharp Rectangle";
    concept.toolbar.obj_sltr.viewtab.options[0].chosen = false;
    concept.toolbar.obj_sltr.viewtab.options[0].obj.attr("cursor", "move");
    concept.toolbar.obj_sltr.viewtab.options[1].obj = p.rect(0, 0, 0, 0, 0);
    concept.toolbar.obj_sltr.viewtab.options[1].type = "view";
    concept.toolbar.obj_sltr.viewtab.options[1].name = "Round Rectangle";
    concept.toolbar.obj_sltr.viewtab.options[1].chosen = false;
    concept.toolbar.obj_sltr.viewtab.options[1].obj.attr("cursor", "move");
    concept.toolbar.obj_sltr.viewset = p.setFinish();
    
    // Object Tabs: Pics
    p.setStart();
    concept.toolbar.obj_sltr.picstab.bbox = p.path("");
    concept.toolbar.obj_sltr.picstab.text = p.text(0, 0, "");
    concept.toolbar.obj_sltr.picstab.text.attr("cursor", "pointer");
    concept.toolbar.obj_sltr.picstab.scrollbar.bbox = p.rect(0, 0, 0, 0, 0);
    concept.toolbar.obj_sltr.picstab.scrollbar.bbox.attr("fill", "white");
    concept.toolbar.obj_sltr.picstab.scrollbar.bbox.attr("cursor", "pointer");
    concept.toolbar.obj_sltr.picstab.scrollbar.upbox = p.rect(0, 0, 0, 0, 0);
    concept.toolbar.obj_sltr.picstab.scrollbar.upbox.attr("cursor", "pointer");
    concept.toolbar.obj_sltr.picstab.scrollbar.uparrow = p.path("");
    concept.toolbar.obj_sltr.picstab.scrollbar.uparrow.attr("cursor", "pointer");
    concept.toolbar.obj_sltr.picstab.scrollbar.downbox = p.rect(0, 0, 0, 0, 0);
    concept.toolbar.obj_sltr.picstab.scrollbar.downbox.attr("cursor", "pointer");
    concept.toolbar.obj_sltr.picstab.scrollbar.downarrow = p.path("");
    concept.toolbar.obj_sltr.picstab.scrollbar.downarrow.attr("cursor", "pointer");
    concept.toolbar.obj_sltr.picstab.scrollbar.bar = p.rect(0, 0, 0, 0, 0);
    concept.toolbar.obj_sltr.picstab.scrollbar.bar.attr("cursor", "ns-resize");
    concept.toolbar.obj_sltr.picstab.scrollbar.lines = p.path("");
    concept.toolbar.obj_sltr.picstab.scrollbar.lines.attr("cursor", "ns-resize");
    concept.toolbar.obj_sltr.picstab.scrollbar.position = 0;
    concept.toolbar.obj_sltr.picstab.scrollbar.length = 0;
    concept.toolbar.obj_sltr.picstab.options[0].obj = p.image("", 0, 0, 0, 0);
    concept.toolbar.obj_sltr.picstab.options[0].type = "pics";
    concept.toolbar.obj_sltr.picstab.options[0].name = "Actor";
    concept.toolbar.obj_sltr.picstab.options[0].chosen = false;
    concept.toolbar.obj_sltr.picstab.options[0].obj.attr("cursor", "move");
    concept.toolbar.obj_sltr.picstab.options[1].obj = p.image("", 0, 0, 0, 0);
    concept.toolbar.obj_sltr.picstab.options[1].type = "pics";
    concept.toolbar.obj_sltr.picstab.options[1].name = "Phone";
    concept.toolbar.obj_sltr.picstab.options[1].chosen = false;
    concept.toolbar.obj_sltr.picstab.options[1].obj.attr("cursor", "move");
    concept.toolbar.obj_sltr.picstab.options[2].obj = p.image("", 0, 0, 0, 0);
    concept.toolbar.obj_sltr.picstab.options[2].type = "pics";
    concept.toolbar.obj_sltr.picstab.options[2].name = "Car";
    concept.toolbar.obj_sltr.picstab.options[2].chosen = false;
    concept.toolbar.obj_sltr.picstab.options[2].obj.attr("cursor", "move");
    concept.toolbar.obj_sltr.picstab.options[3].obj = p.image("", 0, 0, 0, 0);
    concept.toolbar.obj_sltr.picstab.options[3].type = "pics";
    concept.toolbar.obj_sltr.picstab.options[3].name = "House";
    concept.toolbar.obj_sltr.picstab.options[3].chosen = false;
    concept.toolbar.obj_sltr.picstab.options[3].obj.attr("cursor", "move");
    concept.toolbar.obj_sltr.picsset = p.setFinish();
}