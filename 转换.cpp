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
			// cout << url << '\n';
			if (url.size() < 17)
			{
				++iter;
				continue;
			}
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
		//替换内容
		s = replaceMarkdownLinks::run(s);
		fout << s;
		fin.close();
		fout.close();
		cout << file << " done\n";
	}
	return 0;
}