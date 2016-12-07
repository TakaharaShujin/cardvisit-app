angular.module('CardvisitApp').service('Card', function (Api) {
	return {
		index: function () {
			return Api.get('card');
		},
		store: function (params) {
			return Api.post('card', params);
		},
		show: function (card_id) {
			return Api.get('card/' + card_id);
		},
		update: function (card_id, params) {
			return Api.put('card/' + card_id, params);
		},
		delete: function (card_id) {
			return Api.delete('card/' + card_id);
		}
	};
});

