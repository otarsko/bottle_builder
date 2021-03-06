'use strict';

(function () {

  //todo: separate
  class MainController {

    constructor(mainService, $scope, $stateParams) {
      this.mainService = mainService;
      this.$scope = $scope;
      this.$stateParams = $stateParams;
    }

    $onInit() {
      var self = this;

      function initProducts() {
        self.product = {
          "name": "bottle",
          "url": "img/bottle.png",
          editableAreas: [
            {
              "name": "labelPanel",
              top: -300,
              left: 3,
              canvas: {height: 240, width: 152}
            }
          ]
        };
      }

      function initCanvas() {
        self.canvas = new fabric.Canvas('bottle_canvas');

        self.canvas.setHeight(self.product.editableAreas[0].canvas.height);
        self.canvas.setWidth(self.product.editableAreas[0].canvas.width);

        var elem = angular.element(document.querySelector(".canvas-container"));
        elem.ready(function () {
          elem.css('top', self.product.editableAreas[0].top + "px");
          elem.css('left', self.product.editableAreas[0].left + "px");
        });

        self.canvas.on('mouse:down', function () {

          //to update visibility of actions, available only if object selected
          self.$scope.$digest();
        });

        self.changeBackground("#FFFFFF");

        if (self.$stateParams.designId) {
          self.mainService.loadBottleDesign(self.$stateParams.designId, response => {
            self.canvas.loadFromJSON(response.data.canvas, self.canvas.renderAll.bind(self.canvas));
          });
        }
      }

      //make transparent corners and move rotating point closer to rectangle
      fabric.Object.prototype.set({
        transparentCorners: true,
        rotatingPointOffset: 0
      });

      //removing the top scale
      fabric.Object.prototype.setControlsVisibility({mt: false});

      fabric.Object.NUM_FRACTION_DIGITS = 10;

      initProducts();
      initCanvas();

      self.canvas.renderAll();
    }

    changeBackground(color) {
      if (color) {
        this.canvas.setBackgroundColor(color, this.canvas.renderAll.bind(this.canvas));
      }
    }

    deleteSelectedObject() {
      var self = this;
      var activeObject = this.canvas.getActiveObject(),
        activeGroup = this.canvas.getActiveGroup();
      if (activeObject) {
        if (confirm('Are you sure?')) {
          self.canvas.remove(activeObject);
        }
      }
      else if (activeGroup) {
        if (confirm('Are you sure?')) {
          var objectsInGroup = activeGroup.getObjects();
          this.canvas.discardActiveGroup();
          objectsInGroup.forEach(function (object) {
            self.canvas.remove(object);
          });
        }
      }
    }

    centerSelected() {
      var activeObject = this.canvas.getActiveObject();
      this.canvas.centerObject(activeObject);
      this.canvas.renderAll();
    }

    updateTextContent(textContent) {
      var textObject = this.canvas.getActiveObject();
      textObject.setText(textContent);
      this.canvas.renderAll();
    }

    addImage(image) {
      var self = this;

      function getScaledImageSize(img) {
        var width_ratio = self.canvas.width / img.width;
        var height_ratio = self.canvas.height / img.height;

        var minRatio = Math.min(width_ratio, height_ratio);

        //make it 10% smaller
        minRatio = minRatio * 0.9;

        return {
          scaleX: minRatio,
          scaleY: minRatio
        };
      }

      fabric.Image.fromURL(image, function (oImg) {
        oImg.set(getScaledImageSize(oImg));
        oImg.set('selectable', true);

        self.canvas.centerObject(oImg);
        self.canvas.add(oImg);
        self.canvas.renderAll();
      });
    }

    addText() {
      var text = new fabric.Text('Text', {
        fontSize: 15
      });
      this.canvas.centerObject(text);
      this.canvas.add(text);
      this.canvas.renderAll();
    }
  }

  angular.module('bottleBuilderApp')
    .component('main', {
      templateUrl: 'app/main/main.html',
      controller: MainController
    });
})();
