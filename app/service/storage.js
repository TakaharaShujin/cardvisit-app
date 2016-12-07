angular
  .module('CardvisitApp')
  .service('Storage', function(localStorageService) {
    return {
      _name: "",
      name: function(name) {
        this._name = name;
        return this;
      },
      exists: function() {
        var data = localStorageService.get(this._name);
        if (data && data !== null && data !== undefined) {
          return true;
        }
        return false;
      },
      get: function() {
        return localStorageService.get(this._name);
      },
      set: function(data) {
        localStorageService.set(this._name, data);
      },
      remove: function() {
        localStorageService.remove(this._name);
      }
    };
  });
