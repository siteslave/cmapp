'use strict';

angular.module('app.services.Report', [])
  .factory('ReportService', function ($q) {
    return {
      getTotal(db) {
        let q = $q.defer();
        let sql = `select t.name, count(*) as total
                  from customers as c
                  inner join customer_types as t on t.id=c.customer_type_id
                  group by t.name`;
        db.raw(sql, [])
        .then(function (rows) {
          q.resolve(rows[0])
        })
        .catch(function (err) {
          q.reject(err)
        });

        return q.promise;
      }
    }
  });