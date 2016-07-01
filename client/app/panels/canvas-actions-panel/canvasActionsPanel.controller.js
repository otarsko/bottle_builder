'use strict';

(function () {

  class CanvasActionsPanelController {

    hasObjectOrGroupSelected() {
      var activeObject = this.canvas.getActiveObject(),
        activeGroup = this.canvas.getActiveGroup();

      return activeObject || activeGroup;
    }

    addText() {
      this.onTextAdd();
    }

    centerSelected() {
      this.onCenteringSelected();
    }

    deleteSelectedObject() {
      this.onDeleteSelected();
    }
  }

  angular.module('bottleBuilderApp')
    .component('canvasActionsPanel', {
      templateUrl: 'app/panels/canvas-actions-panel/canvasActionsPanel.html',
      controller: CanvasActionsPanelController,
      bindings: {
        canvas: '<',
        onTextAdd: '&',
        onCenteringSelected: '&',
        onDeleteSelected: '&'
      }
    });
})();
