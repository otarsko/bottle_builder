'use strict';

describe('Service: mainService', function () {

  // load the service's module
  beforeEach(module('bottleBuilderApp'));

  // instantiate service
  var mainService;
  beforeEach(inject(function (_mainService_) {
    mainService = _mainService_;
  }));

  it('should do something', function () {
    !!mainService.should.be.true;
  });

});
