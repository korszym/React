if(!self.define){let e,s={};const i=(i,n)=>(i=new URL(i+".js",n).href,s[i]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=i,e.onload=s,document.head.appendChild(e)}else e=i,importScripts(i),s()})).then((()=>{let e=s[i];if(!e)throw new Error(`Module ${i} didn’t register its module`);return e})));self.define=(n,r)=>{const c=e||("document"in self?document.currentScript.src:"")||location.href;if(s[c])return;let o={};const d=e=>i(e,c),t={module:{uri:c},exports:o,require:d};s[c]=Promise.all(n.map((e=>t[e]||d(e)))).then((e=>(r(...e),o)))}}define(["./workbox-3e911b1d"],(function(e){"use strict";self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"assets/index-DkCX_X56.js",revision:null},{url:"assets/index-sM8qdn5R.css",revision:null},{url:"assets/workbox-window.prod.es5-D5gOYdM7.js",revision:null},{url:"favicon.svg",revision:"71dcfd191507c31dc79efe3341dfa3b9"},{url:"icons/192x192.png",revision:"c0d0524912a1e01d4084e52a2aa0c125"},{url:"icons/512x512.png",revision:"0b8ad70cc9417c0bbf899a61c25ba709"},{url:"index.html",revision:"44e7d3ed1d5576df599a320033a8d57b"},{url:"screenshots/640x480.png",revision:"f8ad827039f358417b0de3ff12dfd718"},{url:"favicon.svg",revision:"71dcfd191507c31dc79efe3341dfa3b9"},{url:"icons/192x192.png",revision:"c0d0524912a1e01d4084e52a2aa0c125"},{url:"icons/512x512.png",revision:"0b8ad70cc9417c0bbf899a61c25ba709"},{url:"manifest.webmanifest",revision:"c8a2d2c6a9c16ca315e35c15fbc3de70"}],{}),e.cleanupOutdatedCaches(),e.registerRoute(new e.NavigationRoute(e.createHandlerBoundToURL("index.html")))}));
