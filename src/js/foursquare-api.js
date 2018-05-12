const getVenues = function(latlon, rad) {
  const FOURSQUARE_URL = "https://api.foursquare.com/v2/venues/explore?";
  const CLIENT_ID = "32IXSTBK1V3NFIH3NFJ5LZHYWKKSNA131CZR0RFCE2OTRERJ";
  const CLIENT_SECRET = "0SVNBULCMHEUOY3ZXSGPVJ3XDQN5EYNZRXOXHNIU2AOVO10Q";
  function getJSON(url) {
    return fetch(url)
      .then(res => res.json())
      .catch(err => err);
  }
  const url = `${FOURSQUARE_URL}client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}&ll=${latlon}&radius=${rad}&intent=browse&section=drinks&limit=3&v=20180505&offset=0`;

  return getJSON(url);
};

export default { getVenues };
