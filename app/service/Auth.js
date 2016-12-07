angular.module('CardvisitApp')
	.service('Auth', function (Api, Config, Storage) {
		return {
			signin: function (params) {
				return Api.post('user/login', params);
			},
			setsession: function (value) {
				Storage.name('user').set(value);
			},
			getsession: function (value) {
				return Storage.get('user');
			},
			isAuthorized: function () {
				return Storage.name('user').exists();
			}
		};
	});

