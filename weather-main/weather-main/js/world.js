let apiKey = "1e3e8f230b6064d27976e41163a82b77";
let searchinput = document.querySelector(".searchinput");
let box = document.querySelector(".box");
let normalMessage = document.querySelector(".normal-message");
let errorMessage = document.querySelector(".error-message");
let addedMessage = document.querySelector(".added-message");

// Function to get the date
let date = new Date().getDate();
let months_name = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
let months = new Date().getMonth();
let year = new Date().getFullYear();

let FullDate = document.querySelector(".date");
FullDate.innerHTML = `${months_name[months]} ${date}, ${year}`;

// Weather info
async function city(cityName) {
  let url = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?units=metric&q=${cityName}&appid=${apiKey}`
  );
  if (url.ok) {
    let data = await url.json();
    console.log(data);

    let pcsreen = document.querySelector(".pc");

    if (!box) {
      box = document.createElement("div");
      box.className = "box";
      pcsreen.appendChild(box);
    }

    let weatherBox = document.createElement("div");
    weatherBox.className = "weather-box";

    let nameDiv = document.createElement("div");
    nameDiv.className = "name";

    let cityElement = document.createElement("div");
    cityElement.className = "city-name city";
    cityElement.innerHTML = data.name;

    let tempElement = document.createElement("div");
    tempElement.className = "weather-temp temp";
    tempElement.innerHTML = Math.floor(data.main.temp) + "°";

    let weatherIconDiv = document.createElement("div");
    weatherIconDiv.className = "weather-icon";

    let weatherImg = document.createElement("img");
    weatherImg.className = "weather";

    if (data.weather[0].main === "Rain") {
      weatherImg.src = "img/rain.png";
    } else if (data.weather[0].main === "Clear") {
      weatherImg.src = "img/sun.png";
    } else if (data.weather[0].main === "Snow") {
      weatherImg.src = "img/snow.png";
    } else if (
      data.weather[0].main === "Clouds" ||
      data.weather[0].main === "Smoke"
    ) {
      weatherImg.src = "img/cloud.png";
    } else if (
      data.weather[0].main === "Mist" ||
      data.weather[0].main === "Fog"
    ) {
      weatherImg.src = "img/mist.png";
    } else if (data.weather[0].main === "Haze") {
      weatherImg.src = "img/haze.png";
    }

    weatherIconDiv.appendChild(weatherImg);
    nameDiv.appendChild(cityElement);
    nameDiv.appendChild(tempElement);
    weatherBox.appendChild(nameDiv);
    weatherBox.appendChild(weatherIconDiv);
    box.appendChild(weatherBox);

    return weatherBox;
  } else {
    return "";
  }
}

// add section
let section = document.querySelector(".add-section");
let navBtn = document.querySelector(".button");
let navIcon = document.querySelector(".btn-icon");

navBtn.addEventListener("click", () => {
  if (section.style.top === "-60rem") {
    section.style.top = "100px";
    navIcon.className = "fa-solid fa-circle-xmark";
  } else {
    section.style.top = "-60rem";
    navIcon.className = "fa-solid fa-circle-plus";
  }
});

searchinput.addEventListener("keydown", async function (event) {
  if (event.keyCode === 13 || event.which === 13) {
    const weatherInfo = await city(searchinput.value);
    if (weatherInfo) {
      normalMessage.style.display = "none";
      errorMessage.style.display = "none";
      addedMessage.style.display = "block";
    } else {
      normalMessage.style.display = "none";
      errorMessage.style.display = "block";
      addedMessage.style.display = "none";
    }
    box.prepend(weatherInfo);
  }
});

city("London");
city("Paris");
city("Mumbai");

async function city(cityName) {
  let url = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?units=metric&q=${cityName}&appid=${apiKey}`
  );
  if (!url.ok) return "";

  let data = await url.json();
  let pcsreen = document.querySelector(".pc");

  // ensure container
  if (!box) {
    box = document.createElement("div");
    box.className = "box";
    pcsreen.appendChild(box);
  }

  // build the card
  let weatherBox = document.createElement("div");
  weatherBox.className = "weather-box";

  // remove button
  let removeBtn = document.createElement("div");
  removeBtn.className = "remove-btn";
  removeBtn.innerHTML = "&times;";        // × character
  removeBtn.title = "Remove city";
  removeBtn.addEventListener("click", () => {
    box.removeChild(weatherBox);
  });

  // city name & temp
  let nameDiv = document.createElement("div");
  nameDiv.className = "name";
  let cityElement = document.createElement("div");
  cityElement.className = "city-name city";
  cityElement.textContent = data.name;
  let tempElement = document.createElement("div");
  tempElement.className = "weather-temp temp";
  tempElement.textContent = Math.round(data.main.temp) + "°";
  nameDiv.append(cityElement, tempElement);

  // icon
  let weatherIconDiv = document.createElement("div");
  weatherIconDiv.className = "weather-icon";
  let weatherImg = document.createElement("img");
  // choose icon based on weather...
  let main = data.weather[0].main;
  weatherImg.src =
    main === "Rain"   ? "img/rain.png"   :
    main === "Clear"  ? "img/sun.png"    :
    main === "Snow"   ? "img/snow.png"   :
    (main === "Clouds"||main==="Smoke")? "img/cloud.png" :
    (main === "Mist" || main==="Fog")  ? "img/mist.png"  :
    main === "Haze"   ? "img/haze.png"   :
    "img/sun.png";
  weatherIconDiv.appendChild(weatherImg);

  // assemble
  weatherBox.append(removeBtn, nameDiv, weatherIconDiv);
  box.prepend(weatherBox);

  return weatherBox;
}
// grab references
const addSection = document.getElementById('addSection');
const addCityForm = document.getElementById('addCityForm');
const newCityInput = document.getElementById('newCityInput');

// show the dialog when “+” is clicked (wherever you do that)
document.getElementById('showAddDialogBtn').addEventListener('click', () => {
  addSection.style.display = 'block';  // or add a class that triggers your animation
  newCityInput.focus();
});

// handle both Enter and button-click via form submit
addCityForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const cityName = newCityInput.value.trim();
  if (!cityName) return;

  // call your existing city() function to add the card
  await city(cityName);

  // clear input and hide dialog
  newCityInput.value = '';
  addSection.style.display = 'none';   // or remove the “visible” class
});

// optional: if you have an explicit close “×” inside the dialog:
addSection.querySelector('.remove-btn')?.addEventListener('click', () => {
  addSection.style.display = 'none';
});
