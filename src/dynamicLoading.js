"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dynamicLoad = (url) => {
    var script = document.createElement('script');
    script.setAttribute('src', url);
    document.head.appendChild(script);
};
exports.default = dynamicLoad;
