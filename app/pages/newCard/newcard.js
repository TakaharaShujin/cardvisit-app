angular
  .module('CardvisitApp')
  .controller('newCardController', function (Card, Notify, $state) {
    var vm = this;
    vm.formdata = { "name": "Üsame", "surname": "AVCI", "phone": "5374919101", "email": "usameavci@gmail.com", "company_position": "Front-end Developer", "company": "Gaaraj A.Ş." };

    function storeCardvisit(formdata) {
      if (!formdata || !formdata.name || !formdata.surname || !formdata.phone || !formdata.email || !formdata.company_position) {
        Notify.warning("Lütfen bütün alanları doldurun.");
      } else {
        Card.store(formdata)
          .success(function (response) {
            Notify.success(response.message);
            $state.go('app.list');
          })
          .error(function (error) {
            Notify.error(error.message);
          });
      }
    }
    vm.storeCardvisit = storeCardvisit;

  });
