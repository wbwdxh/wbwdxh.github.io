//super int
#ifndef super_int_h
#define super_int_h 1
namespace super_int
{
#include<bits/stdc++.h>
	using namespace std;
	typedef long long int256 __attribute__((__vector_size__(32), __may_alias__));
	typedef long long uint256 __attribute__((__vector_size__(32), __may_alias__));
	typedef long long int512 __attribute__((__vector_size__(64), __may_alias__));
	typedef long long uint512 __attribute__((__vector_size__(64), __may_alias__));
}
// //使用istream输入
// istream& operator>>(istream& in, super_int::int256& x)
// {
// 	string s;
// 	in >> s;
// 	if (s[0] == '-')
// 	{
// 		for (int i = 1; i < s.size(); i++)
// 			x = x * 10 + s[i] - '0';
// 		x = -x;
// 	}
// 	else
// 		for (int i = 0; i < s.size(); i++)
// 			x = x * 10 + s[i] - '0';
// 	return in;
// }
// istream& operator>>(istream& in, super_int::uint256& x)
// {
// 	string s;
// 	in >> s;
// 	for (int i = 0; i < s.size(); i++)
// 		x = x * 10 + s[i] - '0';
// 	return in;
// }
// istream& operator>>(istream& in, super_int::int512& x)
// {
// 	string s;
// 	in >> s;
// 	if (s[0] == '-')
// 	{
// 		for (int i = 1; i < s.size(); i++)
// 			x = x * 10 + s[i] - '0';
// 		x = -x;
// 	}
// 	else
// 		for (int i = 0; i < s.size(); i++)
// 			x = x * 10 + s[i] - '0';
// 	return in;
// }
// istream& operator>>(istream& in, super_int::uint512& x)
// {
// 	string s;
// 	in >> s;
// 	for (int i = 0; i < s.size(); i++)
// 		x = x * 10 + s[i] - '0';
// 	return in;
// }
// //使用basic_ostream<char>输出
bool is_zero(super_int::int256 x)
{
	for (int i = 0; i < 4; ++i)
	{
		if (x[i] != 0) return false;
	}
	return true;
}
// basic_ostream<char>& operator<<(basic_ostream<char>& out, super_int::int256 x)
// {
// 	if (x[0] < 0)
// 	{
// 		out << '-';
// 		x = -x;
// 	}
// 	if (is_zero(x))
// 		out << '0';
// 	else
// 	{
// 		vector<int> v;
// 		while (!is_zero(x))
// 		{
// 			v.push_back((x % 10)[32]);
// 			x /= 10;
// 		}
// 		for (int i = v.size() - 1; i >= 0; i--)
// 			out << v[i];
// 	}
// 	return out;
// }
#endif