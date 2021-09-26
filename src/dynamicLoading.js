const dynamicLoad = (url) => {
    var script = document.createElement('script');
    script.setAttribute('src', url);
    document.head.appendChild(script);
};
export default dynamicLoad;
