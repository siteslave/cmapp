'use strict';

angular.module('app.services.Login', [])
  .factory('LoginService', function ($q) {

    return {
      doLogin(db, username, password) {
        let q = $q.defer();
        db('users')
        .select()
        //.where('username', username)
        //.where('password', passowrd)
        .where({
          username: username,
          password: password
        })
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