var express = require('express');
const Game = require('../models/game')
const SpotifyWebApi = require('spotify-web-api-node');

var router = express.Router();
var artistList = require('../bin/seeds');
var getWrongArtist=require('../helpers/helper');

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

function getOneRandomQuestion(spotifyApi, stack=0) {
  let corrAnswer=artistList[Math.floor(Math.random()*artistList.length)+1];
  let wrong1=getWrongArtist();
  let wrong2=getWrongArtist();
  let wrong3=getWrongArtist();

  return Promise.all([
    spotifyApi.searchTracks('artist:'+corrAnswer),
    spotifyApi.searchTracks('artist:'+wrong1),
    spotifyApi.searchTracks('artist:'+wrong2),
    spotifyApi.searchTracks('artist:'+wrong3)
  ])
  .then(arrayData =>{
    let data = arrayData[0]
    let data2 = arrayData[1]
    let data3 = arrayData[2]
    let data4 = arrayData[3]
    try {
        let question ={
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
        }
        return question
    }
    catch (err) {
      if (stack < 10) {
        getOneRandomQuestion(spotifyApi, stack+1)
      }
      else {
        throw new Error("getOneRandomQuestion failed 10 times in a row")
      }
    }
  })
}


router.get('/random', (req, res, next) => {
  let promises = []
  for (let i = 0; i < 10; i++) {
    promises.push(getOneRandomQuestion(spotifyApi))
  }
  Promise.all(promises)
  .then(questions => {
    let game = { 
      questions: questions
    }
    // helper.shuffle(game.questions.answers)
    return Game.create(game)
  })
  .then(gameCreated => {
    res.json(gameCreated)
  })
  .catch((err) => {
    console.log('Something went wrong!', err);
    next(err)
  })
});


module.exports = router;
