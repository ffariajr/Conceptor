/*global make_view */


/*
This file builds the structure for a new concept.

A concept consists of its own toolbar (in order to save toolbar states between concepts)
It also stores the root screen.
*/

function makeOptions(option, n) {
    "use strict";
    var op = [], x;
    for (x = 0; x < n; x += 1) {
        op[x] = option();
    }
    return op;
}

function obj_scrollbar() {
    "use strict";
    return {
        bbox: "",
        upbox: "",
        updarken: false,
        uparrow: "",
        downbox: "",
        downdarken: false,
        downarrow: "",
        bar: "",
        bardarken: false,
        lines: "",
        position: 0,
        length: ""
    };
}

function obj_options() {
    "use strict";
    return {
        obj: "",
        type: "",
        name: "",
        hover: false,
        chosen: false
    };
}

function make_tab(num) {
    "use strict";
    return {
        bbox: "",
        text: "",
        hover: false,
        options: makeOptions(obj_options, num),
        scrollbar: obj_scrollbar()
    };
}

function make_obj_sltr() {
    "use strict";
    return {
        chosen: "",
        viewtab: make_tab(2),
        viewset: "",
        containertab: make_tab(3),
        containerset: "",
        objecttab: make_tab(6),
        objectset: "",
        picstab: make_tab(4),
        picsset: ""
    };
}

function make_text() {
    "use strict";
    return {
        bbox: "",
        text: "",
        hover: false,
        chosen: false
    };
}

function color_options() {
    "use strict";
    return {
        opbox: "",
        color: "",
        hover: false,
        chosen: false
    };
}

function make_color_sltr() {
    "use strict";
    return {
        bbox: "",
        color: "",
        dropbox: "",
        hover: false,
        arrow: "",
        droplist: "",
        droplistbkg: "",
        options: makeOptions(color_options, 6),
        opset: "",
        open: ""
    };
}

function tools_options() {
    "use strict";
    return {
        opbox: "",
        icon: "",
        optext: "",
        hover: false,
        chosen: false
    };
}

function make_tools() {
    "use strict";
    return {
        bbox: "",
        options: makeOptions(tools_options, 5)
    };
}

function make_helptool() {
    "use strict";
    return {
        set: "",
        ht_circle: "",
        ht_dot: "",
        ht_qmark: "",
        hover: false,
        chosen: false
    };
}

function make_toolbar() {
    "use strict";
    return {
        toolbar_rect: "",
        helptool: make_helptool(),
        tools: make_tools(),
        color_sltr: make_color_sltr(),
        text: make_text(),
        obj_sltr: make_obj_sltr()
    };
}

function make_root_screen() {
    "use strict";
    var i = make_view(null);
    i.focus = 0;
    i.chosen = true;
    return i;
}

function make_concept() {
    "use strict";
    return {
        toolbar: make_toolbar(),
        screen: make_root_screen()
    };
}