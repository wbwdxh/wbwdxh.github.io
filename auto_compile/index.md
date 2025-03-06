<!--插入内容 start-->
<link rel="shortcut icon" href="/favicon.ico" type="image/x-icon">
<script>
	document.body.parentElement.lang = "zh-cn";
</script>
<script src="/katex/katex.min.js"></script>
<script src="/katex/contrib/auto-render.min.js"></script>
<script src="/codecopy/clipboard.js"></script>
<script defer type="module">
	import { marked } from '../marked.js';
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
	showLoader();
	window.myloader = { show: showLoader, hide: fadeOutLoader };
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
		fadeOutLoader();
		window.myloader.hide();
	}
</script>

<div class="loader-overlay" id="loader" style="display: flex;opacity: 1;z-index: 100000000;">
		<div class="loader" style="
    display: flex;
    opacity: 1;
"></div>
		<div class="loader" style="
    position: fixed;
    opacity: 1;
    width: 9.5em;
    height: 9.5em;
    opacity: 1 !important;
    background: white;
    box-shadow: inset 0 0 0.75em rgba(0, 0, 0, 0.1);
"></div>
		<div style="
    position: fixed;
    opacity: 1;
    z-index:999999999;
">loading...</div>
	</div>
<!--插入内容 end-->
# Welcome

1. [莫队算法](/auto_compile/莫队算法.html)
1. [平衡树](/auto_compile/平衡树.html)
1. [二分图](/auto_compile/二分图.html)
1. [连通性问题](/auto_compile/连通性问题.html)
1. [README](/auto_compile/README.html)
1. [About](/auto_compile/about.html)
1. [all md file](/auto_compile/all_md_file.html)
