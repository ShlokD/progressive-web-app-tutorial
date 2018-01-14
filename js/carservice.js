define(['./template.js', './clientStorage.js'], function (template, clientStorage) {
  var apiUrlPath = "http://bstavroulakis.com/pluralsight/courses/progressive-web-apps/service/";
  var apiUrlLatest = apiUrlPath + "latest-deals.php"
  var apiUrlCar = apiUrlPath + 'car.php?carId=';

  function loadMore() {
    clientStorage.getCars().then(function(cars) {
      template.appendCars(cars);   
    });
  }

  function loadMoreRequest() {
    fetchPromise().then(function() {
      loadMore();
    })
  }

  function fetchPromise() {
    return new Promise(function (resolve, reject) {
      var lastCarId = clientStorage.getLastCarId();
      var appendString = lastCarId !== 0 ? '?carId='+lastCarId : '';
      fetch(apiUrlLatest + appendString)
      .then(function(response) {
        return response.json();
      })
      .then(function(data) {
        clientStorage.addCars(data.cars)
        .then(function() {
          resolve();
        });
      })
      .catch(function(error) {
        resolve(error);
      });

      setTimeout(function() {
        resolve();
      }, 3000)
    })
  }

  function loadCarPage(carId) {
    fetch(apiUrlCar + carId)
    .then(function(response) {
      return response.text()
    })
    .then(function(details) {
      document.body.insertAdjacentHTML('beforeend', details);
    })
    .catch(function(err){
      console.error(err);
    })
  }

  return {
    loadMoreRequest: loadMoreRequest,
    loadCarPage: loadCarPage
  }
});