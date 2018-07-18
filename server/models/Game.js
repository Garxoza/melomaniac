const mongoose = require('mongoose');
const { Schema } = mongoose;

const gameSchema = new mongoose.Schema({  
  questions: [{
    previewUrl: {type: String},
    answers: [{
    answer: {type: String},
    isCorrect: {type: Boolean}
    }]
  }],
  players: [{
    _user: {type: Schema.Types.ObjectId, ref:'User'},
    score: {type: Number},
    guesses: [{type: Number}]
  }]
});

const Game = mongoose.model('Game', gameSchema);

module.exports = Game;