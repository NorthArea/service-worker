const cacheName = 'v2';

// Call install event
self.addEventListener('install', event => {
    console.log('SW: installed');
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
        fetch(event.request)
        .then(res => {
            // Make copy\clone
            const resClone = res.clone();
            // Save to cache
            caches.open(cacheName)
            .then(cache => {
                cache.put(event.request, resClone);
            });
            return res;
        })
        .catch(() => caches.match(event.request).then(res => res))
    );
});