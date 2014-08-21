app.service('userService', [ '$http', function($http) {



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