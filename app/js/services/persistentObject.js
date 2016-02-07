'use strict';

function PersistentObject() {
    function create(base, storeId) {
        let _ = require('lodash');
        let model = _.clone(base);

        let ls = window.localStorage,
            service = {};

        if(ls.getItem) {
            let persistent = JSON.parse(ls.getItem(storeId));
            if(persistent) {
                model = persistent;
            }
            else {
                ls.setItem(storeId, JSON.stringify(model));
            }

            Object.defineProperties(service, _.mapValues(model, (value, key) => {
                return {
                    get: () => {
                        return model[key];
                    },
                    set: (value) => {
                        model[key] = value;
                        ls.setItem(storeId, JSON.stringify(model));
                    }
                }
            }));
        }

        return ls.getItem ? service : false;
    }

    return {
        create
    };
}

export default {
    name: 'persistentObject',
    fn: PersistentObject
};
