

app.factory('pushNotification', function (sumhangCordova) {
    return {
      registerPush: function (fn){
    	  sumhangCordova.ready().then(function () {
          var pushNotification = window.plugins.pushNotification,
              successHandler = function (result) {
                  console.log('result = ' + result);
              },
              errorHandler = function (error) {
                  console.log('error = ' + error);
              },
              tokenHandler = function (result) {
                  return fn({
                    'type': 'registration',
                    'id': result,
                    'device': 'ios'
                  });
                };
          if ( device.platform == 'android' || device.platform == 'Android') {
              pushNotification.register(successHandler, errorHandler, {
                            'senderID': '660840806634',
                            			 
                            'ecb': 'onNotificationGCM'
                          });
          } else {
              pushNotification.register(
                  tokenHandler,
                  errorHandler,
                  {
                      "badge":"true",
                      "sound":"true",
                      "alert":"true",
                      "ecb":"onNotificationAPN"
                  });
          }
        }
      )}
    };
  });
