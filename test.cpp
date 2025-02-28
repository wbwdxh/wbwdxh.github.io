#include<bits/stdc++.h>
#include"super_int.hpp"
using namespace std;
int main()
{
	super_int::int256 x;
	string s;
	cin >> s;
	if (s[0] == '-')
	{
		for (int i = 1; i < s.size(); i++)
			x = x * 10 + (s[i] - '0');
		x = -x;
	}
	else
		for (int i = 0; i < s.size(); i++)
			x = x * 10 + (s[i] - '0');
	if (x[0] < 0)
	{
		cout << '-';
		x = -x;
	}
	if (is_zero(x))
		cout << '0';
	else
	{
		vector<int> v;
		while (!is_zero(x))
		{
			v.push_back((x % 10)[32]);
			x /= 10;
		}
		for (int i = v.size() - 1; i >= 0; i--)
			cout << v[i];
	}
	return 0;
}