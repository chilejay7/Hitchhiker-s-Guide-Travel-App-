//Submit Button for Currency Exchange
// const form = document.getElementById('currency-exchange');
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

form.on ('submit', function (e) {
  console.log(e);
})


