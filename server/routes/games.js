var express = require('express');
const Game = require('../models/Game')
const Song = require('../models/Song')
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




router.get('/random-old', (req, res, next) => {
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


router.get('/random', (req, res, next) => {
  Song.find()
  .then(songs => {
    songs.sort((a,b) => Math.random()-0.5) // To shuffle
    console.log(songs.map(song => song.artistName + " --- " + song.name));

    let questions = []
    let nbOfQuestions = 10
    for (let i = 0; i < nbOfQuestions; i++) {
      let answers = [
        {
          answer: songs[4*i].artistName + " --- " + songs[4*i].name,
          "isCorrect": true,
        },
        {
          answer: songs[4*i+1].artistName + " --- " + songs[4*i+1].name,
          "isCorrect": false,
        },
        {
          answer: songs[4*i+2].artistName + " --- " + songs[4*i+2].name,
          "isCorrect": false,
        },
        {
          answer: songs[4*i+3].artistName + " --- " + songs[4*i+3].name,
          "isCorrect": false,
        }
      ]

      answers.sort((a,b) => Math.random()-0.5) // To shuffle

      questions.push({
        previewUrl: songs[4*i].previewUrl,
        answers
      })
    }
    let game = { 
      questions: questions
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

router.get('/:gameId', (req, res, next) => {
  Game.findById(req.params.gameId)
  .then(games => res.json(games))
})


module.exports = router;
