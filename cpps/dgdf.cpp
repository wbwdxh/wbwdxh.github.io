#include <iostream>
#include <vector>
#include <algorithm>
#include <cstring>

using namespace std;

const int MAXN = 1e5 + 10;

vector<int> primes;
bool is_prime[MAXN];
int color[MAXN];

// 欧拉筛法生成质数
void euler_sieve(int n)
{
	memset(is_prime, true, sizeof(is_prime));
	is_prime[0] = is_prime[1] = false;
	for (int i = 2; i <= n; ++i)
	{
		if (is_prime[i])
		{
			primes.push_back(i);
		}
		for (int p : primes)
		{
			if (i * p > n) break;
			is_prime[i * p] = false;
			if (i % p == 0) break;
		}
	}
}

// 图的着色
void graph_coloring(int n)
{
	memset(color, -1, sizeof(color));
	for (int i = 1; i <= n; ++i)
	{
		vector<bool> used(3, false); // 最多使用3种颜色
		for (int j = 1; j < i; ++j)
		{
			if (is_prime[i ^ j])
			{
				used[color[j]] = true;
			}
		}
		for (int c = 1; c <= 3; ++c)
		{
			if (!used[c])
			{
				color[i] = c;
				break;
			}
		}
	}
}

int main()
{
	int n;
	cin >> n;

	// 生成质数
	euler_sieve(2 * n);

	// 图的着色
	graph_coloring(n);

	// 输出结果
	int k = *max_element(color + 1, color + n + 1);
	cout << k << endl;
	for (int i = 1; i <= n; ++i)
	{
		cout << color[i] << " ";
	}
	cout << endl;

	return 0;
}