if(!self.define){let e,i={};const s=(s,n)=>(s=new URL(s+".js",n).href,i[s]||new Promise((i=>{if("document"in self){const e=document.createElement("script");e.src=s,e.onload=i,document.head.appendChild(e)}else e=s,importScripts(s),i()})).then((()=>{let e=i[s];if(!e)throw new Error(`Module ${s} didn’t register its module`);return e})));self.define=(n,r)=>{const o=e||("document"in self?document.currentScript.src:"")||location.href;if(i[o])return;let c={};const d=e=>s(e,o),f={module:{uri:o},exports:c,require:d};i[o]=Promise.all(n.map((e=>f[e]||d(e)))).then((e=>(r(...e),c)))}}define(["./workbox-3e911b1d"],(function(e){"use strict";self.addEventListener("message",(e=>{e.data&&"SKIP_WAITING"===e.data.type&&self.skipWaiting()})),e.clientsClaim(),e.precacheAndRoute([{url:"assets/index-D6wECpY7.js",revision:null},{url:"assets/index-DiwrgTda.css",revision:null},{url:"favicon.svg",revision:"71dcfd191507c31dc79efe3341dfa3b9"},{url:"icons/192x192.png",revision:"1bfba70197d6d710563fb30e9e7e3cc4"},{url:"icons/512x512.png",revision:"91e56563162d6ca3c2b54fa77b4960eb"},{url:"index.html",revision:"56613afbe326d752bc2f0ae0732bc54e"},{url:"screenshots/640x480.png",revision:"f8ad827039f358417b0de3ff12dfd718"},{url:"favicon.svg",revision:"71dcfd191507c31dc79efe3341dfa3b9"},{url:"icons/192x192.png",revision:"1bfba70197d6d710563fb30e9e7e3cc4"},{url:"icons/512x512.png",revision:"91e56563162d6ca3c2b54fa77b4960eb"},{url:"manifest.webmanifest",revision:"57757aa2a96e3f005cdf03b545a99e8e"}],{}),e.cleanupOutdatedCaches(),e.registerRoute(new e.NavigationRoute(e.createHandlerBoundToURL("index.html")))}));
