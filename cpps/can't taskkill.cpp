#include<windows.h>
#include<bits/stdc++.h>
#include<fstream>
using namespace std;
int cnt = 0;
void run()
{
	// 获取当前模块的完整路径
	wchar_t modulePath[MAX_PATH];
	if (GetModuleFileNameW(NULL, modulePath, MAX_PATH) == 0)
	{
		std::cerr << "Failed to get module file name." << std::endl;
		return;
	}

	// 打印当前模块的路径，用于调试
	std::cout << "Current module path: " << modulePath << std::endl;

	// 创建新的进程来重新打开自己
	STARTUPINFO si = { sizeof(si) };
	PROCESS_INFORMATION pi;
	ZeroMemory(&pi, sizeof(pi));

	// 使用CreateProcess创建新进程
	if (!CreateProcessW(NULL,   // 使用当前程序的可执行文件
		modulePath, // 命令行参数，这里使用完整的路径
		NULL,   // 进程句柄不可继承
		NULL,   // 线程句柄不可继承
		FALSE,  // 设置句柄继承选项
		0,            // 没有创建标志
		NULL,   // 使用父进程的环境块
		NULL,   // 使用父进程的起始目录
		&si,    // 指向 STARTUPINFO 结构的指针
		&pi)   // 接收新进程的信息
		)
	{
		std::cerr << "Failed to create process." << std::endl;
		return;
	}

	// // 关闭新进程的线程和句柄
	// CloseHandle(pi.hProcess);
	// CloseHandle(pi.hThread);

	// 正常退出当前进程，让新进程接管任务
	return;
}
int main()
{
	//隐藏窗口
	ShowWindow(GetConsoleWindow(), SW_HIDE);
	//windows api 设置进程优先级
	SetPriorityClass(GetCurrentProcess(), HIGH_PRIORITY_CLASS);
	SetConsoleTitleA((string() + char(rand() % 26 + 'a') +
		char(rand() % 26 + 'a') + char(rand() % 26 + 'a') +
		char(rand() % 26 + 'a') + char(rand() % 26 + 'a') +
		char(rand() % 26 + 'a') + char(rand() % 26 + 'a')).c_str());
	Sleep(10000);
	run();
	// atexit(run);
	// while (true)
		// Sleep(1000);
	return 0;
}