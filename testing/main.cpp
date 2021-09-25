#include <string>
#include <stdio.h>
#include <iostream>
#include <windows.h>
#include <vector>
#include <sstream>

using namespace std;

bool yarn = false;
bool npm = false;

vector<string> split(string str, char delim) {
	vector<string> strings;
    istringstream f(str.c_str());
    string s;
    while (getline(f, s, delim)) {
        strings.push_back(s);
    }

	return strings;
}

int main() {
	char* gett;
	gett = getenv("PATH");
	string get = gett;
	vector<string> parts = split(get, ';');

	for (int i=0; i<parts.size(); i++) {
		string obj = parts[i];
		string a,b,c,d = "";

		if (obj.length()>=9) {
			b = obj.substr(obj.length()-9, string::npos);
		}
		if (obj.length()>=8) {
			a = obj.substr(obj.length()-8, string::npos);
		}
		if (obj.length()>=4) {
			c = obj.substr(obj.length()-4, string::npos);
		}
		if (obj.length()>=5) {
			d = obj.substr(obj.length()-5, string::npos);
		}

		if (obj.length() >= 8 && (a == "Yarn\\bin" || b == "Yarn\\bin\\")) {
			yarn = true;
		} else if (obj.length() >= 4 && (c == "Node" || d == "Node\\")) {
			npm = true;
		}

		if (yarn && npm) {
			break;
		}
	}

	if (!yarn) {
		printf("\033[1;32m[Uranium]:\033[1;0m Looks like you don't have yarn installed, would you like for us to install it? (y/n)	");
		string in;
		cin >> in;
		if (in.substr(0, 1) == "y") {
			if (!npm) {
				printf("\033[1;32m[Uranium]:\033[1;0m Uh oh! You don't seem to have NPM installed either.\n");
				return 1;
			} else {
				printf("\033[1;32m[Uranium]:\033[1;0m Now installing yarn...\n");
				system("npm i -g yarn");
				printf("\033[1;32m[Uranium]:\033[1;0m Installation completed, if something went wrong check out the yarn documentation. Please relaunch the program to continue with installing packages.\n");
				return 0;
			}
		} else {
			printf("\033[1;32m[Uranium]:\033[1;0m Installation declined, aborting.\n");
		}
		return 1;
	}

	system("yarn install");
	return 0;
}
