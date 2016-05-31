'use strict';

(function () {
  class MainService {

    constructor($http) {
      this.$http = $http;
    }

    loadBottleDesign(id, callback) {
      this.$http.get('/api/bottleDesigns/' + id)
        .then(callback);
    }

    saveBottleDesign(canvas, callback) {
      var json = JSON.stringify(canvas.toJSON());

      // save via xhr
      this.$http.post('/api/bottleDesigns', { canvas : json })
        .then(callback);
    }
  }

  angular.module('bottleBuilderApp')
    .service('mainService', MainService);
})();
