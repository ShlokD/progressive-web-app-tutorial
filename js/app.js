var carservice = require('./carservice.js');
var swRegister = require('./swRegister.js');

window.pageEvents = {
  loadCarPage: function (carId) {
    carservice.loadCarPage(carId);
  },
  loadMore: function() {
    carservice.loadMoreRequest();
  }
}

carservice.loadMoreRequest();