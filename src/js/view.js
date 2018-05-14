import helpers from "./helpers";

const drawNotif = function(message, type) {
  const div = helpers.newEl("div");
  const nav = helpers.qs(".nav");
  div.className = `notif animated fadeInUp text-c ${type}`;
  div.innerHTML = message;
  nav.parentNode.insertBefore(div, nav.nextSibling);
  const notif = helpers.qs(".notif");

  setTimeout(() => {
    notif.classList.remove("fadeInUp");
    notif.classList.add("fadeOutDown");
  }, 2500);
};

const removeNotifs = function() {
  const notifs = helpers.qsa(".notif");
  for (let i = 0; i < notifs.length; i += 1) {
    notifs[i].parentNode.removeChild(notifs[i]);
  }
};

const drawSpinner = function() {
  const spinner = helpers.newEl("i");
  const nav = helpers.qs(".nav");
  spinner.className = "fas fa-spinner fa-spin x-centered fa-lg";
  nav.parentNode.insertBefore(spinner, nav.nextSibling);
};

const removeSpinner = function() {
  const spinner = helpers.qs(".fa-spinner");
  spinner.parentNode.removeChild(spinner);
};

const drawNextBtn = function() {
  const nextBtn = helpers.newEl("button");
  const nav = helpers.qs(".nav");
  nextBtn.id = "next";
  nextBtn.className = "secondary";
  nextBtn.textContent = "Show Next";
  nav.parentNode.insertBefore(nextBtn, nav.nextSibling);
};

const removeNextBtn = function() {
  const nextBtn = helpers.qs("#next");
  if (nextBtn === null) {
    return;
  }
  nextBtn.parentNode.removeChild(nextBtn);
};

const drawNoMoreVenues = function() {
  const card = helpers.qs(".card");
  removeNextBtn();
  card.parentNode.removeChild(card);
  drawNotif("You ran out of venues, please select a radius for more matches.", "info");
};

const drawInfo = function(venue) {
  const div = helpers.newEl("div");
  const { name } = venue.venue;
  const { address } = venue.venue.location;
  const { city } = venue.venue.location;
  const fullAddress = `${address} - ${city}`;
  const nav = helpers.qs(".nav");
  const card = helpers.qs(".card");

  if (card === null) {
    div.className = "animated slideInLeft card";
    div.insertAdjacentHTML("afterbegin", `<h4>${name}</h4><h6>${fullAddress}</h6>`);
    nav.parentNode.insertBefore(div, nav.nextSibling);
  } else {
    card.classList.remove("slideInLeft");
    card.classList.add("slideOutLeft");
    card.innerHTML = "";

    setTimeout(() => {
      card.classList.remove("slideOutLeft");
      card.insertAdjacentHTML("afterbegin", `<h4>${name}</h4><h6>${fullAddress}</h6>`);
      card.classList.add("slideInLeft");
    }, 1000);
  }
};

const drawDetails = function(venue) {
  const card = helpers.qs(".card");
  let hrs;
  let number;

  if (venue.hours === undefined) {
    hrs = "Hours Unavailable";
  } else {
    hrs = venue.hours.status;
  }

  if (venue.contact.phone === undefined) {
    number = "Number Unavailable";
  } else {
    number = venue.contact.phone;
  }
  card.insertAdjacentHTML(
    "beforeend",
    `<small class="animated slideInLeft">${number}</small><p class="animated slideInLeft">${hrs}</p>`
  );
};

export default {
  drawNotif,
  removeNotifs,
  drawSpinner,
  removeSpinner,
  drawNextBtn,
  drawNoMoreVenues,
  drawInfo,
  drawDetails,
  removeNextBtn
};
