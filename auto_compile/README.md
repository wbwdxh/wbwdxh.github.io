
<script>
	document.body.parentElement.lang = "zh-cn";
	//在head添加string
	document.head.innerHTML += `
	<title>wbw121124's blog</title>
	<link rel="stylesheet" href="/vs2015.css">
	<link rel="stylesheet" href="/katex/katex.min.css">
	<style>
		@keyframes spin {
			0% {
				transform: rotate(0deg);
			opacity: 1;
			}
			100% {
				transform: rotate(360deg);
				opacity: 0.8;
			}
		}
		.loader-overlay {
			position: fixed;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			background: rgba(255, 255, 255, 0.8);
			display: flex;
			justify-content: center;
			align-items: center;
			z-index: 9999;
			transition: opacity 0.5s ease;
		}
		.loader {
			width: 10em;
			height: 10em;
			border-radius: 50%;
			background: conic-gradient(rgb(10, 182, 212) 0% 20%, rgba(0, 0, 0, 0) 20%);
			animation: spin 1s linear infinite;
			box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
		}
		a.navbar-brand {
			white-space: normal;
			text-align: center;
			word-break: break-all;
		}
		a {
			color: #0077cc;
		}
		.btn-primary {
			color: #fff;
			background-color: #1b6ec2;
			border-color: #1861ac;
		}
		.nav-pills .nav-link.active,
		.nav-pills .show>.nav-link {
			color: #fff;
			background-color: #1b6ec2;
			border-color: #1861ac;
		}
		.border-top {
			border-top: 1px solid #e5e5e5;
		}
		.border-bottom {
		border-bottom: 1px solid #e5e5e5;
		}
		.box-shadow {
			box-shadow: 0 .25rem .75rem rgba(0, 0, 0, .05);
		}
		button.accept-policy {
			font-size: 1rem;
			line-height: inherit;
		}
		.footer {
			position: absolute;
			bottom: 0;
			width: 100%;
			white-space: nowrap;
			line-height: 60px;
		}
		img {
			max-width: 100%;
		}
		/* for block of numbers */
		.hljs-ln-numbers {
			-webkit-touch-callout: none;
			-webkit-user-select: none;
			-khtml-user-select: none;
			-moz-user-select: none;
			-ms-user-select: none;
			user-select: none;
			text-align: center;
			color: #aaa;
			border-right: 1px solid #aaa;
			vertical-align: top;
			/*padding-right: 10px !important;*/
			padding-right: 0.5em !important;
			/* your custom style here */
			/*margin: auto;*/
		}
		/* for block of code */
		.hljs-ln-code {
			/*padding-left: 10px;*/
			padding-left: 0.5em !important;
		}
		.hljs-prt {
			background-color: #2b2b2b;
			border-radius: 1em;
			box-shadow: 0 10px 30px 0px rgb(0 0 0 / 40%);
		}
	/*codecopy*/
		.codecopy-btn {
			z-index: 1;
			position: absolute;
			transition: all 0.5s;
			top: 10px;
			right: 10px;
			width: 90px;
			height: 2em;
			margin: 0;
			border-radius: 5px;
			background-color: rgba(221, 221, 221, .1);
			color: #999;
			text-align: center;
			font-weight: 700;
			font-size: 14px;
			border: 1px solid #2f2f2f00;
		}
		.codecopy-btn:hover {
			background-color: rgba(221, 221, 221, .2);
			/*top: 9px;*/
		}
		.hljs.language-html::before,
		.hljs.language-xml::before {
				content: "HTML/XML"
		}
		.hljs.language-javascript::before {
			content: "JavaScript"
		}
		.hljs.language-c::before {
			content: "C"
		}
		.hljs.language-cpp::before {
			content: "C++"
		}
		.hljs.language-java::before {
			content: "Java"
		}
		.hljs.language-asp::before {
			content: "ASP"
		}
		.hljs.language-actionscript::before {
			content: "ActionScript/Flash/Flex"
		}
		.hljs.language-bash::before {
			content: "Bash"
		}
		.hljs.language-css::before {
			content: "CSS"
		}
		.hljs.language-asp::before {
			content: "ASP"
		}
		.hljs.language-cs::before,
		.hljs.language-csharp::before {
			content: "C#"
		}
		.hljs.language-d::before {
			content: "D"
		}
		.hljs.language-golang::before,
		.hljs.language-go::before {
			content: "Go"
		}
		.hljs.language-json::before {
			content: "JSON"
		}
		.hljs.language-lua::before {
			content: "Lua"
		}
		.hljs.language-less::before {
			content: "LESS"
		}
		.hljs.language-md::before,
		.hljs.language-markdown::before,
		.hljs.language-mkdown::before,
		.hljs.language-mkd::before {
			content: "Markdown"
		}
		.hljs.language-mm::before,
		.hljs.language-objc::before,
		.hljs.language-obj-c::before,
		.hljs.language-objective-c::before {
			content: "Objective-C"
		}
		.hljs.language-php::before {
			content: "PHP"
		}

		.hljs.language-perl::before,
		.hljs.language-pl::before,
		.hljs.language-pm::before {
			content: "Perl"
		}

		.hljs.language-python::before,
		.hljs.language-py::before,
		.hljs.language-gyp::before,
		.hljs.language-ipython::before {
			content: "Python"
		}
		.hljs.language-r::before {
		content: "R"
		}
		.hljs.language-ruby::before,
		.hljs.language-rb::before,
		.hljs.language-gemspec::before,
		.hljs.language-podspec::before,
		.hljs.language-thor::before,
		.hljs.language-irb::before {
			content: "Ruby"
		}
		.hljs.language-sql::before {
			content: "SQL"
		}
		.hljs.language-sh::before,
		.hljs.language-shell::before,
		.hljs.language-Session::before,
		.hljs.language-shellsession::before,
		.hljs.language-console::before {
			content: "Shell"
		}
		.hljs.language-swift::before {
			content: "Swift"
		}
		.hljs.language-vb::before {
			content: "VB/VBScript"
		}
		.hljs.language-yaml::before {
			content: "YAML"
		}
		.hljs {
			border-radius: 1em;
			position: relative;
			display: block;
			overflow-x: hidden;
			color: #999;
			padding-top: 30px !important;
			box-shadow: 0 10px 30px 0px rgb(0 0 0 / 40%)
		}
		.hljs::before {
			content: "";
			position: absolute;
			left: 15px;
			top: 10px;
			overflow: visible;
			width: 12px;
			height: 12px;
			border-radius: 16px;
			box-shadow: 20px 0 #fdbc40, 40px 0 #35cd4b;
			-webkit-box-shadow: 20px 0 #fdbc40, 40px 0 #35cd4b;
			background-color: #fc625d;
			white-space: nowrap;
			text-indent: 75px;
			font-size: 16px;
			line-height: 12px;
			font-weight: 700;
		}
		html {
			font-size: 14px;
		}
		@media (min-width: 768px) {
			html {
				font-size: 16px;
			}
		}
		.btn:focus,
		.btn:active:focus,
		.btn-link.nav-link:focus,
		.form-control:focus,
		.form-check-input:focus {
		box-shadow: 0 0 0 0.1rem white, 0 0 0 0.25rem #258cfb;
		}
		html {
			position: relative;
			min-height: 100%;
		}
		body {
			margin-bottom: 60px;
		}
		@media (max-height: 300px) {
			header {
				position: initial !important;
			}
		}
		main a,
		footer a,
		.a a {
			--background-primary: #1a1a1a;
			--text-bright: #fff;
			--bg-sub-accent-55: rgba(13, 185, 215, .55);
			/*text-shadow: -1px -1px 2px var(--background-primary), -1px 1px 2px var(--background-primary), 1px -1px 2px var(--background-primary), 1px 1px 2px var(--background-primary);
	-webkit-text-fill-color: var(--text-bright);*/
			background-position: 0 100%;
			background-repeat: repeat-x;
			background-size: 5px 5px;
			text-decoration: none;
			transition: all .35s ease;
			background-image: linear-gradient(to bottom, var(--bg-sub-accent-55) 0%, var(--bg-sub-accent-55) 100%);
		}
		main a:hover,
		footer a:hover,
		.a a:hover {
			color: white;
			background-size: 5px 50px;
		}
		pre code {
			tab-size: 4;
			/*新宋体*/
			font-family: "新宋体", "Courier New", Courier, monospace;
		}
		body {
			margin: 0 0 60px 0;
		}
		main {
			background: #fffa;
			margin: 2em 1em;
			border: 1px solid #0000;
			box-shadow: 0 5px 1em 0 rgba(0, 0, 0, .1);
			padding: 8px;
		}
		header ul li a {
			color: black;
			text-decoration: none;
		}
		header {
			box-shadow: 0 5px 1em 0 rgba(0, 0, 0, .1);
		}
		/*ul.fy.pagination {
			display: inline-block;
			padding: 0;
			margin: 0;
		}
		
		ul.fy.pagination li {display: inline;}
		
		ul.fy.pagination li a {
			color: black;
			float: left;
			padding: 8px 16px;
			text-decoration: none;
		}
		
		ul.fy.pagination li a.active {
			background-color: #79c0ff;
			color: white;
		}
		
		ul.fy.pagination li a:hover:not(.active) {background-color: #ddd;}
		
		#comments-1 nth-child(2) {
			display: none;
		}
		#comments-1 nth-child(1) {
			display: none;
		}*/
		body {
			counter-reset: section-h1 section-h2 section-h3 section-h4 section-h5 section-h6;
		}
		@media (min-height: 350px) {
			h1 {
				counter-increment: section-h1;
			}
			h1:hover::after {
				content: "h1:" counter(section-h1);
				color: lightgray;
				display: inline;
			}
			h2 {
				counter-increment: section-h2;
			}
			h2:hover::after {
				content: "h2:" counter(section-h2);
				color: lightgray;
				display: inline;
			}
			h3 {
				counter-increment: section-h3;
			}
			h3:hover::after {
				content: "h3:" counter(section-h3);
				color: lightgray;
				display: inline;
			}
			h4 {
				counter-increment: section-h4;
			}
			h4:hover::after {
				content: "h4:" counter(section-h4);
				color: lightgray;
				display: inline;
			}
			h5 {
				counter-increment: section-h5;
			}
			h5:hover::after {
				content: "h5:" counter(section-h5);
				color: lightgray;
				display: inline;
			}
			h6 {
				content: "h6:" counter(section-h6);
			}
			h6:hover::after {
				content: "h6:" counter(section-h6);
				color: lightgray;
				display: inline;
			}
		}
	</style>
	<style id="comments-style">
		#comments-1 {
			display: none;
		}
		#comments-2 {
			display: block;
		}
	</style>`;
</script>
<script src="/katex/katex.min.js"></script>
<script src="/katex/contrib/auto-render.min.js"></script>
<script defer type="module">
	import { marked } from '../marked.js';
	if (true)
	{
		renderMathInElement(document.body, {
			delimiters: [
				{ left: '$$', right: '$$', display: true },
				{ left: '$', right: '$', display: false },
			],
		});
		function fun() {
			// 获取所有的 <pre><code>...</code></pre> 元素
			var preElements = document.querySelectorAll('pre code');
			// 遍历这些元素
			preElements.forEach(function (codeElement) {
				// 创建复制按钮
				var button = document.createElement('button');
				button.textContent = '复制';
				button.classList.add('codecopy-btn'); // 添加类以便样式化
				// 将按钮添加到 code 元素的父元素（即 pre 元素）中
				var div = document.createElement('div');
				div.style = "width:100%;position: relative;";
				div.appendChild(button);
				codeElement.before(div);
				codeElement.parentElement.classList.add("hljs-prt");
				let x = codeElement;
				// 使用 Clipboard.js 初始化复制功能
				let clipboard = new ClipboardJS(button, {
					text: function (trigger) {
						// 返回要复制的文本
						return x.innerText.replace(/\n\n/g, "\n");
					}
				});
				clipboard.on('success', function (e) {
					console.log('复制成功！', e);
					// 可以在这里修改按钮的文本或样式来表示成功
					e.clearSelection(); // 清除选区
					e.trigger.textContent = '复制成功';
					setTimeout(() => {
						e.trigger.textContent = '复制';
					}, 500);
				});
				clipboard.on('error', function (e) {
					console.error('复制失败！', e);
					// 可以在这里处理错误
					e.trigger.textContent = '复制失败';
					setTimeout(() => {
						e.trigger.textContent = '复制';
					}, 500);
				});
			});
		}
		fun();
		window.myloader.hide();
	}
	// 初始加载检测
	document.addEventListener('DOMContentLoaded', () => {
		// 基础DOM加载完成
		fadeOutLoader();
		// 检测动态DOM更新
		const observer = new MutationObserver((mutations) => {
			if (document.querySelector('[data-loading]')) {
				showLoader();
			} else {
				fadeOutLoader();
			}
		});
		observer.observe(document.body, {
			childList: true,
			subtree: true,
			attributes: true
		});
	});
	function showLoader() {
		const loader = document.getElementById('loader');
		loader.style.display = 'flex';
		loader.style.opacity = '1';
	}
	function fadeOutLoader() {
		const loader = document.getElementById('loader');
		loader.style.opacity = '0';
		setTimeout(() => {
			loader.style.display = 'none';
		}, 500);
	}
	showLoader();
	window.myloader = { show: showLoader, hide: fadeOutLoader };
</script>

# Welcome to my GitHub Pages