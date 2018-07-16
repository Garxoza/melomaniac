var express = require('express');
const Game = require('../models/game')
const SpotifyWebApi = require('spotify-web-api-node');

var router = express.Router();
var artistList = require('../bin/seeds');


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

let corrAnswer=artistList[Math.floor(Math.random()*artistList.length)+1];
let randomTrack=Math.floor(Math.random()*5)+1;
let wrong1=artistList[Math.floor(Math.random()*artistList.length)+1];


router.get('/random', (req, res, next) => {
  Promise.all([
    spotifyApi.searchTracks('artist:'+corrAnswer)
  ])
  .then(function(arrayData) {
    let data = arrayData[0]
    try {
        let game = { 
        questions: [{
          musicUrl: data.body.tracks.items[randomTrack].preview_url,
          answers: [{
            answer: corrAnswer+" -- "+ data.body.tracks.items[randomTrack].name,
            isCorrect: true
          }, {
            answer: "B",
            isCorrect: false
          },
          {
            answer: "c",
            isCorrect: false
          },
          {
            answer: "radio",
            isCorrect: false
          }]
        }]
      }
      
      return Game.create(game)
    }
    catch(err) {
      next(err)
    } 
  })
  .then(gameCreated => {
    res.json(gameCreated)
  })
  .catch((err) => {
    console.log('Something went wrong!', err);
  })

  .then(data => {
    let game = { 
      questions: [{
        musicUrl: "",
        answers: [{
          answer: "A",
          isCorrect: true
        }, {
          answer: "B",
          isCorrect: false
        },
        {
          answer: "C",
          isCorrect: false
        },
        {
          answer: "D",
          isCorrect: false
        }]
      }]
    }
    Game.create(game)
    res.json(data)
  })
  .catch(err => next(err))
});

module.exports = router;
