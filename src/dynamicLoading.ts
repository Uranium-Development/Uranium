const dynamicLoad = (url: string) => {
	var script: HTMLElement = document.createElement('script');
	script.setAttribute('src', url);

	document.head.appendChild(script);
}


export default dynamicLoad;
