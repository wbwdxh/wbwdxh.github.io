#include <iostream>
#include <regex>
#include <string>

int main()
{
	std::string input = "This is a test /index.html?blog=example.md and another /index.html?blog=another-example.md";
	std::regex pattern("\\/index.html\\?blog=(.*?)\\.md");
	std::string replacement = "./$1.html";

	std::string output = std::regex_replace(input, pattern, replacement);

	std::cout << output << std::endl;

	return 0;
}