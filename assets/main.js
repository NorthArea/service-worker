// Make sure Sw are supported
if('serviceWorker' in navigator) {
    window.addEventListener('load', ()=> {
        navigator.serviceWorker.register('/sw_site.js')
        .then(reg => console.log('SW: registered'))
        .catch(e => console.log(`SW: error: ${e}`));
    });
} else {
    alert('SW: is not support');
}