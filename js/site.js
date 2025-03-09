// Please see documentation at https://docs.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// Write your JavaScript code.

// 创建自定义标签

var TodoHtml = document.createElement('div');
TodoHtml.id = "JSTodo";
TodoHtml.innerHTML = `<br />
<div class="text-center">
	<h2 id="todoh2">Todo</h2>

	<style>
		.todo {
			list-style-type: none;
			list-style-image: none;
			list-style-position:outside;
		}

			.todo li {
				border: 1px solid transparent;
				background-image: linear-gradient(to right, purple, blue);
				padding: 14px;
				border-radius: 16px !important;
				margin: auto;
				margin-top: 10px;
				margin-bottom: 10px;
				width: 70%;
				white-space: nowrap;
			}

				.todo li * {
					background-color: rgba(0,0,0,0);
					width: 90%;
					margin: initial;
					text-align: left;
					border: 0px;
				}

				.todo li input {
					background-color: rgba(0,0,0,0);
					width: 90%;/*
					margin-left: 0;
					margin-right: auto;*/
					margin: initial;
					text-align: left;
					border: 0px;
				}

				.todo li span {
					background-color: rgba(0,0,0,0);
					width: 90%;/*
					margin-left: 0;
					margin-right: auto;*/
					margin: initial;
					text-align: left;
					border: 0px;
				}

		.svg-del {
			color: black;
		}

		.svg-del:hover {
			color: red;
		}

		@keyframes be-del {
            100% {opacity: 0;}
        }

		.be-del:hover {
			animation-name: be-del;
            animation-duration: 2s;
            animation-iteration-count: infinite;/*opacity*/
            animation-fill-mode: forwards;
		}
	</style>
	<input placeholder="Something todo" id="newTodo" style="/*border: 1px solid;
				border-color:#767676;
				padding: 2px;
				border-radius: 2px !important;*/" />
	<input onclick="AddTodo()" type="button" value="Add todo" />
	<ul class="todo" id="todo">
	</ul>
	已完成：
	<ul class="todo" id="todo1">
	</ul>
</div>
<div id="svg-del" style="display:none;">
	<svg class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" style="height: 16px; width: 16px;">
		<path d="M899.2 298.7H131c-13.8 0-25-11.2-25-25s11.2-25 25-25h768.1c13.8 0 25 11.2 25 25s-11.1 25-24.9 25z"></path>
		<path d="M681.7 291.6c-13.8 0-25-11.2-25-25v-48.2c0-20.9-17-37.9-37.9-37.9H411.4c-20.9 0-37.9 17-37.9 37.9v48.2c0 13.8-11.2 25-25 25s-25-11.2-25-25v-48.2c0-48.5 39.4-87.9 87.9-87.9h207.4c48.5 0 87.9 39.4 87.9 87.9v48.2c0 13.8-11.2 25-25 25zM719.7 918H310.5c-48.5 0-87.9-41.7-87.9-93V382.9c0-13.8 11.2-25 25-25s25 11.2 25 25v442.2c0 23.7 17 43 37.9 43h409.2c20.9 0 37.9-19.3 37.9-43V382.9c0-13.8 11.2-25 25-25s25 11.2 25 25v442.2c0 51.2-39.4 92.9-87.9 92.9z"></path>
		<path d="M438.2 772.6c-16.6 0-30-13.4-30-30v-286c0-16.6 13.4-30 30-30s30 13.4 30 30v286c0 16.5-13.4 30-30 30zM599.4 772.6c-16.6 0-30-13.4-30-30v-286c0-16.6 13.4-30 30-30s30 13.4 30 30v286c0 16.5-13.4 30-30 30z"></path>
	</svg>
</div>`;
//customElements.define('Todo', CustomElement);

// 使用自定义标签
//var element = document.createElement('Todo');
//document.body.appendChild(TodoHtml);

function addjsTodo() {
	document.getElementById("main").appendChild(TodoHtml);
}

var id, cnt, tot;
cnt = 0, tot = 0;
function AddTodo() {
	cnt++, tot++;
	var li = document.createElement("li");
	var cnnt = cnt;
	li.innerHTML = "<input type='checkbox' id='ck" + cnnt + "' onclick='todooc1(" + cnnt + ")' style='width: initial;' /><input id='str" + cnt + "' value=\"" + document.getElementById("newTodo").value.toString() + "\" />";
	li.id = cnt;
	// li.onclick = function () {
	// 	todooc1(cnnt);
	// };
	var del = document.createElement("span");
	del.classList = "svg-del";
	del.innerHTML = document.getElementById("svg-del").innerHTML;
	del.onclick = function () {
		if (del.parentElement.parentElement == document.getElementById("todo"))
			tot--;
		//del.parentElement.style = "animation-name: be-del;animation - duration: 2s;animation - iteration - count: infinite;/*opacity*/animation - fill - mode: forwards; ";
		//del.parentElement.remove();

		del.style.opacity = "0";
		del.style.display = "none";
		var opacity = 10;
		var timeId = setInterval(function () {
			opacity--;
			if (opacity <= 0) {
				//清理定时器
				del.parentElement.remove();
				clearInterval(timeId);
			}
			del.parentElement.style.opacity = opacity / 10;
		}, 25);
		/*function del1() {
			while (opacity > 0) {
				opacity--;
				if (opacity <= 0) {
					//清理定时器
					del.parentElement.remove();
					//clearInterval(timeId);
					return;
				}
				del.parentElement.style.opacity = opacity / 10;
			}
			del.parentElement.remove();
		}
		del1();*/
		/*del.parentElement.animate({
			//将原来的位置向上移动180 //
			"opacity": 0
			//1500动画的速度
		}, 500, function () {
			//时间到了自动删除
			del.parentElement.remove();
		});*/
		document.getElementById("todoh2").innerText = "Todo (" + tot.toString() + ")";
	}
	li.appendChild(del);
	document.getElementById("todo").append(li);
	// document.getElementById("str" + cnt).value = document.getElementById("newTodo").value.toString();
	// Model.todos.Add(new BlazorSample.TodoItem { Title =  })
	document.getElementById("todoh2").innerText = "Todo (" + tot.toString() + ")";
}
function todooc1(event) {
	tot--;
	var li = document.getElementById(event);
	document.getElementById(event).remove();
	document.getElementById("todo1").append(li);
	document.getElementById("ck" + event).onclick = function () {
		todooc2(event);
	};
	document.getElementById("todoh2").innerText = "Todo (" + tot.toString() + ")";
}
function todooc2(event) {
	tot++;
	var li = document.getElementById(event);
	document.getElementById(event).remove();
	document.getElementById("todo").append(li);
	document.getElementById("ck" + event).onclick = function () {
		todooc1(event);
	};
	document.getElementById("todoh2").innerText = "Todo (" + tot.toString() + ")";
}
// setTimeout(() => {
// },100);
// 监听所有checkbox的change事件
/*$('ul.todo li input[type="checkbox"]').on('change', function () {
	if (!this.checked) { // 如果checkbox未被选中
		tot++; // 执行cnt--操作
	}
	else {
		tot--;
	}
});*/

// 编码字符串为base64
function encodeBase64(str) {
	return btoa(str);
}

// 解码base64编码的字符串
function decodeBase64(b64Str) {
	return atob(b64Str);
}

function getCurrentDateInSeconds() {
	// 获取当前时间的毫秒数
	const currentMilliseconds = Date.now();

	// 将毫秒数转换为秒数
	const currentSeconds = Math.floor(currentMilliseconds / 1000);

	return currentSeconds;
}
function convertToSeconds(year, month, day, hour) {
	// 创建表示目标时间的Date对象
	// 注意：JavaScript中月份是从0开始的，所以6月应该是5
	const targetDate = new Date(Date.UTC(year, month - 1, day, hour, 0, 0, 0));

	// 获取毫秒数
	const milliseconds = targetDate.getTime();

	// 将毫秒数转换为秒数
	const seconds = Math.floor(milliseconds / 1000);

	return seconds;
}
// 调用函数并传入2024年6月1日8:00的日期信息
const secondsFromEpochToJune1st2024 = convertToSeconds(2023, 11, 30, 8);
function getStarttoNow() {
	// 调用函数并打印结果
	const secondsSinceEpoch = getCurrentDateInSeconds();
	return secondsSinceEpoch - secondsFromEpochToJune1st2024;
}

function floor(num) {
	return num | 0;
}

var ston = getStarttoNow();
var s = ston % 60;
var m = floor(ston / 60) % 60;
var h = floor(ston / 3600) % 24 + 1;
var d = floor(ston / 86400);
function addlston() {
	let lastSecond = -1;
	let startTime = null;

	function updateTime() {
		const now = performance.now();
		if (!startTime) {
			startTime = now;
		}

		const elapsedSeconds = Math.floor((now - startTime) / 1000);
		const currentSecond = elapsedSeconds % 60; // 取当前分钟的秒数

		if (currentSecond !== lastSecond) {
			lastSecond = currentSecond;
			//console.log(`当前秒数: ${currentSecond}`);
			s++;
			if (s >= 60) {
				s = 0;
				m++;
			}
			if (m >= 60) {
				m = 0;
				h++;
			}
			if (h >= 24) {
				h = 0;
				d++;
			}
			document.getElementById("ston-time").innerText = d.toString() + " day " + h.toString() + " h " + m.toString() + " m " + s.toString() + " s";
		}

		requestAnimationFrame(updateTime);
	}

	//setInterval(() => {
	//	s++;
	//	if (s >= 60) {
	//		s = 0;
	//		m++;
	//	}
	//	if (m >= 60) {
	//		m = 0;
	//		h++;
	//	}
	//	if (h >= 24) {
	//		h = 0;
	//		d++;
	//	}
	//	document.getElementById("ston-time").innerText = d.toString() + " day " + h.toString() + " h " + m.toString() + " m " + s.toString() + " s";
	//}, 1000);
	document.addEventListener('visibilitychange', function () {
		if (document.visibilityState === 'visible') {
			// 页面现在变得可见了
			ston = getStarttoNow();
			s = ston % 60 - 1;
			m = floor(ston / 60) % 60;
			h = floor(ston / 3600) % 24 + 1;
			d = floor(ston / 86400);
			document.getElementById("ston-time").innerText = d.toString() + " day " + h.toString() + " h " + m.toString() + " m " + s.toString() + " s";
			// 你可以在这里执行其他需要在页面变得可见时执行的代码
		} else if (document.visibilityState === 'hidden') {
			// 页面现在变得不可见了
			// 你可以在这里执行其他需要在页面变得不可见时执行的代码，如果需要的话
		}
	});
	// 开始监听秒数变化
	requestAnimationFrame(updateTime);
}
//console.log(secondsSinceEpoch - secondsFromEpochToJune1st2024);

function setCookie(cname, cvalue, exdays) {
	var d = new Date();
	d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
	var expires = "expires=" + d.toGMTString();
	document.cookie = cname + "=" + cvalue + "; " + expires;
}

function getCookie(cname) {
	var name = cname + "=";
	var ca = document.cookie.split(';');
	for (var i = 0; i < ca.length; i++) {
		var c = ca[i].trim();
		if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
	}
	return "";
}

function checkCookie(name,val) {
	var username = getCookie(name);
	if (username != "") {
		return;
	}
	else {
		setCookie(name, val, 365);
	}
}