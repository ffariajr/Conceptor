/*global sys */
/*global update_view */
/*jslint vars: true */
/*global make_element */

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
    
    sys.keyBuf.push("u" + keyEve.keyCode);
}

function keyDowned(keyEve) {
    "use strict";
    
    sys.keyBuf.push("d" + keyEve.keyCode);
}

function init_window_handlers() {
    "use strict";
    
    // Add listener for browser window resize
    window.addEventListener("resize", windowResized);
    
    window.addEventListener("dragexit", draggedOff);
    window.addEventListener("dragleave", draggedOff);
    
    window.addEventListener("scroll", scrolled);
    
    window.addEventListener("keydown", keyDowned);
    window.addEventListener("keyup", keyUpped);
}

function input_formatted_text() {
    "use strict";
    
   /* var total = 0;
    var current_line = 0;
    var max_per_line = 22;
    var c = sys.keyBuf.pop();
    var newtext = "";
    while (c !== "d10") {
        if (c !== null) {
            if (c.charAt(0) === "d") {
                newtext = newtext + c.substring(1);
                current_line += 1;
                total += 1;
                if (current_line === max_per_line) {
                    newtext = newtext + "\n";
                    current_line = 0;
                }
                c = sys.keyBuf.pop();
            }
        }
    }
    return newtext;*/
}

function init_toolbar_dragging(toolbar) {
    "use strict";
    
    toolbar.obj_sltr.objecttab.options[0].obj.drag(function (x, y, e) {toolbar.obj_sltr.objecttab.options[0].chosen = true; }, function (dx, dy, x, y, e) {toolbar.obj_sltr.objecttab.options[0].translate(dx, dy); }, function (e) {toolbar.obj_sltr.objecttab.options[0].chosen = false; var cl = make_element(toolbar.obj_sltr.objecttab.options[0].obj);  sys.concepts[sys.c_index].screen.elems.push(cl); });
    
    
    
    
}

function init_toolbar_darken(toolbar) {
    "use strict";
    
    toolbar.helptool.set.mouseover(function (e) {toolbar.helptool.hover = true; update_view(); });
    
    toolbar.helptool.set.mouseout(function (e) {toolbar.helptool.hover = false; update_view(); });

    toolbar.color_sltr.dropbox.mouseover(function (e) {toolbar.color_sltr.hover = true; update_view(); });
    
    toolbar.color_sltr.arrow.mouseover(function (e) {toolbar.color_sltr.hover = true; update_view(); });
    
    toolbar.color_sltr.dropbox.mouseout(function (e) {toolbar.color_sltr.hover = false; update_view(); });
    
    toolbar.color_sltr.arrow.mouseout(function (e) {toolbar.color_sltr.hover = false; update_view(); });
    
    toolbar.color_sltr.bbox.mouseover(function (e) {if (toolbar.color_sltr.open) {toolbar.color_sltr.hover = true; } });
    
    toolbar.color_sltr.bbox.mouseout(function (e) {toolbar.color_sltr.hover = false; update_view(); });
    
    toolbar.color_sltr.droplist.mouseover(function (e) {toolbar.color_sltr.hover = true; update_view(); });
    
    toolbar.color_sltr.droplist.mouseout(function (e) {toolbar.color_sltr.hover = false; toolbar.color_sltr.open = false; update_view(); });
    
    toolbar.color_sltr.options[0].opbox.mouseover(function (e) {toolbar.color_sltr.options[0].hover = true; toolbar.color_sltr.hover = true; update_view(); });
    toolbar.color_sltr.options[0].opbox.mouseout(function (e) {toolbar.color_sltr.options[0].hover = false; });
    toolbar.color_sltr.options[1].opbox.mouseover(function (e) {toolbar.color_sltr.options[1].hover = true; toolbar.color_sltr.hover = true; update_view(); });
    toolbar.color_sltr.options[1].opbox.mouseout(function (e) {toolbar.color_sltr.options[1].hover = false; });
    toolbar.color_sltr.options[2].opbox.mouseover(function (e) {toolbar.color_sltr.options[2].hover = true; toolbar.color_sltr.hover = true; update_view(); });
    toolbar.color_sltr.options[2].opbox.mouseout(function (e) {toolbar.color_sltr.options[2].hover = false; });
    toolbar.color_sltr.options[3].opbox.mouseover(function (e) {toolbar.color_sltr.options[3].hover = true; toolbar.color_sltr.hover = true; update_view(); });
    toolbar.color_sltr.options[3].opbox.mouseout(function (e) {toolbar.color_sltr.options[3].hover = false; });
    toolbar.color_sltr.options[4].opbox.mouseover(function (e) {toolbar.color_sltr.options[4].hover = true; toolbar.color_sltr.hover = true; update_view(); });
    toolbar.color_sltr.options[4].opbox.mouseout(function (e) {toolbar.color_sltr.options[4].hover = false; });
    toolbar.color_sltr.options[5].opbox.mouseover(function (e) {toolbar.color_sltr.options[5].hover = true; toolbar.color_sltr.hover = true; update_view(); });
    toolbar.color_sltr.options[5].opbox.mouseout(function (e) {toolbar.color_sltr.options[5].hover = false; });
    
    
    toolbar.tools.options[0].opbox.mouseover(function (e) {toolbar.tools.options[0].hover = true; update_view(); });
    toolbar.tools.options[0].opbox.mouseout(function (e) {toolbar.tools.options[0].hover = false; update_view(); });
    toolbar.tools.options[1].opbox.mouseover(function (e) {toolbar.tools.options[1].hover = true; update_view(); });
    toolbar.tools.options[1].opbox.mouseout(function (e) {toolbar.tools.options[1].hover = false; update_view(); });
    toolbar.tools.options[2].opbox.mouseover(function (e) {toolbar.tools.options[2].hover = true; update_view(); });
    toolbar.tools.options[2].opbox.mouseout(function (e) {toolbar.tools.options[2].hover = false; update_view(); });
    toolbar.tools.options[3].opbox.mouseover(function (e) {toolbar.tools.options[3].hover = true; update_view(); });
    toolbar.tools.options[3].opbox.mouseout(function (e) {toolbar.tools.options[3].hover = false; update_view(); });
    toolbar.tools.options[4].opbox.mouseover(function (e) {toolbar.tools.options[4].hover = true; update_view(); });
    toolbar.tools.options[4].opbox.mouseout(function (e) {toolbar.tools.options[4].hover = false; update_view(); });
    
    
    toolbar.text.bbox.mouseover(function (e) {toolbar.text.bbox.attr("stroke-width", 2); });
    toolbar.text.bbox.mouseout(function (e) {toolbar.text.bbox.attr("stroke-width", 1); });
    toolbar.text.text.mouseover(function (e) {toolbar.text.bbox.attr("stroke-width", 2); });
    toolbar.text.text.mouseout(function (e) {toolbar.text.bbox.attr("stroke-width", 1); });
    
    
    toolbar.obj_sltr.objecttab.text.mouseover(function (e) {toolbar.obj_sltr.objecttab.text.attr("font-weight", "bold"); });
    toolbar.obj_sltr.objecttab.text.mouseout(function (e) {toolbar.obj_sltr.objecttab.text.attr("font-weight", "normal"); });
    toolbar.obj_sltr.picstab.text.mouseover(function (e) {toolbar.obj_sltr.picstab.text.attr("font-weight", "bold"); });
    toolbar.obj_sltr.picstab.text.mouseout(function (e) {toolbar.obj_sltr.picstab.text.attr("font-weight", "normal"); });
    toolbar.obj_sltr.containertab.text.mouseover(function (e) {toolbar.obj_sltr.containertab.text.attr("font-weight", "bold"); });
    toolbar.obj_sltr.containertab.text.mouseout(function (e) {toolbar.obj_sltr.containertab.text.attr("font-weight", "normal"); });
    toolbar.obj_sltr.viewtab.text.mouseover(function (e) {toolbar.obj_sltr.viewtab.text.attr("font-weight", "bold"); });
    toolbar.obj_sltr.viewtab.text.mouseout(function (e) {toolbar.obj_sltr.viewtab.text.attr("font-weight", "normal"); });
    
    toolbar.obj_sltr.objecttab.options[0].obj.mouseover(function (e) {toolbar.obj_sltr.objecttab.options[0].hover = true; update_view(); });
    toolbar.obj_sltr.objecttab.options[0].obj.mouseout(function (e) {toolbar.obj_sltr.objecttab.options[0].hover = false; update_view(); });
    toolbar.obj_sltr.objecttab.options[1].obj.mouseover(function (e) {toolbar.obj_sltr.objecttab.options[1].hover = true; update_view(); });
    toolbar.obj_sltr.objecttab.options[1].obj.mouseout(function (e) {toolbar.obj_sltr.objecttab.options[1].hover = false; update_view(); });
    toolbar.obj_sltr.objecttab.options[2].obj.mouseover(function (e) {toolbar.obj_sltr.objecttab.options[2].hover = true; update_view(); });
    toolbar.obj_sltr.objecttab.options[2].obj.mouseout(function (e) {toolbar.obj_sltr.objecttab.options[2].hover = false; update_view(); });
    toolbar.obj_sltr.objecttab.options[3].obj.mouseover(function (e) {toolbar.obj_sltr.objecttab.options[3].hover = true; update_view(); });
    toolbar.obj_sltr.objecttab.options[3].obj.mouseout(function (e) {toolbar.obj_sltr.objecttab.options[3].hover = false; update_view(); });
    
    
    
}

function init_toolbar_clicks(toolbar) {
    "use strict";
    
    toolbar.color_sltr.dropbox.click(function (e) {toolbar.color_sltr.open = !toolbar.color_sltr.open; update_view(); });
    
    toolbar.color_sltr.arrow.click(function (e) {toolbar.color_sltr.open = !toolbar.color_sltr.open; update_view(); });
    
    toolbar.color_sltr.options[0].opbox.click(function (e) {toolbar.color_sltr.open = false; toolbar.color_sltr.hover = false; toolbar.color_sltr.options[0].hover = false; toolbar.color_sltr.color = toolbar.color_sltr.options[0].color; update_view(); });
    toolbar.color_sltr.options[1].opbox.click(function (e) {toolbar.color_sltr.open = false; toolbar.color_sltr.hover = false; toolbar.color_sltr.options[1].hover = false; toolbar.color_sltr.color = toolbar.color_sltr.options[1].color; update_view(); });
    toolbar.color_sltr.options[2].opbox.click(function (e) {toolbar.color_sltr.open = false; toolbar.color_sltr.hover = false; toolbar.color_sltr.options[2].hover = false; toolbar.color_sltr.color = toolbar.color_sltr.options[2].color; update_view(); });
    toolbar.color_sltr.options[3].opbox.click(function (e) {toolbar.color_sltr.open = false; toolbar.color_sltr.hover = false; toolbar.color_sltr.options[3].hover = false; toolbar.color_sltr.color = toolbar.color_sltr.options[3].color; update_view(); });
    toolbar.color_sltr.options[4].opbox.click(function (e) {toolbar.color_sltr.open = false; toolbar.color_sltr.hover = false; toolbar.color_sltr.options[4].hover = false; toolbar.color_sltr.color = toolbar.color_sltr.options[4].color; update_view(); });
    toolbar.color_sltr.options[5].opbox.click(function (e) {toolbar.color_sltr.open = false; toolbar.color_sltr.hover = false; toolbar.color_sltr.options[5].hover = false; toolbar.color_sltr.color = toolbar.color_sltr.options[5].color; update_view(); });
    
    
    toolbar.tools.options[0].opbox.click(function (e) {toolbar.tools.options[0].chosen = true; update_view(); });
    toolbar.tools.options[1].opbox.click(function (e) {toolbar.tools.options[1].chosen = true; update_view(); });
    toolbar.tools.options[2].opbox.click(function (e) {toolbar.tools.options[2].chosen = true; update_view(); });
    toolbar.tools.options[3].opbox.click(function (e) {toolbar.tools.options[3].chosen = true; update_view(); });
    toolbar.tools.options[4].opbox.click(function (e) {toolbar.tools.options[4].chosen = true; update_view(); });
    
    toolbar.text.text.click(function (e) {toolbar.text.text.attr("text", input_formatted_text()); });
    
    toolbar.obj_sltr.objectset.click(function (e) {toolbar.obj_sltr.chosen = "obj"; update_view(); });
    toolbar.obj_sltr.picsset.click(function (e) {toolbar.obj_sltr.chosen = "pics"; update_view(); });
    toolbar.obj_sltr.containerset.click(function (e) {toolbar.obj_sltr.chosen = "cont"; update_view(); });
    toolbar.obj_sltr.viewset.click(function (e) {toolbar.obj_sltr.chosen = "view"; update_view(); });
    
    
    
}

function init_toolbar_handlers(toolbar) {
    "use strict";
    
    init_toolbar_darken(toolbar);
    
    init_toolbar_clicks(toolbar);
    
    init_toolbar_dragging(toolbar);
}

function init_screen_handlers(concept) {
    "use strict";
    
}

function init_element_handlers(concept) {
    "use strict";
    
    init_toolbar_handlers(concept.toolbar);
    
    init_screen_handlers(concept);
}

function init_handlers() {
    "use strict";
    
    var concept = sys.concepts[sys.c_index];
    
    init_window_handlers();
    
    init_element_handlers(concept);
}