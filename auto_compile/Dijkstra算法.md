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
**# 算法**

# $Dijkstra\ algorithm$
## $Principle$
以点为研究对象的贪心策略，和$Prim$类似。
![Prim algorithm implementation steps](https://cdn.luogu.com.cn/upload/image_hosting/qes12xna.png)
## $Implementation\ step$
1. 将起点标记；
2. 找条连接**被标记的点集合中一点**和**没有被标记的点集合中一点**最短的边；
3. 将该边连接的**没有被标记的点**加入**被标记的点**；
4. 将该**新加入的被标记的点**和**它的所有邻接点**进行松弛操作；
5. 返回第二步，直到$n$个点都被标记为止。
- 时间复杂度：$O(n^2)$

## $Template\ code$
```cpp
void dijkstra()
{
	memset(dis,0x3f,sizeof dis);
	dis[s]=0;
	for(int i=1;i<=n;i++)
	{
		int x=1,mini=INT_MAX;
		for(int j=1;j<=n;j++)
			if(mini>dis[j]&&!vis[j])
				x=j,mini=dis[x];
		vis[x]=true;
		for(auto y:nbr[x])
			if(dis[x]+y.w<dis[y.x])
				dis[y.x]=dis[x]+y.w;
	}
	return;
}
```
## $Optimize$
- $dis[i]$会随着松地操作更新，因此是动态求最小值，考虑优先队列优化：
    + 用优先队列维护没有标记的点，且是小根堆

- 时间复杂度：$O(m\log n)$
### $Code$
- [P4779 【模板】单源最短路径（标准版）](https://www.luogu.com.cn/problem/P4779)

```cpp
#include<bits/stdc++.h>
#define int long long
using namespace std;
const int N=1e5+5;
int n,m,s,dis[N];
bool vis[N];
struct node{
	int x,w;
	bool operator<(node y) const
	{
		return w>y.w;
	}
};
vector<node>nbr[N];
void dijkstra()
{
	memset(dis,0x3f,sizeof dis);
	priority_queue<node>pq;
	dis[s]=0;
	pq.push({s,0});
	while(!pq.empty())
	{
		node now=pq.top();
		int x=now.x;
		pq.pop();
		if(vis[x])
			continue;
		vis[x]=true;
		for(auto y:nbr[x])
			if(dis[x]+y.w<dis[y.x])
			{
				dis[y.x]=dis[x]+y.w;
				pq.push({y.x,dis[y.x]});
			}
	}
	return;
}
signed main()
{
	ios::sync_with_stdio(0);
	cin.tie(0), cout.tie(0);
	cin>>n>>m>>s;
	for(int i=1;i<=m;i++)
	{
		int u,v,w;
		cin>>u>>v>>w;
		nbr[u].push_back({v,w});
	}
	dijkstra();
	for(int i=1;i<=n;i++)
		if(dis[i]==dis[0])
			cout<<INT_MAX<<' ';
		else
			cout<<dis[i]<<' ';
	return 0;
}
```
* 这份代码里面使用了`重载运算符(Overload operator)`
	- 重载运算符：
		+ $Over$：覆盖
		+ $Load$：加载
		+ $Overload$：重载
		+ $Operator$：运算符。
	- 重载运算符是指将运算符（加减乘除等）修改为自定义的含义

## $Dijkstra's\ relationship\ with\ BFS$
- $BFS$ 是边权相同的 $Dijkstra$

## $Matters\ needing\ attention$
1. 不能应用于有负边权的图；
2. 不能跑最长路；
3. 注意松弛操作溢出

	```cpp
    if(dis[x]<dis[y]-w)
  	```
4. 多次调用$Dijkstra$要重置$vis[]$和$dis[]$
