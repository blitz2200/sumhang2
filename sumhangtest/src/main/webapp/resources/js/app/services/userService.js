app.service('userService', [ '$http', function($http) {

	/*유저파일 업로드 시작*/
	this.addFile = function(sa, file) {
		var fd = new FormData();
		fd.append('file', file);
		$http({
			method : 'POST',
			url : sa + "addFile.ajax",
			data : fd,
			transformRequest : angular.identify,
			headers : {
				'Content-Type' : undefined
			}
		}).success(function() {
			alert("파일업로드 성공");
		}).error(function() {
			alert("파일업로드  실패")
		});
	}

	//유저추가
	this.addUser = function(sa, user) {
		$http({
			method : 'POST',
			url : sa + "addUser.ajax",
			data : user,
			headers : {
				'Content-Type' : 'application/json; charset=utf-8'
			},
		}).success(function() {
			alert("회원가입 성공")
		}).error(function() {
			alert("회원가입 실패")
		})
	}
	
} ]);