import helpers from "./helpers";

const render = function(state) {
  const container = helpers.qs("#results");
  container.innerHTML = "";
  state.venues.forEach(element => {
    const li = helpers.newEl("li");
    li.innerHTML = element.venue.name;
    container.appendChild(li);
  });
};

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

export default { render, drawNotif, removeNotifs, drawSpinner, removeSpinner };
