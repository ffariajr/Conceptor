/*global sys */
/*global update_view */
/*jslint vars: true */
/*global clone_element */
/*global clone_text */

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

function delim(d) {
    "use strict";
    
    var d1, d2;
    
    switch (d) {
    case "t":
        d2 = "s";
        d1 = "r";
        break;
    case "s":
        d1 = "r";
        d2 = "t";
        break;
    case "r":
        d1 = "s";
        d2 = "t";
        break;
    }
    
    return {
        d1: d1,
        d2: d2
    };
}

function removeSection(tstr, d) {
    "use strict";
    
    tstr = tstr.toString();
    var arr = tstr.split("");
    var str = "";
    var ds = delim(d);
    var d1 = ds.d1;
    var d2 = ds.d2;
    
    var q;
    for (q = 0; q < arr.length; q += 1) {
        if (arr[q] !== d) {
            str.concat(arr[q]);
        } else {
            while (q < arr.length && arr[q] !== d1 && arr[q] !== d2) {
                q += 1;
            }
            q += 1;
        }
    }
    return str;
}

function compileSections(tstr) {
    "use strict";
    
    var t_str = removeSection(removeSection(tstr, "r"), "s");
    var r_str = removeSection(removeSection(tstr, "t"), "s");
    var s_str = removeSection(removeSection(tstr, "r"), "t");
    
    var tx = 0;
    var ty = 0;
    
    var q;
    for (q = 0; q < t_str.length; q += 1) {
        if (t_str.charAt(q) === "t") {
            q += 1;
            tx += parseInt(t_str.substring(q), 10);
            q += parseInt(t_str.substring(q), 10).toString().length - 1;
        } else if (t_str.charAt(q) === ",") {
            q += 1;
            ty += parseInt(t_str.substring(q), 10);
            q += parseInt(t_str.substring(q), 10).toString().length - 1;
        }
    }
    
    var r = 0;
    for (q = 0; q < r_str.length; q += 1) {
        if (r_str.charAt(q) === "r") {
            q += 1;
            r += parseInt(r_str.substring(q), 10);
            q += parseInt(r_str.substring(q), 10).toString().length - 1;
        }
    }
    
    r = r % 360;
    
    var s = 1;
    for (q = 0; q < s_str.length; q += 1) {
        if (s_str.charAt(q) === "s") {
            q += 1;
            s *= parseInt(s_str.substring(q), 10);
            q += parseInt(s_str.substring(q), 10).toString().length - 1;
        }
    }
    
    return "t" + tx + "," + ty + "r" + r + "s" + s;
}

function replaceTranslate(tstr, x, y) {
    "use strict";
    
    return removeSection(tstr, "t") + "t" + x + "," + y;
}

function addRotation(tstr, r) {
    "use strict";
    
    return compileSections(tstr + "r" + r);
}

function addScale(tstr, s) {
    "use strict";
    
    return compileSections(tstr + "s" + s);
}

function removeTranslate(tstr) {
    "use strict";
    
    return removeSection(tstr, "t");
}

function input_formatted_text(k) {
    "use strict";
    var c;
    if (sys.status.obj_focus.type === "text") {
        if (k === -1) {
            if (sys.status.obj_focus.attr("text").length > 1) {
                sys.status.obj_focus.attr("text", sys.status.obj_focus.attr("text").substring(0, sys.status.obj_focus.attr("text").length - 1));
            } else {
                sys.status.obj_focus.attr("text", "");
            }
        } else {
            c = String.fromCharCode(k, 10);
            if (k === 13) {
                c = "\n";
            }
            sys.status.obj_focus.attr("text", sys.status.obj_focus.attr("text") + c.charAt(0));
        }
    } else {
        if (k === -1) {
            if (sys.status.obj_focus.total_chars < 2) {
                sys.status.obj_focus.text.attr("text", "");
                sys.status.obj_focus.total_chars = 0;
            } else {
                sys.status.obj_focus.text.attr("text", sys.status.obj_focus.text.attr("text").substring(0, sys.status.obj_focus.total_chars - 1));
                sys.status.obj_focus.total_chars -= 1;
            }
        } else if (sys.status.obj_focus.total_chars === 0) {
            sys.status.obj_focus.text.attr("text", String.fromCharCode(k, 10).charAt(0));
            sys.status.obj_focus.total_chars += 1;
        } else {
            c = String.fromCharCode(k, 10);
            if (k === 13) {
                c = "\n";
                sys.status.obj_focus.total_lines += 1;
            }
            sys.status.obj_focus.text.attr("text", sys.status.obj_focus.text.attr("text") + c.charAt(0));
            sys.status.obj_focus.total_chars += 1;
        }
    }
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
    
    sys.keyBuf.push("u" + keyEve.charCode);
}

function keyDowned(keyEve) {
    "use strict";
    
    if (keyEve.keyCode === 8 || keyEve.keyCode === 46) {
        keyEve.preventDefault();
        if (sys.status.user_typing) {
            input_formatted_text(-1);
        } else if (sys.status.obj_focus !== null) {
            sys.status.obj_focus.remove();
            sys.status.obj_focus = null;
        }
    }
    sys.keyBuf.push("d" + keyEve.charCode);
}


function keyPressed(keyEve) {
    "use strict";
    
    if (sys.status.user_typing) {
        input_formatted_text(keyEve.keyCode);
    }
}

function rotate(ccw) {
    "use strict";
    
    var num = 10;
    if (ccw) {
        num = -10;
    }
    sys.status.obj_focus.transform("...r" + num);
}

function resize(big) {
    "use strict";
    
}

function link(r_end) {
    "use strict";
    
}

function zoom(out) {
    "use strict";
    
}

function recolor() {
    "use strict";
    
}

function rMouseDowned(keyEve) {
    "use strict";
    keyEve.preventDefault();
    
    //right click
    if (sys.status.tool !== null) {
        sys.status.tool.chosen = false;
        sys.status.tool = null;
        
        update_view();
    }
    
    sys.status.user_typing = false;
    
    if (sys.status.obj_focus !== null) {
        sys.status.obj_focus.attr("stroke-width", 2);
        sys.status.obj_focus = null;
    }
}


function setup_focus_handler(elm) {
    "use strict";
    
    elm.mouseover(function (e) {this.attr("stroke-width", 3); this.toFront(); });
    
    elm.mouseout(function (e) {if (sys.status.obj_focus !== this) {this.attr("stroke-width", 2); if (sys.status.obj_focus !== null) {sys.status.obj_focus.toFront(); } } });
}

function setup_click_handler(elm) {
    "use strict";
    
    elm.drag(
        function (dx, dy, x, y, e) {
            this.transform("t" + dx + "," + dy); //replaceTranslate(sys.status.obj_focus.attr("transform"), dx, dy));
            this.toFront();
        },
        function (x, y, e) {
        },
        function (e) {
            if (sys.concepts[sys.c_index].toolbar.toolbar_rect.isPointInside(this.getBBox().x, this.getBBox().y + 20)) {
                this.attr("transform", removeTranslate(this.transform()));
            } else {
                if (this.type === "rect") {
                    this.attr("x", this.getBBox().x);
                    this.attr("y", this.getBBox().y);
                } else if (this.type === "text") {
                    this.attr("x", this.getBBox().x + (this.getBBox().width / 2));
                    this.attr("y", this.getBBox().y + (this.getBBox().height / 2));
                } else {
                    this.attr("cx", this.getBBox().x + (this.getBBox().width / 2));
                    this.attr("cy", this.getBBox().y + (this.getBBox().height / 2));
                }
                this.attr("transform", removeTranslate(this.transform()));
            }
        }
    );
    
    elm.mousedown(
        function (e) {
            sys.status.user_typing = false;
            if (sys.status.tool !== null) {
                switch (sys.status.tool.type) {
                case "Rotate":
                    if (sys.status.obj_focus !== this && sys.status.obj_focus !== null) {
                        sys.status.obj_focus.attr("stroke-width", 2);
                    }
                    sys.status.obj_focus = this;
                    sys.status.obj_focus.attr("stroke-width", 3);
                    rotate(true);
                    break;
                case "Resize":
                    if (sys.status.obj_focus !== this && sys.status.obj_focus !== null) {
                        sys.status.obj_focus.attr("stroke-width", 2);
                    }
                    sys.status.obj_focus = this;
                    sys.status.obj_focus.attr("stroke-width", 3);
                    resize(true);
                    break;
                case "Link":
                    var l = sys.status.obj_focus;
                    if (sys.status.obj_focus !== this && sys.status.obj_focus !== null) {
                        sys.status.obj_focus.attr("stroke-width", 2);
                    }
                    sys.status.obj_focus = this;
                    sys.status.obj_focus.attr("stroke-width", 3);
                    link(l);
                    break;
                case "Zoom":
                    if (sys.status.obj_focus !== this && sys.status.obj_focus !== null) {
                        sys.status.obj_focus.attr("stroke-width", 2);
                    }
                    sys.status.obj_focus = this;
                    sys.status.obj_focus.attr("stroke-width", 3);
                    zoom(false);
                    break;
                case "Recolor":
                    if (sys.status.obj_focus !== this && sys.status.obj_focus !== null) {
                        sys.status.obj_focus.attr("stroke-width", 2);
                    }
                    sys.status.obj_focus = this;
                    sys.status.obj_focus.attr("stroke-width", 3);
                    recolor();
                    break;
                }
            }
            if (sys.status.obj_focus !== null && sys.status.obj_focus.type === "text") {
                sys.status.user_typing = true;
            }
            if (sys.status.obj_focus === null) {
                sys.status.obj_focus = this;
                sys.status.obj_focus.attr("stroke-width", 3);
            } else if (sys.status.obj_focus === this) {
                sys.status.obj_focus.attr("stroke-width", 2);
                sys.status.obj_focus = null;
            } else {
                sys.status.obj_focus.attr("stroke-width", 2);
            }
        }
    );
    
}

function setup_keys_handler(elm) {
    "use strict";
    
    
}

function setup_new_elm_handler(elm) {
    "use strict";
    
    setup_focus_handler(elm);
    
    setup_click_handler(elm);
    
    setup_keys_handler(elm);
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
    window.addEventListener("keypress", keyPressed);
    
    window.addEventListener("contextmenu", rMouseDowned);
    
}

function init_toolbar_dragging(toolbar) {
    "use strict";
    
    toolbar.obj_sltr.objecttab.options[0].obj.drag(function (dx, dy, x, y, e) {toolbar.obj_sltr.objecttab.options[0].obj.transform("t" + dx + "," + dy); toolbar.obj_sltr.objecttab.options[0].obj.toFront(); }, function (x, y, e) {sys.status.user_typing = false; toolbar.obj_sltr.objecttab.options[0].chosen = true; update_view(); if (sys.status.obj_focus !== null) {sys.status.obj_focus.attr("stroke-width", 2); } sys.status.obj_focus = this; }, function (e) {if (!toolbar.toolbar_rect.isPointInside(toolbar.obj_sltr.objecttab.options[0].obj.getBBox().x, toolbar.obj_sltr.objecttab.options[0].obj.getBBox().y + 20)) {var cl = clone_element(toolbar.obj_sltr.objecttab.options[0].obj);  sys.status.screen.elems.push(cl); cl.parent = sys.status.screen; setup_new_elm_handler(cl.bbox); cl.bbox.attr("x", cl.bbox.getBBox().x); cl.bbox.attr("y", cl.bbox.getBBox().y); cl.bbox.attr("transform", ""); } toolbar.obj_sltr.objecttab.options[0].chosen = false; toolbar.obj_sltr.objecttab.options[0].obj.attr("transform", "");  sys.status.obj_focus = null; });
    toolbar.obj_sltr.objecttab.options[1].obj.drag(function (dx, dy, x, y, e) {toolbar.obj_sltr.objecttab.options[1].obj.transform("t" + dx + "," + dy); toolbar.obj_sltr.objecttab.options[1].obj.toFront(); }, function (x, y, e) {sys.status.user_typing = false; toolbar.obj_sltr.objecttab.options[1].chosen = true; update_view(); if (sys.status.obj_focus !== null) {sys.status.obj_focus.attr("stroke-width", 2); } sys.status.obj_focus = this; }, function (e) {if (!toolbar.toolbar_rect.isPointInside(toolbar.obj_sltr.objecttab.options[1].obj.getBBox().x, toolbar.obj_sltr.objecttab.options[1].obj.getBBox().y + 20)) {var cl = clone_element(toolbar.obj_sltr.objecttab.options[1].obj);  sys.status.screen.elems.push(cl); cl.parent = sys.status.screen; setup_new_elm_handler(cl.bbox); cl.bbox.attr("x", cl.bbox.getBBox().x); cl.bbox.attr("y", cl.bbox.getBBox().y); cl.bbox.attr("transform", ""); } toolbar.obj_sltr.objecttab.options[1].chosen = false; toolbar.obj_sltr.objecttab.options[1].obj.attr("transform", ""); sys.status.obj_focus = null; });
    toolbar.obj_sltr.objecttab.options[2].obj.drag(function (dx, dy, x, y, e) {toolbar.obj_sltr.objecttab.options[2].obj.transform("t" + dx + "," + dy); toolbar.obj_sltr.objecttab.options[2].obj.toFront(); }, function (x, y, e) {sys.status.user_typing = false; toolbar.obj_sltr.objecttab.options[2].chosen = true; update_view(); if (sys.status.obj_focus !== null) {sys.status.obj_focus.attr("stroke-width", 2); } sys.status.obj_focus = this; }, function (e) {if (!toolbar.toolbar_rect.isPointInside(toolbar.obj_sltr.objecttab.options[2].obj.getBBox().x, toolbar.obj_sltr.objecttab.options[2].obj.getBBox().y + 20)) {var cl = clone_element(toolbar.obj_sltr.objecttab.options[2].obj);  sys.status.screen.elems.push(cl); cl.parent = sys.status.screen; setup_new_elm_handler(cl.bbox); cl.bbox.attr("cx", cl.bbox.getBBox().x + (cl.bbox.getBBox().width / 2)); cl.bbox.attr("cy", cl.bbox.getBBox().y + (cl.bbox.getBBox().height / 2)); cl.bbox.attr("transform", ""); } toolbar.obj_sltr.objecttab.options[2].chosen = false; toolbar.obj_sltr.objecttab.options[2].obj.attr("transform", ""); sys.status.obj_focus = null; });
    toolbar.obj_sltr.objecttab.options[3].obj.drag(function (dx, dy, x, y, e) {toolbar.obj_sltr.objecttab.options[3].obj.transform("t" + dx + "," + dy); toolbar.obj_sltr.objecttab.options[3].obj.toFront(); }, function (x, y, e) {sys.status.user_typing = false; toolbar.obj_sltr.objecttab.options[3].chosen = true; update_view(); if (sys.status.obj_focus !== null) {sys.status.obj_focus.attr("stroke-width", 2); } sys.status.obj_focus = this; }, function (e) {if (!toolbar.toolbar_rect.isPointInside(toolbar.obj_sltr.objecttab.options[3].obj.getBBox().x, toolbar.obj_sltr.objecttab.options[3].obj.getBBox().y + 20)) {var cl = clone_element(toolbar.obj_sltr.objecttab.options[3].obj);  sys.status.screen.elems.push(cl); cl.parent = sys.status.screen; setup_new_elm_handler(cl.bbox); cl.bbox.attr("cx", cl.bbox.getBBox().x + (cl.bbox.getBBox().width / 2)); cl.bbox.attr("cy", cl.bbox.getBBox().y + (cl.bbox.getBBox().height / 2)); cl.bbox.attr("transform", ""); } toolbar.obj_sltr.objecttab.options[3].chosen = false; toolbar.obj_sltr.objecttab.options[3].obj.attr("transform", ""); sys.status.obj_focus = null; });
    
    toolbar.text.bbox.drag(function (dx, dy, x, y, e) {toolbar.text.bbox.transform("t" + dx + "," + dy); toolbar.text.bbox.toFront(); toolbar.text.text.transform("t" + dx + "," + dy); toolbar.text.text.toFront(); sys.status.user_typing = false; }, function (x, y, e) {toolbar.text.chosen = true; update_view(); if (sys.status.obj_focus !== null) {sys.status.obj_focus.attr("stroke-width", 2); } sys.status.obj_focus = this; }, function (e) {toolbar.text.bbox.attr("stroke-width", 1); if (!toolbar.toolbar_rect.isPointInside(toolbar.text.bbox.getBBox().x, toolbar.text.bbox.getBBox().y + 20)) {var cl = clone_text(toolbar.text.bbox, toolbar.text.text); cl.bbox.remove();  cl.bbox = null;  sys.status.screen.elems.push(cl); cl.parent = sys.status.screen; setup_new_elm_handler(cl.text); cl.text.attr("x", cl.text.getBBox().x + (cl.text.getBBox().width / 2)); cl.text.attr("y", cl.text.getBBox().y + (cl.text.getBBox().height / 2)); cl.text.attr("transform", ""); } toolbar.text.chosen = false; toolbar.text.bbox.attr("transform", ""); toolbar.text.text.attr("transform", ""); toolbar.text.text.attr("text", "Write your custom\ntext here"); toolbar.text.total_chars = 0; toolbar.text.total_lines = 0; update_view(); sys.status.obj_focus = null; });
    
    
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
    
    toolbar.color_sltr.dropbox.click(function (e) {sys.status.user_typing = false; toolbar.color_sltr.open = !toolbar.color_sltr.open; update_view(); });
    
    toolbar.color_sltr.arrow.click(function (e) {sys.status.user_typing = false; toolbar.color_sltr.open = !toolbar.color_sltr.open; update_view(); });
    
    toolbar.color_sltr.options[0].opbox.click(function (e) {sys.status.user_typing = false; toolbar.color_sltr.open = false; toolbar.color_sltr.hover = false; toolbar.color_sltr.options[0].hover = false; toolbar.color_sltr.color = toolbar.color_sltr.options[0].color; update_view(); });
    toolbar.color_sltr.options[1].opbox.click(function (e) {sys.status.user_typing = false; toolbar.color_sltr.open = false; toolbar.color_sltr.hover = false; toolbar.color_sltr.options[1].hover = false; toolbar.color_sltr.color = toolbar.color_sltr.options[1].color; update_view(); });
    toolbar.color_sltr.options[2].opbox.click(function (e) {sys.status.user_typing = false; toolbar.color_sltr.open = false; toolbar.color_sltr.hover = false; toolbar.color_sltr.options[2].hover = false; toolbar.color_sltr.color = toolbar.color_sltr.options[2].color; update_view(); });
    toolbar.color_sltr.options[3].opbox.click(function (e) {sys.status.user_typing = false; toolbar.color_sltr.open = false; toolbar.color_sltr.hover = false; toolbar.color_sltr.options[3].hover = false; toolbar.color_sltr.color = toolbar.color_sltr.options[3].color; update_view(); });
    toolbar.color_sltr.options[4].opbox.click(function (e) {sys.status.user_typing = false; toolbar.color_sltr.open = false; toolbar.color_sltr.hover = false; toolbar.color_sltr.options[4].hover = false; toolbar.color_sltr.color = toolbar.color_sltr.options[4].color; update_view(); });
    toolbar.color_sltr.options[5].opbox.click(function (e) {sys.status.user_typing = false; toolbar.color_sltr.open = false; toolbar.color_sltr.hover = false; toolbar.color_sltr.options[5].hover = false; toolbar.color_sltr.color = toolbar.color_sltr.options[5].color; update_view(); });
    
    
    toolbar.tools.options[0].opbox.click(function (e) {sys.status.user_typing = false; if (sys.status.tool !== null) {sys.status.tool.chosen = false; } sys.status.tool = toolbar.tools.options[0]; toolbar.tools.options[0].chosen = true; update_view(); });
    toolbar.tools.options[1].opbox.click(function (e) {sys.status.user_typing = false; if (sys.status.tool !== null) {sys.status.tool.chosen = false; } sys.status.tool = toolbar.tools.options[1]; toolbar.tools.options[1].chosen = true; update_view(); });
    toolbar.tools.options[2].opbox.click(function (e) {sys.status.user_typing = false; if (sys.status.tool !== null) {sys.status.tool.chosen = false; } sys.status.tool = toolbar.tools.options[2]; toolbar.tools.options[2].chosen = true; update_view(); });
    toolbar.tools.options[3].opbox.click(function (e) {sys.status.user_typing = false; if (sys.status.tool !== null) {sys.status.tool.chosen = false; } sys.status.tool = toolbar.tools.options[3]; toolbar.tools.options[3].chosen = true; update_view(); });
    toolbar.tools.options[4].opbox.click(function (e) {sys.status.user_typing = false; if (sys.status.tool !== null) {sys.status.tool.chosen = false; } sys.status.tool = toolbar.tools.options[4]; toolbar.tools.options[4].chosen = true; update_view(); });
    
    toolbar.text.text.click(function (e) {sys.status.user_typing = true; sys.status.obj_focus = toolbar.text; });
    
    toolbar.obj_sltr.objectset.click(function (e) {sys.status.user_typing = false; toolbar.obj_sltr.chosen = "obj"; update_view(); });
    toolbar.obj_sltr.picsset.click(function (e) {sys.status.user_typing = false; toolbar.obj_sltr.chosen = "pics"; update_view(); });
    toolbar.obj_sltr.containerset.click(function (e) {sys.status.user_typing = false; toolbar.obj_sltr.chosen = "cont"; update_view(); });
    toolbar.obj_sltr.viewset.click(function (e) {sys.status.user_typing = false; toolbar.obj_sltr.chosen = "view"; update_view(); });
    
    
    
}

function init_toolbar_handlers(toolbar) {
    "use strict";
    
    init_toolbar_darken(toolbar);
    
    init_toolbar_clicks(toolbar);
    
    init_toolbar_dragging(toolbar);
}

function init_handlers() {
    "use strict";
    
    //sys.p.text(500, 100, "[" + removeTranslate("t2,3") + "]");
    
    var concept = sys.concepts[sys.c_index];
    
    init_window_handlers();
    
    init_toolbar_handlers(concept.toolbar);
}