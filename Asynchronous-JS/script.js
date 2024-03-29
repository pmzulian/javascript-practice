'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

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
  // countriesContainer.style.opacity = 1;
};

const renderError = function(msg) {
  countriesContainer.insertAdjacentText('beforeend', msg);
  // countriesContainer.style.opacity = 1;
};

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
      console.log(response);
      return response.json();
    })
    .then(function(data) {
      console.log(data);
      renderCountry(data[0]);
    })
}; */

/* const getCountryData = function(country) {
  fetch(`https://restcountries.com/v2/name/${country}`)
    .then(response => response.json())
    .then(data => renderCountry(data[0]))
}; */

// getCountryData('latvia');

// Chaining Promises
/* const getCountryData = function(country) {

  // Country 1
  fetch(`https://restcountries.com/v2/name/${country}`)
    .then(response => {
      console.log(response);

      if(!response.ok)
        throw new Error(`Country not found (${response.status})`)

      return response.json();
    })
    .then(data => {
      renderCountry(data[0])
      // const neighbour = data[0].borders?.[0];
      const neighbour = 'none';
      console.log(fetch(`https://restcountries.com/v2/alpha/${neighbour}`));

      // Country 2
      return fetch(`https://restcountries.com/v2/alpha/${neighbour}`);
    })
    .then(response => {
      
      if(!response.ok)
      throw new Error(`Neighbour country not found (${response.status})`)
      
      return response.json();
    })
    .then(data => {renderCountry(data, 'neighbour'); console.log(data)})
    .catch(err => {
      console.error(err + '💥💥💥💥');
      renderError(`Something went wrong 💥💥 ${err.message}`)
    })
    .finally(() => {
      countriesContainer.style.opacity = 1;
    })
}; */

// Chaining Promises with getJSON function

const getJSON = function(url, errorMsg = 'Something went wrong') {
  return fetch(url).then(response => {
    if(!response.ok) {
      throw new Error(`${errorMsg} (${response.status})`)
    }
    return response.json();
  })
};

const getCountryData = function(country) {

  // Country 1
  getJSON(`https://restcountries.com/v2/name/${country}`, 'Country not found')
    .then(data => {
      renderCountry(data[0])
      const neighbour = data[0].borders?.[0];
      // const neighbour = 'none';
      if(!neighbour) throw new Error('No neighbour found');
      console.log(fetch(`https://restcountries.com/v2/alpha/${neighbour}`));

      // Country 2
      return getJSON(`https://restcountries.com/v2/alpha/${neighbour}`, 'Neighbour country does not exist');
    })
    .then(data => {renderCountry(data, 'neighbour'); console.log(data)})
    .catch(err => {
      console.error(err + '💥💥💥💥');
      renderError(`Something went wrong 💥💥 ${err.message}`)
    })
    .finally(() => {
      countriesContainer.style.opacity = 1;
    })
};

/* btn.addEventListener('click', function() {
  getCountryData('latvia');
}); */

// Country does not exist
// getCountryData('australia');

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

// getCountryAndAllNeighbours('switzerland');

// Event Loop in practice
/* console.log('Test start');
setTimeout(() => console.log('0 seconds timer'), 0);
Promise.resolve('Resolved promise 1').then(res => console.log(res));

Promise.resolve('Resolved promise 2').then(res => {
  for (let i = 0; i < 1000000000; i++){}
  console.log(res);
});

console.log('Test end'); */

// Building a Simple Promise
/* const lotteryPromise = new Promise(function(resolve, reject) {
  console.log('Lottery draw is happening');

  setTimeout(function() {
    if (Math.random() >= 0.5) {
      resolve('You win 🤑💵');
    } else {
      reject(new Error ('You lost your money 😣'));
    }
  }, 2000);

});

lotteryPromise
  .then(res => console.log(res))
  .catch(err => console.error(err)) */

/* const promise = new Promise(function(resolve, reject) {
  console.log('Lottery draw is happening');
});
console.log(promise); */

// Promisifying setTimeOut
/* const wait = function(seconds) {
  return new Promise(function(resolve) {
    setTimeout(resolve, seconds * 1000);
  });
};

wait(2)
  .then(() => {
    console.log('Wait for 2 seconds');
    return wait(3);
  })
  .then(() => {
    console.log('Wait for 3 seconds');
    return wait(4);
  })
  .then(() => {
    console.log('Wait for 4 seconds');
  }); */

// Promise.resolve('Resolved immediately').then(x => console.log(x));
// Promise.reject(new Error ('Rejected immediately')).catch(x => console.error(x));

//Geolocation API wiht Promises
/* navigator.geolocation.getCurrentPosition(
  position => console.log(position), 
  err => console.error(err)
); */

// console.log('Getting position');

const getPosition = function() {
  return new Promise(function(resolve, reject) {
    /* navigator.geolocation.getCurrentPosition(
      position => resolve(position), 
      err => reject(err)
    ); */
    navigator.geolocation.getCurrentPosition(resolve, reject);
  })
};

/* getPosition()
.then(pos => console.log(pos))
.catch(err => console.error(err)) */

/* const whereAmI = function () {

  getPosition()
    .then(pos => {
      const { latitude: lat, longitude: lng } = pos.coords;
      console.log(`Coords from getPosition: ${lat}, ${lng}`);

      return fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`)
      // return fetch(`https://api.bigdatacloud.net/data/reverse-geocode?latitude=${lat}&longitude=${lng}`);
    })
    .then(res => {
      if (!res.ok) throw new Error(`Problem with geocoding ${res.status}`);
      return res.json();
    })
    .then(data => {
      console.log(data);
      console.log(`You are in ${data.city}, ${data.country}`);
      return fetch(`https://restcountries.com/v2/name/${data.country}`);
    })
    .then(res => {
      if (!res.ok) throw new Error(`Country not found (${res.status})`);
      return res.json();
    })
    .then(data => renderCountry(data[0]))
    .catch(err => console.error(`${err.message} 💥`));
};

btn.addEventListener('click', whereAmI); */

// Async - Await
const whereAmI = async function(country) {
  try{
    // Geolocation
    const pos = await getPosition();
    const { latitude: lat, longitude: lng } = pos.coords;

    // Reverse geocoding
    const resGeo = await fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`);
    if(!resGeo.ok) throw new Error('Problem getting locations data');

    const dataGeo = await resGeo.json();
    // console.log(dataGeo);

    // Conuntry data
    // fetch(`https://restcountries.com/v2/name/${country}`)
    //   .then(res => console.log(res));

    const res = await fetch(`https://restcountries.com/v2/name/${dataGeo.country}`);
    if(!res.ok) throw new Error('Problema getting country');

    const data= await res.json();
    // console.log(data);
    renderCountry(data[0]);

    return `You are in ${dataGeo.city}, ${dataGeo.country}`;
    } catch (err) {
    console.error(`${err} 💥💥💥`);
    renderError(`Something went wrond ${err.message}`);

    // Reject promise from async function
    throw err;
  }
};

// console.log('1: Will get location');
// const city = whereAmI();
// console.log(city);
/* whereAmI()
  .then(city => console.log(city))
  .catch(err => console.error(`2: ${err.message} 💥💥`))
  .finally(() => console.log('3: Finished getting location')); */

/* (async function() {
  console.log('1: Will get location');
  try {
    const city = await whereAmI();
    console.log(city);
  } catch (error) {
    console.error(`2: ${error.message} 💥💥`)
  } 
  console.log('3: Finished getting location');
})();
 */

// Running promises in parallel
/* const get3Countries = async function(c1, c2, c3) {
  try {
    //  const [data1] = await getJSON(`https://restcountries.com/v2/name/${c1}`);
    //  const [data2] = await getJSON(`https://restcountries.com/v2/name/${c2}`);
    //  const [data3] = await getJSON(`https://restcountries.com/v2/name/${c3}`);

     const data = await Promise.all([
      getJSON(`https://restcountries.com/v2/name/${c1}`),
      getJSON(`https://restcountries.com/v2/name/${c2}`),
      getJSON(`https://restcountries.com/v2/name/${c3}`)
     ]);

     console.log(data.map(country => country[0].capital));
     
  } catch (error) {
    console.log(error);
  }
};

get3Countries('netherlands', 'switzerland', 'sweden'); */

// Promise.race()
/* (async function() {
  const res = await Promise.race([
    getJSON(`https://restcountries.com/v2/name/poland`),
    getJSON(`https://restcountries.com/v2/name/brazil`),
    getJSON(`https://restcountries.com/v2/name/peru`)
]);
  console.log(res[0]);
})(); */

/* const timeout = function(seconds) {
  return new Promise(function(_, reject) {
    setTimeout(function() {
      reject(new Error('Request took to long'));
    }, seconds * 1000)
  })
}

Promise.race([
  getJSON(`https://restcountries.com/v2/name/bhutan`),
  timeout(1)
])
  .then(res => console.log(res[0]))
  .catch(err => console.error(err)); */

// Promise.allSettled
Promise.allSettled([
  Promise.resolve('Success'),
  Promise.reject('Error'),
  Promise.resolve('Another success')
])
  .then(res => console.log(res));

Promise.all([
  Promise.resolve('Success'),
  Promise.reject('Error from rejected promise'),
  Promise.resolve('Another success')
])
  .then(res => console.log(res));

// Promise.any
Promise.any([
  Promise.resolve('Success'),
  Promise.reject('Error from rejected promise'),
  Promise.resolve('Another success')
])
  .then(res => console.log(res));