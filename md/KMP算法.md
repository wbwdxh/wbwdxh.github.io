# KMP算法

KMP 算法是一个字符串算法，通常用于匹配字符串。

## KMP 算法的原理

如果我们暴力枚举下标 $i,j$，$i$ 是文本串的下标，$j$ 是模式串（你要在文本串中匹配的字符串）的下标，时间复杂度 $O(NM)$，其中 $N,M$ 分别为文本串和模式串的长度。

我们看一下匹配过程：（gif 动图请耐心观看）

![图片炸了](//tmpprj.hnhfzk.vip/KMP讲解.gif)

时间复杂度高吧，出题人随便就 hack 掉了。

|        |    1 |    2 |    3 |    4 |    5 |    6 |    7 |    8 |    9 |   10 |
| -----: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| 文本串 |    x |    y |    x |    y |    x |    y |    x |    y |    x |    w |
| 模式串 |    x |    y |    x |    y |    x |    y |    w |    y |      |      |

咦？我们会发现 `文本串.substr(3,6)==模式串.substr(1,4)==模式串.substr(3,6)=="xyxy"`，这样我们 $i=7,j=7$ 匹配失败时可以跳 $2$ 次（$j=3$），就可以达到正确性和时间复杂度平衡的效果。

我们维护 $nxt_i$ 表示 $s$ 和 $s$ 以 $i$ 结尾的最长公共前后缀的长度，这样我们在 $文本串_i,模式串_j$ 匹配失败时 $j$ 可以直接跳到 $nxt_j$。

### 维护 $nxt$ 数组

![图片炸了](//tmpprj.hnhfzk.vip/KMP2.gif)

若 $s_i=s_j$ 也就是 $模式串_i,模式串_j$ 匹配时，`nxt[++i]=++j`（其他同理写法也可以，最好固定一个写法），否则按文本串和模式串匹配失败来。

### 代码

```cpp
void getNext(string s)//初始化和文本串没关系
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
void KMP(string s, string t)//P3375的询问代码
{
	getNext(t);
	int i = 0, j = 0;
	while (i < s.size())
	{
		if (j == t.size() - 1 && s[i] == t[j])
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
```

### $nxt$ 数组的性质

1. `nxt[i]` 既表示以 $i$ 结尾的最长公共前后缀的长度，又表示 $i$ 失配时跳跃的位置；
2. `nxt[i]` 越大，匹配的速度越慢，但至少移动 $1$ 步；
3. 对于字符串 $s$，`nxt[]` 的最大下标 `s.size()`；

## KMP 算法应用

### [P3375 【模板】KMP](https://www.luogu.com.cn/problem/P3375)

### [P4391 [BOI2009] Radio Transmission 无线传输](https://www.luogu.com.cn/problem/P4391)

给你一个字符串 $s_1$，它是由某个字符串 $s_2$ 不断自我连接形成的（保证至少重复 $2$ 次）。但是字符串 $s_2$ 是不确定的，现在只想知道它的最短长度是多少。

不想说过程，直接说结论：`ans = n - nxt[n]`

### [CF1200E Compress Words](https://www.luogu.com.cn/problem/CF1200E)

```cpp
cin >> n;
for (int i = 1; i <= n; i++)
{
	cin >> s;
	if (ans.empty())
		ans = s;
	else
	{
		int len = min(s.size(), ans.size());
		string s1 = s.substr(0, len);
		string s2 = ans.substr(ans.size() - len, len);
		string s3 = s1 + "#" + s2;//中间必须拼上"#"，不然有可能最长公共前后缀重合。
		getNext(s3);
		ans += s.substr(nxt[s3.size()]);
	}
}
cout << ans;
```

### [CF126B Password](https://www.luogu.com.cn/problem/CF126B)

1. 目标子串 $t$ 一定是 $s$ 的公共前后缀；
2. 求出 $nxt$ 数组，并截取最长公共前后缀 $tmp$;
3. 在 $s[1, len-2]$ 范围内跑 KMP，若找到 $tmp$，则 $tmp$就是答案；
4. 若 `nxt[nxt[n]] != -1`，则 $s[0,nxt_{nxt_n}]$ 即为答案；

### [P3435 [POI2006] OKR-Periods of Words](https://www.luogu.com.cn/problem/P3435)

1. 根据画图推导，对于 $s$ 的每一个前缀 $t$，要找 $t$ 的最短公共前后缀；

```cpp
int find(int x)//最短公共前后缀
{
	if (nxt[x] <= 0)
		return x;
	return nxt[x] = find(nxt[x]);
}
signed main()
{
	ios::sync_with_stdio(0);
	cin.tie(0), cout.tie(0);
	cin >> n >> s;
	getNext(s);
	for (int i = 1; i <= n; i++)
		ans += i - find(i);
	cout << ans;
	return 0;
}
```

### [P4824 [USACO15FEB] Censoring S](https://www.luogu.com.cn/problem/P4824)

1. 删除 $t$ 串之后产生的新的 $t$ 串的起点一定在删除位置的左侧；
2. 后出现 $t$ 串先处理，考虑用栈维护；
3. 栈中存储的下标维护已经匹配的 $t$ 串的位数，`match[i]`；

```cpp
//两种写法：
//1
void KMP(string s, string t)
{
	getNext(t);
	int i = 0, j = 0;
	while (i < s.size())
	{
		/*if (j == t.size() - 1 && s[i] == t[j])
		{
			cout << i - j + 1 << '\n';
			j = nxt[j];
		}*/
		if (j == -1 || s[i] == t[j])
		{
			st.push_back({ s[i],j + 1 });
			i++, j++;
		}
		else
			j = nxt[j];
		if (j == t.size())
		{
			for (int i = 1; i <= t.size(); i++)
				st.pop_back();
			j = st.back().second;
		}
	}
	return;
}
//2
void KMP(string s, string t)
{
	getNext(t);
	int i = 0, j = 0;
	while (i < s.size())
	{
		if (j == t.size() - 1 && s[i] == t[j])
		{
			i++;
			for (int i = 1; i < t.size(); i++)
				st.pop_back();
			j = st.back().second;
			continue;
		}
		if (j == -1 || s[i] == t[j])
		{
			st.push_back({ s[i],j + 1 });
			i++, j++;
		}
		else
			j = nxt[j];
	}
	return;
}
signed main()
{
	ios::sync_with_stdio(0);
	cin.tie(0), cout.tie(0);
	cin >> s >> t;
	KMP(s, t);
	for (auto& [x, y] : st)
		cout << x;
	return 0;
}
```

### [P4591 [TJOI2018] 碱基序列](https://www.luogu.com.cn/problem/P4591)

截止 $2024$ 年 $7$ 月 $16$ 日，此题难度 $\color{#9d3dcf}省选/NOI−$。

1. 定义 $dp_{i,j}$ 表示前 $i$ 个氨基酸可能的碱基序列以 $s_j$ 结尾的可能的方案数；
2. 答案为：$\sum^{s.size()-1}_ {i=0}dp_{n,i}$；
3. 状态转移方程：`dp[i][j+t.size()-1]=dp[i-1][j-1]`（这里我写的是哈希的）；
4. 初始状态：`dp[0][i]=1`。

```cpp
void KMP(string s, string t)
{
	getNext(t);
	int i = 0, j = 0;
	while (i < s.size())
	{
		if (j == t.size() - 1 && s[i] == t[j])
		{
			dp[cnt][i] += dp[cnt - 1][i - j - 1];
			j = nxt[j];
			continue;
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
	cin >> n >> s;
	s = "#" + s;
	for (int i = 0; i < s.size(); i++)
		dp[0][i] = 1;
	for (int i = 1; i <= n; i++)
	{
		int x;
		cin >> x;
		cnt = i;
		while (x--)
		{
			cin >> t;
			KMP(s, t);
		}
	}
	for (int i = 0; i < s.size(); i++)
		ans += dp[n][i];
	cout << ans % mod;
	return 0;
}
```
