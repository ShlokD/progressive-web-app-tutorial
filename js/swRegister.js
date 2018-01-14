define([], function () {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('sw.js')
    .then(function (swRegistration) {
      var serviceWorker;

      if (swRegistration.installing) {
        serviceWorker = swRegistration.installing;
      } else if (swRegistration.waiting) {
        serviceWorker = swRegistration.waiting
      } else if (swRegistration.active) {
        serviceWorker = swRegistration.active;
      }

      
    })
    .catch(function (err) {
      console.error(err);
    })
  }
});