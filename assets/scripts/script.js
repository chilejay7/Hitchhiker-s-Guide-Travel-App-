
//Submit Button for Currency Exchange
const currencyForm = $('#currency-exchange');

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


document.addEventListener('DOMContentLoaded', function() {
    var calendarEl = document.getElementById('calendar');
    var calendar = new calendarEl.Calendar({
      initialView: 'dayGridMonth'
    });
    calendar.render();
  });

const calendar = document.querySelector("#calendar");
const month = document.querySelector("#month");
const viewEntryForm = document.querySelector("#viewEntry");
let navigation = 0;
let clicked = null;
let entry = localStorage.getItem("entry") ? JSON.parse(localStorage.getItem("entry")) : [];
const weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

function getCalendar() {
    const dt = new Date();
  
    if (navigation != 0) {
      dt.setMonth(new Date().getMonth() + navigation);
    }
    const day = dt.getDate();
    const month = dt.getMonth();
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
    };

const viewEntry = document.querySelector("#viewEntry");
    
    function showModal(dateText) {
      clicked = dateText;
      const eventOfTheDay = events.find((e) => e.date == dateText);
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


// form1.addEventListener('submit', function (e) {
//     console.log(e);
// })


form.on ('submit', function (e) {
    // let inputSource = $('#source-currency').val()
    console.log(inputSource.value);
    console.log(inputExchange.value); 
    console.log(inputAmount.value); 

    // This will store values of previously used currencies.  We could also use the free Forex API to store previously used pairs and recall exchange rates with buttons or some other means.
    sourceCurrencies.push(inputSource);
    exchangeCurrencies.push(inputExchange);

    getExchange(inputSource.value, inputExchange.value, convertCurrency, inputAmount.value);

    console.log('This ran already.');

    // convertCurrency(data);

    // This resets the forms input fields on submit.
    // inputSource.value = ''
    // inputExchange.value = ''
    // inputAmount.value = ''
    currencyForm[0].reset();

})



// Aviation API

// var access_key ="78985f0d07191548cd8017e3eb2389c2";
// var flight_status = "scheduled";
// var arr_iata = "DEN";
// var queryURL = "http://api.aviationstack.com/v1/flights" + flight_status + arr_iata;

// function scheduledArrivalsDEN(arr_iata) {
//     return (arr_iata + flight_status);
// }

// async function makeAPICall() {
//     try {
//         const response = await fetch(queryURL);
//         if (!response.ok) {
//             throw new Error(`API request failed with status: ${response.status}`);
//         }

//         const data = await response.json();
//         const sch_arr = data.flight_status.arr_iata;
//         const sch_arr1 = scheduledArrivalsDEN(sch_arr);

//         console.log(`Scheduled Arrivals @ DEN: ${sch_arr}`)
//         return sch_arr 
//     } catch (error) {
//             console.error("An error occured:", error);
//             throw error;
//     }
// }


// makeAPICall().then(response => {
//     console.log("Scheduled Arrivals @ DEN", response);

// });
