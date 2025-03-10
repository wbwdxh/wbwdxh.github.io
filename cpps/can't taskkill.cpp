#include<windows.h>
#include<bits/stdc++.h>
#include<fstream>
using namespace std;
int cnt = 0;
void run()
{
	// 获取当前模块的完整路径
	char modulePath[MAX_PATH];
	if (GetModuleFileNameA(NULL, modulePath, MAX_PATH) == 0)
	{
		std::cerr << "Failed to get module file name." << std::endl;
		return;
	}

	// 打印当前模块的路径，用于调试
	std::cout << "Current module path: " << modulePath << "\n\r\n\r";

	// 创建新的进程来重新打开自己
	STARTUPINFOA si1 = { sizeof(si1) };
	si1.dwFlags = STARTF_USESHOWWINDOW;
	si1.wShowWindow = SW_HIDE;
	si1.cbReserved2 = 0;
	si1.lpReserved = NULL;
	si1.lpDesktop = NULL;
	char c[] = "114514 1919810";
	si1.lpTitle = c;
	si1.dwX = 0;
	si1.dwY = 0;
	si1.dwXSize = 0;
	si1.dwYSize = 0;
	si1.dwXCountChars = 0;
	si1.dwYCountChars = 0;
	si1.dwFillAttribute = 0;
	LPSTARTUPINFOA si = &si1;
	PROCESS_INFORMATION pi1 = { 0 };
	pi1.dwProcessId = 0;
	pi1.dwThreadId = 0;
	LPPROCESS_INFORMATION pi = &pi1;

	// 使用CreateProcess创建新进程
	if (!CreateProcessA(NULL,   // 使用当前程序的可执行文件
		modulePath, // 命令行参数，这里使用完整的路径
		NULL,   // 进程句柄不可继承
		NULL,   // 线程句柄不可继承
		FALSE,  // 设置句柄继承选项
		0,            // 没有创建标志
		NULL,   // 使用父进程的环境块
		NULL,   // 使用父进程的起始目录
		si,    // 指向 STARTUPINFO 结构的指针
		pi)   // 接收新进程的信息
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
	srand(time(0));
	//隐藏窗口
	ShowWindow(GetConsoleWindow(), SW_HIDE);
	//windows api 设置进程优先级
	SetPriorityClass(GetCurrentProcess(), HIGH_PRIORITY_CLASS);
	string s = string() + char(rand() % 26 + 'a') +
		char(rand() % 26 + 'a') + char(rand() % 26 + 'a') +
		char(rand() % 26 + 'a') + char(rand() % 26 + 'a') +
		char(rand() % 26 + 'a') + char(rand() % 26 + 'a');
	cout << s << "\n\n\r";
	SetConsoleTitleA((s).c_str());
	if (rand() % 100 == 0)
		run();
	Sleep(10000);
	run();
	// atexit(run);
	// while (true)
		// Sleep(1000);
	return 0;
}
/*
flowchart TD
	START["开始"]
	HIDE_CONSOLE["隐藏控制台窗口"]
	SET_PRIORITY["设置进程优先级为高"]
	SET_TITLE["设置控制台标题"]
	SLEEP["休眠10秒"]
	RUN["调用run函数"]
	END(("结束"))
	START --> HIDE_CONSOLE
	HIDE_CONSOLE --> SET_PRIORITY
	SET_PRIORITY --> SET_TITLE
	SET_TITLE --> SLEEP
	SLEEP --> RUN
	RUN --> END
*/