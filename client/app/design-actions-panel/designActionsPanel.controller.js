'use strict';

(function () {

  class DesignActionsPanelController {

    constructor(mainService) {
      this.mainService = mainService;
    }

    save() {
      var self = this;

      this.mainService.saveBottleDesign(self.canvas, response => {
        self.savedUrl = location.host + '/' + response.data['_id'];
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
