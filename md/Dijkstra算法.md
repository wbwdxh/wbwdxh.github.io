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
