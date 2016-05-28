'use strict';

(function () {

  class DesignActionsPanelController {

    constructor($http) {
      this.$http = $http;
    }

    save() {
      var self = this;

      var json = JSON.stringify( self.canvas.toJSON() );

      // save via xhr
      self.$http.post('/api/bottleDesigns', { canvas : json })
        .then(response => {

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
