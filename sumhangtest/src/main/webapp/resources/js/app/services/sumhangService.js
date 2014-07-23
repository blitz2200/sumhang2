//This handles retrieving data and is used by controllers. 3 options (server, factory, provider) with 
//each doing the same thing just structuring the functions/data differently.
app.service('sumhangService', function ($http) {
	
    this.insertMember = function (id, name, password, nick, birth, gender, photo, pushmsg, invitemsg) {
    	$http({
	        'url' : 'addMember.ajax',
	        'method' : 'POST',
	        'headers': {'Content-Type' : 'application/json'},
	        'data' : {'id':id,
	        	'name':name,
	        	'password':password,
	        	'nick':nick,
	        	'birth':birth,
	        	'gender':gender,
	        	'photo':photo,
	        	'push':pushmsg,
	        	'invite':invitemsg}
	    }).success(function (data) {
	    	alert(data.name);
            location.hash = '/login';
        }).error(function (data) {
             alert('fail');
        });
    };

});