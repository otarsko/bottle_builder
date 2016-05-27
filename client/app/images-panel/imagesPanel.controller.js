'use strict';

(function () {

  class ImagesPanelController {

    $onInit() {
      this.images = ["assets/images/logo/ic1.png", "assets/images/logo/ic3.png",
        "assets/images/logo/ic4.png", "assets/images/logo/ic5.png"];
    }
  }

  angular.module('bottleBuilderApp')
    .component('imagesPanel', {
      templateUrl: 'app/images-panel/imagesPanel.html',
      controller: ImagesPanelController
    });
})();
