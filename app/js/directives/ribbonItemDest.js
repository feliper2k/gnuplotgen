'use strict';

function RibbonItemDest(ribbonItemStorage) {
    'ngInject';

    return {
        restrict: 'E',
        scope: true,
        link: (scope, element, attrs, ctrl, transclude) => {
            let itemName = attrs.name;

            if(ribbonItemStorage) {
                var itemChildren = Array.prototype.slice.apply(ribbonItemStorage.get(itemName));

                for(let i in itemChildren) {
                    element.append(itemChildren[i]);
                }
            }
        }
    };
}

export default {
    name: 'ribbonItemDest',
    fn: RibbonItemDest
};
