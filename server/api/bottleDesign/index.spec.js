'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var bottleDesignCtrlStub = {
  index: 'bottleDesignCtrl.index',
  show: 'bottleDesignCtrl.show',
  create: 'bottleDesignCtrl.create',
  update: 'bottleDesignCtrl.update',
  destroy: 'bottleDesignCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
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

  describe('GET /api/bottleDesigns', function() {

    it('should route to bottleDesign.controller.index', function() {
      routerStub.get
        .withArgs('/', 'bottleDesignCtrl.index')
        .should.have.been.calledOnce;
    });

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

  describe('PUT /api/bottleDesigns/:id', function() {

    it('should route to bottleDesign.controller.update', function() {
      routerStub.put
        .withArgs('/:id', 'bottleDesignCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('PATCH /api/bottleDesigns/:id', function() {

    it('should route to bottleDesign.controller.update', function() {
      routerStub.patch
        .withArgs('/:id', 'bottleDesignCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('DELETE /api/bottleDesigns/:id', function() {

    it('should route to bottleDesign.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'bottleDesignCtrl.destroy')
        .should.have.been.calledOnce;
    });

  });

});
