(function (CS) {
    'use strict';

    function ContainerMoveVis() { }
    CS.deriveVisualizationFromBase(ContainerMoveVis);

    ContainerMoveVis.prototype.init = function (scope, elem) {
        this.onDataUpdate = dataUpdate;

        var symbolContainerElement = elem.find('#container')[0];
        var newUniqueIDString = "myCustomSymbol_"+ Math.random().toString(36).substr(2, 16);
        symbolContainerElement.id = newUniqueIDString;

        function dataUpdate(data) {
            if(data) {
                //console.log("Original:"+ data.Value);
                //var AddWidth = 400 + Math.round(data.Value);
                var AddWidth = 400 + Math.round(data.Rows[0].Value);
                //console.log("New:" + AddWidth);
                scope.DynamicWidth = AddWidth;
                console.log("FirstTag Value:" + scope.DynamicWidth);
                scope.pickerX = AddWidth-10; // width-(height of horizontal container)        
                console.log("PickerPos: " + scope.pickerX);
                scope.containerX = scope.pickerX - 15; // pickerX-1/2(width of container)+1/2(width of vertical container)
                console.log("ContainerXPos: " + scope.containerX);

                var AddHeight = 200;

                if (data.Rows[1]) {
                    console.log("Height from tag:" + data.Rows[1].Value);
                    AddHeight = 200 - Math.round(data.Rows[1].Value);
                    console.log("New Height:" + AddHeight);
                    scope.DynamicHeight = AddHeight;
                    scope.containerY = scope.DynamicHeight + 10; // Height of vertical picker + width of horizontal rod 
                    console.log("ContainerYPos: " + scope.containerY);
                }
                else {
                    scope.DynamicHeight = AddHeight;
                    scope.containerY = scope.DynamicHeight + 10; // Height of vertical picker + width of horizontal rod 
                }

            }// End of dataArray
        }

    };

    var definition = {
        typeName: 'containermove',
        displayName: 'Container Movement Symbol',
        //datasourceBehavior: CS.Extensibility.Enums.DatasourceBehaviors.Single,
        datasourceBehavior: CS.Extensibility.Enums.DatasourceBehaviors.Multiple,
        visObjectType: ContainerMoveVis,
        getDefaultConfig: function () {
            return {
                //DataShape: 'Value',
                DataShape: 'Table',
                DynamicWidth: 400, // default Width of horizontal rod
                pickerX: 390, // width-height
                containerX: 375, // pickerX-1/2(width of container)
                DynamicHeight: 200, // default height of vertical rod
                containerY: 210
            };
        }
    };

    CS.symbolCatalog.register(definition);

})(window.Coresight);