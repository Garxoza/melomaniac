var express = require('express');
const Game = require('../models/game')
const SpotifyWebApi = require('spotify-web-api-node');

var router = express.Router();
var artistList = require('../bin/seeds');
getWrongArtist=require('../helpers/helper');

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

let wrong1=getWrongArtist();
let wrong2=getWrongArtist();
let wrong3=getWrongArtist();
function randomTrack(){
  let random=Math.floor(Math.random()*5);
  return random;
}
let corRand=randomTrack();

router.get('/random', (req, res, next) => {
  Promise.all([
    spotifyApi.searchTracks('artist:'+corrAnswer),
    spotifyApi.searchTracks('artist:'+wrong1),
    spotifyApi.searchTracks('artist:'+wrong2),
    spotifyApi.searchTracks('artist:'+wrong3)
    ])
  .then(function(arrayData) {
    let data = arrayData[0]
    let data2 = arrayData[1]
    let data3 = arrayData[2]
    let data4 = arrayData[3]
    try {
        let game = { 
        questions: [{
          musicUrl: data.body.tracks.items[corRand].preview_url,
          answers: [{
            answer: corrAnswer+" -- "+ data.body.tracks.items[corRand].name,
            isCorrect: true
          }, {
            answer: wrong1 + " -- " +data2.body.tracks.items[randomTrack()].name,
            isCorrect: false
          },
          {
            answer: wrong2 + " -- " +data3.body.tracks.items[randomTrack()].name,
            isCorrect: false
          },
          {
            answer: wrong3 + " -- " +data4.body.tracks.items[randomTrack()].name,
            isCorrect: false
          }]
        }]
      }
      // helper.shuffle(game.questions.answers)
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
