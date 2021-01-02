const cacheName = 'v1';
const cacheAssets = [
    'index.html',
    'about.html',
    'assets/bootstrap.min.css',
    'assets/main.js'
]

// Call install event
self.addEventListener('install', event => {
    console.log('SW: installed');

    event.waitUntil(
        caches.open(cacheName)
        .then(cache => {
            console.log('SW: caching files');
            cache.addAll(cacheAssets);
        })
        .then(() => {
            self.skipWaiting();
        })
        .catch(e => {
            console.log(`SW: error: ${e}`);
        })
    );
});

// Call activate event
self.addEventListener('activate', event => {
    console.log('SW: activated');

    event.waitUntil(
        caches.keys()
        .then(cacheNames => {
            return Promise.all(
                cacheNames.map(cache => {
                    if(cache !== cacheName) {
                        console.log('SW: clearing old cache');
                        return caches.delete(cache);
                    }
                })
            );
        })
        .catch(e => {
            console.log(`SW: error: ${e}`);
        })
    );
});

// Call fetch event
self.addEventListener('fetch', event => {
    console.log('SW: fetched');
    event.respondWith(
        fetch(event.request).catch(() => caches.match(event.request))
    );
});