'use strict';

angular.module('app.controllers.New', ['app.services.Main'])
  .controller('NewCtrl', function ($scope, $rootScope, $state, MainService) {

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

    MainService.getCustomerTypes(db)
    .then(function (rows) {
      $scope.types = rows;
    });


    $scope.save = function () {

      let moment = require('moment');
      let customer = {};

      customer.fullname = $scope.fullname;
      customer.birthdate = moment($scope.birthdate).format('YYYY-MM-DD');
      customer.address = $scope.address;
      customer.telephone = $scope.telephone;
      customer.email = $scope.email;
      customer.customer_type_id = $scope.customerTypeId;

      MainService.saveCustomer(db, customer)
      .then(function () {
        // success
        $state.go('main');
      }, function (err) {
        alert('Error: ' + JSON.stringify(err));
      })

    }


  });