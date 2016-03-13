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

    MainService.getList(db)
    .then(function (rows) {
      console.log(rows)
    }, function (err) {
      console.log(err)
    })


  });