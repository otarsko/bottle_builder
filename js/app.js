
angular.module('app', [])
    .controller('MainController', ['$scope', function($scope) {
        $scope.canvas = new fabric.Canvas('bottle_canvas');
        $scope.canvas.setHeight(800);
        $scope.canvas.setWidth(500);

        fabric.Image.fromURL('img/bottle.png', function(oImg) {
            oImg.set('selectable', false);
            $scope.canvas.add(oImg);
        });

        $scope.canvas.renderAll();
    }]);
