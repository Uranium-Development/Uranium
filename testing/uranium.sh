if [ $# -eq 0 ]; then
	echo -e "$(tput setaf 2)          _______  _______  _       _________          _______ \n|\\     /|(  ____ )(  ___  )( (    /|\\__   __/|\\     /|(       )\n| )   ( || (    )|| (   ) ||  \\  ( |   ) (   | )   ( || () () |\n| |   | || (____)|| (___) ||   \\ | |   | |   | |   | || || || |\n| |   | ||     __)|  ___  || (\\ \\) |   | |   | |   | || |(_)| |\n| |   | || (\\ (   | (   ) || | \\   |   | |   | |   | || |   | |\n| (___) || ) \\ \\__| )   ( || )  \\  |___) (___| (___) || )   ( |\n(_______)|/   \\__/|/     \\||/    )_)\\_______/(_______)|/     \\|$(tput setaf 7)"
	echo -e "\n\nWelcome to the uranium quick setup exe. You can run any of the commands below.\n(uranium.exe--main.cpp was created by Fynotix)\n"
	echo -e "\nBasic Commands:"
	echo "	uranium install			Installs all the required NPM packages via yarn."
	echo "	uranium build			Builds uranium into a single executable."
	echo "	uranium test			Runs uranium without packaging or building it."
	echo -e "\n\nIt is possible to not use this executable, but if you wish for efficiency and safety, run the commands through this file."
	exit 1
fi

if [ "$(uname)" == 'Darwin' ]; then
	OS='Mac'
elif [ "$(expr substr $(uname -s) 1 5)" == 'Linux' ]; then
	OS='Linux'
else
	if [ "$1" != '--ctest' ]; then
		echo "$(tput setaf 2)[Uranium]:$(tput setaf 7) Your platform ($(uname -a)) is not supported."
		echo "$(tput setaf 2)[Uranium]:$(tput setaf 7) Supported platforms are:"
		echo "- Linux"
		echo "- MacOS"
		echo ""
		if [ "$(expr substr $(uname -s) 1 6)" == 'CYGWIN' ]; then
			echo "$(tput setaf 2)[Uranium]:$(tput setaf 7) Looks like your using cygwin! Please run the uranium.exe file instead as this counts as a windows device."
		else
			echo "$(tput setaf 2)[Uranium]:$(tput setaf 7) If you are running win32 (Windows 10) please run the uranium.exe file instead."
		fi

		exit 1
	fi
fi

if [ "$1" == '--ctest' ]; then
	echo "NOT INSTALLED:"
	echo "$(tput setaf 2)[Uranium]:$(tput setaf 7) It looks like you don't have yarn installed."
	echo "$(tput setaf 2)[Uranium]:$(tput setaf 7) The file uranium.exe requires you to have $(tput setaf 6)yarn$(tput setaf 7) and $(tput setaf 6)npm$(tput setaf 7) installed."
	echo "$(tput setaf 2)[Uranium]:$(tput setaf 7) You can install yarn via the $(tput setaf 6)npm i -g yarn$(tput setaf 7) command."
	echo ""
	echo "$(tput setaf 2)[Uranium]:$(tput setaf 7) If you don't have NPM installed, you can install it at https://npmjs.org/"
	echo ""
	echo "BUILD:"
	echo "$(tput setaf 2)OS		-  ${OS}$(tput setaf 7)"
	echo "$(tput setaf 2)Arch		-  $(arch)$(tput setaf 7)"
	echo "$(tput setaf 2)[Uranium]:$(tput setaf 7) Packaging completed; starting the builder."
	echo "$(tput setaf 2)[Uranium]:$(tput setaf 7) Make completed, check your dist folder."
	echo ""
	echo "TEST:"
	echo "$(tput setaf 2)[Uranium]:$(tput setaf 7) Starting test"
	echo "$(tput setaf 2)OS		-  ${OS}$(tput setaf 7)"
	echo "$(tput setaf 2)Arch		-  $(arch)$(tput setaf 7)"
	echo "$(tput setaf 2)TestType	-  APP$(tput setaf 7)"
	echo "$(tput setaf 2)[Uranium]:$(tput setaf 7) Completed test session, successfully closed app."
	echo ""
	echo "INSTALL:"
	echo "$(tput setaf 2)[Uranium]:$(tput setaf 7) Package installation completed successfully."
	echo ""
	echo "UNSUPPORTED:"
	echo "$(tput setaf 2)[Uranium]:$(tput setaf 7) Your platform ($(uname -a)) is not supported."
	echo "$(tput setaf 2)[Uranium]:$(tput setaf 7) Supported platforms are:"
	echo "- Linux"
	echo "- MacOS"
 	echo ""
	echo "$(tput setaf 2)[Uranium]:$(tput setaf 7) Looks like your using cygwin! Please run the uranium.exe file instead as this counts as a windows device."
	echo "$(tput setaf 2)[Uranium]:$(tput setaf 7) If you are running win32 (Windows 10) please run the uranium.exe file instead."
	exit 1
fi

if [ ! command -v yarn ]; then
	echo "$(tput setaf 2)[Uranium]:$(tput setaf 7) It looks like you don't have yarn installed."
	echo "$(tput setaf 2)[Uranium]:$(tput setaf 7) The file uranium.exe requires you to have $(tput setaf 6)yarn$(tput setaf 7) and $(tput setaf 6)npm$(tput setaf 7) installed."
	echo "$(tput setaf 2)[Uranium]:$(tput setaf 7) You can install yarn via the $(tput setaf 6)npm i -g yarn$(tput setaf 7) command."
	echo ""
	echo "$(tput setaf 2)[Uranium]:$(tput setaf 7) If you don't have NPM installed, you can install it at https://npmjs.org/"
	exit 1
fi

if [ "$1" == 'build' ]; then
	echo "$(tput setaf 2)OS		-  ${OS}$(tput setaf 7)"
	echo "$(tput setaf 2)Arch		-  $(arch)$(tput setaf 7)"
	yarn package
	echo "$(tput setaf 2)[Uranium]:$(tput setaf 7) Packaging completed; starting the builder."
	yarn make
	echo "$(tput setaf 2)[Uranium]:$(tput setaf 7) Make completed, check your dist folder."
elif [ "$1" == 'test' ]; then
	echo "$(tput setaf 2)[Uranium]:$(tput setaf 7) Starting test"
	echo "$(tput setaf 2)OS		-  ${OS}$(tput setaf 7)"
	echo "$(tput setaf 2)Arch		-  $(arch)$(tput setaf 7)"
	echo "$(tput setaf 2)TestType	-  APP$(tput setaf 7)"
	yarn start
	echo "$(tput setaf 2)[Uranium]:$(tput setaf 7) Completed test session, successfully closed app."
elif [ "$1" == 'install' ]; then
	yarn install
	echo "$(tput setaf 2)[Uranium]:$(tput setaf 7) Package installation completed successfully."
fi

exit 1
