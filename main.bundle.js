(()=>{"use strict";"serviceWorker"in navigator?navigator.serviceWorker.register("./sw.bundle.js").then((e=>{console.log("service worker successfully registred")})).catch((e=>{console.log("error while regitering service worker"),console.log(e)})):console.log("service worker is not available"),console.log("INDEX.JS")})();