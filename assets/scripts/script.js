
//Submit Button for Currency Exchange
const form1 = document.getElementById('currency-exchange');
const form = $('#currency-exchange');


let currencies = [];

// This function will pull exchange rate information from the Forex API.  The currency and source variables will defined based on user input and incorporated into the function to create the parameters needed.

getExchange = (currency, source) => {
    fetch (`http://apilayer.net/api/live?access_key=e05cba2b74e776b6e26de31af283e09f&currencies=${currency}&source=${source}`)
        .then(function (response) {
            console.log(response);
            return response.json();
        })
        .then(function (data) {
            console.log(data);
        })
};


document.addEventListener('DOMContentLoaded', function() {
    var calendarEl = document.getElementById('calendar');
    var calendar = new calendarEl.Calendar({
      initialView: 'dayGridMonth'
    });
    calendar.render();
  });


// form1.addEventListener('submit', function (e) {
//     console.log(e);
// })


form.on ('submit', function (e) {
    // let inputSource = $('#source-currency').val()
    let inputSource = document.getElementById('source-currency').value
    let inputExchange = document.getElementById('exchange-currency').value;
    console.log(inputSource);
    console.log(inputExchange); 
})






// Aviation API

var access_key ="78985f0d07191548cd8017e3eb2389c2";
var flight_status = "scheduled";
var arr_iata = "DEN";
var queryURL = "http://api.aviationstack.com/v1/flights" + flight_status + arr_iata;

function scheduledArrivalsDEN(arr_iata) {
    return (arr_iata + flight_status);
}

async function makeAPICall() {
    try {
        const response = await fetch(queryURL);
        if (!response.ok) {
            throw new Error(`API request failed with status: ${response.status}`);
        }

        const data = await response.json();
        const sch_arr = data.flight_status.arr_iata;
        const sch_arr1 = scheduledArrivalsDEN(sch_arr);

        console.log(`Scheduled Arrivals @ DEN: ${sch_arr}`)
        return sch_arr 
    } catch (error) {
            console.error("An error occured:", error);
            throw error;
    }
}


makeAPICall().then(response => {
    console.log("Scheduled Arrivals @ DEN", response);

});

