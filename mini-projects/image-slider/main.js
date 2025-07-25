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
      });
      loadCards();
    })
    .catch((error) => {
      console.error(error);
    });
});

// DOM references
const bgImage = document.querySelector("main");
const bgCityLocation = document.querySelector(".city");
const bgCountryLocation = document.querySelector(".country");
const bgTitle = document.querySelector(".title");
const bgDescription = document.querySelector(".description");
const bgDiscoverBtn = document.querySelector(".map");
const progresBar = document.querySelector(".inner-line");
const imgNumber = document.querySelector(".img-num-elem");
const leftArrow = document.querySelector(".left-btn");
const rightArrow = document.querySelector(".right-btn");

const cardWidth = 240;
const gap = 30;
const step = cardWidth - gap;

let move = 0;
let count = 0;

function updateWindow(index) {
  if (index >= locations.length) index = 0;
  if (index < -1) {
    index = 0;
  }

  console.log("count", count);

  // Smooth move transition
  cardContainer.style.transition = "transform 0.5s ease";
  if (move > 0) {
    move = 0;
    return;
  }
  cardContainer.style.transform = `translateX(${move}px)`;

  console.log(index);

  // Background content
  const loc = locations[index];
  bgImage.style.backgroundImage = `url(${loc.img})`;
  bgTitle.textContent = loc.name;
  bgCityLocation.textContent = loc.location[0];
  bgCountryLocation.textContent = loc.location[1] || loc.location[0];
  bgDescription.textContent = loc.description;
  bgDiscoverBtn.href = loc.map;

  // Progress and numbering
  const progress = ((index + 1) / locations.length) * 100;
  progresBar.style.width = `${progress}%`;
  imgNumber.textContent = index + 1 < 10 ? `0${index + 1}` : index + 1;
}

function loadCards() {
  if (locations.length === 0) return;

  // Add cards to container
  locations.forEach((location) => {
    const card = createCard(location);
    cardContainer.appendChild(card);
  });
}

function animate(){
  move -= step;

  if (count >= locations.length) {
    move = 0;
    count = -1;
    cardContainer.style.transition = "none";
    cardContainer.style.transform = `translateX(0px)`;
    // Wait a frame, then resume smooth transition
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        cardContainer.style.transition = "transform 0.5s ease";
        updateWindow(count);
      });
    });
  } else {
    updateWindow(count);
  }
  count++;
}

function resetAnimation() {
  clearInterval(cardsAnimation);
  setTimeout(() => {
  cardsAnimation = setInterval(animate, 6000);
}, 3000); // Delay to ensure initial load is smooth
}
// Auto scroll
let cardsAnimation = setInterval(animate, 6000);

// Arrow Controls
rightArrow.addEventListener("click", () => {
  if (count >= locations.length) {
    count = 0;
    move = 0;
  } else {
    move -= step;
  }
  updateWindow(count);
  count++;
 resetAnimation()
});

leftArrow.addEventListener("click", () => {
  count--;
  if (count < 0) {
    count = 0;
  }
  let value = count - 1;
  move += step;
  updateWindow(value);
  resetAnimation()
});




