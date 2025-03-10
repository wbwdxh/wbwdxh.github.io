#include <windows.h>
#include <iostream>
void run()
{
	std::cout << "exit" << std::endl;
	return;
}
int main()
{
	atexit(run);
	while (true)
		Sleep(1000);
	return 0;
}