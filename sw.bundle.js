(()=>{const e=[{'revision':null,'url':'2947082b581b46ffd338.png'},{'revision':null,'url':'90c045b7547db9275807.ttf'},{'revision':null,'url':'c2bf1bb61db6c8149ae8.ttf'},{'revision':null,'url':'cb9fbbfd0e2fa1181563.jpg'},{'revision':null,'url':'fbdecfce69a96dc73e2a.ttf'},{'revision':'98edc5f0ea774c051ab055533ac3474b','url':'icons/favicon-16x16.png'},{'revision':'e8b2af30133c273500cecdc64bc9f827','url':'icons/favicon-32x32.png'},{'revision':'5b9c0e1a3404086cd613642f71593eb6','url':'icons/favicon-48x48.png'},{'revision':'db9b66009d943a673347853392e55455','url':'icons/favicon.ico'},{'revision':'0124d5827951d7535717cfa9be848822','url':'index.html'},{'revision':'d9d4acbb3afe0b45b31cbd5432981bb6','url':'main.bundle.js'},{'revision':'0294a1b453d9ecc6aa33979e91a93eac','url':'main.css'}],t="breathe-app-main-cache",n="https://h-shams.github.io/breathe/";function l(e){return e.slice(n.length)}self.addEventListener("install",(n=>{var l,a;console.log("SW: install"),n.waitUntil((l=e,a=t,caches.open(a).then((e=>{const t=l.map((e=>e.url));return e.addAll(t).then((e=>{console.log(`SW: precache ${t.length} entries in "${a}"`)})).catch((e=>console.log(e)))}))).then((e=>self.skipWaiting())))})),self.addEventListener("activate",(t=>{console.log("SW: activate"),t.waitUntil(function(e,t){const n=e.map((e=>e.url));return caches.open("breathe-app-main-cache").then((e=>e.keys().then((t=>Promise.all(t.map((t=>{const a=l(t.url);return!n.includes(a)&&(console.log(`SW: delete "${a}"`),e.delete(a))})))))))}(e).then((e=>self.clients.claim())))})),self.addEventListener("fetch",(t=>{const a=t.request.url===n?n+"index.html":t.request.url;t.respondWith(function(e,t,n){return caches.open("breathe-app-main-cache").then((t=>t.match(e).then((a=>a||fetch(e).then((a=>(a.status.toString().match(/2\d{2}/)&&n.map((e=>e.url)).includes(l(e))&&t.put(e,a.clone()),a)))))))}(a,0,e))}))})();