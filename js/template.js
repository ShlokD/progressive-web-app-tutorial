define([], function () {
  function generateCarCard(car) {
    var template = document.querySelector("#car-card").innerHTML;
    var title = car.brand + ' '+car.model+' '+car.year;
    template = template.replace('{{title}}', title);
    template = template.replace('{{image}}', car.image);
    template = template.replace('{{price}}', car.price);
    template = template.replace('{{details_id}}', car.details_id);
    return template;
  }


  function appendCars(cars) {
    document.querySelector('#first-load').innerHTML = '';
    var carsHTML = cars.reduce(function (acc, car) {
      return acc += generateCarCard(car.value);
    }, '')
    document.querySelector('.mdl-grid').insertAdjacentHTML('beforeend', carsHTML);
  }

  return {
    appendCars: appendCars
  }
})