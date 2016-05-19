
angular.module('app', [])
    .controller('MainController', ['$scope', function($scope) {

        function initProducts() {
            $scope.product = {
                "name": "bottle",
                "url": "img/bottle.png",
                editableAreas: [
                    {
                        "name": "labelPanel",
                        top: 260,
                        left: 5,
                        canvas: {height: 200, width: 115}
                    }
                ]
            };
        }

        function initCanvas() {
            $scope.canvas = new fabric.Canvas('bottle_canvas');
            $scope.canvas.setHeight($scope.product.editableAreas[0].canvas.height);
            $scope.canvas.setWidth($scope.product.editableAreas[0].canvas.width);

            var elem = angular.element(document.querySelector(".canvas-container"));
            elem.ready(function(){
                elem.css('top', $scope.product.editableAreas[0].top + "px");
                elem.css('left', $scope.product.editableAreas[0].left + "px");
            });
        }

        //fabric.Image.fromURL('img/bottle.png', function(oImg) {
        //    oImg.set('selectable', false);
        //    $scope.canvas.add(oImg);
        //});

        function initIcons() {
            $scope.images = ["img/logo/ic1.png", "img/logo/ic2.png", "img/logo/ic3.png",
                "img/logo/ic4.png", "img/logo/ic5.png"];
        }

        initProducts();
        initCanvas();
        initIcons();

        $scope.canvas.renderAll();
    }]);
