
// Create canvas to fit the area
var container = ;
var p = Raphael(document.getElementById("conceptor-layer"), document.getElementById("conceptor-layer").offsetWidth, window.innerHeight-200);
var r = p.rephael;

init();





function init() {
  

  // Create rectangle bounds of toolbar 
  var rect = paper.rect(-1,-1, container.offsetWidth/4, window.innerHeight-198, 0);

}

function windowResized() {
  p.setSize(document.getElementById("conceptor-layer").offsetWidth, window.innerHeight-200);
}
