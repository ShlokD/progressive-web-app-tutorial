'use strict'
var carDealsCacheName = 'carDealsCacheV1';
var carDealsCachePageName = 'carDealsCachePagesV1';
var carDealsCacheImageName = 'carDealsCacheImagesV1';

var carDealsCacheFiles = [
  'js/app.js',
  'js/carservice.js',
  'js/clientStorage.js',
  'js/swRegister.js',
  'js/template.js',
  './'
];

var latestPath = '/pluralsight/courses/progressive-web-apps/service/latest-deals.php';
var imagePath = '/pluralsight/courses/progressive-web-apps/service/car-image.php';
var carPath = '/pluralsight/courses/progressive-web-apps/service/car.php';

self.addEventListener('install', function (event) {
  console.log("INSTALLED SERVICE WORKER");
  event.waitUntil(
    caches.open(carDealsCacheName)
    .then(function (cache) {
      return cache.addAll(carDealsCacheFiles);
    })
  );
  
});

self.addEventListener('activate', function (event) {
  event.waitUntil(
    caches.keys()
    .then(function (cacheKeys) {
      var deletePromises = cacheKeys.map((cacheKey) => {
        if (cacheKey !== carDealsCacheName && cacheKey !== carDealsCachePageName && cacheKey !== carDealsCacheImageName) {
          return caches.delete(cacheKey)
        }
      });
      return Promise.all(deletePromises);
    })
  )
});

self.addEventListener('fetch', function (event) {
 var requestUrl = new URL(event.request.url);
 var requestPath = requestUrl.pathname;
 var fileName = requestPath.substring(requestPath.lastIndexOf('/') + 1);

 if (requestPath === latestPath || fileName === "sw.js") {
   event.respondWith(fetch(event.request));
 } else if (requestPath === imagePath) {
   event.respondWith(networkFirstStrategy(event.request));
 } else {
   event.respondWith(cacheFirstStrategy(event.request));
 }
});


function cacheFirstStrategy(request) {
  return caches.match(request).then(function (cacheRequest) {
    return cacheRequest || fetchRequestAndCache(request)
  });
}

function networkFirstStrategy (request) {
  return fetchRequestAndCache(request).catch(function (error) {
    return caches.match(request);
  });
}

function fetchRequestAndCache (request) {
  return fetch(request).then(function (networkResponse) {
    caches.open(getCacheName(request)).then(function (cache) {
      cache.put(request, networkResponse);
    });
    return networkResponse.clone();
  });
}

function getCacheName(request) {
  var requestUrl = new URL(request.url);
  var requestPath = requestUrl.pathname;

  if (requestPath === imagePath) {
    return carDealsCacheImageName;
  } else if (requestPath === carPath) {
    return carDealsCachePageName
  } else {
    return carDealsCacheName;
  }
}