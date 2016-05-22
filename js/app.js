
angular.module('app', ['ngjsColorPicker'])
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
        $scope.labelBackground = "#e1e1e1";
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

        $scope.centerSelected = function() {
            var activeObject = $scope.canvas.getActiveObject();
            $scope.canvas.centerObject(activeObject);
            $scope.canvas.renderAll();
        };

        $scope.hasObjectOrGroupSelected = function() {
            var activeObject = $scope.canvas.getActiveObject(),
                activeGroup = $scope.canvas.getActiveGroup();

            return activeObject || activeGroup;
        };

        $scope.hasTextObjectSelected = function() {
            var activeObject = $scope.canvas.getActiveObject();
            if (activeObject) {
                return activeObject.get('type')==="text";
            }
            return false;
        };

        $scope.addText = function() {
            var text = new fabric.Text('Text', {
                fontSize: 15
            });
            $scope.canvas.centerObject(text);
            $scope.canvas.add(text);
            $scope.canvas.renderAll();
        };

        $scope.updateTextContent = function(textContent) {
            var textObject = $scope.canvas.getActiveObject();
            textObject.setText(textContent);
            $scope.canvas.renderAll();
        };

        function initProducts() {
            $scope.product = {
                "name": "bottle",
                "url": "img/bottle.png",
                editableAreas: [
                    {
                        "name": "labelPanel",
                        top: -300,
                        left: 3,
                        canvas: {height: 240, width: 152}
                    }
                ]
            };
        }

        function initCanvas() {
            $scope.canvas = new fabric.Canvas('bottle_canvas');
            $scope.canvas.setHeight($scope.product.editableAreas[0].canvas.height);
            $scope.canvas.setWidth($scope.product.editableAreas[0].canvas.width);

            $scope.canvas.backgroundColor = $scope.labelBackground;
            $scope.$watch('labelBackground', function(newValue, oldValue) {
                $scope.canvas.backgroundColor = newValue;
                $scope.canvas.renderAll();
            });

            var elem = angular.element(document.querySelector(".canvas-container"));
            elem.ready(function(){
                elem.css('top', $scope.product.editableAreas[0].top + "px");
                elem.css('left', $scope.product.editableAreas[0].left + "px");
            });

            $scope.canvas.on('mouse:down', function() {
                //to update visibility of actions, available only if object selected
                $scope.$digest();
            });

            $scope.canvas.on('object:selected', function(options, event) {
                var object = options.target;
                if (object && object.get('type')==="text") {
                    $scope.selectedTextContent = object.getText();
                }
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

            //make it 10% smaller
            minRatio = minRatio * 0.9;

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
