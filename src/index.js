import './css/styles.css';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';
import  fetchCountries from './fetchCountries';

const DEBOUNCE_DELAY = 300;
let result = null

const input = document.querySelector('#search-box')
const countryList = document.querySelector('.country-list')
const countryInfo = document.querySelector('.country-info')

input.addEventListener('input', debounce(handleInput,DEBOUNCE_DELAY))

function handleInput() {
    let result = input.value.trim() 
    console.log(result)
    fetchCountries(result)
        .then((countries) => {
            
            console.log(countries.length)
            if (countries.length > 10) {
                return Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');
            } else if (countries.length < 11 && countries.length > 1) {
                return renderList(countries)
            } else if (countries.length = 1) {
                return renderFullList(countries)
            }
        })

        .catch((error) => Notiflix.Notify.failure('Oops, there is no country with that name'))
    countryList.textContent =""
}



function renderList(countries) {
    const markup = countries.map((country) => {
        return `<li>
            <img src="${country.flags.svg}" alt="Флаг страны" width='30' >
            <p class="name">${country.name.official}</p>
        </li>`;

        })
        .join("");
    countryList.innerHTML = markup
}

function renderFullList(countries) {
    const markup = countries.map((country) => {
        return `<li>
            <img src="${country.flags.svg}" alt="flag ${country.name.official}" width='30' >
            <p class="title name">${country.name.official}</p>
            <p>Capital: ${country.capital}</p>
            <p>Population: ${country.population}</p>
            <p>Languages: ${Object.values(country.languages)}</p>
        </li>`;

        })
        .join("");
    countryList.innerHTML = markup
}