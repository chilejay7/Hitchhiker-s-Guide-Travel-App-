
feature/currencysection
//Submit Button for Currency Exchange


feautre/currencysection
//Submit Button for Currency Exchange


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




main


// Aviation API
var arr_iata = "LAX";
var access_key = "d36d2907-0b8e-4cdf-a4d1-7d3d03d05ee1"; // Replace with your actual access key
var queryURL = `https://airlabs.co/api/v9/flights?api_key=${access_key}&arr_iata=${arr_iata}`;

async function makeAPICall() {
    const response = await fetch(queryURL)
    .then( (response) => {
        if (!response.ok) {
            throw new Error(`API request failed with status: ${response.status}`);
        }

        return response.json()
    })
    .then( (res) =>{
        var data = res.response

        if (Array.isArray(data) && data.length > 0) {
            // Iterate through flights and log their statuses
            data.forEach((flight) => {    
            //   console.log(flight)
              const flightStatus = flight.status;
              const flightNumber = flight.flight_number;
              const flightIata = flight.flight_iata;
              console.log(`Flight # ${flightNumber} ${flightIata} has status: ${flightStatus}`);
            });
          } else {
            console.log("No flight data available.");
          }
    } )
}

makeAPICall()

