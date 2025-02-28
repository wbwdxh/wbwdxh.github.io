#include <iostream>
#include <regex>
#include <string>
#include<bits/stdc++.h>

int main()
{
	// 示例输入字符串，包含Markdown链接和转义字符
	std::string input = R"(This is a \[link\](http://example.com) and another \[escaped\]\(http://escaped.com) link.)";

	// 正则表达式，用于匹配Markdown链接，并处理转义字符
	// 注意：这里的正则表达式相对简单，假设链接文本和URL中不包含嵌套的方括号
	std::regex mdLinkRegex(R"(\[[^\]\\]*(?:\\.[^\]\\]*)*\]\(([^)]+)\))");

	// 用于存储替换结果的字符串
	std::string result = input;

	// 使用std::regex_replace进行替换
	// $1表示捕获的链接文本，$2表示捕获的URL
	// 注意：由于C++的正则表达式替换不支持直接使用\1、\2这样的语法，
	// 所以我们需要使用std::match_results和std::regex_iterator来手动进行替换
	std::sregex_iterator iter(input.begin(), input.end(), mdLinkRegex);
	std::sregex_iterator end;
	std::string::size_type pos = 0;

	while (iter != end)
	{
		std::smatch match = *iter;
		std::string linkText = match[1].str();
		std::string url = match[2].str();

		// 由于可能存在转义字符，这里简单处理一下，将转义字符还原（如果需要）
		// 或者根据实际需求进行进一步处理
		// 注意：这里的处理只是示例，实际情况可能需要更复杂的逻辑
		for (char& c : linkText)
		{
			if (c == '\\' && (iter->str()[*(match[1].first) + 1] == '[' || iter->str()[*(match[1].first) + 1] == '\\'))
			{
				c = iter->str()[*(match[1].first) + 1];
				auto tmp = std::next(match[1].first);
				memcpy(&(match[1].first), &tmp, sizeof tmp); // 调整匹配位置，跳过下一个字符
			}
		}

		// 构建替换字符串
		std::string replacement = "[" + linkText + "](" + url + ".html)";

		// 替换原始字符串中的匹配部分
		result.replace(match.position(), match.length(), replacement);

		// 更新迭代器的位置，因为字符串已经被修改
		iter = std::sregex_iterator(result.begin() + pos, result.end(), mdLinkRegex);
		auto newMatchPos = result.find(replacement, pos);
		if (newMatchPos != std::string::npos)
		{
			pos = newMatchPos + replacement.length();
		}
		else
		{
			// 如果没有找到新的匹配位置，则退出循环
			break;
		}

		++iter;
	}

	// 输出结果
	std::cout << "Result:\n" << result << std::endl;

	return 0;
}