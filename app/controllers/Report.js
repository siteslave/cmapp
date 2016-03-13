'use strict';

angular.module('app.controllers.Report', ['app.services.Report'])
.controller('ReportCtrl', function ($scope, $state, $window, $rootScope, ReportService) {

  if (! $window.sessionStorage.getItem('username')) {
    $state.go('login');
  } else {

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

    $scope.chartConfig = {
      options: {
        chart: {
          type: 'column'
        }
      },
      xAxis: {
        categories: [],
        crosshair: true
      },
      series: [{
        name: 'คน',
        data: []
      }],
      title: {
        text: 'Hello'
      },

      loading: false
    };

    ReportService.getTotal(db)
      .then(function (rows) {

        rows.forEach(function (v) {
          $scope.chartConfig.xAxis.categories.push(v.name);
          $scope.chartConfig.series[0].data.push(v.total);
        });

      }, function (err) {
        console.log(err);
      })


  }

});