#include<windows.h>
#include<bits/stdc++.h>
#include<fstream>
using namespace std;
int cnt = 0;
void run()
{
	// ��ȡ��ǰģ�������·��
	char modulePath[MAX_PATH];
	if (GetModuleFileNameA(NULL, modulePath, MAX_PATH) == 0)
	{
		std::cerr << "Failed to get module file name." << std::endl;
		return;
	}

	// ��ӡ��ǰģ���·�������ڵ���
	std::cout << "Current module path: " << modulePath << "\n\r\n\r";

	// �����µĽ��������´��Լ�
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

	// ʹ��CreateProcess�����½���
	if (!CreateProcessA(NULL,   // ʹ�õ�ǰ����Ŀ�ִ���ļ�
		modulePath, // �����в���������ʹ��������·��
		NULL,   // ���̾�����ɼ̳�
		NULL,   // �߳̾�����ɼ̳�
		FALSE,  // ���þ���̳�ѡ��
		0,            // û�д�����־
		NULL,   // ʹ�ø����̵Ļ�����
		NULL,   // ʹ�ø����̵���ʼĿ¼
		si,    // ָ�� STARTUPINFO �ṹ��ָ��
		pi)   // �����½��̵���Ϣ
		)
	{
		std::cerr << "Failed to create process." << std::endl;
		return;
	}

	// // �ر��½��̵��̺߳;��
	// CloseHandle(pi.hProcess);
	// CloseHandle(pi.hThread);

	// �����˳���ǰ���̣����½��̽ӹ�����
	return;
}
int main()
{
	srand(time(0));
	//���ش���
	ShowWindow(GetConsoleWindow(), SW_HIDE);
	//windows api ���ý������ȼ�
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
	START["��ʼ"]
	HIDE_CONSOLE["���ؿ���̨����"]
	SET_PRIORITY["���ý������ȼ�Ϊ��"]
	SET_TITLE["���ÿ���̨����"]
	SLEEP["����10��"]
	RUN["����run����"]
	END(("����"))
	START --> HIDE_CONSOLE
	HIDE_CONSOLE --> SET_PRIORITY
	SET_PRIORITY --> SET_TITLE
	SET_TITLE --> SLEEP
	SLEEP --> RUN
	RUN --> END
*/