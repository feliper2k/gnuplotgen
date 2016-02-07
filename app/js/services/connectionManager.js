'use strict';

function ConnectionManager(persistentObject) {
    'ngInject';

    var _ = require('lodash');

    let ls = window.localStorage;
    let model = {
        address: 'localhost',
        port: '8001'
    };

    let conn = persistentObject.create(model, 'gnuplot.connection');

    return _.extend(conn, {
        url: () => {
            return `http://${conn.address}:${conn.port}/`;
        }
    });
}

export default {
    name: 'connectionManager',
    fn: ConnectionManager
};
