
angular.module('app', [])
    .controller('MainController', ['$scope', function($scope) {

        $scope.addImage = function(image) {
            fabric.Image.fromURL(image, function(oImg) {
                oImg.set(getScaledImageSize(oImg));
                oImg.set('selectable', true);
                $scope.canvas.centerObject(oImg);
                $scope.canvas.add(oImg);
                $scope.canvas.renderAll();
            });
        };

        $scope.hasObjectSelected = false;

        $scope.deleteSelectedObject = function(){
            var activeObject = $scope.canvas.getActiveObject(),
                activeGroup = $scope.canvas.getActiveGroup();
            if (activeObject) {
                if (confirm('Are you sure?')) {
                    $scope.canvas.remove(activeObject);
                }
            }
            else if (activeGroup) {
                if (confirm('Are you sure?')) {
                    var objectsInGroup = activeGroup.getObjects();
                    $scope.canvas.discardActiveGroup();
                    objectsInGroup.forEach(function(object) {
                        $scope.canvas.remove(object);
                    });
                }
            }
        };

        $scope.hasObjectOrGroupSelected = function() {
            var activeObject = $scope.canvas.getActiveObject(),
                activeGroup = $scope.canvas.getActiveGroup();

            return activeObject || activeGroup;
        };

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

            $scope.canvas.on('mouse:down', function() {
                $scope.$digest();
            });
        }

        function initIcons() {
            $scope.images = ["img/logo/ic1.png", "img/logo/ic3.png",
                "img/logo/ic4.png", "img/logo/ic5.png"];
        }

        function getScaledImageSize(img) {
             var width_ratio = $scope.canvas.width / img.width;
             var height_ratio = $scope.canvas.height / img.height;

             var minRatio = Math.min(width_ratio, height_ratio);

             return {
                 scaleX: minRatio,
                 scaleY: minRatio
             };
        }

        //make transparent corners and move rotating point closer to rectangle
        fabric.Object.prototype.set({
            transparentCorners: true,
            rotatingPointOffset: 0
        });

        //removing the top scale
        fabric.Object.prototype.setControlsVisibility({mt: false});

        initProducts();
        initCanvas();
        initIcons();

        $scope.canvas.renderAll();
    }]);
