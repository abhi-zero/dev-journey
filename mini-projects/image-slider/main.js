const cardContainer = document.querySelector(".img-cards");

const url = "./assets/data/location.json";
let locations = [];

function createCard(locationData) {
  const card = document.createElement("div");
  card.classList.add("card");
  card.setAttribute("imgurl", locationData.img);
  card.style.backgroundImage = `url(${locationData.img})`;

  const dash = document.createElement("div");
  dash.classList.add("dash");

  const heading4 = document.createElement("h4");
  const citySpan = document.createElement("span");
  citySpan.classList.add("city");
  citySpan.textContent = locationData.location[0];

  const countrySpan = document.createElement("span");
  citySpan.classList.add("country");
  countrySpan.textContent = locationData.location[1];

  heading4.appendChild(citySpan);
  heading4.append(" - ");
  heading4.appendChild(countrySpan);

  const heading2 = document.createElement("h2");
  heading2.textContent = locationData.name;

  card.appendChild(dash);
  card.appendChild(heading4);
  card.appendChild(heading2);

  return card;
}

document.addEventListener("DOMContentLoaded", () => {
  fetch(url)
    .then((response) => {
      if (!response.ok) throw new Error("Failed to fetch Locations");
      return response.json();
    })
    .then((data) => {
      data.map((elem) => {
        locations.push(elem);
        console.log(locations);
      });
      loadCards();
    })
    .catch((error) => {
      console.error(error);
    });
});

function loadCards() {
  if (locations.length == 0) return;

  locations.forEach((location) => {
    const card = createCard(location);
    cardContainer.appendChild(card);
  });
  let count = 0;
  let move = 0;

  const cardWidth = 240; // example: width of a card
  const gap = 30; // example: gap between cards
  const totalCards = cardContainer.children.length; // replace with your actual ID/class
  const halfWindowWide = 240 - window.innerWidth * 0.5;
  // background window elements
  const bgImage = document.querySelector("main");
  const bgCityLocation = document.querySelector(".city");
  const bgCountryLocation = document.querySelector(".country");
  const bgTitle = document.querySelector(".title");
  const bgDescription = document.querySelector(".description");
  const bgDiscoverBtn = document.querySelector(".map");

  // background window navigation elements
  const progresBar = document.querySelector(".inner-line");
  const imgNumber = document.querySelector(".img-num");
  const leftArrow = document.querySelector('.left-btn');
  const rightArrow = document.querySelector('.right-btn');

  function updateWindow(index) {
    let calcProgress;
    let imgNumberValue;
    // Safety check
    if (index >= locations.length) {
      index = 0;
    }

    cardContainer.style.transition = "transform 0.5s ease";
    cardContainer.style.transform = `translateX(${move}px)`;
    bgImage.style.backgroundImage = `url(${locations[index].img})`;
    bgTitle.textContent = locations[index].name;
    bgCityLocation.textContent = locations[index].location[0];
    bgCountryLocation.textContent = locations[index].location[0];
    bgDescription.textContent = locations[index].description;
    bgDiscoverBtn.href = locations[index].map;

    // background window navigation elements
    let calcProgressValue = index + 1;
    calcProgress = (calcProgressValue / locations.length) * 100;
    imgNumberValue = index < 10 ? `0${++index}` : ++index;
    progresBar.style.width = `${calcProgress}%`;

    imgNumber.textContent = imgNumberValue;

    count = index;
  }

  setInterval(() => {
    move -= cardWidth - gap;

    if (Math.abs(`${move}`) > (cardWidth + gap) * totalCards + halfWindowWide) {
      move = 0;
      cardContainer.style.transition = "none"; // remove transition for instant reset
      cardContainer.style.transform = `translateX(0px)`;
      return;
    }

    if (count > locations.length) {
      count = 0;
    }
    // update window
    updateWindow(count);
    // count++;
  }, 6000);

  leftArrow.addEventListener('click', ()=>{
    if(count <= 0) return;
    move += (cardWidth - gap);
    --count;
    updateWindow(count);
  })
  rightArrow.addEventListener('click', ()=>{
    if(count > locations.length) return;
    move -= (cardWidth + gap);
    count++;
    updateWindow(count);
  })
}
