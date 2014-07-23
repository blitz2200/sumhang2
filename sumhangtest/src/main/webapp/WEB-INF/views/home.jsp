<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ page session="false" %>
<html>
<head>
	<title>Home</title>
	<link rel="stylesheet" href="http://maxcdn.bootstrapcdn.com/bootstrap/3.2.0/css/bootstrap.min.css" />
</head>
<body>
	<div class="container">
        <h1>User List</h1>
        <ul id="list" class="unstyled">
        	
        </ul>
    </div>
    <script src="http://code.jquery.com/jquery-1.11.0.min.js"></script>
    <script type="text/javascript">
	    $(document).ready(function () {
	    	alert("document ready");
	    	$.getJSON('http://192.168.0.24:8080/sumhangtest/userlist', function (json) {
	    		alert("getJSON got data");
                $.each(json, function (index, item) {
                    // 변수를 선언합니다.
                    alert("looping");
                    var output = '';
                    output += '<li>';
                    output += 'uid:' + item.uid;
                    output += ', name:' + item.name;
                    output += ', age:' + item.age;
                    output += ', gender:' + item.gender;
                    output += '</li>';
                    // 화면에 출력합니다.
                    $(output).appendTo('#list');
                });
	    	});
	    });
    </script>
</body>
</html>
