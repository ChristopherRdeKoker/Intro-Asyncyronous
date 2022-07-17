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
    .then(response => {
      if (!response) throw new Error(`New throw error 🌲`);
      return response.json();
    })
    .then(data => {
      renderCountry(data[0]);
      const neighbour = data[0].borders[0];

      if (!neighbour) return;

      //country 2
      return fetch(`https://restcountries.com/v2/alpha/${neighbour}`);
    })
    .then(response => {
      if (!response) throw new Error(`New throw error 🌲`);
      return response.json();
    })
    .then(data => renderCountry(data, 'neighbour'))
    .catch(err => {
      console.error(`CL error bro`);
      renderError(`${err.message}😥🌟🐉🐉😥`);
    });
};

// getCountryData('south africa');

/////////////////////////////////////
//coding challenge #1
// const lat = -33.915;
// const lng = 18.423;

// const whereAmI = function (lat, lng) {
//   fetch(
//     `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}&localityLanguage=en`
//   )
//     .then(response => {
//       // console.log(response);
//       if (!response) throw new Error(`Issue with geocoding ${response.status}`);
//       return response.json();
//     })
//     .then(data => {
//       console.log(data);
//       console.log(`You are in ${data.city}, ${data.countryName}.`);
//       getCountryData(data.countryName);
//     })
//     .catch(err => console.log(`${err.message}⭐`));
// };
//////////////////////////////////
// whereAmI('-33.9258400', '18.4232200'); //CPT
// whereAmI(52.508, 13, 138); //Germany
// whereAmI(19.037, 72.873); //Mumbai india? err here
// whereAmI(19.037, 72.873); //Mumbai india? err here

// const whereAmI = function (lat, lng) {
//   fetch(
//     `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}&localityLanguage=en`
//   )
//     .then(res => {
//       if (!res.ok) throw new Error(`Problem with geocoding ${res.status}`);
//       return res.json();
//     })
//     .then(data => {
//       console.log(data);
//       console.log(`You are in ${data.city}, ${data.countryName}`);

//       return fetch(`https://restcountries.com/v2/name/${data.countryName}`);
//     })
//     .then(res => {
//       if (!res.ok) throw new Error(`Country not found (${res.status})`);

//       return res.json();
//     })
//     .then(data => renderCountry(data[0]))
//     .catch(err => console.error(`${err.message} 💥`));
// };
// whereAmI(52.508, 13.381);
// whereAmI(19.037, 72.873);
// whereAmI(-33.933, 18.474);
//////////////////////////
//promisifying practice
const wait = function (seconds) {
  return new Promise(function (resolve) {
    setTimeout(resolve, seconds * 1000);
    console.log(`Times up~`);
  });
};

// wait(1)
//   .then(() => {
//     console.log('1 secs passed');
//     return wait(1);
//   })
//   .then(() => {
//     console.log('2 secs passed');
//     return wait(1);
//   })
//   .then(() => {
//     console.log('3 secs passed');
//     return wait(1);
//   });
////////////////////////////////////////////
const getPosition = function () {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(
      position => resolve(position),
      err => reject(err)
    );
  });
};

const whereAmI = function () {
  getPosition()
    .then(pos => {
      //position
      if (!pos) throw new Error(`Here bro🌟`);
      const { latitude: lat, longitude: lng } = pos.coords;
      // console.log(pos);
      return fetch(
        `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}&localityLanguage=en`
      );
    })
    .then(res => {
      if (!res.ok) throw new Error(`Problem with geocoding ${res.status}`);
      return res.json();
    })
    .then(data => {
      // console.log(data);
      console.log(
        `You are in ${data.city ? data.city : data.continent}, ${
          data.countryName
        }. `
      );
      return fetch(`https://restcountries.com/v2/name/${data.countryName}`);
    })
    .then(res => {
      // console.log(res);
      if (!res) throw new Error(`2nd fetch error`);
      return res.json();
    })
    .then(data => renderCountry(data[0]))
    .catch(err => console.error(`${err.message}`));
};

// whereAmI(52.508, 13.381);
// whereAmI();
////////////////////////////////////////////////////////////////
//code challenge #2: createImg
// const imgContainer = document.querySelector('.images');

// const createImage = function (imgPath) {
//   return new Promise(function (resolve, reject) {
//     const img = document.createElement('img');
//     img.src = imgPath;

//     img.addEventListener('load', function () {
//       imgContainer.append(img);
//       resolve(img);
//     });

//     img.addEventListener('error', function () {
//       reject(new Error(`🤐 Img not found`));
//     });
//     err => reject(err);
//   });
// };

// createImage();
let currentImg;
const imgContainer = document.querySelector('.images');

const createImage = function (imgPath) {
  return new Promise(function (resolve, reject) {
    const img = document.createElement('img');
    img.src = imgPath;
    // console.log(img);
    // console.log(currentImg);

    img.addEventListener('load', function () {
      imgContainer.append(img);
      resolve(img);
    });

    img.addEventListener('error', function () {
      reject(new Error(`Failed to load images 🐶`));
    });
  });
};

createImage('img/img-1.jpg')
  .then(img => {
    currentImg = img;
    console.log(`image 1 loaded +`);
    return wait(2);
  })
  .then(() => {
    currentImg.style.display = 'none';
    return createImage('img/img-2.jpg');
  })
  .then(img => {
    currentImg = img;
    console.log(`image 2 loaded`);
    return wait(2);
  })
  .then(() => {
    currentImg.style.display = 'none';
    return createImage('img/img-3.jpg');
  })
  .then(img => {
    console.log(`image 3 loaded`);
    currentImg = img;
    return wait(2);
  })
  .catch(err => console.error(err));
