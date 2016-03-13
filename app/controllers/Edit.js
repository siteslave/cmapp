'use strict';

angular.module('app.controllers.Edit', ['app.services.Main'])
  .controller('EditCtrl', function ($scope, $rootScope, $state, $stateParams, MainService) {

    let moment = require('moment');

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

    $scope.customerId = $stateParams.id;

    // Get detail
    MainService.getCustomerTypes(db)
      .then(function (rows) {
        $scope.types = rows;
        return MainService.getDetail(db, $scope.customerId)
      })
      .then(function (customer) {
        $scope.fullname = customer.fullname;
        $scope.birthdate = new Date(moment(customer.birthdate).format());
        $scope.address = customer.address;
        $scope.telephone = customer.telephone;
        $scope.email = customer.email;
        $scope.customerTypeId = customer.customer_type_id;

      });

    $scope.save = function () {

      let moment = require('moment');
      let customer = {};

      customer.id = $scope.customerId;
      customer.fullname = $scope.fullname;
      customer.birthdate = moment($scope.birthdate).format('YYYY-MM-DD');
      customer.address = $scope.address;
      customer.telephone = $scope.telephone;
      customer.email = $scope.email;
      customer.customer_type_id = $scope.customerTypeId;

      MainService.updateCustomer(db, customer)
      .then(function () {
        // success
        $state.go('main');
      }, function (err) {
        alert('Error: ' + JSON.stringify(err));
      })

    }


  });