'use strict';

describe('Service: mainService', function () {

  // load the service's module
  beforeEach(module('bottleBuilderApp'));

  var mainService;
  var $httpBackend;

  beforeEach(inject(function (_$httpBackend_, _mainService_) {
    mainService = _mainService_;
    $httpBackend = _$httpBackend_;

    $httpBackend.whenGET('/api/bottleDesigns/some_id')
      .respond({canvas : 'some_canvas'});
    $httpBackend.whenPOST('/api/bottleDesigns')
      .respond({_id : 'some_id'});
  }));

  describe('loadBottleDesign', function() {
    it('should load requested design and run callback on response', function () {

      var canvasValue;
      mainService.loadBottleDesign('some_id', function(response) {
        canvasValue = response.data.canvas;
      });
      $httpBackend.flush();

      canvasValue.should.equal('some_canvas');
    });
  });

  describe('saveBottleDesign', function() {
    it('should save canvas and run callback on response', function () {

      var idFromResponse;
      mainService.saveBottleDesign({toJSON: function() {return 'jsonValue'}}, function(response) {
        idFromResponse = response.data._id;
      });
      $httpBackend.flush();

      idFromResponse.should.equal('some_id')
    });
  });
});
