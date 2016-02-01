'use strict';

function RibbonItemSrc(ribbonItemStorage) {
    'ngInject';

    return {
        restrict: 'E',
        transclude: 'element',
        scope: true,
        link: (scope, element, attrs, ctrl, transclude) => {
            let itemName = attrs.name;

            if(ribbonItemStorage) {
                ribbonItemStorage.put(itemName, transclude(scope)[0].children);
            }
        }
    };
}

export default {
    name: 'ribbonItemSrc',
    fn: RibbonItemSrc
};
