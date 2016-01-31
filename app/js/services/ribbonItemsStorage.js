'use strict';

function RibbonItemStorage() {
    const service = {};
    var store = {
        items: {},
        put: (itemName, contents) => {
            store.items[itemName] = contents;
        },
        get: (itemName) => {
            return store.items[itemName];
        }
    };

    return store;
}

export default {
    name: 'ribbonItemStorage',
    fn: RibbonItemStorage
};
