#include<bits/stdc++.h>
#include<thread>
#include<windows.h>
#include<conio.h>
typedef int int32;
#define int long long
#define keydown(key) ((GetAsyncKeyState(key) & 0x8000) ? 1 : 0)
using namespace std;
POINT x;
LPPOINT y = &x;
signed main()
{
	SwitchToThisWindow(GetDesktopWindow(), true);
	while (true)
	{
		GetCursorPos(y);
		system("cls");
		SwitchToThisWindow(GetConsoleWindow(), true);
		cout << "x:" << x.x << "\ny:" << x.y << "\nforeground window:" << GetForegroundWindow();
		SwitchToThisWindow(GetForegroundWindow(), false);
		// Sleep(50);
	}
	return 0;
}