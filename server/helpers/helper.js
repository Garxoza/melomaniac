const artistList = require('../bin/seeds');

function randomTrack(){
  let random=Math.floor(Math.random()*5);
  return random;
}
let corRand=randomTrack();

module.exports = {
  

  getWrongArtist: function(){
    let wrong=artistList[Math.floor(Math.random()*artistList.length)+1];
    return wrong;
  },

  shuffle: function(arr) {
    var currentIndex = arr.length;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

        // Pick a remaining element...
     var randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
     var temporaryValue = arr[currentIndex];
        arr[currentIndex] = arr[randomIndex];
      arr[randomIndex] = temporaryValue;
   }

    return arr;
  },

  getOneRandomQuestion: function(spotifyApi, stack=0) {
    let corrAnswer=artistList[Math.floor(Math.random()*artistList.length)+1];
    let wrong1=this.getWrongArtist();
    let wrong2=this.getWrongArtist();
    let wrong3=this.getWrongArtist();


    
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
          if (!data.body.tracks.items[corRand].preview_url) throw new Error("No preview_url")
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
        if (stack < 30) {
          setTimeout(() => {
            this.getOneRandomQuestion(spotifyApi, stack+1)
          }, 20)
        }
        else {
          throw new Error("getOneRandomQuestion failed 30 times in a row")
        }
      }
    })
  }

}
