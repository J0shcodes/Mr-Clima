const cityForm = document.querySelector('form');
const card = document.querySelector('.card');
const details = document.querySelector('.details');
const time = document.querySelector('.time');
const icons = document.querySelector('.icon img')

const updateUi = (data) => {

  // destructure properties
  const {cityDetails, weather} = data;

  // update details template  
  details.innerHTML = `
    <h5 class="my-3">${cityDetails.EnglishName}</h5>
    <div class="my-3">${weather.WeatherText}</div>
    <div class="display-4 my-4">
      <span>${weather.Temperature.Metric.Value}</span>
      <span>&deg;C</span>
    </div>
  `

  // update night/day image & icons
  let iconSrc = `images/icons/${weather.WeatherIcon}.svg`
  icons.setAttribute('src', iconSrc);
  
  let timeSrc = weather.IsDayTime ? 'images/day.svg' : 'images/night.svg';  
  time.setAttribute('src', timeSrc);


  if (card.classList.contains('d-none')) {
    card.classList.remove('d-none');
  }
}

const updateCity = async (city) => {
  
  const cityDetails = await getCity(city);
  const weather = await getWeather(cityDetails.Key);

  return { cityDetails, weather }
}

cityForm.addEventListener('submit', e => {

  // prevent default action
  e.preventDefault();

  // get city value
  const city = cityForm.city.value.trim();
  cityForm.reset();

  // update ui with city information
  updateCity(city)
    .then(data => updateUi(data))
    .catch(err => console.log(err));

  // store in local storage
  localStorage.setItem('city', city);  

})

if (localStorage.getItem('city')) {

  updateCity(localStorage.getItem('city'))
    .then(data => updateUi(data))
    .catch(err => console.log(err));
}