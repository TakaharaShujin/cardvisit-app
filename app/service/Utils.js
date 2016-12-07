angular.module('CardvisitApp')
	.service('Utils', function () {
		return {
			error: function ($error) {
				if (!$error) {
					return;
				}
				var title = $error.error_message || 'Bilinmeyen hata!';
				var message = ['<ul class="list-unstyled">'];
				if ($error.errors) {
					if (Object.keys($error.errors).length > 0) {
						for (var $input in $error.errors) {
							for (var i = 0; i < $error.errors[$input].length; i++) {
								message.push('<li><i class="fa fa-caret-right"></i> ' + $error.errors[$input][i] + '</li>');
							}
						}
					}
				}
				message.push('</ul>');
				message = message.join('');

				$Notification.error(message, title);
			}
		};
	});

