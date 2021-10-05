"use strict";

let countries;
const activeCountry = document.querySelector(".country-column");
const firstPage = document.querySelector(".first-page");
const secondPage = document.querySelector(".second-page");
const detailed = document.querySelector(".full-details");
const arrowBack = document.querySelector(".arrow-back");
const countryName = document.querySelector(".input");

// Fuctions
const togglePage = () => {
  firstPage.classList.toggle("hidden");
  secondPage.classList.toggle("hidden");
};

fetch("https://restcountries.com/v2/all")
  .then((response) => response.json())
  .then((data) => {
    init(data);
  })
  .catch((err) => console.error(err));

function init(countriesData) {
  console.log(countriesData.length);
  console.log(countriesData[0].population);
  countries = countriesData;
  let options = "";
  let semiDetails = "";
  let fullDetails = "";
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

  // ================= Country Grid ==============

  for (let i = 0; i < countries.length; i++) {
    semiDetails += ` <div class="country-column ${countries[i].alpha3Code} ">
    <div class="img-box"><img src="${countries[i].flag}" alt="countryFlag" height="100px" width="200px" /></div>
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

  // ================= Country Details ==============

  for (let i = 0; i < countries.length; i++) {
    document
      .querySelector(`.${countries[i].alpha3Code}`)
      .addEventListener("click", function () {
        fullDetails = `
        <div class="big-flag"><img src="${
          countries[i].flag
        }" alt="big flag" width="450px" height="300px" /></div>
       <div class="more-info">
       <h1>${countries[i].name}</h1>
        <div class="flex-details">
        <div class="first-coln">
          <div>
            <label for="nativ-name">Native Name:</label>
            <span>${countries[i].nativeName}</span>
          </div>
          <div>
            <label for="population">Population:</label>
            <span>${countries[i].population}</span>
          </div>
          <div>
            <label for="region">Region:</label>
            <span>${countries[i].region}</span>
          </div>
          <div>
            <label for="sub-region">Sub Region:</label>
            <span>${countries[i].subregion}</span>
          </div>
          <div>
            <label for="capital">Capital:</label>
            <span>${countries[i].capital}</span>
          </div>
        </div>
        <div class="second-coln">
          <div>
            <label for="tld">Top Level Domain:</label>
            <span>${countries[i].topLevelDomain}</span>
          </div>
          <div>
            <label for="currencies">Currencies:</label>
            <span>${countries[i].currencies[0].name}</span>
          </div>
          <div>
            <label for="languages">Languages:</label>
            <span> ${countries[i].languages.map((e) => `  ${e.name}`)}
          </div>
        </div>
        </div>
       <div class="border-countries">
        <label for="border-count">Border Countries:</label>
       
       ${
         countries[i].borders
           ? `<div class="border-grid">

        

           ${[...countries[i].borders]
             .map(
               (e) =>
                 `<div class="border">${[
                   countries.filter((a) => a.alpha3Code == e),
                 ].map((e) => e[0].name)}</div>`
             )
             .join("")}  
           </div>`
           : "None"
       }       
          </div>
        
       `;

        detailed.innerHTML = fullDetails;
        togglePage();
      });
  }

  arrowBack.addEventListener("click", function () {
    togglePage();
  });
}

document.addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
  }
});
