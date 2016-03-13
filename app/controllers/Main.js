'use strict';

angular.module('app.controllers.Main', ['app.services.Main'])
  .controller('MainCtrl', function ($scope, $window, $rootScope, $state, $mdDialog, MainService) {

    if (! $window.sessionStorage.getItem('username')) {
      $state.go('login');
    } else {

      $scope.excelExport = function () {
        let remote = require('electron').remote;
        let app = remote.app;

        let tmpPath = app.getPath('temp');

        console.log(tmpPath);

        let moment = require('moment');
        let exportFile = path.join(tmpPath, moment().format('x') + '.xlsx');

        let json2xls = require('json2xls');
        let open = require('open');

        let _customers = [];
        $scope.customers.forEach(function (v) {
          let obj = {};
          obj.fullname = v.fullname;
          obj.birthdate = moment(v.birthdate).format('YYYY-MM-DD');
          _customers.push(obj);
        });

        let xls = json2xls(_customers);

        fs.writeFileSync(exportFile, xls, 'binary');
        open(exportFile);

      };

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

      $scope.initialCustomer = function () {
        let limit = $scope.query.limit;
        let offset = ($scope.query.page - 1) * $scope.query.limit;

        $scope.getCustomers(limit, offset);
      };

      // initial customer
      $scope.initialCustomer();


      $scope.remove = function (customerId) {
        // confirm
        var confirm = $mdDialog.confirm()
          .title('Are you sure?')
          .textContent('คุณต้องการลบข้อมูลลูกค้าใช่หรือไม่?')
          .ariaLabel('confirm')
          .ok('ใช่, ฉันต้องการลบ')
          .cancel('ไม่ใช่');
        $mdDialog.show(confirm).then(function() {
          // ok
          MainService.removeCustomer(db, customerId)
            .then(function () {
              // success
              $scope.initialCustomer();

            }, function (err) {
              // error
              alert(JSON.stringify(err));
              console.log(err);
            })
        });
      };

      $scope.edit = function (customerId) {
        $state.go('edit', {id: customerId});
      }


    }


  });