"use strict";

var connection = new signalR.HubConnectionBuilder().withUrl("/chatHub").build();

//Disable the send button until connection is established.
document.getElementById("sendButton").disabled = true;

var user;
var message;
connection.on("ReceiveMessage", function (ip, user, message, color) {
	var li = document.createElement("li");
	//li.style.display = "none";
	var ipv4 = "127.0.0.1";
	li.style.color = color;
	li.textContent = /*document.getElementById('publicIp').textContent +*/ ip + " <" + user + "> 说: " + message;
	//document.getElementById("messagesList").firstChild.before(li);

	//document.getElementById("messagesList").innerHTML = li + document.getElementById("messagesList").innerHTML;

	document.getElementById("messagesList").prepend(li);
	// We can assign user-supplied strings to an element's textContent because it
	// is not interpreted as markup. If you're assigning in any other way, you 
	// should be aware of possible script injection concerns.

	// 获取需要滚动的容器元素（如window对象表示当前窗口）
	//var container = document.body;
	
	//setTimeout(() => { container.scrollTo(0, container.scrollHeight); }, 100);

	//$('body,html').animate({
	//	scrollTop: scrollHeight
	//}, 600);
});

connection.start().then(function () {
	document.getElementById("sendButton").disabled = false;
}).catch(function (err) {
	return console.error(err.toString());
});

document.getElementById("sendButton").addEventListener("click", function (event) {
	user = document.getElementById("userInput").value;
	message = document.getElementById("messageInput").value;
	if (user == "" || message == "")
		return;
	connection.invoke("SendMessage", document.getElementById('publicIp').textContent, user, message, document.getElementById("colorInput").value).catch(function (err) {
		return console.error(err.toString());
	});
	document.getElementById("messageInput").value = "";
	document.getElementById("userinputdiv").innerHTML = '<input type="text" id="userInput" disabled readonly value="' + user + '"/>';
	event.preventDefault();
});