const express = require('express');
const app = express();
const cors = require('cors');
const querystring = require('querystring');
const cookieParser = require('cookie-parser');
const port = 4000;
const path = require('path');
const keys = require('../keys/client.js');
const axios = require('axios');
const helpers = require('../helpers/getToken.js');
const Spotify = require('spotify-web-api-node');


app.use(express.static("client/dist"));
app.use(express.json());
app.use(cors());
app.use(cookieParser());

const spotifyApi = new Spotify({
  clientId: keys.client_id,
  clientSecret: keys.client_secret,
  redirectUri: keys.redirect_uri
})

var generateRandomString = function(length) {
  var text = '';
  var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (var i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};

var stateKey = 'spotify_auth_state';

app.get("/login", (req, res) => {
  var state = generateRandomString(16);
  res.cookie(stateKey, state);
  // your application requests authorization
  var scope = 'user-follow-read user-library-read user-library-modify user-read-private user-read-email';
  res.redirect(spotifyApi.createAuthorizeURL(["user-read-private", "user-read-email"], state))
  // res.redirect('https://accounts.spotify.com/authorize?' +
  //   querystring.stringify({
  //     response_type: 'code',
  //     client_id: keys.client_id,
  //     scope: scope,
  //     redirect_uri: keys.redirect_uri,
  //     state: state
  //   })
  // );
})

app.get('/callback', function(req, res) {

  // your application requests refresh and access tokens
  // after checking the state parameter
  console.log(req.query);
  var code = req.query.code || null;
  var state = req.query.state || null;
  var storedState = req.cookies ? req.cookies[stateKey] : null;
  console.log(req.cookies);
  console.log(state);

  if (state === null || state !== storedState) {
    res.redirect('/#' +
      querystring.stringify({
        error: 'state_mismatch'
      }));
  } else {
  res.clearCookie(stateKey);
  helpers.getTokenForUser(code, (error, result) => {
    if (error) {
      console.log(error.data);
    } else {
      helpers.getUserInfo(result.data.access_token, (err, result) => {
        if (err) {
          console.log(err);
        } else {
          // console.log(result);
          console.log(result.data);
        }
      })
    }
  })
  }
})

app.post("/artist", (req, res) => {
  helpers.getTokenForMusic((error, result) => {
    if (error) {
      res.send(error);
    } else {
      var token = result.data.access_token;
      // console.log(req.body.params);
      // console.log(token);
      helpers.getArtists(token, req.body.params, (error, result) => {
        if (error) {
          console.log(error.body)
          // res.send(error);
        } else {
          var newResult = {};
          newResult.artist = result[Math.floor(Math.random() * result.length)];
          // console.log(result);
          helpers.getArtistTracks(token, newResult.artist, (error, result) => {
            if (error) {
              res.send(error);
            } else {
              newResult.tracks = result;
              res.send(newResult);
            }
          })
          // res.send(result);
        }
      })
    }
  })
})

// app.post("/playlist", (req, res) => {
//   helpers.getToken((result) => {

//   })
// })



app.listen(port, () => {
  console.log(`Listening on port ${port}`);
})

