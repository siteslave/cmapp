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

      },

      getCustomerTypes(db) {
        let q = $q.defer();
        db('customer_types')
        .select()
        .then(function (rows) {
          q.resolve(rows)
        })
        .catch(function (err) {
          q.reject(err)
        });

        return q.promise;
      },

      getDetail(db, customerId) {
        let q = $q.defer();
        db('customers')
          .select()
          .where('id', customerId)
          .limit(1)
          .then(function (rows) {
            q.resolve(rows[0])
          })
          .catch(function (err) {
            q.reject(err)
          });

        return q.promise;
      },

      saveCustomer(db, customer) {
        let q = $q.defer();
        db('customers')
          .insert({
            fullname: customer.fullname,
            birthdate: customer.birthdate,
            address: customer.address,
            telephone: customer.telephone,
            email: customer.email,
            customer_type_id: customer.customer_type_id
          })
          .then(function () {
            q.resolve()
          })
          .catch(function (err) {
            q.reject(err)
          });

        return q.promise;
      },

      updateCustomer(db, customer) {
        let q = $q.defer();
        db('customers')
          .update({
            fullname: customer.fullname,
            birthdate: customer.birthdate,
            address: customer.address,
            telephone: customer.telephone,
            email: customer.email,
            customer_type_id: customer.customer_type_id
          })
          .where('id', customer.id)
          .then(function () {
            q.resolve()
          })
          .catch(function (err) {
            q.reject(err)
          });

        return q.promise;
      },

      removeCustomer(db, customerId) {
        let q = $q.defer();
        db('customers')
        .where('id', customerId)
        .del()
        .then(function () {
          q.resolve()
        })
        .catch(function (err) {
          q.reject(err)
        });

        return q.promise;
      }
    }
  });