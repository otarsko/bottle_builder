'use strict';

(function () {

  class TextPanelController {

    $onInit() {
      var self = this;

      self.canvas.on('object:selected', function (options, event) {
        var object = options.target;
        if (object && object.get('type') === "text") {
          self.selectedTextContent = object.getText();
        }
      });
    }

    hasTextObjectSelected() {
      var activeObject = this.canvas.getActiveObject();
      if (activeObject) {
        return activeObject.get('type') === "text";
      }
      return false;
    }

    updateTextContent(text) {
      this.onTextUpdate({'text': text});
    }
  }

  angular.module('bottleBuilderApp')
    .component('textPanel', {
      templateUrl: 'app/panels/text-panel/textPanel.html',
      controller: TextPanelController,
      bindings: {
        onTextUpdate: '&',
        canvas: '<'
      }
    });
})();
