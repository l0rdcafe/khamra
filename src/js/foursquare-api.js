const CLIENT_ID = "32IXSTBK1V3NFIH3NFJ5LZHYWKKSNA131CZR0RFCE2OTRERJ";
const CLIENT_SECRET = "0SVNBULCMHEUOY3ZXSGPVJ3XDQN5EYNZRXOXHNIU2AOVO10Q";

const getJSON = function(url) {
  return fetch(url)
    .then(res => res.json())
    .catch(err => err);
};

const getVenues = function(latlon, rad) {
  const FOURSQUARE_URL = "https://api.foursquare.com/v2/venues/explore?";
  const url = `${FOURSQUARE_URL}client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}&ll=${latlon}&radius=${rad}&intent=browse&section=drinks&limit=20&v=20180505`;

  return getJSON(url);
};

const getVenueDetails = function(venue) {
  const FOURSQUARE_URL = "https://api.foursquare.com/v2/venues/";
  const url = `${FOURSQUARE_URL}${venue.venue.id}?client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}&v=20180505`;

  return getJSON(url);
};

export default { getVenues, getVenueDetails };
