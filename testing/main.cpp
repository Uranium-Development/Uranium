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

int main(int argc, char **argv) {
	if (argc < 2) {
		printf("\033[1;32m          _______  _______  _       _________          _______ \n|\\     /|(  ____ )(  ___  )( (    /|\\__   __/|\\     /|(       )\n| )   ( || (    )|| (   ) ||  \\  ( |   ) (   | )   ( || () () |\n| |   | || (____)|| (___) ||   \\ | |   | |   | |   | || || || |\n| |   | ||     __)|  ___  || (\\ \\) |   | |   | |   | || |(_)| |\n| |   | || (\\ (   | (   ) || | \\   |   | |   | |   | || |   | |\n| (___) || ) \\ \\__| )   ( || )  \\  |___) (___| (___) || )   ( |\n(_______)|/   \\__/|/     \\||/    )_)\\_______/(_______)|/     \\|\n\033[1;0m");
		printf("\n\nWelcome to the uranium quick setup exe. You can run any of the commands below.\n(uranium.exe--main.cpp was created by Fynotix)\n");
		printf("\nBasic Commands:\n");
		printf("\turanium install\t\t\tInstalls all the required NPM packages via yarn.\n");
		printf("\turanium build\t\t\tBuilds uranium into a single executable.\n");
		printf("\turanium test\t\t\tRuns uranium without packaging or building it.\n");
		printf("\n\nIt is possible to not use this executable, but if you wish for efficiency and safety, run the commands through this exe.\n");
		return 0;
	}

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
		printf("\033[1;32m[Uranium]:\033[1;31m ERROR :: Could not find yarn in your environment variables.\033[1;0m\n");
		printf("\033[1;32m[Uranium]:\033[1;0m The uranium.exe file requires \033[1;36myarn\033[1;0m and \033[1;36mnpm\033[1;0m to run, would you like to install it?\n");
		printf("\033[1;32m[Uranium]:\033[1;0m Looks like you don't have yarn installed, would you like for us to install it? (y/n)	");
		string in;
		cin >> in;
		if (in.substr(0, 1) == "y") {
			if (!npm) {
				printf("\033[1;32m[Uranium]:\033[1;0m Uh oh! You don't seem to have NPM installed either.\n");
				printf("\033[1;36m[Uranium]:\033[1;0m You can install npm with node at https://www.nodejs.org/\n");
				return 1;
			} else {
				printf("\033[1;32m[Uranium]:\033[1;0m Now installing yarn...\n");
				system("npm i -g yarn");
				printf("\033[1;32m[Uranium]:\033[1;0m Installation completed, if something went wrong check out the yarn documentation. Please relaunch the program to continue with installing packages.\n");
				return 0;
			}
		} else {
			printf("\n\033[1;32m[Uranium]:\033[1;0m Installation declined, aborting.\n");
		}
		return 1;
	}

	SYSTEM_INFO info;
	GetSystemInfo(&info);
	string arch;

	switch(info.wProcessorArchitecture) {
		case PROCESSOR_ARCHITECTURE_AMD64: {
			arch = "x64";
			break;
		}
		case PROCESSOR_ARCHITECTURE_ARM: {
			arch = "ARM";
			break;
		}
		case PROCESSOR_ARCHITECTURE_IA64: {
			arch = "Intel Itanium-based (x64)";
			break;
		}
		case PROCESSOR_ARCHITECTURE_INTEL: {
			arch = "x86";
			break;
		}
		case PROCESSOR_ARCHITECTURE_UNKNOWN: {
			arch = "Unknown (Unknown Processor)";
			break;
		}
	}

	if (string(argv[1]).substr(0,7) == "install") {
		system("yarn install");
		printf("\033[1;32m[Uranium]:\033[1;0m Package installation completed successfully.\n");
	} else if (string(argv[1]).substr(0,5) == "build") {
		printf("\033[1;32mOS\t\t-  Win32\033[1;0m\n");
		printf("\033[1;32mArch\t\t-  %s\033[1;0m\n", arch.c_str());
		system("yarn package");
		printf("\033[1;32m[Uranium]:\033[1;0m Packaging completed; starting the builder.\n");
		system("yarn make");
		printf("\033[1;32m[Uranium]:\033[1;0m Make completed, check your dist folder.\n");
	} else if (string(argv[1]).substr(0,4) == "test") {
		printf("\033[1;32m[Uranium]:\033[1;0m Starting test\n");
		printf("\033[1;32mOS\t\t-  Win32\033[1;0m\n");
		printf("\033[1;32mArch\t\t-  %s\033[1;0m\n", arch.c_str());
		printf("\033[1;32mTestType\t-  APP\033[1;0m\n");
		system("yarn start");
		printf("\033[1;32m[Uranium]:\033[1;0m Completed test session, successfully closed app.\n");
	}

	return 0;
}
