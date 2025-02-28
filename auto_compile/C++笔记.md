# [NOIP十三连测第十三套 ] --T1--加减乘除

![image-20241029202938971](./C++笔记.assets/image-20241029202938971.png)

![image-20241029203009069](./C++笔记.assets/image-20241029203009069.png)

可以发现操作以后数的相对位置不会变化。设 `work(x)` 表示 $x$ 经过所有操作以后的新值，可以二分查找。

```cpp
#include<bits/stdc++.h>
typedef int int32;
#define int long long
using namespace std;
const int N = 2e5 + 5;
int n, q, L, R, ans, a[N], opt[N], x[N], s[N], t[N];
int work(int x)
{
	for (int i = 1; i <= q; i++)
		if (opt[i] == 1)
			x = (x >= ::x[i] ? (x + s[i]) * t[i] : x);
		else
			x = (x <= ::x[i] ? trunc((x - s[i]) * 1.00 / t[i]) : x);
	return x;
}
int helpl()
{
	int l = 0, r = n + 1;
	while (l + 1 < r)
	{
		int mid = (l + r) >> 1;
		if (work(a[mid]) >= L)
			r = mid;
		else
			l = mid;
	}
	return r;
}
int helpr()
{
	int l = 0, r = n + 1;
	while (l + 1 < r)
	{
		int mid = (l + r) >> 1;
		if (work(a[mid]) <= R)
			l = mid;
		else
			r = mid;
	}
	return l;
}
signed main()
{
	ios::sync_with_stdio(0);
	cin.tie(0), cout.tie(0);
	//freopen("arithmetic.in", "r", stdin);
	//freopen("arithmetic.out", "w", stdout);
	cin >> n >> q >> L >> R;
	for (int i = 1; i <= n; i++)
		cin >> a[i];
	for (int i = 1; i <= q; i++)
		cin >> opt[i] >> x[i] >> s[i] >> t[i];
	sort(a + 1, a + 1 + n);
	cout << max(0ll, helpr() - helpl() + 1);
	return 0;
}
```

# \[NOIP十三连测第十三套 \] --T2--图书管理

考虑计算每个中位数 $p_i$ 的贡献。对于 $p_j \gt p_i$ 令 $a_j = 1$，对于 $p_j \lt p_i$ 令 $a_j = -1$，问题变为有多个区间 $[l,r]$ 满足 $l \le i \le r$，且 $\sum^r_{j=l}a_j=0$。从 $i$ 往左扫描并累计和 $s_j=\sum^i_{k=j}a_k=0$，使用一个数组背景每种 $s_j$ 的取值个数。类似的从 $i$ 往右累计 $t_j=\sum^i_{k=j}a_k=0$，并且询问取值为 $-t_j$ 的 $s$ 的数量。

- 时间复杂度 $O(n^2)$。
