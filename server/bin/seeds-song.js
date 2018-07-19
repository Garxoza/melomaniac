const mongoose = require('mongoose');
const SpotifyWebApi = require('spotify-web-api-node');
const Song = require('../models/Song');

const NB_OF_SONGS_PER_ARTISTS = 5

require('../configs/database');

const clientId = '774af390dd2142dcadfcccc52d3e22c3',
    clientSecret = 'a55a2507b3dc49479367d163f1b48e90';

var spotifyApi = new SpotifyWebApi({
  clientId : clientId,
  clientSecret : clientSecret
});

// Retrieve an access token.





let artists=[
  "2pac",
  "AC/DC",
  "Adele",
  "Aerosmith",
  "Al Green",
  "Arcade Fire",
  "Archive",
  "Arctic Monkeys",
  "Aretha Franklin",
  "Bach",
  "Beyonce",
  "Big Joe Turner",
  "Bill Haley & His Comets",
  "Billy Joel",
  "Bjork",
  "Black Eyes Peas",
  "Black Sabbath",
  "Blondie",
  "Bo Diddley",
  "Bob Dylan",
  "Bob Marley",
  "Borodin",
  "Bruce Springsteen",
  "Bruno Mars",
  "Chopin",
  "Cream",
  "David Bowie",
  "Death",
  "Debussy",
  "Deep Purple",
  "Dimmu Borgir",
  "Eagles",
  "Editors",
  "Elton John",
  "Elvis Costello",
  "Elvis Presley",
  "Eminem",
  "Fats Domino",
  "Fleetwood Mac",
  "Franz Ferdinand",
  "Garfunkel",
  "George Clinton",
  "George Michael",
  "Gershwin",
  "Gounod",
  "Haydn",
  "Hector Berlioz",
  "Interpol",
  "Jackie Wilson",
  "Janet Jackson",
  "Janis Joplin",
  "Jay-Z",
  "Jeff Beck",
  "Jerry Lee Lewis",
  "Jimi Hendrix",
  "John Williams",
  "Joni Mitchell",
  "Kanye West",
  "Kasabian",
  "Katy Perry",
  "Khachaturian",
  "King Crimson",
  "Korsakov",
  "Lana Del Rey",
  "Led Zeppelin",
  "Linkin Park",
  "Little Richard",
  "Madonna",
  "Marvin Gaye",
  "Metallica",
  "Michael Jackson",
  "Moby",
  "Motorhead",
  "Mozart",
  "Neil Young",
  "Notorious BIG",
  "Otis Redding",
  "Outkast",
  "Paul McCartney",
  "Pearl Jam",
  "Pharrell Williams",
  "Pink Floyd",
  "Placebo",
  "Prokofiev",
  "Public Enemy",
  "Queen",
  "R.E.M.",
  "Radiohead",
  "Ray Charles",
  "Red Hot Chili Pepers",
  "Robbie Williams",
  "Rod Stewart",
  "Ronnie James Dio",
  "Rossini",
  "Roy Orbison",
  "Run-D.M.C.",
  "Ruth Brown",
  "Sabbaton",
  "Sam Cooke",
  "Scorpions",
  "Sepultura",
  "Shakira",
  "Sia",
  "Sigur Ros",
  "Slayer",
  "Sly & The Family Stone",
  "Snoop Dog",
  "Stevie Wonder",
  "Strauss",
  "Swift",
  "Tchaikovsky",
  "The Beach Boys",
  "The Bee Gees",
  "The Byrds",
  "The Clash",
  "The Clovers",
  "The Cure",
  "The Dominoes",
  "The Drifters",
  "The Everly Brothers",
  "The Grateful Dead",
  "The Impressions",
  "The Kinks",
  "The Platters",
  "The Police",
  "The Rolling Stones",
  "The Smiths",
  "The Supremes",
  "The Temptations",
  "The Who",
  "Tiersen",
  "Van Halen",
  "Van Morrison",
  "Verdi",
  "Whitney Houston",
]


function saveSongsFromArtist(iArtist = 0) {
  spotifyApi.searchTracks('artist:'+artists[iArtist])
  .then(data => {
    let promises = []
    if (data.body.tracks) {
      for (let iItem = 0; iItem < Math.min(NB_OF_SONGS_PER_ARTISTS, data.body.tracks.items.length); iItem++) {
        if (data.body.tracks.items[iItem].preview_url) {
          promises.push(Song.create({
            previewUrl: data.body.tracks.items[iItem].preview_url,
            name: data.body.tracks.items[iItem].name,
            artistName: artists[iArtist],
          }))
        }
      }
    }
    return Promise.all(promises)
  })
  .then(() => {
    console.log("It worked for " + artists[iArtist])
    if (iArtist+1 < artists.length) {
      setTimeout(() => {
        saveSongsFromArtist(iArtist+1)
      }, 200)
    }
    else {
      mongoose.disconnect()
    }
  })
  .catch(err => console.log(err))
}

spotifyApi.clientCredentialsGrant()
  .then(function(data) {
    spotifyApi.setAccessToken(data.body['access_token']);
    Song.deleteMany()
    .then(() => {
      saveSongsFromArtist()
      // mongoose.disconnect();
    })
    .catch(err => console.log(err))
  }, function(err) {
    console.log('Something went wrong when retrieving an access token', err);
})
.catch(err => console.log(err));

