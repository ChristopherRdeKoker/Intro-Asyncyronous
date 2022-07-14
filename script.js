// 'use strict';

// const btn = document.querySelector('.btn-country');
// const countriesContainer = document.querySelector('.countries');

// ///////////////////////////////////////

// // const getCountryData = function (country) {
// //   const request = new XMLHttpRequest();
// //   request.open('GET', `https://restcountries.com/v2/name/${country}`);
// //   request.send();

// //   request.addEventListener('load', function () {
// //     const [data] = JSON.parse(this.responseText);
// //     console.log(data);

// //     const html = `<article class="country">
// //     <img class="country__img" src="${data.flag}" />
// //     <div class="country__data">
// //         <h3 class="country__name">${data.name}</h3>
// //         <h4 class="country__region">${data.region}</h4>
// //         <p class="country__row"><span>👫${(+data.population / 1000000).toFixed(
// //           1
// //         )}m</span></p>
// //         <p class="country__row"><span>🗣️${data.languages[0].name}</span></p>
// //         <p class="country__row"><span>💰${data.currencies[0].name}</span></p>
// //     </div>
// // </article>`;

// //     countriesContainer.insertAdjacentHTML('beforeend', html);
// //     countriesContainer.style.opacity = 1;
// //   });
// // };

// // getCountryData('south africa');
// // getCountryData('portugal');
// // getCountryData('usa');

// /////////////////////////////////////////////////////
const renderCountry = function (data, className = '') {
  const html = `<article class="country ${className}">
    <img class="country__img" src="${data.flag}" />
    <div class="country__data">
        <h3 class="country__name">${data.name}</h3>
        <h4 class="country__region">${data.region}</h4>
        <p class="country__row"><span>👫${(+data.population / 1000000).toFixed(
          1
        )}m</span></p>
        <p class="country__row"><span>🗣️${data.languages[0].name}</span></p>
        <p class="country__row"><span>💰${data.currencies[0].name}</span></p>
    </div>
</article>`;

  countriesContainer.insertAdjacentHTML('beforeend', html);
  countriesContainer.style.opacity = 1;
};

// const getCountryDataAndNeighbour = function (country) {
//   //AJAX call country 1
//   const request = new XMLHttpRequest();
//   request.open('GET', `https://restcountries.com/v2/name/${country}`);
//   request.send();

//   request.addEventListener('load', function () {
//     const [data] = JSON.parse(this.responseText);
//     console.log(data);

//     //render country 1
//     renderCountry(data);

//     //get neighbour country (2)
//     const [neighbour] = data.borders;

//     if (!neighbour) return;

//     //AJAX call country 2
//     const request2 = new XMLHttpRequest();
//     request2.open('GET', `https://restcountries.com/v2/alpha/${neighbour}`);
//     request2.send();

//     request2.addEventListener('load', function () {
//       //   console.log(this.responseText);
//       const data2 = JSON.parse(this.responseText);
//       console.log(data2);
//       renderCountry(data2, 'neighbour');
//     });
//   });
// };

// // getCountryDataAndNeighbour('portugal');
// getCountryDataAndNeighbour('south africa');

('use strict');

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

const renderError = function (msg) {
  countriesContainer.insertAdjacentText('beforeend', msg);
  countriesContainer.style.opacity = 1;
};
//

const getCountryData = function (country) {
  // Country 1
  fetch(`https://restcountries.com/v2/name/${country}`)
    .then(response => response.json())
    .then(data => {
      renderCountry(data[0]);
      const neighbour = data[0].borders[0];

      if (!neighbour) return;

      //country 2
      return fetch(`https://restcountries.com/v2/alpha/${neighbour}`);
    })
    .then(response => response.json())
    .then(data => renderCountry(data, 'neighbour'))
    .catch(err => {
      console.error(`CL error bro`);
      renderError(`Main page error:\nSomething went wrong.\n ${err.message}`);
    });
};

// getCountryData('south africa');

/////////////////////////////////////
//coding challenge #1
// const lat = -33.915;
// const lng = 18.423;

const whereAmI = function (lat, lng) {
  fetch(
    `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}&localityLanguage=en`
  )
    .then(response => response.json())
    .then(data => {
      console.log(data);
      console.log(`You are in ${data.city}, ${data.countryName}.`);
      getCountryData(data.countryName);
    })
    .catch(err => {
      console.error(`Some error bro: ${err.message}⭐`);
    });
};

whereAmI('-33.9258400', '18.4232200'); //CPT
whereAmI(52.508, 13, 138); //Germany
whereAmI(19.037, 72.873); //Mumbai india? err here
