#include<bits/stdc++.h>
#include<windows.h>
typedef int int32;
#define int long long
using namespace std;
//将md文件夹下的文件复制到auto_compile文件夹下
namespace replaceMarkdownLinks
{
#include<bits/stdc++.h>
	using namespace std;
	bool f = false;
	// 函数：替换Markdown链接中的URL
	string replaceMarkdownLinks(const string& input, bool& f)
	{
		f = false;
		// 正则表达式，用于匹配Markdown链接
		regex mdLinkRegex(R"(\[([^\]\n\r]*?)\]\(/index\.html\?blog=([^()\n\r\ ]*?)\.md\))");

		// 用于存储替换结果的字符串
		string result = input;

		// 使用std::regex_replace进行替换
		sregex_iterator iter(result.begin(), result.end(), mdLinkRegex);
		sregex_iterator end;
		while (iter != end)
		{
			smatch match = *iter;
			string linkText = match[1].str(); // 捕获的链接文本
			string url = match[2].str(); // 捕获的URL
			// cout << url << '\n';
			// if (url.size() < 17)
			// {
			// 	++iter;
			// 	continue;
			// }
			// cout << linkText << ' ' << url << ' ' << url. << '\n';
			// cout << result.substr(match.position(), match.length()) << '\n';

			// 构建替换字符串
			string replacement = "[" + linkText + "](/auto_compile/" + url + ".html)";

			// 替换原始字符串中的匹配部分
			result.erase(match.position(), match.length());
			result.insert(match.position(), replacement);
			// result.replace(match.position(), match.length(), replacement);

			f = true;
			return result;
			//判断是否'std::out_of_range'
			if (iter->position() + iter->length() > result.size())
			{
				break;
			}

			++iter;
		}

		return result;
	}
	string run(string input)
	{
		f = true;
		// 调用函数进行替换
		string result = replaceMarkdownLinks(input, f);
		while (f)
			result = replaceMarkdownLinks(result, f);
		return result;
	}
}
//搜索所有md文件夹下的文件
vector<string> search_files(const string& dir)
{
	vector<string> files;
	//使用windows api搜索文件
	WIN32_FIND_DATAA findData;
	HANDLE hFind = FindFirstFileA((dir + "\\*").c_str(), &findData);
	if (hFind == INVALID_HANDLE_VALUE)
	{
		return files;
	}
	do
	{
		if (findData.dwFileAttributes & FILE_ATTRIBUTE_DIRECTORY)
		{
			if (strcmp(findData.cFileName, ".") != 0 && strcmp(findData.cFileName, "..") != 0)
			{
				auto sub_files = search_files(dir + "\\" + findData.cFileName);
				files.insert(files.end(), sub_files.begin(), sub_files.end());
			}
		}
		else
			files.push_back(dir + "\\" + findData.cFileName);
	}
	while (FindNextFileA(hFind, &findData));
	return files;
}
signed main()
{
	auto files = search_files("md");
	string s1;
	for (auto& file : files)
	{
		if (file.size() < 3 || file.substr(file.size() - 3, 3).compare(".md"))
			continue;
		s1 = s1 + "1. [" + file.substr(3) + "](/auto_compile/" + file.substr(3) + ")\n";
	}
	{
		ofstream fout("md/all_md_file.md", ios::out);
		fout << s1;
		files.push_back("md/all_md_file.md");
	}
	string run_string(R"(python -u "change.py")");
	system(run_string.c_str());
	for (auto& file : files)
	{
		if (file.size() < 3 || file.substr(file.size() - 3, 3).compare(".md"))
			continue;
		cout << file << '\n';
		ifstream fin(file, ios::in);
		ofstream fout("auto_compile/" + file.substr(3), ios::out);
		//读取文件内容
		string s;
		char c;
		while (fin.get(c))
			s += c;
		fout << R"(<!--插入内容 start-->
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
)";
		//替换内容
		s = replaceMarkdownLinks::run(s);
		fout << s;
		if (file == "md\\index.md")
			fout << string(s.back() != '\n' ? "\n" : "") +
			"1. [all md file](/auto_compile/all_md_file.md)\n";
		fin.close();
		fout.close();
		cout << file << " done\n";
	}
	return 0;
}