angular
  .module('CardvisitApp')
  .service('Notify', function (sweet) {
    return {
      success: function ($message, $title, $timer) {
        var title = $title ? $title : 'Tebrikler!';
        var timer = $timer ? $timer : 3000;
        sweet.show({
          type: "success",
          title: title,
          text: $message,
          timer: timer,
          showConfirmButton: false
        });
      },
      error: function ($message, $title, $timer) {
        var title = $title ? $title : 'Üzgünüz!';
        var timer = $timer ? $timer : 3000;

        sweet.show({
          type: "error",
          title: title,
          text: $message,
          timer: timer,
          showConfirmButton: false
        });
      },
      info: function ($message, $title, $timer) {
        var title = $title ? $title : 'Bilgi!';
        var timer = $timer ? $timer : 3000;

        sweet.show({
          type: "info",
          title: title,
          text: $message,
          timer: timer,
          showConfirmButton: false
        });
      },
      warning: function ($message, $title, $timer) {
        var title = $title ? $title : 'Dikkat!';
        var timer = $timer ? $timer : 3000;
        sweet.show({
          type: "warning",
          title: title,
          text: $message,
          timer: timer,
          showConfirmButton: false
        });
      },
      confirm: function ($success, $error, $params) {
        var params = {
          title: "Emin misiniz?",
          text: "Bu kayıt silinecek!",
          type: "warning",
          showCancelButton: true,
          confirmButtonColor: "#DD6B55",
          confirmButtonText: "Evet, Devam et!",
          cancelButtonText: 'Hayır, Devam etme!',
          closeOnConfirm: false,
          closeOnCancel: false
        };
        params = angular.extend(params, $params);
        sweet.show(params, function (isConfirm) {
          if (isConfirm) {
            if (typeof $success == 'function') {
              $success(isConfirm);
              sweet.show({
                type: "success",
                title: 'Silindi!',
                text: 'Seçmiş olduğunuz kartvizit Silindi.',
                timer: 2000,
                showConfirmButton: false
              });
            }
          } else {
            if (typeof $error == 'function') {
              $error(isConfirm);
              sweet.show({
                type: "error",
                title: 'İptal!',
                text: 'İşlem iptal edildi.',
                timer: 2000,
                showConfirmButton: false
              });
            }
          }
        });
      }
    };
  });

