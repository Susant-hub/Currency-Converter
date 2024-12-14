//accessing elements
let dropdown = document.querySelectorAll(".dropdown select");
let button = document.querySelector(".btn button");
let amount = document.querySelector(".amount-box input");
let from = document.querySelector(".from select");
let to = document.querySelector(".to select");
let msg = document.querySelector(".submisson");

//loop for the dropdown(which is accessed as select from above)
for (let select of dropdown) {
  //loop for country codes(from other JS file)
  for (codes in countryList) {
    //create option for each country code
    let option = document.createElement("option");
    option.innerText = codes;
    option.value = codes;

    //selecting default values
    if (select.name === "from" && codes === "USD") {
      option.selected = "selected";
    } else if (select.name === "to" && codes === "NPR") {
      option.selected = "selected";
    }

    //adding(appending) the option to the select(dropdown)
    select.append(option);
  }

  //when anything changes inside select(from above for in loop), an event to occur
  select.addEventListener("change", (event) => {
    updateFlag(event.target);
  });
}

//function to update flags
const updateFlag = (changeEle) => {
  let currencyCode = changeEle.value;
  let countryCode = countryList[currencyCode];
  let newSrc = `https://flagsapi.com/${countryCode}/shiny/64.png`;
  const image = changeEle.parentElement.querySelector("img");
  image.src = newSrc;
};

//when button is clicked
button.addEventListener("click", async (evt) => {
  evt.preventDefault();
  let fromCurrency = from.value.toLowerCase();
  let toCurrency = to.value.toLowerCase();

  let promise = fetch(
    "https://latest.currency-api.pages.dev/v1/currencies/usd.json" //API fetching (here bcz it should be fetched every time the button is clicked.)
  );
  let response = await promise;
  let data = await response.json();
  let fromRate = data.usd[fromCurrency];
  let toRate = data.usd[toCurrency];
  let exgRate = toRate / fromRate;
  let amtVal = amount.value;
  if (amtVal <= 0) {
    msg.innerText = "Invalid Number";
    msg.style.color = "red";
  } else {
    msg.style.color = "black";
    let finalAmt = (amtVal * exgRate).toFixed(2);
    msg.innerText = `${amtVal} ${fromCurrency.toUpperCase()}= ${finalAmt} ${toCurrency.toUpperCase()} `;
  }
});
