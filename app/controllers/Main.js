'use strict';

angular.module('app.controllers.Main', ['app.services.Main'])
  .controller('MainCtrl', function ($scope, $rootScope, MainService) {

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

    $scope.query = {
      limit: 3,
      page: 1
    };

    $scope.onPaginate = function (page, limit) {
      console.log(page, limit);
      let offset = (page - 1) * limit;
      $scope.getCustomers(limit, offset);
    };

    // Get total
    MainService.getTotal(db)
    .then(function (total) {
      $scope.total = total;
    }, function (err) {
      console.log(err);
    });

    $scope.getCustomers = function (limit, offset) {
      $scope.isLoading = true;

      $scope.customers = [];
      MainService.getList(db, limit ,offset)
        .then(function (rows) {
          $scope.customers = rows;
          $scope.isLoading = false;
        }, function (err) {
          console.log(err);
          $scope.isLoading = false;
        });
    };

    let limit = $scope.query.limit;
    let offset = ($scope.query.page - 1) * $scope.query.limit;

    $scope.getCustomers(limit, offset);



  });