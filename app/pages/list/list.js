angular
  .module('CardvisitApp')
  .controller('listController', function (Card, Auth, Utils, $state, Notify) {
    var vm = this;

    function cardList(argument) {
      Card.index()
        .success(function (response) {
          vm.cardListData = response.data.filter(function (item) {
            return item.status === "active";
          });
        })
        .error(function () { Notify.error('Kart listesi alınamadı'); });
    }
    cardList();

    function cardDelete(card_id) {
      Notify.confirm(function (confİtem) {
        if (confİtem) {
          Card.delete(card_id)
            .success(function (response) {
              Notify.success(response.message);
              cardList();
            })
            .error(function (error) {
              Notify.success(error.message);
            });
        }
      }, function (error) {});

    }
    vm.cardDelete = cardDelete;

    function cardEdit(card_id) {
      $state.go('app.editCard', { card_id: card_id });
    }
    vm.cardEdit = cardEdit;
  });
