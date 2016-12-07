angular.module('CardvisitApp')
	.controller('editCardController', function (Card, Notify, $state) {
		var vm = this;
		vm.cardForm = {};
		var params = $state.params;
		var State = $state;

		function getDetail() {
			Card.show(params.card_id).success(function (response) {
				vm.cardForm = response[0];
			}).error(function (error) {
				Notify.error(error.message);
			});
		}
		getDetail();

		function updateCard($state) {
			Card.update(params.card_id, vm.cardForm)
				.success(function (response) {
					Notify.success(response.message);
					State.go('app.list');
				}).error(function (error) {
					Notify.error(error.message);
				});
		}
		vm.updateCard = updateCard;

		function cancel() {
			$state.go('app.list');
		}
		vm.cancel = cancel;
	});

