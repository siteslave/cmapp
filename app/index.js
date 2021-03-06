'use strict';

let remote = require('electron').remote;
let app = remote.app;

let fs = require('fs');
let path = require('path');
let fse = require('fs-extra');

require('angular');
require('angular-ui-router');
require('angular-animate');
require('angular-aria');
require('angular-messages');
require('angular-material');
require('angular-material-data-table');


let Highcharts = require('highcharts');

require('./node_modules/highcharts-ng/dist/highcharts-ng.js');

angular.module('app', [
  'highcharts-ng',
  'ui.router',
  'ngMaterial',
  'app.controllers.Nav',
  'app.controllers.Toolbar',
  'app.controllers.Setting',
  'app.controllers.Main',
  'md.data.table',
  'app.filters.ThaiDate',
  'app.controllers.New',
  'app.controllers.Edit',
  'app.controllers.Report',
  'app.controllers.Login'
])
  .run(function ($rootScope) {

    let homePath = app.getPath('home');
    let configPath = path.join(homePath, 'cmapp');

    console.log(configPath);

    fse.ensureDirSync(configPath);

    let configFile = path.join(configPath, 'config.json');

    $rootScope.configFile = configFile;

    fs.access(configFile, function (err) {

      if (err) { // file not found

        let configData = {
          host: 'localhost',
          port: 3306,
          database: 'cmapp',
          user: 'root',
          password: ''
        };

        fse.writeJsonSync(configFile, configData);

      }

    })


  })
  .config(function ($stateProvider, $urlRouterProvider, $mdThemingProvider) {

    $mdThemingProvider.theme('default')
      .primaryPalette('indigo');

    $urlRouterProvider.otherwise('/login');

    $stateProvider
    .state('main', {
      url: '/',
      templateUrl: './app/templates/main.html',
      controller: 'MainCtrl'
    })
    .state('login', {
      url: '/login',
      templateUrl: './app/templates/login.html',
      controller: 'LoginCtrl'
    })
    .state('new', {
      url: '/new',
      templateUrl: './app/templates/new.html',
      controller: 'NewCtrl'
    })
    .state('edit', {
      url: '/edit/:id',
      templateUrl: './app/templates/edit.html',
      controller: 'EditCtrl'
    })
    .state('report', {
      url: '/report',
      templateUrl: './app/templates/report.html',
      controller: 'ReportCtrl'
    })
    .state('setting', {
      url: '/setting',
      templateUrl: './app/templates/setting.html',
      controller: 'SettingCtrl'
    })
  });