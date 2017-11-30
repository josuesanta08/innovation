'use strict';

/**
 * @ngdoc function
 * @name innovationApp.controller:JobsCtrl
 * @description
 * # JobsCtrl
 * Controller of the innovationApp
 */
angular.module('innovationApp')
  .controller('JobsCtrl', ['$scope','$http', function($scope,$http) {
    $http({
		method: 'GET',
		url: 'https://jsonblob.com/api/jsonBlob/48cf6014-d58b-11e7-823f-6b63d9211506'
	}).then(function successCallback(response) {
		$scope.jobs = response.data.jobs;
		console.log($scope.users);
	}, function errorCallback(response) {
	    console.log(response);
	});
  }]);
