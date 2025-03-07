<!--插入内容 start-->
<link rel="shortcut icon" href="/favicon.ico" type="image/x-icon">
<script>
	document.body.parentElement.lang = "zh-cn";
</script>
<script src="/katex/katex.min.js"></script>
<script src="/katex/contrib/auto-render.min.js"></script>
<script src="/codecopy/clipboard.js"></script>
<script defer type="module">
	import { marked } from '../marked.js';
	function showLoader() {
		const loader = document.getElementById('loader');
		loader.style.display = 'flex';
		loader.style.opacity = '1';
	}
	function fadeOutLoader() {
		const loader = document.getElementById('loader');
		loader.style.opacity = '0';
		setTimeout(() => {
			loader.style.display = 'none';
		}, 500);
	}
	// 初始加载检测
	document.addEventListener('DOMContentLoaded', () => {
		// 基础DOM加载完成
		fadeOutLoader();
		// 检测动态DOM更新
		const observer = new MutationObserver((mutations) => {
			if (document.querySelector('[data-loading]')) {
				showLoader();
			} else {
				fadeOutLoader();
			}
		});
		observer.observe(document.body, {
			childList: true,
			subtree: true,
			attributes: true
		});
	});
	showLoader();
	window.myloader = { show: showLoader, hide: fadeOutLoader };
	if (true)
	{
		renderMathInElement(document.body, {
			delimiters: [
				{ left: '\\(', right: '\\)', display: true },
				{ left: '$$', right: '$$', display: true },
				{ left: '$', right: '$', display: false },
			],
		});
		function fun() {
			// 获取所有的 <pre><code>...</code></pre> 元素
			var preElements = document.querySelectorAll('pre code');
			// 遍历这些元素
			preElements.forEach(function (codeElement) {
				// 创建复制按钮
				var button = document.createElement('button');
				button.textContent = '复制';
				button.classList.add('codecopy-btn'); // 添加类以便样式化
				// 将按钮添加到 code 元素的父元素（即 pre 元素）中
				var div = document.createElement('div');
				div.style = "width:100%;position: relative;";
				div.appendChild(button);
				codeElement.before(div);
				codeElement.parentElement.classList.add("hljs-prt");
				let x = codeElement;
				// 使用 Clipboard.js 初始化复制功能
				let clipboard = new ClipboardJS(button, {
					text: function (trigger) {
						// 返回要复制的文本
						return x.innerText.replace(/\n\n/g, "\n");
					}
				});
				clipboard.on('success', function (e) {
					console.log('复制成功！', e);
					// 可以在这里修改按钮的文本或样式来表示成功
					e.clearSelection(); // 清除选区
					e.trigger.textContent = '复制成功';
					setTimeout(() => {
						e.trigger.textContent = '复制';
					}, 500);
				});
				clipboard.on('error', function (e) {
					console.error('复制失败！', e);
					// 可以在这里处理错误
					e.trigger.textContent = '复制失败';
					setTimeout(() => {
						e.trigger.textContent = '复制';
					}, 500);
				});
			});
		}
		fun();
		fadeOutLoader();
		window.myloader.hide();
	}
</script>

<div class="loader-overlay" id="loader" style="display: flex;opacity: 1;z-index: 100000000;">
		<div class="loader" style="
    display: flex;
    opacity: 1;
"></div>
		<div class="loader" style="
    position: fixed;
    opacity: 1;
    width: 9.5em;
    height: 9.5em;
    opacity: 1 !important;
    background: white;
    box-shadow: inset 0 0 0.75em rgba(0, 0, 0, 0.1);
"></div>
		<div style="
    position: fixed;
    opacity: 1;
    z-index:999999999;
">loading...</div>
	</div>
<!--插入内容 end-->
# $\text{RMQ}$ 问题（$\text{Range Maximum/Minimum Query}$）

- 指的是在一个序列中，多次进行静态区间求最值。

## 算法原理

- 倍增思想

## 代码实现

### 第一部分：预处理

1. 维护 $dp[i][j]$ 表示以下标 $i$ 为起点，跨度为 $2^j$ 的最大（最小）值。
2. 状态转移方程：$dp[i][j] = max(dp[i][j - 1], dp[i + (1 << j - 1)][j - 1])$；
3. 初始状态：$dp[i][0] = a[i]$。
4. 维护 $lg[i]$ 表示 $\log_2 i$ 向下取整的值（$i$ 取以 $2$ 为底的对数），$lg[0]=-1，lg[i]=lg[i>>1]+1$。
5. 代码

```cpp
void init()
{
	for (int i = 1; i <= n; i++)
		dp[i][0] = a[i];
	for (int j = 1; (1 << j) <= n; j++)//枚举指数j
		for (int i = 1; i + (1 << j) - 1 <= n; i++)//枚举起点i，注意终点不要越界
			dp[i][j] = max(dp[i][j - 1], dp[i + (1 << j - 1)][j - 1]);
	lg[0] = -1;
	for (int i = 1; i <= n; i++)
		lg[i] = lg[i >> 1] + 1;
	return;
}
```

### 第二部分：询问

1. 对于 $[l,r]$ 的询问，一定能找到 $2$ 的幂超过 $r-l+1$ 的一半；
2. 求取覆盖区间一半以上的长度，$tmp=lg[r-l+1]$；
3. 答案是 $max(dp[l][tmp],dp[r-(1<<tmp)+1][tmp])$。
4. 代码

```cpp
int find(int l, int r)
{
	int tmp = lg[r - l + 1];
	return max(dp[l][tmp], dp[r - (1 << tmp) + 1][tmp]);
}
```

## 例题

### 洛谷[P2048](https://www.luogu.com.cn/problem/P2048)

#### 题意

- 给定 $n$ 个元素，选取 $k$ 次不完全重复的区间，区间长度在 $[L,R]$ 内求 $K$ 次选取的区间和最大值。

#### 简化版问题：$k=1$ 时

1. 维护 $sum[i]$ 表示前缀和；
2. 维护 $dp[i][j]$ 表示以 $i$ 为起点跨度为 $2$ 的 $j$ 次方的区间内最大的前缀和；
3. 维护 $pos[i][j]$ 表示 $dp[i][j]$ 在序列中所在的下标，$pos[i][0]=i$
   ```cpp
   	if (dp[i][j - 1] > dp[i + (1 << j - 1)][j - 1])
   		pos[i][j] = pos[i][j - 1];
   	else
   		pos[i][j] = pos[i + (1 << j - 1)][j - 1];
   ```
4. 循环枚举期间起点 $i$，在 $[i + L - 1， min(n, i + R - 1)]$ 询问最大的前缀和，减去 $sum[i-1]$，维护最大差值；

#### 强化版问题：$k\le 5\times 10^5$ 时

5. 考虑优先队列维护前 $k$ 大的区间和，问题是起点 $i$ 贡献的区间不一定只有 $1$ 个；
6. 对于以 $i$ 为起点的最大区间和，可以借助 $pos[i][]$ 找到终点 $j$，然后在区间 $[i+L-1,j-1]$ 和区间 $[j+1,i+R-1]$ 内再次寻找 $2$ 个最大区间和对应的 $j_1$ 和 $j_2$，插入优先队列；
7. 循环从优先队列中取出 $k$ 个区间，每取 $1$ 次，将被取出的区间终点 $j$ 一分为二，重复 $k$ 次，求和即为答案；
8. 时间复杂度 $O((n+k)\times\log_2 n)$

#### 代码

```cpp
#include<bits/stdc++.h>
typedef int int32;
#define int long long
using namespace std;
const int N = 5e5 + 5;
int n, k, dp[N][32], a[N], lg[N], l, r, sum[N], pos[N][32], ans;
struct node {
	int s, t, x, y, v;
	bool operator<(const node &u) const
	{
		return v < u.v;
	}
};
priority_queue<node>q;
void init()
{
	for (int i = 1; i <= n; i++)
		dp[i][0] = sum[i], pos[i][0] = i;
	for (int j = 1; (1 << j) <= n; j++)
		for (int i = 1; i + (1 << j) - 1 <= n; i++)
			if (dp[i][j - 1] > dp[i + (1 << j - 1)][j - 1])
				pos[i][j] = pos[i][j - 1],
				dp[i][j] = dp[i][j - 1];
			else
				pos[i][j] = pos[i + (1 << j - 1)][j - 1], 
				dp[i][j] = dp[i + (1 << j - 1)][j - 1];
	lg[0] = -1;
	for (int i = 1; i <= n; i++)
		lg[i] = lg[i >> 1] + 1;
	return;
}
int find(int l, int r)
{
	if (l > r)//不知道为什么有时候l会>r
		swap(l, r);
	int tmp = lg[r - l + 1], ans;
	if (dp[l][tmp] > dp[r - (1 << tmp) + 1][tmp])
		ans = pos[l][tmp];
	else
		ans = pos[r - (1 << tmp) + 1][tmp];
	return ans;
}
void make_node(int s, int t, int x, int y)
{
	q.push({ s,t,x,y,sum[t] - sum[s - 1] });
	return;
}
signed main()
{
	ios::sync_with_stdio(0);
	cin.tie(0), cout.tie(0);
	cin >> n >> k >> l >> r;
	for (int i = 1; i <= n; i++)
	{
		cin >> a[i];
		sum[i] = sum[i - 1] + a[i];
	}
	init();
	for (int i = 1; i + l - 1 <= n; i++)
	{
		int t = find(i + l - 1, min(i + r - 1, n));
		make_node(i, t, i + l - 1, min(i + r - 1, n));
	}
	for (int i = 1; i <= k; i++)
	{
		node x = q.top();
		q.pop();
		ans += x.v;
		if (x.t - 1 >= x.x)
		{
			int t = find(x.t - 1, x.x);
			make_node(x.s, t, x.x, x.t - 1);
		}
		if (x.t + 1 <= x.y)
		{
			int t = find(x.t + 1, x.y);
			make_node(x.s, t, x.t + 1, x.y);
		}
	}
	cout << ans;
	return 0;
}
```
