#include<bits/stdc++.h>
#include<windows.h>
typedef int int32;
#define int long long
using namespace std;
//将md文件夹下的文件复制到auto_compile文件夹下，\
新并将文件内容开头添加hello，结尾添加world
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
		cout << file << '\n';
		ifstream fin(file, ios::in);
		ofstream fout("auto_compile/" + file.substr(3), ios::out);
		auto x = fin.rdbuf();
		fout << x;
		fin.close();
		fout.close();
		cout << file << " done\n";
	}
	return 0;
}