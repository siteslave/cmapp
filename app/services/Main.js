'use strict';

angular.module('app.services.Main', [])
  .factory('MainService', function ($q) {

    return {
      getTotal() {

      },

      getList(db) {
        let q = $q.defer();
        // SELECT * FROM customers
        db('customers')
        .select()
        .then(function (rows) {
          // success
          q.resolve(rows)
        })
        .catch(function (err) {
          // error
          q.reject(err)
        });

        return q.promise;

      }
    }
  });