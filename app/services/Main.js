'use strict';

angular.module('app.services.Main', [])
  .factory('MainService', function ($q) {

    return {
      getTotal(db) {

        let q = $q.defer();
        // SELECT count(*) as total FROM customers
        db('customers')
        .count('* as total')
        .then(function (rows) {
          q.resolve(rows[0].total)
        })
        .catch(function (err) {
          q.reject(err)
        });

        return q.promise;
      },

      getList(db, limit, offset) {
        let q = $q.defer();
        // SELECT * FROM customers
        db('customers')
          .select()
          .limit(limit)
          .offset(offset)
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