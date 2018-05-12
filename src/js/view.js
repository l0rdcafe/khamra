import helpers from "./helpers";

const drawNotif = function(message) {
  const div = helpers.newEl("div");
  const nav = helpers.qs(".nav");
  div.className = "notif animated fadeInUp error";
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
  nextBtn.parentNode.removeChild(nextBtn);
};

const drawNoMoreVenues = function() {
  const map = helpers.qs("#map");
  removeNextBtn();
  map.innerHTML = "";
  map.insertAdjacentHTML(
    "afterbegin",
    `<h4 class="text-c text-white">You ran out of venues, please provide your location for more matches.</h4>`
  );
};

export default { drawNotif, removeNotifs, drawSpinner, removeSpinner, drawNextBtn, drawNoMoreVenues };
