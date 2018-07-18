var express = require('express');
const Game = require('../models/game')
const SpotifyWebApi = require('spotify-web-api-node');

var router = express.Router();
var artistList = require('../bin/seeds');
var helper=require('../helpers/helper');


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




function randomTrack(){
  let random=Math.floor(Math.random()*5);
  return random;
}
let corRand=randomTrack();




router.get('/random', (req, res, next) => {
  let promises = []
  for (let i = 0; i < 10; i++) {
    promises.push(helper.getOneRandomQuestion(spotifyApi))
  }
  Promise.all(promises)
  .then(questions => {
    let game = { 
      questions: questions
    }
    
    
    for (let i = 0; i < questions.length; i++) {
      if(game.questions[i])
        helper.shuffle(game.questions[i].answers)
    }
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
