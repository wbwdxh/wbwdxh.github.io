#include<bits/stdc++.h>
using namespace std;

namespace replaceMarkdownLinks
{
#include<bits/stdc++.h>
	using namespace std;
	bool f = false;
	// �������滻Markdown�����е�URL
	string replaceMarkdownLinks(const string& input, bool& f)
	{
		f = false;
		// ������ʽ������ƥ��Markdown����
		regex mdLinkRegex(R"(\[([^\]\\]*(?:\\.[^\]\\]*)*)\]\(([^)]+)\.md\))");

		// ���ڴ洢�滻������ַ���
		string result = input;

		// ʹ��std::regex_replace�����滻
		sregex_iterator iter(result.begin(), result.end(), mdLinkRegex);
		sregex_iterator end;

		while (iter != end)
		{
			smatch match = *iter;
			string linkText = match[1].str(); // ����������ı�
			string url = match[2].str(); // �����URL
			// cout << linkText << ' ' << url << ' ' << url.substr(17) << '\n';

			// �����滻�ַ���
			string replacement = "[" + linkText + "](" + url.substr(17) + ".html)";

			// �滻ԭʼ�ַ����е�ƥ�䲿��
			result.replace(match.position(), match.length(), replacement);

			f = true;

			//�ж��Ƿ�'std::out_of_range'
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

		// ���ú��������滻
		string result = replaceMarkdownLinks(input, f);
		while (f)
			result = replaceMarkdownLinks(result, f);
		return result;
	}
}

int main()
{
	// ʾ�������ַ���������Markdown���Ӻ�ת���ַ�
	string input = R"(# Welcome

1. [ƽ����](/index.html?blog=ƽ����.md)
1. [����ͼ](/index.html?blog=����ͼ.md)
1. [��ͨ������](/index.html?blog=��ͨ������.md)
1. [README](/index.html?blog=README.md)
1. [About](/index.html?blog=about.md)
)";

	string result = replaceMarkdownLinks::run(input);

	// ������
	cout << "Result:\n" << result << endl;

	return 0;
}
