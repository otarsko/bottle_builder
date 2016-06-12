'use strict';

describe('Component: canvasActionsPanel', function() {

  beforeEach(module('bottleBuilderApp'));

  var canvasActionsPanelComponent;

  var canvasMock;
  var onTextAddSpy;
  var onCenteringSelectedSpy;
  var onDeleteSelectedSpy;

  beforeEach(inject(function($componentController, $rootScope) {
    var scope = $rootScope.$new();

    canvasMock = {};
    onTextAddSpy = sinon.spy();
    onCenteringSelectedSpy = sinon.spy();
    onDeleteSelectedSpy = sinon.spy();

    canvasActionsPanelComponent = $componentController('canvasActionsPanel',
      {$scope: scope},
      {
        canvas: canvasMock,
        onTextAdd: onTextAddSpy,
        onCenteringSelected: onCenteringSelectedSpy,
        onDeleteSelected: onDeleteSelectedSpy
      });
  }));

  describe('addText', function() {
    it('Should call bind callback', function() {
      canvasActionsPanelComponent.addText();

      onTextAddSpy.should.have.been.calledOnce;
    });
  });

  describe('centerSelected', function() {
    it('Should call bind callback', function() {
      canvasActionsPanelComponent.centerSelected();

      onCenteringSelectedSpy.should.have.been.calledOnce;
    });
  });

  describe('deleteSelectedObject', function() {
    it('Should call bind callback', function() {
      canvasActionsPanelComponent.deleteSelectedObject();

      onDeleteSelectedSpy.should.have.been.calledOnce;
    });
  });

  describe('hasObjectOrGroupSelected', function() {
    it('Should return true if there is active object', function() {
      canvasMock['getActiveObject'] = function() {return true};
      canvasMock['getActiveGroup'] = function() {return false};

      canvasActionsPanelComponent.hasObjectOrGroupSelected().should.be.true;
    });

    it('Should return true if there is active group', function() {
      canvasMock['getActiveObject'] = function() {return false};
      canvasMock['getActiveGroup'] = function() {return true};

      canvasActionsPanelComponent.hasObjectOrGroupSelected().should.be.true;

    });

    it('Should return false if there are no active object or active group', function() {
      canvasMock['getActiveObject'] = function() {return false};
      canvasMock['getActiveGroup'] = function() {return false};

      canvasActionsPanelComponent.hasObjectOrGroupSelected().should.be.false;
    });
  });
});
