
// Fallback for desktop testings

var Camera = Camera || {
	PictureSourceType : {
		PHOTOLIBRARY : 0,
		CAMERA : 1,
		SAVEDPHOTOALBUM : 2
	},
	DestinationType : {
		DATA_URL : 0,
		FILE_URI : 1,
		NATIVE_URI : 2
	},
	EncodingType : {
		JPEG : 0,
		PNG : 1
	},
	MediaType : {
		PICTURE : 0,
		VIDEO : 1,
		ALLMEDIA : 2
	},
	Direction : {
		BACK : 0,
		FRONT : 1
	}
};

app.factory('Camera',function($q, $window, sumhangCordova){
			return {
				getPicture : function(onSuccess, onError, options) {
								sumhangCordova.ready().then(function(){
								$window.navigator.camera.getPicture(onSuccess,onError, options);
							    });
							  },
				cleanup :   function(onSuccess, onError) {
								sumhangCordova.ready().then(function() {
								$window.navigator.camera.cleanup(onSuccess, onError);
								});
						    },
				PictureSourceType : Camera.PictureSourceType,
				DestinationType : Camera.DestinationType,
				EncodingType : Camera.EncodingType,
				MediaType : Camera.MediaType,
				Direction : Camera.Direction
			};
		});