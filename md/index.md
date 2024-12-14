# Welcome
```cpp
#include<bits/stdc++.h>
typedef int int32;
#define int long long
using namespace std;
const int N = 1e4 + 5;
int n, ans;
map<int, int>mp;
class node {
	int x;
};
signed main()
{
	ios::sync_with_stdio(0);
	cin.tie(0), cout.tie(0);
	cin >> n;
	node a;
	for (int i = -n; i <= n; i++)
		for (int j = -n; j <= n; j++)
			if (n * n >= i * i + j * j)
				ans += (int)sqrt(n * n - i * i - j * j) * 2 + 1;
	cout << ans << '\n';
	return 0;
}
```
$$x^2+y^2=z^2$$

[README](/index.html?blog=README.md)

Moocraft：![Minecraft?](/fig_1_cheese_bronze_dec24.png)