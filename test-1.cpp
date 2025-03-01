#include<bits/stdc++.h>
using namespace std;

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
		regex mdLinkRegex(R"(\[([^\]\\]*(?:\\.[^\]\\]*)*)\]\(([^)]+)\.md\))");

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
			// cout << linkText << ' ' << url << ' ' << url.substr(17) << '\n';

			// 构建替换字符串
			string replacement = "[" + linkText + "](" + url.substr(17) + ".html)";

			// 替换原始字符串中的匹配部分
			result.replace(match.position(), match.length(), replacement);

			f = true;

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

		// 调用函数进行替换
		string result = replaceMarkdownLinks(input, f);
		while (f)
			result = replaceMarkdownLinks(result, f);
		return result;
	}
}

int main()
{
	// 示例输入字符串，包含Markdown链接和转义字符
	string input = R"(# Welcome

1. [平衡树](/index.html?blog=平衡树.md)
1. [二分图](/index.html?blog=二分图.md)
1. [连通性问题](/index.html?blog=连通性问题.md)
1. [README](/index.html?blog=README.md)
1. [About](/index.html?blog=about.md)
)";

	string result = replaceMarkdownLinks::run(input);

	// 输出结果
	cout << "Result:\n" << result << endl;

	return 0;
}
