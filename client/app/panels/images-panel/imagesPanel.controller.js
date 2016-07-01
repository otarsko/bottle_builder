'use strict';

(function () {

  class ImagesPanelController {

    $onInit() {
      this.images = ["assets/images/logo/ic1.png", "assets/images/logo/ic3.png",
        "assets/images/logo/ic4.png", "assets/images/logo/ic5.png"];
    }

    handleImageClick(image) {
      this.onImageClick({'image' : image});
    }
  }

  angular.module('bottleBuilderApp')
    .component('imagesPanel', {
      templateUrl: 'app/panels/images-panel/imagesPanel.html',
      controller: ImagesPanelController,
      bindings: {
        onImageClick: '&'
      }
    });
})();
