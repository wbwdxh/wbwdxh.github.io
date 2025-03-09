/*
wbw-pop-up-window.js
author: wbw121124
作者中文名: 吴邦玮
联系方式: wbw121124@outlook.com https://github.com/wbw121124
version: 1.1.0
code: UTF-8
*/
/*
示例:
<script src="path/to/wbw-pop-up-window.js"></script>
<script>
	var hi=new wpuw();
	hi.init();
	var puw=hi.new("center","ad","你好，世界","center");
</script>
*/
class wpuw_data {
	constructor(id, pos, onclose) {
		this.id = id;
		this.pos = pos;
		this.onclose = onclose;
	}
	close() {
		document.getElementById(this.id).style.display = "none";
	}
	show() {
		document.getElementById(this.id).style.display = "block";
	}
	del() {
		document.getElementById(this.id).remove();
		this.onclose();
		~(this);
	}
	remove() {
		this.del();
	}
	style(s) {
		document.getElementById(this.id).style = "display:" + document.getElementById(this.id).style.display + ";" + s;
	}
	cpos(pos) {
		if (this.pos == "center") {
			console.info("wpuw:wpuw_data.pos()参数错误,pos为this.center不需要设置位置");
			return;
		}
		document.getElementById(this.id).classList.remove(".wpuw-" + this.pos);
		document.getElementById(this.id).classList.add(".wpuw-" + pos);
	}
	content(c) {
		document.getElementById(this.id).innerHTML = c;
	}
	getelement() {
		return document.getElementById(this.id);
	}
	change(x, y) {
		switch (x) {
			case "onclose":
				this.onclose = y;
				break;
			case "pos":
				this.cpos(y);
			case "content":
				this.content(y);
			default:
				console.warn("wpuw:wpuw_data.change()参数错误");
				break;
		}
	}
	element(name) {
		if (name == "background")
			return document.getElementById(this.id).firstChild;
		else if (name == "box")
			return document.getElementById(this.id).firstChild.firstChild;
		else if (name == "close")
			return document.getElementById(this.id).firstChild.firstChild.firstChild;
		else if (name == "content")
			return document.getElementById(this.id).firstChild.firstChild.lastChild;
		else
			console.warn("wpuw:wpuw_data.element()参数错误");
	}
}
class wpuw {//pop-up-window
	init() {
		//预处理，将所有需要用到的样式添加到页面中
		var style = document.createElement("style");
		style.innerHTML = `
		.wpuw-center-background {
			display: flex;
			justify-content: center;
			align-items: center;
			position: fixed;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			background-color: rgba(0, 0, 0, 0.5);
			z-index: 9999;
		}
		.wpuw-center-box {
			position: relative;
			background-color: rgba(255, 255, 255, 0.75);
			padding: 25px;
			border-radius: 10px;
			box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
			z-index: 99999;
			/*正中间*/
			/*transform: translate(-50%, -50%);
			left: 50%;
			top: 50%;*/
		}
		.wpuw-center-box-close {
			cursor: pointer;
			context: "x";
			position: absolute;
			top: 10px; right: 10px;
			/*z-index: 999999;*/
		}
		.wpuw-other-background {
			/*display: none;*//*不打扰客户*/
			position: fixed;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			/*background-color: rgba(0, 0, 0, 0.5);*/
			/*z-index: 9999;*/
		}
		.wpuw-other-box {
			position: absolute;
			background-color: rgba(255, 255, 255, 0.75);
			padding: 25px;
			border-radius: 10px;
			box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
			z-index: 99999;
			/*自定义位置（其他属性）*/
		}
		.wpuw-other-box-close {
			cursor: pointer;
			context: "x";
			position: absolute;
			top: 10px; right: 10px;
			/*z-index: 999999;*/
		}
		.wpuw-center-box-close:hover, .wpuw-other-box-close:hover {
			color: red;
		}
		.wpuw-center-box-close:hover svg, .wpuw-other-box-close:hover svg {
			color: red;
			stroke: red;
		}
		.wpuw-left-top {
			top: 0;
			left: 0;
		}
		.wpuw-right-top {
			top: 0;
			right: 0;
		}
		.wpuw-left-bottom {
			bottom: 0;
			left: 0;
		}
		.wpuw-right-bottom {
			bottom: 0;
			right: 0;
		}
		.wpuw-custom {
			/*在style中自定义*/
			z-index: 99999;
		}
		/*center会不准确，建议不使用*/
		/*
			也可以使用'transform: translate(-x, -y);left: x1;top: y1;'代替
		*/
		.wpuw-left-center {
			top: 50%;
			left: 0;
		}
		.wpuw-right-center {
			top: 50%;
			right: 0;
		}
		.wpuw-top-center {
			top: 0;
			left: 50%;
		}
		.wpuw-bottom-center {
			bottom: 0;
			left: 50%;
		}
		`
		document.body.append(style);
		//it is a × icon
		this.close_svg = `
		<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" stroke="black" class="bi bi-x" viewBox="0 0 16 16">
			<path d="M0 0 L16 16 M0 16 L16 0" stroke-width="1.5" />
		</svg>
		`
	}
	constructor(cnt_start = "wpuw-") {
		/*after the `new wpuw()`, you need `.init()`*/
		this.cnt_start = cnt_start;
	}
	wpuw(cnt_start = "wpuw-") {
		/*after the `new wpuw()`, you need `.init()`*/
		this.cnt_start = cnt_start;
	}
	cnt = 0;
	new(type, mod, content, pos, style = "", isclose = true, onclose = () => { }, class1 = "", fa = document.body, class_start = "wpuw-" + (type == "center" ? "center" : "other"), needbackground = true) {
		/*
		type: center, other
		mod: info(warn, error, success 点击关闭，如果需要让用户复制错误代码，请使用ad或者question), question(自定义按钮触发关闭), loading(需要触发关闭), ad, other
		content: 内容(可以使用html)
		pos: left-top, right-top, left-bottom, right-bottom, custom(type为other时需要设置，center时任意设置)
		style: 样式
		isclose: 是否显示关闭按钮
		onclose: 关闭时的回调函数
		class1: 自定义class
		fa: 父元素
		class_start: class前缀
		needbackground: 是否需要背景
		*/
		var close_style = `${(mod == "info" || mod == "loading" || mod == "question" ? "style='display:none;'" : (isclose || mod == "ad" ? "" : "style='display:none;'"))}`;
		var div = document.createElement("div");
		div.className = `${needbackground ? class_start + "-background" : ""} ${class1}`;
		div.innerHTML = `
			<div class="${class_start}-box" style="${style}">
				<div class="${class_start}-box-close" ${close_style}>${this.close_svg}</div>
				<div class="${class_start}-box-content">${content}</div>
			</div>
			`;
		if (type != "center") {
			switch (pos) {
				case "left-top":
					div.children[0].className += " wpuw-left-top";
					break;
				case "right-top":
					div.children[0].className += " wpuw-right-top";
					break;
				case "left-bottom":
					div.children[0].className += " wpuw-left-bottom";
					break;
				case "right-bottom":
					div.children[0].className += " wpuw-right-bottom";
					break;
				case "custom":
					break;
				default:
					//控制台警告
					console.warn("wpuw: 未知的pos参数");
					return null;
			}
		}
		div.id = this.cnt_start + this.cnt;
		this.cnt++;
		var data = new wpuw_data(div.id, pos, onclose);
		div.children[0].children[0].addEventListener("click", () => {
			data.remove();
		})
		if (mod == "info") {
			div.addEventListener("click", () => {
				data.remove();
			})
		}
		fa.append(div);
		return data;
	}
}
var wpuw_sider_use = new wpuw("wpus-sider-");
wpuw_sider_use.init();
class wpuw_sider {
	constructor(pos, style, margin = "5px") {
		this.close_svg = `
		<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" stroke="black" class="bi bi-x" viewBox="0 0 16 16">
			<path d="M0 0 L16 16 M0 16 L16 0" stroke-width="1.5" />
		</svg>
		`
		var style1 = document.createElement("style");
		style1.innerHTML = `
		.wpuw-sider-${pos}-box {
			position: relative;
			background-color: rgba(255, 255, 255, 0.75);
			padding: 25px;
			border-radius: 10px;
			box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
			/*z-index: 99999;*/
			margin: ${margin};
			/*自定义位置（其他属性）*/
		}
		.wpuw-sider-${pos}-box-close {
			cursor: pointer;
			context: "x";
			position: absolute;
			top: 10px; right: 10px;
			/*z-index: 999999;*/
		}
		.wpuw-sider-${pos}-box-close:hover {
			color: red;
		}
		.wpuw-sider-${pos}-box-close:hover svg {
			color: red;
			stroke: red;
		}
		.wpuw-queue-${pos} {
			position: fixed;
			top: 0;
			left: 0;
			/*width: 100%;
			height: 100%;*/
			display: flex;
			flex-direction: column;
			/*justify-content: center;
			align-items: center;*/
			/*z-index: -1;*/
		}
		.wpuw-queue-${pos}-item {
			position: relative;
			${style}
		}
		`
		document.body.append(style1);
		this.main = document.createElement("div");
		this.main.className = "wpuw-queue-" + pos;
		this.main.innerHTML = "<div style='display:none;'></div>";
		document.body.append(this.main);
		this.pos = pos;
	}
	push(mod, content, style = "", isclose = true, onclose = () => { }, class1 = "") {
		return wpuw_sider_use.new("other", mod, content, "custom", style, isclose, onclose, class1 + " wpuw-queue-" + this.pos + "-item", this.main, "wpuw-sider-" + this.pos, false);
	}
}