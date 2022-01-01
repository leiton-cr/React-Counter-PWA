/* Elementos a cargar en la cache */
const CACHE_ELEMENTS = [
    "./",
    "https://kit.fontawesome.com/77ad47eba2.js",
    "https://unpkg.com/@babel/standalone/babel.min.js",
    "https://unpkg.com/react@17/umd/react.development.js",
    "https://unpkg.com/react-dom@17/umd/react-dom.development.js",
    "./style.css",
    "./index.jsx",
    "./components/Contador.jsx",
    "./assets/images/favicon.png"
];

/* Nombre de la cache a utilizar */
const CACHE_NAME = "v1_Cache_React-Contador";

/* Caches permitidas */
const CACHE_WHITE_LIST = [CACHE_NAME];

/*  Primer parte del ciclo de vida
    Instalacion de no existir el service worker
*/
self.addEventListener("install", e =>
    e.waitUntil(caches.open(CACHE_NAME)
        .then(cache => cache.addAll(CACHE_ELEMENTS))
        .then(() => self.skipWaiting())
        .catch(console.log)
    )
);

/*  Segunda parte del ciclo de vida 
    Revisamos por versiones de cache antiguas
*/
self.addEventListener("activate", (e) =>
    e.waitUntil(caches.keys()
        .then(cacheNames =>
            // Si no esta incluido en la white list se elimina.
            cacheNames.map(cache => !CACHE_WHITE_LIST.includes(cache) && caches.delete(cache)))
        .then(() => self.clients.claim())
        .catch(console.log)
    )
);

/*  Tercera parte del ciclo de vida 
    Busca primero los recursos solicitados en la caché.
*/
self.addEventListener("fetch", (e) => {
    e.respondWith(caches.match(e.request)
    .then(res => res ? res : fetch(e.request) ));
});