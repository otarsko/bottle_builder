'use strict';

(function () {

  class ColorPanelController {

    constructor($scope) {
      this.$scope = $scope;
    }

    $onInit() {
      var self = this;

      self.$scope.$watch('colorValue', function (newValue) {
        self.onColorChange({'color' : newValue});
      });
    }
  }

  angular.module('bottleBuilderApp')
    .component('colorPanel', {
      templateUrl: 'app/color-panel/colorPanel.html',
      controller: ColorPanelController,
      bindings: {
        onColorChange: '&'
      }
    });
})();
