var express = require('express');
const Game = require('../models/game')
const SpotifyWebApi = require('spotify-web-api-node');

var router = express.Router();

const clientId = '774af390dd2142dcadfcccc52d3e22c3',
    clientSecret = 'a55a2507b3dc49479367d163f1b48e90';

var spotifyApi = new SpotifyWebApi({
  clientId : clientId,
  clientSecret : clientSecret
});

// Retrieve an access token.
spotifyApi.clientCredentialsGrant()
  .then(function(data) {
    spotifyApi.setAccessToken(data.body['access_token']);
  }, function(err) {
    console.log('Something went wrong when retrieving an access token', err);
});

function getArtist(){
  return spotifyApi.searchArtists("rem")
  }

function getArtistId(){
  var art=getArtist();
  console.log("DeBUG ARTIST IS", art)
  var artistId=0;
 
    artistId=art.body.artists.items[0].id;
    
  return artistId}

// function getTrack(){
//   return spotifyApi.getArtistTopTracks(getArtistId())}

router.get('/random', (req, res, next) => {
  spotifyApi.searchArtists("abba")
  .then(data => {
    try {
      let id = data.body.artists.items[0].id
      console.log("id", id);
      return spotifyApi.getArtistTopTracks(id, 'GB')
    }
    catch (err) {
      next("Problem with Spotify API", data)
    }
  })
  .then(data => {
    res.json(data)
  })
  .catch(err => next(err))
});

module.exports = router;
