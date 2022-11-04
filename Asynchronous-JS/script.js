'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

///////////////////////////////////////
/* const getCountryData = function (country) {
    const request = new XMLHttpRequest();
    request.open('GET', 'https://restcountries.com/v2/name/' + country);
    request.send();

    request.addEventListener('load', function() {
    const [data] = JSON.parse(this.responseText);
    console.log(data);

    const html = `<article class="country">
    <img class="country__img" src="${data.flag}" />
    <div class="country__data">
      <h3 class="country__name">${data.name}</h3>
      <h4 class="country__region">${data.region}</h4>
      <p class="country__row"><span>👫</span>${(+data.population / 1000000).toFixed(1)}</p>
      <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
      <p class="country__row"><span>💰</span>${data.currencies[0].name}</p>
    </div>
  </article>`;

  countriesContainer.insertAdjacentHTML('beforeend', html);
  countriesContainer.style.opacity = 1;
    });
}; */

// getCountryData('turkey');
// getCountryData('brazil');
// getCountryData('germany');

const renderCountry = function(data, className = '') {
    const html = `<article class="country ${className}">
    <img class="country__img" src="${data.flag}" />
    <div class="country__data">
      <h3 class="country__name">${data.name}</h3>
      <h4 class="country__region">${data.region}</h4>
      <p class="country__row"><span>👫</span>${(+data.population / 1000000).toFixed(1)}</p>
      <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
      <p class="country__row"><span>💰</span>${data.currencies[0].name}</p>
    </div>
  </article>`;

  countriesContainer.insertAdjacentHTML('beforeend', html);
  countriesContainer.style.opacity = 1;
}

const getCountryAndNeighbour = function (country) {

  // AJAX call country 1
  const request = new XMLHttpRequest();
  request.open('GET', 'https://restcountries.com/v2/name/' + country);
  request.send();

  request.addEventListener('load', function() {
    const [data] = JSON.parse(this.responseText);
    console.log(data);

    // Render conuntry 1
    renderCountry(data);

    // Get neighbour country
    const neighbour = data.borders?.[0];
    if (!neighbour) return;

      // AJAX call country 2
      const request2 = new XMLHttpRequest();
      request2.open('GET', 'https://restcountries.com/v2/alpha/' + neighbour);
      request2.send();

      request2.addEventListener('load', function() {
        const data2 = JSON.parse(this.responseText);
        console.log(data2);

        // Render conuntry 2
        renderCountry(data2, 'neighbour');
      });
  });
};

// getCountryAndNeighbour('turkey');

/* setTimeout(() => {
  console.log('One second passed');

  setTimeout(() => {
    console.log('Two seconds passed');

    setTimeout(() => {
      console.log('Three seconds passed');

      setTimeout(() => {
        console.log('Four seconds passed');
      }, 1000);

    }, 1000);
  
  }, 1000);

}, 1000); */

// const request = fetch('https://restcountries.com/v2/name/belarus');
// console.log(request);

/* const getCountryData = function(country) {
  fetch(`https://restcountries.com/v2/name/${country}`)
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      console.log(data);
      renderCountry(data[0]);
    })
}; */

const getCountryData = function(country) {
  fetch(`https://restcountries.com/v2/name/${country}`)
    .then(response => response.json())
    .then(data => {
      renderCountry(data[0])
      const neighbour = data[0].borders?.[0];
      console.log(fetch(`https://restcountries.com/v2/alpha/${neighbour}`));
      return fetch(`https://restcountries.com/v2/alpha/${neighbour}`);
    })
    .then(response => response.json())
    .then(data => {renderCountry(data, 'neighbour'); console.log(data)})
};

// getCountryData('latvia');

// For more than two neighbour countries
const getCountryAndAllNeighbours = function(country) {
  fetch(`https://restcountries.com/v2/name/${country}`)
  .then(response => response.json())
  .then(data => {
    renderCountry(data[0])

    const neighbours = data[0].borders;
    console.log(neighbours);
    
    const promises = neighbours.map(element => {
      return fetch(`https://restcountries.com/v2/alpha/${element}`)
    })
    console.log('Promises' , promises )
    for (const iterator of promises) {
      iterator
      .then(response => response.json())
      .then(data => renderCountry(data, 'neighbour'))
    }
  })
};

getCountryAndAllNeighbours('switzerland');