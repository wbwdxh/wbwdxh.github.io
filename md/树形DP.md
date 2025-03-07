# 树形 $DP$

- 在树形结构上的 $DP$ 问题

1. 第一类树形 $DP$
   - 兄弟子树之间无数量依赖关系的 $DP$
2. 第二类树形 $DP$
   - 兄弟子树之间有数量依赖关系的 $DP$(树上背包)

## 例题

- 注：有些题没写答案、状态转移方程和初始状态，可以参考代码。
- 一些题目：[题目列表 - 洛谷](https://www.luogu.com.cn/problem/list?tag=152&page=1)、[题库 - LibreOJ](https://loj.ac/p?tagIds=53)

### 洛谷[$P1122$](https://www.luogu.com.cn/problem/P1122)

#### 题意

- 给定n个点n-1条边的树，点权val[i]，求删一些边之后，剩下的子树的最大权值和。

#### 分析

1. 小的子树可以向大的子树转移，且无后效性，考虑DP；
2. 状态：$dp[i]$ 表示以 $i$ 为根结点的子树的最大权值和；
3. 答案：$max(dp[i])$；
4. 状态转移方程：
   - 枚举当前结点 $cur$ 的每一个子结点 $nxt$，选或者不选
   - `dp[cur] = max(dp[cur], dp[cur] + dp[nxt]);`
5. 初始状态：
   - `dp[i] = val[i];`
6. 注意事项：**先递归，再转移**！

#### 代码

```cpp
#include<bits/stdc++.h>
typedef int int32;
#define int long long
using namespace std;
const int N = 16000+5;
int dp[N],n,a[N],maxi=LLONG_MIN;
vector<int>nbr[N];
void dfs(int x,int fa)
{
	dp[x]=a[x];
	for(auto y:nbr[x])
		if(fa!=y)
		{
			dfs(y,x);
			dp[x]+=max(dp[y],0ll);
		}
	maxi=max(maxi,dp[x]);
	return;
}
signed main()
{
	ios::sync_with_stdio(0);
	cin.tie(0), cout.tie(0);
	cin>>n;
	for(int i=1;i<=n;i++)
		cin>>a[i];
	for(int i=1;i<n;i++)
	{
		int x,y;
		cin>>x>>y;
		nbr[x].push_back(y);
		nbr[y].push_back(x);
	}
	dfs(1,0);
	cout<<maxi;
	return 0;
}
```

### 洛谷[$P1352$](https://www.luogu.com.cn/problem/P1352)

#### 题意

- 给定一棵带点权的树，有根树，父结点选取后子结点不能选，求如何选取结点使得权值和最大。

#### 分析

1. 状态：$dp[i][0/1]$ 表示以 $i$ 为根结点的子树，且 $i$ 点不选或者选的最大权值和；
2. 答案、状态转移方程和初始状态见代码。

#### 代码

```cpp
#include<bits/stdc++.h>
typedef int int32;
#define int long long
using namespace std;
const int N = 6e3 + 5;
int n, a[N], dp[N][5], in[N], root;
vector<int>nbr[N];
void dfs(int x, int fa)
{
	dp[x][1] = a[x];
	for(auto y:nbr[x])
		if (y != fa)
		{
			dfs(y, x);
			dp[x][0] += max(dp[y][0], dp[y][1]);
			dp[x][1] += dp[y][0];
		}
	return;
}
signed main()
{
	ios::sync_with_stdio(0);
	cin.tie(0), cout.tie(0);
	cin >> n;
	for (int i = 1; i <= n; i++)
		cin >> a[i];
	for (int i = 1; i < n; i++)
	{
		int x, y;
		cin >> x >> y;
		in[x]++;
		nbr[y].push_back(x);
	}
	for(int i=1;i<=n;i++)
		if (in[i] == 0)
		{
			root = i;
			break;
		}
	dfs(root, 0);
	cout << max(dp[root][0], dp[root][1]);
	return 0;
}
```

### 洛谷[$P2016$](https://www.luogu.com.cn/problem/P2016)

#### 题意

- 给定一棵树，选出最少的点覆盖所有的边。

#### 分析

1. 状态：$dp[i][0/1]$ 表示覆盖以i为根结点的子树的所有边，且点i不选/选需要的最少点数。
2. 注意事项：**点的编号从 $0$ 开始，加 $1$。双向边**

#### 代码

```cpp
#include<bits/stdc++.h>
typedef int int32;
#define int long long
using namespace std;
const int N = 1500 + 5;
int dp[N][5], n, a[N], maxi, root, in[N];
vector<int>nbr[N];
void dfs(int x, int fa)
{
	dp[x][1] = 1;
	for (auto y : nbr[x])
		if (fa != y)
		{
			dfs(y, x);
			dp[x][0] += dp[y][1];
			dp[x][1] += min(dp[y][0], dp[y][1]);
		}
	return;
}
signed main()
{
	ios::sync_with_stdio(0);
	cin.tie(0), cout.tie(0);
	cin >> n;
	for (int i = 1; i <= n; i++)
	{
		int x, y, z;
		cin >> a[i] >> z;
		x = a[i];
		while (z--)
		{
			cin >> y;
			in[x]++;
			in[y]++;
			nbr[y].push_back(x);
			nbr[x].push_back(y);
		}
	}
	root = a[1];
	dfs(root, 0);
	cout << min(dp[root][0], dp[root][1]);
	return 0;
}
```

### 洛谷[$P2585$](https://www.luogu.com.cn/problem/P2585)

#### 分析

1. 状态：$dp[i][0/1/2][0]$ 表示以点 $i$ 为根的子树且点 $i$ 的颜色为 $0/1/2$ 的最多绿色点数，$dp[i][0/1/2][1]$ 表示以点 $i$ 为根的子树且点 $i$ 的颜色为 $0/1/2$ 的最少绿色点数。

#### 代码

```cpp
#include<bits/stdc++.h>
typedef int int32;
#define int long long
using namespace std;
const int N = 5e5 + 5, mod = 1e9 + 7;
int dp[N][5][5], n, a[N], root, in[N], k, b[N], cnt = 1;
vector<int>nbr[N];
string s;
void dfs(int x, int fa)
{
	for (auto y : nbr[x])
		if (fa != y)
			dfs(y, x);
	dp[x][3][0] = dp[x][3][1] = 1;
	if (nbr[x].size() == 1)
	{
		dp[x][1][0] = max(dp[nbr[x][0]][2][0], dp[nbr[x][0]][3][0]);
		dp[x][2][0] = max(dp[nbr[x][0]][1][0], dp[nbr[x][0]][3][0]);
		dp[x][3][0] = max(dp[nbr[x][0]][1][0], dp[nbr[x][0]][2][0]) + 1;
		dp[x][1][1] = min(dp[nbr[x][0]][2][1], dp[nbr[x][0]][3][1]);
		dp[x][2][1] = min(dp[nbr[x][0]][1][1], dp[nbr[x][0]][3][1]);
		dp[x][3][1] = min(dp[nbr[x][0]][1][1], dp[nbr[x][0]][2][1]) + 1;
	}
	else if (nbr[x].size() == 2)
	{
		dp[x][1][0] = max(dp[nbr[x][0]][2][0] + dp[nbr[x][1]][3][0],
			dp[nbr[x][1]][2][0] + dp[nbr[x][0]][3][0]);
		dp[x][2][0] = max(dp[nbr[x][0]][1][0] + dp[nbr[x][1]][3][0],
			dp[nbr[x][1]][1][0] + dp[nbr[x][0]][3][0]);
		dp[x][3][0] = max(dp[nbr[x][0]][1][0] + dp[nbr[x][1]][2][0],
			dp[nbr[x][1]][1][0] + dp[nbr[x][0]][2][0]) + 1;
		dp[x][1][1] = min(dp[nbr[x][0]][2][1] + dp[nbr[x][1]][3][1],
			dp[nbr[x][1]][2][1] + dp[nbr[x][0]][3][1]);
		dp[x][2][1] = min(dp[nbr[x][0]][1][1] + dp[nbr[x][1]][3][1],
			dp[nbr[x][1]][1][1] + dp[nbr[x][0]][3][1]);
		dp[x][3][1] = min(dp[nbr[x][0]][1][1] + dp[nbr[x][1]][2][1],
			dp[nbr[x][1]][1][1] + dp[nbr[x][0]][2][1]) + 1;
	}
	return;
}
void f(int x)
{
	if (s[x] == '0')
		return;
	nbr[x].push_back(cnt + 1);
	f(++cnt);
	if (s[x] == '2')
	{
		nbr[x].push_back(cnt + 1);
		f(++cnt);
	}
	return;
}
signed main()
{
	ios::sync_with_stdio(0);
	cin.tie(0), cout.tie(0);
	cin >> s;
	s = "#" + s;
	f(cnt);
	root = 1;
	dfs(root, 0);
	cout << max({ dp[root][1][0],dp[root][2][0] ,dp[root][3][0] }) << ' ' << min({ dp[root][1][1],dp[root][2][1] ,dp[root][3][1] });
	return 0;
}
```

### 洛谷[$P2015$](https://www.luogu.com.cn/problem/P2015)

#### 题意

- 给定一棵树，根结点为 $1$，允许保留 $q$ 条边，求保留下来一棵子树的最大边权和。

#### 分析

1. 状态：$dp[i][j]$表示以i为根的子树保留j条边的最大边权和。

#### 代码

```cpp
#include<bits/stdc++.h>
typedef int int32;
#define int long long
using namespace std;
const int N = 100 + 5;
int n, a[N], dp[N][N], in[N], root, q;
struct node {
	int x, y;
};
vector<node>nbr[N];
int dfs(int x, int fa)
{
	int sum = 0;
	for (auto y : nbr[x])
		if (y.x != fa)
		{
			int nxt = y.x, w = y.y;
			sum = sum + dfs(nxt, x) + 1;
			for (int v = min(sum, q); v >= 0; v--)
				for (int k = 0; k < v; k++)
					dp[x][v] = max(dp[x][v], dp[x][v - k - 1] + dp[nxt][k] + w);
		}
	return sum;
}
signed main()
{
	ios::sync_with_stdio(0);
	cin.tie(0), cout.tie(0);
	cin >> n >> q;
	for (int i = 1; i < n; i++)
	{
		int x, y, z;
		cin >> x >> y >> z;
		nbr[x].push_back({ y,z });
		nbr[y].push_back({ x,z });
	}
	root = 1;
	dfs(root, 0);
	cout << dp[1][q];
	return 0;
}
```

### 洛谷[$P2014$](https://www.luogu.com.cn/problem/P2014)

#### 题意

- 给定若干棵树，其中父结点是子结点的先修课,每个结点有点权(学分)，至多选m门课（结点），求最大点权和。

#### 分析

1. 由于一门课没有先修课时，输入为 $0$，可以考虑用 $0$ 做根结点，转为 $1$ 棵树。
2. 状态：$dp[i][j]$ 表示以点 $i$ 为根结点的子树，选 $j$ 门课的最大点权和。

#### 代码

```cpp
#include<bits/stdc++.h>
typedef int int32;
#define int long long
using namespace std;
const int N = 300 + 5;
int n, a[N], dp[N][N], in[N], root, q;
vector<int>nbr[N];
int dfs(int x, int fa)
{
	int sum = 1;
	dp[x][1] = a[x];
	for (auto y : nbr[x])
		if (y != fa)
		{
			sum = sum + dfs(y, x);
			for (int v = min(sum, q + 1); v >= 1; v--)
				for (int k = 0; k < v; k++)
					dp[x][v] = max(dp[x][v], dp[x][v - k] + dp[y][k]);
		}
	return sum;
}
signed main()
{
	ios::sync_with_stdio(0);
	cin.tie(0), cout.tie(0);
	cin >> n >> q;
	for (int i = 1; i <= n; i++)
	{
		int x, y;
		x = i;
		cin >> y >> a[i];
		nbr[y].push_back(x);
	}
	root = 0;
	dfs(root, 0);
	cout << dp[root][q + 1];
	return 0;
}
```

### 洛谷[$P1273$](https://www.luogu.com.cn/problem/P1273)

#### 题意

- 给定一棵树，根结点(现场)，叶结点（用户），点权有正有负，成本视为负数的盈利。求盈利非负的情况下能覆盖的最多叶子结点数。

#### 分析

1. 状态：$dp[i][i]$ 表示以点 $i$ 为根的子树覆盖 $j$ 个叶子结点的最大盈利。

#### 代码

```cpp
#include<bits/stdc++.h>
typedef int int32;
#define int long long
using namespace std;
const int N = 3000 + 5;
int n, a[N], dp[N][N], in[N], root, m;
struct node {
	int x, y;
};
vector<node>nbr[N];
int dfs(int x, int fa)
{
	if (x > n - m)
	{
		dp[x][1] = a[x];
		return 1;
	}
	dp[x][0] = 0;
	int sum = 0;
	for (auto y : nbr[x])
		if (y.x != fa)
		{
			int nxt = y.x, w = y.y, son = dfs(nxt, x);
			sum += son;
			for (int j = sum; j >= 0; j--)
				for (int k = 1; k <= min(j, son); k++)
					dp[x][j] = max(dp[x][j], dp[x][j - k] + dp[nxt][k] - w);
		}
	return sum;
}
signed main()
{
	ios::sync_with_stdio(0);
	cin.tie(0), cout.tie(0);
	memset(dp, 0x80, sizeof dp);
	cin >> n >> m;
	for (int i = 1; i <= n - m; i++)
	{
		int x, y, z, k;
		x = i;
		cin >> k;
		while (k--)
		{
			cin >> y >> z;
			nbr[x].push_back({ y,z });
		}
	}
	for (int i = n - m + 1; i <= n; i++)
		cin >> a[i];
	root = 1;
	dfs(root, 0);
	for (int i = m; i >= 1; i--)
		if (dp[1][i] >= 0)
		{
			cout << i;
			return 0;
		}
	return 0;
}
```
