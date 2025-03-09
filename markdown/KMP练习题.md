# KMP练习题
## [P3375 【模板】KMP](https://www.luogu.com.cn/problem/P3375)
## [P4391 [BOI2009] Radio Transmission 无线传输](https://www.luogu.com.cn/problem/P4391)
## [CF1200E Compress Words](https://www.luogu.com.cn/problem/CF1200E)
## [CF126B Password](https://www.luogu.com.cn/problem/CF126B)
## [P3435 [POI2006] OKR-Periods of Words](https://www.luogu.com.cn/problem/P3435)
## [P4824 [USACO15FEB] Censoring S](https://www.luogu.com.cn/problem/P4824)
## [P4591 [TJOI2018] 碱基序列](https://www.luogu.com.cn/problem/P4591)
## [P1470 [USACO2.3] 最长前缀 Longest Prefix](https://www.luogu.com.cn/problem/P1470)
```cpp
#include<bits/stdc++.h>
typedef int int32;
#define int long long
using namespace std;
const int N = 2e5 + 5;
int nxt[N], n, dp[N], cnt, tot;
string s, t[205], s1;
vector<int>a[N];
void getNext(string s)
{
	nxt[0] = -1;
	int i = 0, j = -1;
	while (i < s.size())
		if (j == -1 || s[i] == s[j])
			nxt[++i] = ++j;
		else
			j = nxt[j];
	return;
}
void KMP(string s, string t)
{
	getNext(t);
	int i = 0, j = 0;
	while (i < s.size())
	{
		if (j == t.size() - 1 && s[i] == t[j])
		{
			a[i].push_back(cnt);
			j = nxt[j];
		}
		if (j == -1 || s[i] == t[j])
			i++, j++;
		else
			j = nxt[j];
	}
	return;
}
signed main()
{
	ios::sync_with_stdio(0);
	cin.tie(0), cout.tie(0);
	while (cin >> t[++tot])
		if (t[tot] == ".")
		{
			tot--;
			break;
		}
	while (cin >> s1)
		s += s1;
	s = "#" + s;
	for (int i = 1; i <= tot; i++)
		cnt = i, KMP(s, t[i]);
	dp[0] = true;
	for (int i = 1; i < s.size(); i++)
		for (auto& j : a[i])
			dp[i] |= dp[i - t[j].size()];
	for (int i = s.size() - 1; i >= 0; i--)
		if (dp[i])
		{
			cout << i;
			return 0;
		}
	return 0;
}
```
## [HDU1238 Substrings](https://vjudge.net/problem/HDU-1238#author=GPT_zh)
```cpp
#include<bits/stdc++.h>
typedef int int32;
#define int long long
using namespace std;
const int N = 2e5 + 5;
int nxt[N], n, ans, t;
string s[105], s1[105];
void getNext(string s)
{
	nxt[0] = -1;
	int i = 0, j = -1;
	while (i < s.size())
		if (j == -1 || s[i] == s[j])
			nxt[++i] = ++j;
		else
			j = nxt[j];
	return;
}
int KMP(string s, string t)
{
	//getNext(t);
	int ans = 0;
	int i = 0, j = 0;
	while (i < s.size())
	{
		if (j == t.size() - 1 && s[i] == t[j])
		{
			return j + 1;
			j = nxt[j];
		}
		if (j == -1 || s[i] == t[j])
			i++, j++, ans = max(ans, j);
		else
			j = nxt[j];
	}
	return ans;
}
signed main()
{
	ios::sync_with_stdio(0);
	cin.tie(0), cout.tie(0);
	cin >> t;
	while (t--)
	{
		cin >> n;
		ans = 0;
		for (int i = 1; i <= n; i++)
		{
			cin >> s[i];
			s1[i] = s[i];
			reverse(s1[i].begin(), s1[i].end());
		}
		for (int i = 1; i <= n; i++)
		{
			for (int k = 1; k <= ::s[i].size(); k++)
			{
				string s = ::s[i].substr(0, k);
				getNext(s);
				bool f = true;
				int tmp = s.size();
				for (int j = 1; j <= n; j++)
				{
					int tmp1 = KMP(::s[j], s), tmp2 = KMP(s1[j], s);
					tmp = min(tmp, max(tmp1, tmp2));
					if (tmp1 != 0 || tmp2 != 0)
						;
					else
					{
						f = false;
						break;
					}
				}
				if (f)
					ans = max(tmp, ans);
			}
			for (int k = 0; k < ::s[i].size() - 1; k++)
			{
				string s = ::s[i].substr(k);
				getNext(s);
				bool f = true;
				int tmp = s.size();
				for (int j = 1; j <= n; j++)
				{
					int tmp1 = KMP(::s[j], s), tmp2 = KMP(s1[j], s);
					tmp = min(tmp, max(tmp1, tmp2));
					if (tmp1 != 0 || tmp2 != 0)
						;
					else
					{
						f = false;
						break;
					}
				}
				if (f)
					ans = max(tmp, ans);
			}
		}
		cout << ans << '\n';
	}
	return 0;
}
```
## [P10475 \[USACO03FALL\] Milking Grid（数据加强版）](https://www.luogu.com.cn/problem/P10475)
```cpp
#include<bits/stdc++.h>
typedef int int32;
#define int long long
using namespace std;
const int N = 1e4 + 5;
int nxt[N], n, m, ansn, ansm, ssize, tsize;
unsigned int hs[N], ht[N];
string s[N], t[N];
unsigned int hash(string s)
{
	unsigned int sum = 0;
	for (auto& x : s)
		sum = sum * 131ull + x;
	return sum;
}
void getNext(unsigned int* s)
{
	nxt[0] = -1;
	int i = 0, j = -1;
	while (i < ::tsize)
		if (j == -1 || s[i] == s[j])
			nxt[++i] = ++j;
		else
			j = nxt[j];
	return;
}
void KMP(unsigned int* s, unsigned int* t)
{
	getNext(t);
	int i = 0, j = 0;
	while (i < ::ssize)
	{
		if (j == tsize - 1 && s[i] == t[j])
		{
			cout << i - j + 1 << '\n';
			j = nxt[j];
		}
		if (j == -1 || s[i] == t[j])
			i++, j++;
		else
			j = nxt[j];
	}
	return;
}
signed main()
{
	ios::sync_with_stdio(0);
	cin.tie(0), cout.tie(0);
	cin >> n >> m;
	for (int i = 1; i <= n; i++)
	{
		cin >> s[i];
		for (int j = 0; j < s[i].size(); j++)
			t[j + 1].push_back(s[i][j]);
	}
	for (int i = 0; i < n; i++)
		hs[i] = ::hash(s[i + 1]);
	for (int i = 0; i < m; i++)
		ht[i] = ::hash(t[i + 1]);
	tsize = n;
	getNext(hs);
	ansn = n - nxt[n];
	tsize = m;
	getNext(ht);
	ansm = m - nxt[m];
	cout << ansn * ansm;
	return 0;
}
```