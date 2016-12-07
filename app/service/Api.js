angular
  .module('CardvisitApp')
  .factory('Api', function Api($q, $http, $rootScope, $window, $location, Config) {
    return {
      canceler: function () {
        $http.pendingRequests.forEach(function (request) {
          if (request.cancel) { request.cancel.resolve(); }
        });
      },
      get: function (query, queryparams) {
        var cancel = $q.defer();
        var request = {
          method: 'GET',
          url: Config.api.url + '/' + query,
          params: queryparams,
          timeout: cancel.promise,
          cancel: cancel
        };

        return $http(request);
      },
      post: function (query, data, queryparams) {
        var cancel = $q.defer();
        var request = {
          method: 'POST',
          url: Config.api.url + '/' + query,
          data: data,
          params: queryparams,
          timeout: cancel.promise,
          cancel: cancel
        };

        return $http(request);
      },
      put: function (query, data, queryparams) {
        var cancel = $q.defer();
        var request = {
          method: 'PUT',
          url: Config.api.url + '/' + query,
          data: data,
          params: queryparams,
          timeout: cancel.promise,
          cancel: cancel
        };

        return $http(request);
      },
      delete: function (query, data, queryparams) {
        var cancel = $q.defer();
        var request = {
          method: 'DELETE',
          url: Config.api.url + '/' + query,
          data: data,
          params: queryparams,
          timeout: cancel.promise,
          cancel: cancel
        };

        return $http(request);
      }
    };
  });

