'use strict';

angular.module('app.controllers.Toolbar', [])
.controller('ToolbarCtrl', function ($scope, $rootScope, $state, $window, $mdSidenav) {
  $scope.toggleLeft = function () {
    $mdSidenav('left')
      .toggle();
  };

  $rootScope.fullname = 'Guest';
  $rootScope.isLogged = false;

  $scope.logout = function () {
    $window.sessionStorage.removeItem('username');
    $window.sessionStorage.removeItem('fullname');
    $state.go('login');
  }

});