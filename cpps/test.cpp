#include<bits/stdc++.h>
typedef int int32;
#define int long long
using namespace std;
const int N = 5e3 + 5;
int t, n, ans, a[N], b[N], cnt;
bool vis[N];
signed main()
{
	ios::sync_with_stdio(0);
	cin.tie(0), cout.tie(0);
	for (int i = 2; i <= 5e3; i++)
	{
		if (!vis[i])
			b[++cnt] = i;
		for (int j = 1; j <= cnt; j++)
		{
			if (i * b[j] > 5e3)
				break;
			vis[i * b[j]] = true;
			if (!(i % b[j]))
				break;
		}
	}
	cin >> t;
	while (t--)
	{
		cin >> n;
		for (int i = 1; i <= n; i++)
			cin >> a[i];
		ans = 0;
		for (int i = 1; i <= cnt && b[i] <= 2 * n; i++)
			for (int j = 1; j <= n; j++)
				if ((b[i] ^ j) <= n)
					if (a[b[i] ^ j] == a[j])
						cout << "NO!!!" << (b[i] ^ j) << ' ' << j << '\n';
	}
	return 0;
}