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
        $scope.jobs = response.data.jobs;
        $scope.job = response.data.jobs[0];

        $scope.$watch('job', function() {
            var totalRequiredItems = 0;
            var achievedItems = 0;

            // Calculates certifications state
            for(var i = 0; i < $scope.job.requirements.certifications.length; i++) {
                var currentCert = $scope.job.requirements.certifications[i];
                var pendingCerts = parseInt(currentCert.quantity);
                totalRequiredItems += pendingCerts;

                for(var j = 0; j < $scope.user.achievements.certifications.length; j++) {
                    if (currentCert.topics.includes($scope.user.achievements.certifications[j].topic)) {
                        pendingCerts -= parseInt($scope.user.achievements.certifications[j].quantity);
                    }
                }
                if (pendingCerts <= 0) {
                    $scope.job.requirements.certifications[i].iconClass = 'glyphicon-ok status-completed';
                    achievedItems += parseInt(currentCert.quantity);
                }
                else if (pendingCerts < parseInt(currentCert.quantity)) {
                    $scope.job.requirements.certifications[i].iconClass = 'glyphicon-time status-in-progress';
                    achievedItems += parseInt(currentCert.quantity) - pendingCerts;
                }
                else {
                    $scope.job.requirements.certifications[i].iconClass = 'glyphicon-remove status-pending';
                }
                
            }

            // Calculates projects state
            totalRequiredItems += parseInt($scope.job.requirements.projects);
            if (parseInt($scope.job.requirements.projects) <= $scope.user.achievements.projects.length) {
                $scope.job.requirements.projectsIconClass = 'glyphicon-ok status-completed';
                achievedItems += parseInt($scope.job.requirements.projects);
            }
            else if ($scope.user.achievements.projects.length === 0) {
                $scope.job.requirements.projectsIconClass = 'glyphicon-remove status-pending';
            }
            else {
                $scope.job.requirements.projectsIconClass = 'glyphicon-time status-in-progress';
                achievedItems += $scope.user.achievements.projects.length;
            }

            // Calculates years of experience state
            totalRequiredItems += parseInt($scope.job.requirements.yearsOfExperience);
            if (parseInt($scope.job.requirements.yearsOfExperience) <= parseInt($scope.user.achievements.yearsOfExperience)) {
                $scope.job.requirements.yearsIconClass = 'glyphicon-ok status-completed';
                achievedItems += parseInt($scope.job.requirements.yearsOfExperience);
            }
            else if (parseInt($scope.user.achievements.yearsOfExperience) === 0) {
                $scope.job.requirements.yearsIconClass = 'glyphicon-remove status-pending';
            }
            else {
                $scope.job.requirements.yearsIconClass = 'glyphicon-time status-in-progress';
                achievedItems += parseInt($scope.user.achievements.yearsOfExperience);
            }

            $scope.totalRequiredItems = totalRequiredItems;
            $scope.achievedItems = achievedItems;
            $scope.achievedPercentage = (achievedItems / totalRequiredItems) * 100;

        });

    }, function errorCallback(response) {
        console.log(response);
    });
  }]);
