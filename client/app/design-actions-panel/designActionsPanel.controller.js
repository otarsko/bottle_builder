'use strict';

(function () {

  class DesignActionsPanelController {

    constructor(mainService) {
      this.mainService = mainService;
    }

    //todo: background image not saved OR not restored properly!
    save() {
      var self = this;

      this.mainService.saveBottleDesign(self.canvas, response => {

        //todo: not fixed domain
        self.savedUrl = "http://localhost:9000/" + response.data["_id"];
      });
    }
  }

  angular.module('bottleBuilderApp')
    .component('designActionsPanel', {
      templateUrl: 'app/design-actions-panel/designActionsPanel.html',
      controller: DesignActionsPanelController,
      bindings: {
        canvas: '<'
      }
    });
})();
