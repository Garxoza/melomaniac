const artistList = require('../bin/seeds');

module.exports = function getWrongArtist(){
  let wrong=artistList[Math.floor(Math.random()*artistList.length)+1];
  return wrong;
}