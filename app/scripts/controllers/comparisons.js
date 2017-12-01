'use strict';

/**
 * @ngdoc function
 * @name innovationApp.controller:ComparisonsCtrl
 * @description
 * # ComparisonsCtrl
 * Controller of the innovationApp
 */
angular.module('innovationApp')
  .controller('ComparisonsCtrl', ['$scope','$http', function($scope,$http) {
    $http({
        method: 'GET',
        url: 'https://jsonblob.com/api/jsonBlob/48cf6014-d58b-11e7-823f-6b63d9211506'
    }).then(function successCallback(response) {
        $scope.user = response.data.users[0];
        $scope.job = response.data.jobs[2];
    }, function errorCallback(response) {
        console.log(response);
    });
  }]);
