const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./home-BoWCVmlf.js","./constants-D-ym1ySC.js","./loginAdmin-CrNTEl2x.js","./logout-Bp4xtVrQ.js","./higherBider-DIwdkbzu.js","./toastMsg-pxLBbmNp.js","./login-CvzmkorM.js","./register-rD7ba6dB.js","./post-DU-LwwTC.js","./singleListRead-2w0x1GBA.js","./listEdit-ITC-4Qxw.js","./listCreate-6gtAYP8Q.js","./profile-DRishxNg.js"])))=>i.map(i=>d[i]);
(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))l(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const r of t.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&l(r)}).observe(document,{childList:!0,subtree:!0});function u(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function l(e){if(e.ep)return;e.ep=!0;const t=u(e);fetch(e.href,t)}})();const E="modulepreload",w=function(c,s){return new URL(c,s).href},p={},i=function(s,u,l){let e=Promise.resolve();if(u&&u.length>0){const r=document.getElementsByTagName("link"),n=document.querySelector("meta[property=csp-nonce]"),_=n?.nonce||n?.getAttribute("nonce");e=Promise.allSettled(u.map(o=>{if(o=w(o,l),o in p)return;p[o]=!0;const d=o.endsWith(".css"),h=d?'[rel="stylesheet"]':"";if(!!l)for(let f=r.length-1;f>=0;f--){const m=r[f];if(m.href===o&&(!d||m.rel==="stylesheet"))return}else if(document.querySelector(`link[href="${o}"]${h}`))return;const a=document.createElement("link");if(a.rel=d?"stylesheet":E,d||(a.as="script"),a.crossOrigin="",a.href=o,_&&a.setAttribute("nonce",_),document.head.appendChild(a),d)return new Promise((f,m)=>{a.addEventListener("load",f),a.addEventListener("error",()=>m(new Error(`Unable to preload CSS for ${o}`)))})}))}function t(r){const n=new Event("vite:preloadError",{cancelable:!0});if(n.payload=r,window.dispatchEvent(n),!n.defaultPrevented)throw r}return e.then(r=>{for(const n of r||[])n.status==="rejected"&&t(n.reason);return s().catch(t)})};async function y(c=window.location.pathname){switch(c){case"/":await i(()=>import("./home-BoWCVmlf.js"),__vite__mapDeps([0,1,2,3,4,5]),import.meta.url);break;case"/auth/":await i(()=>import("./auth-B9M9EqBC.js"),[],import.meta.url);break;case"/auth/login/":await i(()=>import("./login-CvzmkorM.js"),__vite__mapDeps([6,1]),import.meta.url);break;case"/auth/register/":await i(()=>import("./register-rD7ba6dB.js"),__vite__mapDeps([7,1]),import.meta.url);break;case"/post/index.html":await i(()=>import("./post-DU-LwwTC.js"),__vite__mapDeps([8,9,1,2,3,5,4]),import.meta.url);break;case"/post/edit/":await i(()=>import("./listEdit-ITC-4Qxw.js"),__vite__mapDeps([10,9,1,5]),import.meta.url);break;case"/post/create/":await i(()=>import("./listCreate-6gtAYP8Q.js"),__vite__mapDeps([11,3,1,5]),import.meta.url);break;case"/profile/":await i(()=>import("./profile-DRishxNg.js"),__vite__mapDeps([12,3,1,4,5]),import.meta.url);break;default:await i(()=>import("./notFound-BNXFWLKC.js"),[],import.meta.url)}}await y(window.location.pathname);
