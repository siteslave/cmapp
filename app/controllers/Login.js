'use strict';

angular.module('app.controllers.Login', ['app.services.Login'])
  .controller('LoginCtrl', function ($scope, $rootScope, $window, $state, LoginService) {

    let config = fse.readJsonSync($rootScope.configFile);
    let db = require('knex')({
      client: 'mysql',
      connection: {
        host: config.host,
        port: config.port,
        database: config.database,
        user: config.user,
        password: config.password
      }
    });

    $scope.doLogin = function () {

      let username = $scope.username;
      let password = $scope.password;

      let _crypto = require('crypto');
      password = _crypto.createHash('md5').update(password).digest('hex');

      LoginService.doLogin(db, username, password)
      .then(function (user) {
        if (user) {

          $window.sessionStorage.setItem('username', user.username);
          $window.sessionStorage.setItem('fullname', user.fullname);
          $rootScope.fullname = user.fullname;
          $rootScope.isLogged = true;

          //$rootScope.$digest();

          $state.go('main');
        } else {
          alert('ชื่อหรือรหัสผ่าน ไม่ถูกต้อง');
        }
      }, function (err) {
        alert(JSON.stringify(err));
        console.log(err);
      })
    }

  });