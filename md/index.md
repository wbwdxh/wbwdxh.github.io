<h1>Welcome</h1>
<pre><code>#include<bits/stdc++.h>
typedef int int32;
#define int long long
using namespace std;
const int N = 1e3 + 5;
int n, m;
bool f;
vector<pair<int, int>>nbr[N];
signed main()
{
	ios::sync_with_stdio(0);
	cin.tie(0), cout.tie(0);
	cin >> n >> m >> f;
	for (int i = 1; i <= m; i++)
	{
		int x, y, z;
		cin >> x >> y >> z;
		nbr[x].push_back({ y,z });
		if (!f)
			nbr[y].push_back({ x,z });
	}
	for (int i = 1; i <= n; i++)
		for (int j = nbr[i].size() - 1; j >= 0; j--)
			cout << i << ' ' << nbr[i][j].first << ' ' << nbr[i][j].second << '\n';
	return 0;
}</code></pre>
<p>
	$$x^2+y^2=z^2$$
</p>
