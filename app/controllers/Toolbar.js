'use strict';

angular.module('app.controllers.Toolbar', [])
.controller('ToolbarCtrl', function ($scope, $rootScope, $state, $window, $mdSidenav) {
  $scope.toggleLeft = function () {
    $mdSidenav('left')
      .toggle();
  };

  $rootScope.admin_name = 'Guest';
  $rootScope.isLogged = false;

  $scope.logout = function () {
    $window.sessionStorage.removeItem('username');
    $window.sessionStorage.removeItem('admin_name');

    $rootScope.admin_name = 'Guest';
    $rootScope.isLogged = false;

    $state.go('login');
  }

});