// Create canvas to fit the area
var container = document.getElementById("conceptor-layer");
var paper = Raphael(container, container.offsetWidth, window.innerHeight-200);

// Create rectangle bounds of toolbar 
var rect = paper.rect(-1,-1, container.offsetWidth/4, window.innerHeight-198, 0);

