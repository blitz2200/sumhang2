 
/* 비밀번호유효성체크*/ 
 
/*var passwordDirective=angular.module('sumhangApp.directives', []);*/

/*app.directive('pwCheck', [function () {
    return {
        require: 'ngModel',
        link: function (scope, elem, attrs, ctrl) {
            var firstPassword = '#' + attrs.pwCheck;
            elem.add(firstPassword).on('keyup', function () {
                scope.$apply(function () {
                    // console.info(elem.val() === $(firstPassword).val());
                    ctrl.$setValidity('pwmatch', elem.val() === $(firstPassword).val());
                });
            });
        }
    }*/
 
 app .directive('pwCheck', function() {
			return {
 	            require: 'ngModel',
 	            link	: function (scope, elem, attrs, ctrl) {
 	            	var firstPassword = '#' + attrs.pwCheck;	
                 $(elem).add(firstPassword).on('keyup', function () {
 	                    scope.$apply(function () {
 	                    	var v = elem.val()===$(firstPassword).val();
 	                    	ctrl.$setValidity('pwcheck', v);
 	                    });
                 });
 	            }
			}
 		
 });
          