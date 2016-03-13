'use strict';

angular.module('app.controllers.Setting', [])
.controller('SettingCtrl', function ($scope, $rootScope) {

  //console.log($rootScope.configFile);

  $scope.config = fse.readJsonSync($rootScope.configFile);
  //$scope.config.port = parseInt($scope.config.port);

  $scope.save = function () {
    fse.writeJson($rootScope.configFile, $scope.config, function (err) {
      if (err) {
        alert('Error: ' + JSON.stringify(err))
      } else {
        alert('Success')
      }
    })
  }

});