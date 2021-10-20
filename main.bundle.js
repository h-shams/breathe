(()=>{"use strict";const e={anxiety:{name:"Anxiety",times:{in:4,hold:7,out:8},count:4},anger:{name:"Anger",times:{in:2,hold:3.5,out:4},count:5},irritation:{name:"irritation",times:{in:2,hold:3.5,out:4},count:5},scaring:{name:"Scaring",times:{in:2,hold:3.5,out:4},count:5},saddnes:{name:"Saddnes",times:{in:2,hold:3.5,out:4},count:5}},t=document.querySelector(".spinner"),o=document.querySelectorAll(".spinner__spot"),n=document.querySelector(".spinner__content-inner"),r=document.querySelector(".spinner__content-text--old"),s=document.querySelector(".spinner__content-text--new"),i=document.querySelector(".timer"),c=document.querySelector(".spinner-button-wrapper"),a=document.querySelector(".states-section");let l,u,d,m,p=null,y=null;function v(e){r.innerHTML!==e&&(s.innerHTML=e,n.classList.add("spinner__content-inner--text-change"),setTimeout((()=>{r.innerHTML=e,n.classList.remove("spinner__content-inner--text-change")}),250))}function g(e){let t=Math.floor(e/60);t<10&&(t="0"+t);let o=Math.floor(e)%60;o<10&&(o="0"+o);const n=`PT${t}M${o}S`;i.setAttribute("datetime",n),i.innerHTML=`${t}:${o}`}let f=!1,h=null;function L(){cancelAnimationFrame(h),t.style.setProperty("--grow-time","1.5s"),t.classList.remove("spinner--spin"),f=!1,_(),v("start"),b("close"),S("visible")}function _(){t.classList.remove("spinner--grow")}function b(e){switch(e){case"open":c.classList.add("spinner-button-wrapper--expand");break;case"close":c.classList.remove("spinner-button-wrapper--expand")}}function S(e){switch(e){case"hidden":a.classList.add("states-section--hidden");break;case"visible":a.classList.remove("states-section--hidden")}}const q=document.querySelector(".overlay");function w(e){!function(e){const t=e.querySelector(".modal__button"),o=e.querySelector(".modal__body");t.removeEventListener("click",w),o.removeEventListener("scroll",P),e.classList.remove("modal--open"),q.classList.remove("overlay--open")}(e.target.parentElement.parentElement)}function P(e){const t=e.target;E(t.parentElement,t)}function E(e,t){const o=t.scrollHeight-t.clientHeight,n=t.scrollTop,r=o<50?o/2:50,s=e.style;0!==o&&(n<r?(s.setProperty("--top-opacity",n/r),"1"!==s.getPropertyValue("--bottom-opacity")&&s.setProperty("--bottom-opacity",1)):n>o-r?(s.setProperty("--bottom-opacity",(-n+o)/r),"1"!==s.getPropertyValue("--top-opacity")&&s.setProperty("--top-opacity",1)):("1"!==s.getPropertyValue("--bottom-opacity")&&s.setProperty("--bottom-opacity",1),"1"!==s.getPropertyValue("--top-opacity")&&s.setProperty("--top-opacity",1)))}"serviceWorker"in navigator?navigator.serviceWorker.register("./sw.bundle.js").then((e=>{console.log("service worker successfully registred")})).catch((e=>{console.log("error while regitering service worker"),console.log(e)})):console.log("service worker is not available");const k=[...document.querySelectorAll(".state")];k.forEach((e=>{e.addEventListener("click",x)}));let M=null;function x(n){const r=n.target.dataset.value;M=r,n.target.classList.add("state--active"),k.forEach((e=>{e.dataset.value!==r&&e.classList.remove("state--active")})),function(t){if(!e[t])return p=null,v("choose a state"),null;p!==t&&(L(),p=t,y=e[t],l=y.times.in,u=y.times.hold,d=y.times.out,m=l+u+d)}(M),function(){const e=[0,l/m*360,(l+u)/m*360];o.forEach(((t,o)=>{const n=`rotate(${e[o]}deg)`;let r;if(t.style.transform){const e=/rotate\(-?\d{1,3}(\.\d+)?deg\)/;r=t.style.transform.replace(e,n)}else r=getComputedStyle(t).transform+n;t.style.transform=r})),t.style.setProperty("--rotate-time",m+"s"),t.style.setProperty("--grow-time",.93*Math.min(l,d)+"s"),v("start"),g(m*y.count)}()}document.querySelector(".spinner__content-inner").addEventListener("click",(()=>{!function(){if(!y)return;if(f)return;let e,o,n=1;f=!0,t.classList.add("spinner--spin"),b("open"),S("hidden"),requestAnimationFrame((function r(s){void 0===e&&(e=s),void 0===o&&(o=s);const i=(s-e)/1e3,c=Math.floor((s-o)/1e3);g(Math.floor(m*y.count-c)),i>0&&i<l?(t.style.setProperty("--grow-time",.93*l+"s"),v("breathe in"),t.classList.add("spinner--grow")):l<i&&i<l+u?v("hold"):(t.style.setProperty("--grow-time",.93*d+"s"),v("breathe out"),_()),i>=m&&(e=s,n++),n>y.count&&L(),f&&(h=requestAnimationFrame(r))}))}()})),document.querySelector(".spinner-button").addEventListener("click",(()=>{L()}));const A=document.querySelector("#about-modal");document.querySelector(".header__about-button").addEventListener("click",(()=>{!function(e){const t=e.querySelector(".modal__button"),o=e.querySelector(".modal__overlay"),n=e.querySelector(".modal__body");t.addEventListener("click",w),n.addEventListener("scroll",P),E(o,n),e.classList.add("modal--open"),q.classList.add("overlay--open")}(A)}))})();