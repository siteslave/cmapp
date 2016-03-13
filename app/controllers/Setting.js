'use strict';

angular.module('app.controllers.Setting', [])
.controller('SettingCtrl', function ($scope, $rootScope, $mdDialog) {

  //console.log($rootScope.configFile);

  $scope.config = fse.readJsonSync($rootScope.configFile);
  //$scope.config.port = parseInt($scope.config.port);

  $scope.save = function () {
    fse.writeJson($rootScope.configFile, $scope.config, function (err) {
      if (err) {
        $mdDialog.show(
          $mdDialog.alert()
            .parent(angular.element(document.querySelector('body')))
            .clickOutsideToClose(true)
            .title('เกิดข้อผิดพลาด')
            .textContent('Error: ' + JSON.stringify(err))
            .ariaLabel('alert')
            .ok('ตกลง')
        );
      } else {

        $mdDialog.show(
          $mdDialog.alert()
            .parent(angular.element(document.querySelector('body')))
            .clickOutsideToClose(true)
            .title('ผลการบันทึก')
            .textContent('บันทึกเสร็จเรียบร้อย')
            .ariaLabel('alert')
            .ok('ตกลง')
        );

      }
    })
  }

});