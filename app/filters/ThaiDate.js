'use strict';

angular.module('app.filters.ThaiDate', [])
  .filter('ThaiDate', function () {
    return function (_date) {
      let moment = require('moment');

      if (moment(_date).isValid()) {
        let mmdd = moment(_date).format('DD/MM');
        let yyyy = (moment(_date).get('year') + 543);

        let thaiDate = mmdd + '/' + yyyy;

        return thaiDate;
      } else {
        return '-';
      }

    }
  });