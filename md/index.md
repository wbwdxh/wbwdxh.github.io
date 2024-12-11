<h1>Welcome</h1>
<pre><code class="language-cpp">#include&lt;bits/stdc++.h&gt;
typedef int int32;
#define int long long
using namespace std;
const int N = 1e3 + 5;
int n, m;
bool f;
vector&lt;pair&lt;int, int&gt;&gt;nbr[N];
signed main()
{
	ios::sync_with_stdio(0);
	cin.tie(0), cout.tie(0);
	cin &gt;&gt; n &gt;&gt; m &gt;&gt; f;
	for (int i = 1; i &lt;= m; i++)
	{
		int x, y, z;
		cin &gt;&gt; x &gt;&gt; y &gt;&gt; z;
		nbr[x].push_back({ y,z });
		if (!f)
			nbr[y].push_back({ x,z });
	}
	for (int i = 1; i &lt;= n; i++)
		for (int j = nbr[i].size() - 1; j &gt;= 0; j--)
			cout &lt;&lt; i &lt;&lt; ' ' &lt;&lt; nbr[i][j].first &lt;&lt; ' ' &lt;&lt; nbr[i][j].second &lt;&lt; '\n';
	return 0;
}</code></pre>
<p>
	$$x^2+y^2=z^2$$
</p>
