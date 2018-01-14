define([], function () {

  var lastCarId = 0;

  function addCars(cars) {
    return new Promise(function (resolve, reject) {
      if (localStorage) {
        localStorage.setItem('cars', JSON.stringify(cars));
      }
      resolve();
    });
  }

  function getCars() {
    return new Promise(function (resolve, reject) {
      try {
        if (localStorage) {
          var localCars = JSON.parse(localStorage.getItem('cars'));
          var localCarsArr = Object.keys(localCars).map(function (key) { return localCars[key]; });
          lastCarId = localCarsArr.length > 0 ? localCarsArr[localCarsArr.length - 1].key : 0;
          resolve(localCars);
        }
      } catch (e) {
        reject(e)
      }
    })
  }

  function getLastCarId() {
    return lastCarId;
  }

  return {
    addCars: addCars,
    getCars: getCars,
    getLastCarId: getLastCarId
  }
})