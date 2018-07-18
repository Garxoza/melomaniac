const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');
const { Schema } = mongoose;

const songSchema = new Schema({
  previewUrl: {type:String, required: true},
  name: {type:String, required: true},
  artistName: {type:String, required: true},
});


module.exports = mongoose.model('Song', songSchema);