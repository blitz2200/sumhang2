<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ page session="false" %>
<html>
<head>
	<title>Home</title>
</head>
<body>
	<h1>Hello world!</h1>
    <h2>${model.sMessage}</h2>
    <P>The time on the server is ${model.serverTime}.</P>
    <table border="1">
    	<tr>
            <th>uid</th>
            <th>name</th>
            <th>age</th>
            <th>gender</th>
        </tr>
        <c:forEach var="m" items="${model.rs}">
        	<tr>
                <td><c:out value="${m.uid}"/></td>
                <td><c:out value="${m.name}"/></td>
                <td><c:out value="${m.age}"/></td>
                <td><c:out value="${m.gender}"/></td>
            </tr>
        </c:forEach>
    </table>
    ${rs}
</body>
</html>
