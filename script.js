"use strict";

let countries;

fetch("https://restcountries.com/v2/all")
  .then((response) => response.json())
  .then((data) => {
    // console.log(data);
    init(data);
  })
  .catch((err) => {
    console.error(err);
  });

function init(countriesData) {
  console.log(countriesData.length);
  console.log(countriesData[0].population);
  countries = countriesData;
  let options = "";
  let semiDetails = "";
  let continent = [];
  let sortedContinent = [""];

  for (let i = 0; i < countries.length; i++) {
    continent.push(countries[i].region);
  }
  const mySet = new Set(continent);
  sortedContinent = [...mySet].sort();
  console.log(sortedContinent);

  for (let i = 0; i < sortedContinent.length; i++) {
    options += `
    <option class="opt${i}" value="${sortedContinent[i]}">${sortedContinent[i]}</option>`;
  }

  document.getElementById("region").innerHTML = options;

  // document.getElementById("region").addEventListener("click", function () {
  //   console.log("yess yess");

  //   const byRegion = countries.filter((country) => country.region == "Asia");

  //   for (let i = 0; i < byRegion.length; i++) {
  //     semiDetails += ` <div class="country-column">
  //     <div class="img-box"><img src="${byRegion[i].flags.svg}" alt="countryFlag" height="100px" width="200px" /></div>
  //     <div class="country-details">
  //       <h3>${byRegion[i].name}</h3>
  //       <div>
  //         <label for="population">Population:</label> <span>${byRegion[i].population}</span>
  //       </div>
  //       <div><label for="region">Region:</label> <span>${byRegion[i].region}</span>
  //       </div>
  //       <div> <label for="capital">Capital:</label>
  //       <span>${byRegion[i].capital}</span></div>

  //     </div>
  //   </div>`;
  //   }

  //   document.querySelector(".column").innerHTML = semiDetails;
  // });

  // ================= Country Grid ==============

  for (let i = 0; i < countries.length; i++) {
    semiDetails += ` <div class="country-column">
    <div class="img-box"><img src="${countries[i].flags.svg}" alt="countryFlag" height="100px" width="200px" /></div>
    <div class="country-details">
      <h3>${countries[i].name}</h3>
      <div>
        <label for="population">Population:</label> <span>${countries[i].population}</span>
      </div>
      <div><label for="region">Region:</label> <span>${countries[i].region}</span>
      </div>
      <div> <label for="capital">Capital:</label>
      <span>${countries[i].capital}</span></div>

    </div>
  </div>`;
  }

  document.querySelector(".column").innerHTML = semiDetails;
}

// fetch(`https://restcountries.com/v2/name/{name}`)
//   .then((response) => response.json())
//   .then((data2) => secondInit(data2))
//   .catch((err) => console.error(err));

// function secondInit(searchData) {}
