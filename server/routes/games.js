var express = require('express');
const Game = require('../models/Game')
const Song = require('../models/Song')
const SpotifyWebApi = require('spotify-web-api-node');
const passport = require('passport');
const jwt = require('jwt-simple');
const config = require('../configs/index');

var router = express.Router();
// var artistList = require('../bin/seeds');
// var helper=require('../helpers/helper');


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






router.get('/random', (req, res, next) => {
  Song.find()
  .then(songs => {
    console.log("Display songs =>", songs)
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
  .populate("players._users")
  .then(games => res.json(games))
})


router.post('/:gameId/score', passport.authenticate("jwt", config.jwtSession), (req, res, next) => {
  let {score} = req.body
  let elementPushed = {
    _user: req.user._id,
    score
  }
  Game.findByIdAndUpdate(req.params.gameId, {$push: { players: elementPushed}})
  .then(game => res.json(game))
})


module.exports = router;