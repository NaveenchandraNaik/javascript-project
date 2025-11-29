const api_url = 'https://restcountries.com/v3.1/name';
const searchBtn = document.querySelector('#searchBtn');
const countryName = document.querySelector('#countryInput');
const countryForm = document.querySelector('#countryForm');
const resultCard = document.querySelector('#resultCard');
const errorCard = document.querySelector('#errorCard');
const status = document.querySelector('#status');

const flagImg = document.querySelector('#flagImg');
const nameCommon = document.querySelector('#nameCommon');
const nameOfficial = document.querySelector('#nameOfficial');
const cca2 = document.querySelector('#cca2');
const cca3 = document.querySelector('#cca3');
const region = document.querySelector('#regionChip');
const subregionChip = document.querySelector('#subregionChip');
const capital = document.querySelector('#capital');
const population = document.querySelector('#population');
const area = document.querySelector('#area');
const timezones = document.querySelector('#timezones');
const languages = document.querySelector('#languages');
const currencies = document.querySelector('#currencies');
const callingCode = document.querySelector('#callingCode');
const tld = document.querySelector('#tld');
const borders = document.querySelector('#borders');
const coatImg = document.querySelector('#coatImg');
const gmaps = document.querySelector('#gmaps');
const osmaps = document.querySelector('#osmaps');
const fifa = document.querySelector('#fifa');
const carSide = document.querySelector('#carSide');
const startOfWeek = document.querySelector('#startOfWeek');



async function countryDetails(e) {
    e.preventDefault();

    const name = countryName.value;
    errorCard.classList.add('hidden');
    flagImg.src = '';
    nameCommon.textContent = '';
    nameOfficial.textContent = '';
    cca2.textContent = '';
    cca3.textContent = '';
    region.textContent = '';
    subregionChip.textContent = '';
    capital.textContent = '';
    population.textContent = '';
    area.textContent = '';
    timezones.innerHTML = '';
    languages.innerHTML = '';
    currencies.innerHTML = '';
    callingCode.textContent = '';
    tld.innerHTML = '';
    borders.innerHTML = '';

    coatImg.src = '';
    gmaps.href = '#';
    osmaps.href = '#';
    fifa.textContent = '';
    carSide.textContent = '';
    startOfWeek.textContent = '';
    try {
        const response = await fetch(`${api_url}/${name}`);
        if (!response.ok) {
            resultCard.classList.add('hidden');
            errorCard.classList.remove('hidden');
            status.textContent = 'No country found';
            status.classList.add('err');
            status.classList.remove('ok');
            throw new Error(`API Error ${response.status}`);
        }
        const data = await response.json();
        if (data) {
            data.forEach((data) => {
                status.textContent = `Country found: ${data?.name?.common}`;
                status.classList.remove('err');
                status.classList.add('ok');
                resultCard.classList.remove('hidden');
                flagImg.src = data['flags'].png;
                nameCommon.textContent = data?.name?.common;
                nameOfficial.textContent = data?.name?.official;
                capital.textContent = data?.capital;
                population.textContent = data?.population;
                region.textContent = data?.region;
                subregionChip.textContent = data?.subregion;
                cca2.textContent = data?.cca2;
                cca3.textContent = data?.cca3;
                area.textContent = data?.area;
                callingCode.textContent = `${data?.idd?.root}${data?.idd?.['suffixes']}`
                data.timezones.forEach((element) => {
                    const list = document.createElement('li');
                    list.textContent = element;
                    timezones.append(list)
                });
                for (const [key, value] of Object.entries(data.languages)) {
                    const list = document.createElement('li');
                    list.textContent = value;
                    languages.append(list)
                }
                for (const [key, value] of Object.entries(data.currencies)) {
                    const list = document.createElement('li');
                    list.textContent = `${value.name}(${value.symbol}) - ${key}`;
                    currencies.append(list)
                }
                data.tld.forEach((element) => {
                    const list = document.createElement('li');
                    list.textContent = element;
                    tld.append(list)
                });
                if (data.borders) {
                    data?.borders.forEach((element) => {
                        if (element === undefined) return;
                        const list = document.createElement('li');
                        list.textContent = element;
                        list.style.listStyle = 'none';
                        list.classList.add('chip');
                        borders.append(list)
                    })
                } else {
                    const list = document.createElement('li');
                    list.textContent = '';
                    list.style.listStyle = 'none';
                    borders.append(list)
                }
                coatImg.src = data?.['coatOfArms']?.png || '';
                gmaps.href = data?.maps?.googleMaps;
                osmaps.href = data?.maps?.openStreetMaps;
                fifa.textContent = data?.fifa;
                carSide.textContent = data?.car?.side;
                startOfWeek.textContent = data?.startOfWeek;
            })

        } else {
            console.log('no data found')
        }

    } catch (error) {
        console.error('Invalid Country Name', error);
    }
}