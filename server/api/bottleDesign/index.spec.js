'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var bottleDesignCtrlStub = {
  show: 'bottleDesignCtrl.show',
  create: 'bottleDesignCtrl.create'
};

var routerStub = {
  get: sinon.spy(),
  post: sinon.spy()
};

// require the index with our stubbed out modules
var bottleDesignIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './bottleDesign.controller': bottleDesignCtrlStub
});

describe('BottleDesign API Router:', function() {

  it('should return an express router instance', function() {
    bottleDesignIndex.should.equal(routerStub);
  });

  describe('GET /api/bottleDesigns/:id', function() {

    it('should route to bottleDesign.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'bottleDesignCtrl.show')
        .should.have.been.calledOnce;
    });

  });

  describe('POST /api/bottleDesigns', function() {

    it('should route to bottleDesign.controller.create', function() {
      routerStub.post
        .withArgs('/', 'bottleDesignCtrl.create')
        .should.have.been.calledOnce;
    });

  });

});
