//Submit Button for Currency Exchange
const currencyForm = $('#currency-exchange');
const autoCurrency = ['AED', 'AFN', 'ALL', 'AMD', 'ANG', 'AOA', 'ARS', 'AUD', 'AWG', 'AZN', 'BAM', 'BBD', 'BDT', 'BGN', 'BHD', 'BIF', 'BMD', 'BND', 'BOB', 'BRL', 'BSD', 'BTC', 'BTN', 'BWP', 'BYN', 'BYR', 'BZD', 'CAD', 'CDF', 'CHF', 'CLF', 'CLP', 'CNY', 'COP', 'CRC', 'CUC', 'CUP', 'CVE', 'CZK', 'DJF', 'DKK', 'DOP', 'DZD', 'EGP', 'ERN', 'ETB', 'EUR', 'FJD', 'FKP', 'GBP', 'GEL', 'GGP', 'GHS', 'GIP', 'GMD', 'GNF', 'GTQ', 'GYD', 'HKD', 'HNL', 'HRK', 'HTG', 'HUF', 'IDR', 'ILS', 'IMP', 'INR', 'IQD', 'IRR', 'ISK', 'JEP', 'JMD', 'JOD', 'JPY', 'KES', 'KGS', 'KHR', 'KMF', 'KPW', 'KRW', 'KWD', 'KYD', 'KZT', 'LAK', 'LBP', 'LKR', 'LRD', 'LSL', 'LTL', 'LVL', 'LYD', 'MAD', 'MDL', 'MGA', 'MKD', 'MMK', 'MNT', 'MOP', 'MRO', 'MUR', 'ZWL', 'ZMW', 'ZMK', 'ZAR', 'YER', 'XPF', 'XOF', 'XDR', 'XCD', 'XAU', 'XAG', 'XAF', 'WST', 'VUV', 'VND', 'VES', 'VEF', 'UZS', 'UYU', 'USD', 'UGX', 'UAH', 'TZS', 'TWD', 'TTD', 'TRY', 'TOP', 'TND', 'TMT', 'TJS', 'THB', 'SZL', 'SYP', 'SVC', 'STD', 'SSP', 'SRD', 'SOS', 'SLL', 'SLE', 'SHP', 'SGD', 'SEK', 'SDG', 'SCR', 'SBD', 'SAR', 'RWF', 'RUB', 'RSD', 'RON', 'QAR', 'PYG', 'PLN', 'PKR', 'PHP', 'PGK', 'PEN', 'PAB', 'OMR', 'NZD', 'NPR', 'NOK', 'NIO', 'NGN', 'NAD', 'MZN', 'MYR', 'MXN', 'MWK', 'MVR'];

// The code below sets an empty object used to store currency and exchange amount pairs.
let currenciesExchanged = {};

// This was added to retrieve previous values stored and ensure previous data is not overwritten on page refresh.
$(document).ready (function () {
    checkStorage();
})

// The code below was used to get a list of available currencies and their three letter identifiers.
let currencies = [];

getList = () => {
    fetch ('http://apilayer.net/api/list?access_key=e05cba2b74e776b6e26de31af283e09f')
    .then (function (response) {
        console.log(response);
        return response.json();
    })
    .then (function (data) {
        console.log(data);
        currencies = Object.keys(data.currencies);
        return currencies.reverse();
    })
}

// This adds an autocomplete list to the currency form.
$(function () {
    $('#source-currency, #exchange-currency').autocomplete({
        source: autoCurrency,
    })
});

// These need the let keyword because they will be continuously redefined as different input values are entered.
let inputSource = document.getElementById('source-currency')
let inputExchange = document.getElementById('exchange-currency')
let inputAmount = document.getElementById('amount')
let exchangeTotal = document.getElementById('exchange-total')

// let sourceCurrencies = [];
// let exchangeCurrencies = [];

// This function will pull exchange rate information from the Forex API.  The currency and source variables will defined based on user input and incorporated into the function to create the parameters needed.  Multiple arguments had to be defined.  From and to are used to pass the input currency values into the function.  func1 accepts a function, which will be the convertCurrency function, to give that function access to the API's data.  Amount passes the input amount to the func1 argument, which will be converted for use in the convertCurrency function.
getExchange = (from, to, amount) => {
    fetch (`http://apilayer.net/api/live?access_key=e05cba2b74e776b6e26de31af283e09f&source=${from}&currencies=${to}`)
        .then(function (response) {
            console.log(response);
            return response.json();
        })
        .then(function (data) {
            console.log(data);
            
            convertCurrency(data, amount);
        })
    // This adds a key value pair to the currenciesExchanged object using the captured values from the form.
    // currenciesExchanged[`${from} (${amount}) to ${to}`] = exchangeTotal.innerHTML;
};

// This function converts the currency amount to be exchanged.  The data argument is set to accept the data fromt the API response.  Amount is defined as an argument to be used with the input value needing to be exchanged.  The quotes object returned from the data contains the exchange rate.  This is multiplied by the inputAmount.value is passed from the getExchange function's arguments.
convertCurrency = (data, amount) => {
    let quotes = Object.values(data.quotes);
    console.log(quotes);
    let rate = quotes[0];
    console.log(rate);
    console.log(rate * amount);
    let total = rate * amount;
    exchangeTotal.innerText = total.toFixed(2);
    // This adds a key value pair to the currenciesExchanged object using the captured values from the form.  It needs to be placed here due to the dynamically generated conversion value that needs the fetch data.  Placing this outside of the function results in an empty value or a value behind the current conversion amount.  The setStorage function needs to be placed within this function as well.
    currenciesExchanged[`${inputSource.value} (${inputAmount.value}) to ${inputExchange.value}`] = exchangeTotal.innerText;
    setStorage();
}

setStorage = () => {
    localStorage.setItem('currencies', JSON.stringify(currenciesExchanged));
}

// This function is called within the document ready function when the page loads.
checkStorage = () => {
    if (getStorage() === null || getStorage() === 'undefined') {
        return currenciesExchanged = {};
    } else {
        return currenciesExchanged = JSON.parse(localStorage.getItem('currencies'));
    }
}

getStorage = () => {
    return localStorage.getItem('currencies');
}

currencyForm.on ('submit', async function (e) {
    // let inputSource = $('#source-currency').val()
    console.log(inputSource.value);
    console.log(inputExchange.value); 
    console.log(inputAmount.value); 

    e.preventDefault();

    // getExchange(inputSource.value, inputExchange.value, convertCurrency, inputAmount.value);
    getExchange(inputSource.value, inputExchange.value, inputAmount.value);

    // This resets the forms input fields on submit.
    // currencyForm[0].reset();
});

// This function will fade elements in and out.  It could be used to with any element and easily be tied to an event listener.
changeOpacity = () => {
    const hiddenForm = document.getElementById('currency-form');

    if (hiddenForm.style.opacity == 1) {
        hiddenForm.style.opacity = 0;
    } else {
        hiddenForm.style.opacity = 1;
    }
};

// const calendar = document.querySelector("#calendar");
// const month = document.querySelector("#month");
// const viewEntry = document.querySelector("#viewEntry");
let navigation = 0;
let clicked = null;

// The below localstorage pulls in the flight data from local storage.

let events = localStorage.getItem("events") ? JSON.parse(localStorage.getItem(viewEntry)) : [];
const weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
// const months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
// inputAmount, arrivalVal

dayjs()

// The following function defines the current date (day/month/year) by pulling in new Date() and
// displays events in box form while following the criteria of the if statements and the for loop

function getEventDate() {
    const dt = new Date();
    const day= dt.getDate();
    const month = dt.getMonth();
    console.log(month);
    const year = dt.getFullYear();
    const dayOfMonth = new Date(year, month + 1,0).getDate();
    const firstDayofMonth = new Date(year, month, 1);
    const dateText = firstDayofMonth.toLocaleDateString("en-us", {
      weekday: "long",
      year: "numeric",
      month: "numeric",
      day: "numeric",
    })

    const dayString = dateText.split(", ")[0];
    const emptyDays = weekdays.indexOf(dayString);

    for (let i = 1; i <= dayOfMonth + emptyDays; i++) {
    const dayBox = document.createElement("div");
    dayBox.classList.add("day");
    const monthVal = month;
    const dateVal = i - emptyDays < 31 ? "0" + (i - emptyDays) : i - emptyDays;
    const dateText = `${dateVal}-${monthVal}-${year}`;
    if (i > emptyDays) {
        dayBox.innerText = i - emptyDays;
        const eventOfTheDay = events.find((e) => e.date == dateText);

        if (i - emptyDays === day && navigation == 0) {
        dayBox.id = "currentDay";
        }

        if (eventOfTheDay) {
        const eventDiv = document.createElement("div");
        eventDiv.classList.add("event");
        eventDiv.innerText = eventOfTheDay.title;
        dayBox.appendChild(eventDiv);
        }

        dayBox.addEventListener("click", () => {
        showModal(dateText);
        });
    } else {
        dayBox.classList.add("plain");
    }

    }
};

function showModal(dateText) {
      clicked = dateText;
      const eventOfTheDay = events.find((e) => e.date == dateText);
      if (eventOfTheDay) {
        document.querySelector("#days").innerText = eventOfTheDay.title;
        viewEntry.style.display = "block";
      }
}
showModal();
getEventDate();

// Airlabs API
var searchFormEl = document.querySelector('#airport-form');
var formatInputEl = document.querySelector('#format-input');
var arrivalInputEl = document.querySelector('#arrival-input');
var numberInputEl = document.querySelector('#number-input'); // Add this line

var access_key = "d36d2907-0b8e-4cdf-a4d1-7d3d03d05ee1"; // Replace with your actual access key
var apiKey = '5180c586-7a13-4c78-8b5a-68818afd7fd2';

async function populateFlightNumbers(formatInputVal, arrivalVal) {
    var queryURL = `https://airlabs.co/api/v9/flights?api_key=${access_key}&dep_iata=${formatInputVal}&arr_iata=${arrivalVal}`;

    const response = await fetch(queryURL);
    if (!response.ok) {
        throw new Error(`API request failed with status: ${response.status}`);
    }
    const data = await response.json();
    if (Array.isArray(data.response) && data.response.length > 0) {
        // Clear existing options
        numberInputEl.innerHTML = '<option value="" disabled selected> Select a flight </option>';
        // Populate the flight numbers select element
        data.response.forEach((flight) => {
            const flightNumber = flight.flight_number;
            const flightIata = flight.flight_iata;
            var optionEl = document.createElement('option');
            optionEl.value = flightIata;
            optionEl.textContent = `${flightIata} - ${flightNumber}`;
            numberInputEl.appendChild(optionEl);
        });
    } else {
        console.log("No flight data available.");
    }
}

function handleNumberInputChange() {
    var selectedFlightIata = numberInputEl.value;
    if (selectedFlightIata) {
        fetchFlightInfo(selectedFlightIata);
    }
}

function fetchFlightInfo(flightIata) {
    const apiUrl = `https://airlabs.co/api/v9/flight?flight_iata=${flightIata}&api_key=${apiKey}`;
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            const deptime = data.response.dep_time_utc;
            const arrtime = data.response.arr_time_utc;
            const depdelay = data.response.dep_delayed;
            const arrdelay = data.response.arr_delayed;
            const departureGate = data.response.dep_gate;
            const arrivalGate = data.response.arr_gate;
            const status = data.response.status;
            const flightduration = data.response.duration;
            console.log('Current Status:', status);
            console.log('Est. Flight Duration:', flightduration, 'min');
            console.log('Departure Date:', deptime);
            console.log('Departure Delayed:', depdelay, 'min');
            console.log('Departure Gate:', departureGate);
            console.log('Arrival Gate:', arrtime);
            console.log('Arrival Delayed:', arrdelay, 'min');
            console.log('Arrival Gate:', arrivalGate);
            var date = dayjs().date();
            var columnId = `day-${date}`;
            var column = document.getElementById(columnId);
            column.innerHTML += `
            <p> Departure Date:${deptime} <br>
            Arrival Date:${arrtime}  <br>
            Departure Delayed:${depdelay} min <br>
            Arrival Delayed:${arrdelay} min <br>
            Departure Gate:${departureGate} <br>
            Arrival Gate:${arrivalGate} <br>
            Current Status:${status} <br>
            Est. Flight Duration:${flightduration} min </p>
            `

        })
        .catch(error => console.error(error));
}
searchFormEl.addEventListener('submit', function (event) {
    event.preventDefault();
    var arrivalVal = arrivalInputEl.value;
    var formatInputVal = formatInputEl.value;
    if (!formatInputVal) {
        console.error('You need a search input value!');
        return;
    }
    populateFlightNumbers(formatInputVal, arrivalVal);
});
numberInputEl.addEventListener('change', handleNumberInputChange);