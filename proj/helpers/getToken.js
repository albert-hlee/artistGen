const axios = require('axios');
const keys = require('../keys/client.js');
const querystring = require('querystring');

module.exports = {
  getTokenForMusic: (callback) => {
    axios({
      method: 'post',
      url: 'https://accounts.spotify.com/api/token',
      data: querystring.stringify({
        grant_type: "client_credentials"
      }),
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization':
          'Basic ' +
          Buffer.from(keys.client_id + ':' + keys.client_secret).toString('base64')
      }
    })
    .then((result) => {
      callback(null, result);
    })
    .catch((error) => {
      callback(error, null);
    })
  },
  getArtists: (access, params, callback) => {
    var token = access;
    var genre = params.genre;
    var artists = params.artistsLike;
    axios({
      method: 'get',
      url: `https://api.spotify.com/v1/search?q="${artists[Math.floor(Math.random() * artists.length)]}"&type=artist&limit=3`,
      headers: {
        // 'Accept': "application/json",
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + access
      },
      json: true
    })

    .then(result => {
      axios({
        method: 'get',
        url: `https://api.spotify.com/v1/artists/${result.data.artists.items[0].id}/related-artists`,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': 'Bearer ' + token
        },
        json: true
      })
      .then(result => {
        callback(null, result.data.artists.slice(0, 5));
      })
      .catch(error => {
        callback(error, null);
      })
    })
    .catch(error => {
      callback(error, null);
    })
  },
  // getPlaylists: (result, callback) => {

  // },
  getArtistTracks: (token, artist, callback) => {
    axios({
      method: 'get',
      url: `https://api.spotify.com/v1/artists/${artist.id}/top-tracks?country=SE`,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      },
      json: true
    })
    .then(result => {
      callback(null, result.data.tracks.slice(0, 5));
    })
    .catch(error => {
      callback(error, null);
    })
  },
  getTokenForUser: (code, callback) => {
    axios({
      method: 'post',
      url: 'https://accounts.spotify.com/api/token',
      data: querystring.stringify({
        code: code,
        redirect_uri: keys.redirect_uri,
        grant_type: "client_credentials"
      }),
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization':
          'Basic ' +
          Buffer.from(keys.client_id + ':' + keys.client_secret).toString('base64')
      }
    })
    .then((result) => {
      callback(null, result);
    })
    .catch((error) => {
      callback(error, null);
    })
  },
  getUserInfo: (token, callback) => {
    axios({
      method: 'get',
      url: "https://api.spotify.com/v1/me",
      headers: {
        "Authorization": "Bearer " + token
      },
      json: true
    })
    .then((result) => {
      callback(null, result)
    })
    .catch((error) => {
      callback(error, null);
    })
  }

}

// q=${artists[0]}&type=artist
// ${querystring.stringify({q: artists, type: "artist", limit: })}