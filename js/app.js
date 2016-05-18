$(document).ready(function() {
    var canvas = new fabric.Canvas('bottle_canvas');
    canvas.setHeight(800);
    canvas.setWidth(500);

    fabric.Image.fromURL('img/bottle.png', function(oImg) {
        oImg.set('selectable', false);
        canvas.add(oImg);
    });

    canvas.renderAll();
});