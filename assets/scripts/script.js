
//Submit Button for Currency Exchange
const currencyForm = $('#currency-exchange');
const autoCurrency = ['AED', 'AFN', 'ALL', 'AMD', 'ANG', 'AOA', 'ARS', 'AUD', 'AWG', 'AZN', 'BAM', 'BBD', 'BDT', 'BGN', 'BHD', 'BIF', 'BMD', 'BND', 'BOB', 'BRL', 'BSD', 'BTC', 'BTN', 'BWP', 'BYN', 'BYR', 'BZD', 'CAD', 'CDF', 'CHF', 'CLF', 'CLP', 'CNY', 'COP', 'CRC', 'CUC', 'CUP', 'CVE', 'CZK', 'DJF', 'DKK', 'DOP', 'DZD', 'EGP', 'ERN', 'ETB', 'EUR', 'FJD', 'FKP', 'GBP', 'GEL', 'GGP', 'GHS', 'GIP', 'GMD', 'GNF', 'GTQ', 'GYD', 'HKD', 'HNL', 'HRK', 'HTG', 'HUF', 'IDR', 'ILS', 'IMP', 'INR', 'IQD', 'IRR', 'ISK', 'JEP', 'JMD', 'JOD', 'JPY', 'KES', 'KGS', 'KHR', 'KMF', 'KPW', 'KRW', 'KWD', 'KYD', 'KZT', 'LAK', 'LBP', 'LKR', 'LRD', 'LSL', 'LTL', 'LVL', 'LYD', 'MAD', 'MDL', 'MGA', 'MKD', 'MMK', 'MNT', 'MOP', 'MRO', 'MUR', 'ZWL', 'ZMW', 'ZMK', 'ZAR', 'YER', 'XPF', 'XOF', 'XDR', 'XCD', 'XAU', 'XAG', 'XAF', 'WST', 'VUV', 'VND', 'VES', 'VEF', 'UZS', 'UYU', 'USD', 'UGX', 'UAH', 'TZS', 'TWD', 'TTD', 'TRY', 'TOP', 'TND', 'TMT', 'TJS', 'THB', 'SZL', 'SYP', 'SVC', 'STD', 'SSP', 'SRD', 'SOS', 'SLL', 'SLE', 'SHP', 'SGD', 'SEK', 'SDG', 'SCR', 'SBD', 'SAR', 'RWF', 'RUB', 'RSD', 'RON', 'QAR', 'PYG', 'PLN', 'PKR', 'PHP', 'PGK', 'PEN', 'PAB', 'OMR', 'NZD', 'NPR', 'NOK', 'NIO', 'NGN', 'NAD', 'MZN', 'MYR', 'MXN', 'MWK', 'MVR'];

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

// This adds an autocomplete list.
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

let sourceCurrencies = [];
let exchangeCurrencies = [];

// This function will pull exchange rate information from the Forex API.  The currency and source variables will defined based on user input and incorporated into the function to create the parameters needed.  Multiple arguments had to be defined.  From and to are used to pass the input currency values into the function.  func1 accepts a function, which will be the convertCurrency function, to give that function access to the API's data.  Amount passes the input amount to the func1 argument, which will be converted for use in the convertCurrency function.
getExchange = (from, to, func1, amount) => {
    fetch (`http://apilayer.net/api/live?access_key=e05cba2b74e776b6e26de31af283e09f&source=${from}&currencies=${to}`)
        .then(function (response) {
            console.log(response);
            return response.json();
        })
        .then(function (data) {
            console.log(data);
            func1(data, amount)
        })
};


// form1.addEventListener('submit', function (e) {
//     console.log(e);
// })


// This function converts the currency amount to be exchanged.  The data argument is set to accept the data fromt the API response.  Amount is defined as an argument to be used with the input value needing to be exchanged.  The quotes object returned from the data contains the exchange rate.  This is multiplied by the inputAmount.value is passed from the getExchange function's arguments.
convertCurrency = (data, amount) => {
    let quotes = Object.values(data.quotes);
    console.log(quotes);
    let rate = quotes[0];
    console.log(rate);
    console.log(rate * amount);
    let total = rate * amount;
    exchangeTotal.innerText = total;
}

// form.addEventListener('submit', function (e) {
//     console.log(e);
// })

currencyForm.on ('submit', function (e) {
    // let inputSource = $('#source-currency').val()
    console.log(inputSource.value);
    console.log(inputExchange.value); 
    console.log(inputAmount.value); 

    // This will store values of previously used currencies.  We could also use the free Forex API to store previously used pairs and recall exchange rates with buttons or some other means.
    sourceCurrencies.push(inputSource);
    exchangeCurrencies.push(inputExchange);

    getExchange(inputSource.value, inputExchange.value, convertCurrency, inputAmount.value);

    // console.log('This ran already.');

    // convertCurrency(data);

    // This resets the forms input fields on submit.
    // inputSource.value = ''
    // inputExchange.value = ''
    // inputAmount.value = ''
    currencyForm[0].reset();

});

// This function will fade elements in and out.  It can be used to with any element and easily be tied to an event listener.
changeOpacity = () => {
    const hiddenForm = document.getElementById('currency-form');

    if (hiddenForm.style.opacity == 1) {
        hiddenForm.style.opacity = 0;
    } else {
        hiddenForm.style.opacity = 1;
    }
};

const calendar = document.querySelector("#calendar");
const month = document.querySelector("#month");
const viewEntry = document.querySelector("#viewEntry");
let navigation = 0;
let clicked = null;
let events = localStorage.getItem("events") ? JSON.parse(localStorage.getItem(viewEntry)) : [];
const weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const months = ["January","February","March","April","May","June","July","August","September","October","November","December"];

function getCalendar() {
    const dt = new Date();
  
    if (navigation != 0) {
      dt.setMonth(new Date().getMonth() + navigation);
    }
    const day= dt.getDate();
    const month = dt.getMonth();
    console.log(month);
    const year = dt.getFullYear();
    monthBanner.innerText = `${dt.toLocaleDateString("en-us", {
      month: "long",
    })} ${year}`;
    calendar.innerHTML = "";
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
    const monthVal = month + 1 < 12 ? "0" + (month + 1) : month + 1;
    const dateVal = i - emptyDays < 12 ? "0" + (i - emptyDays) : i - emptyDays;
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
    calendar.append(dayBox);
    }
};

function showModal(dateText) {
      clicked = dateText;
      const eventOfTheDay = entry.find((e) => e.date == dateText);
      if (eventOfTheDay) {
        document.querySelector("#days").innerText = eventOfTheDay.title;
        viewEntry.style.display = "block";
      }
}

function buttons() {
    const btnBack = document.querySelector("#btnBack");
    const btnNext = document.querySelector("#btnNext");
  
    btnBack.addEventListener("click", () => {
      navigation--;
      getCalendar();
    });
    btnNext.addEventListener("click", () => {
      navigation++;
      getCalendar();
    });

}
  showModal();
  buttons();

// Aviation API
