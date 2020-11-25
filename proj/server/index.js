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

app.use(express.static("client/dist"));
app.use(express.json());
app.use(cors());
app.use(cookieParser());

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
  res.redirect('https://accounts.spotify.com/authorize?' +
    querystring.stringify({
      response_type: 'code',
      client_id: keys.client_id,
      scope: scope,
      redirect_uri: keys.redirect_uri,
      state: state
    })
  );
})

app.get('/callback', function(req, res) {

  // your application requests refresh and access tokens
  // after checking the state parameter
  // console.log(req.query);
  var code = req.query.code || null;
  var state = req.query.state || null;
  var storedState = req.cookies ? req.cookies[stateKey] : null;

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
            console.log("FUCK");
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
      helpers.getArtist(result, (error, result) => {
        if (error) {
          res.send(error);
        } else {
          res.send(result.data);
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

