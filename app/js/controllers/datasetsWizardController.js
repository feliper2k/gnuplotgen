'use strict';

function gpDatasetsWizard($scope, $http, $mdDialog, datasetsModel, connectionManager) {
    'ngInject';

    var $ = require('jquery'),
        _ = require('lodash');

    const vm = this;
    vm.cancel = $mdDialog.cancel;

    vm.datasets = datasetsModel;

    // viewmodel
    vm.newData = {
        description: 'NewFunction',
        datasetType: 'function',
        functionType: '2d',
        formulas: [],
        useColumns: [],
        formData: null
    };

    vm.preview = {
        loading: false,
        content: [],
        fileName: '',
        originalName: ''
    };

    function splitColumns(data) {
        return _.map(data, (entry) => {
            return entry.split(/\s+/);
        });
    }

    function uploadCleanup() {
        if(vm.preview.fileName) {
            // cleanup
            let config = {
                url: `${connectionManager.url()}upload/${vm.preview.fileName}`,
                method: 'delete'
            };

            $http(config).then((success) => {
                console.log(success);
            }, (error) => {
                console.log(error);
            })
        }
    }

    $scope.$on('fileChanged', () => {
        // upload file & generate preview

        vm.preview.loading = true;
        uploadCleanup();

        let req = {
            method: 'POST',
            url: connectionManager.url() + 'upload',
            data: vm.newData.formData,
            transformRequest: angular.identity,
            headers: { 'Content-Type': undefined }
        };

        $http(req).then((success) => {
             let reply = success.data;

             vm.preview.fileName = reply.filename;
             vm.preview.originalName = reply.originalname;
             vm.preview.content = splitColumns(reply.preview);

             // default columns
             let dataColumnCount = reply.preview[0].split(/\s+/).length;
             vm.newData.useColumns = _.fill(Array(dataColumnCount), true);
        }, (error) => {
            console.log(error);
        }).finally(() => {
            vm.preview.loading = false;
        });
    });

    $scope.$on('$destroy', function () {
        // uploadCleanup();
    });

    vm.setDatasetType = (type) => {
        vm.newData.datasetType = type;
    };

    vm.toggleColumn = (num) => {
        vm.newData.useColumns[num] = !vm.newData.useColumns[num];
    };

    // create new dataset entry
    vm.create = function () {
        let nd = vm.newData;
        let columns = _.reduce(nd.useColumns, (result, value, index) => {
            if(value) {
                result.push(index + 1);
            }
            return result;
        }, []).join(':');

        switch(nd.datasetType) {
            case 'function':
            datasetsModel.create(nd.functionType, nd.description, {
                formulas: nd.formulas,
                functionType: nd.functionType
            });
            break;
            case 'file':
            if(vm.preview.content.length) {
                datasetsModel.create('file', vm.preview.originalName, {
                    filename: vm.preview.fileName,
                    title: vm.preview.originalName,
                    columns: columns
                });
            }
            break;
        }

        vm.cancel();
    };

    vm.initializeUpload = function () {
        $('#plotDataFile').click();
    };

    return this;
}

export default {
    name: 'gpDatasetsWizard',
    fn: gpDatasetsWizard
};
