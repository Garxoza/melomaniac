
let artList=[
"Elvis Presley",
"Bob Dylan",
"The Rolling Stones",
"Stevie Wonder",
"The Who",
"Led Zeppelin",
"Ray Charles",
"The Beach Boys",
"Aretha Franklin",
"Fats Domino",
"Michael Jackson",
"Madonna",
"Jimi Hendrix",
"Little Richard",
"Bruce Springsteen",
"Marvin Gaye",
"Sam Cooke",
"Prince",
"The Supremes",
"Pink Floyd",
"Elton John",
"Run-D.M.C.",
"Queen",
"The Temptations",
"The Everly Brothers",
"David Bowie",
"Neil Young",
"Bob Marley",
"Public Enemy",
"Sly & The Family Stone",
"Bill Haley & His Comets",
"The Kinks",
"R.E.M.",
"Bo Diddley",
"Black Sabbath",
"Jay-Z",
"The Clash",
"Otis Redding",
"The Grateful Dead",
"The Byrds",
"Van Halen",
"The Drifters",
"2pac",
"Eminem",
"Roy Orbison",
"George Clinton",
"Metallica",
"Garfunkel",
"The Impressions",
"Jerry Lee Lewis",
"Eagles",
"Joni Mitchell",
"Fleetwood Mac",
"Aerosmith",
"Pearl Jam",
"The Bee Gees",
"The Platters",
"The Clovers",
"Janet Jackson",
"Jackie Wilson",
"Ruth Brown",
"Van Morrison",
"Cream",
"The Police",
"Al Green",
"AC/DC",
"Deep Purple",
"Radiohead",
"Outkast",
"Rod Stewart",
"The Dominoes",
"Kanye West",
"Elvis Costello",
"Big Joe Turner",
"Whitney Houston",
"Billy Joel",
"Janis Joplin",
"Paul McCartney",
"Scorpions",
"Ronnie James Dio",
"Jeff Beck",
"Archive",
"Sigur Ros",
"Bjork",
"Editors",
"Black Eyes Peas",
"Blondie",
"Bach",
"Mozart",
"Tchaikovsky",
"Strauss",
"Verdi",
"Rossini",
"Khachaturian",
"Prokofiev",
"Korsakov",
"Borodin",
"Hector Berlioz",
"Debussy",
"Haydn",
"Chopin",
"Gershwin",
"Beyonce",
"Swift",
"Placebo",
"Interpol",
"Gounod",
"Sia",
"Pharrell Williams",
"Robbie Williams",
"Katy Perry",
"Adele",
"Bruno Mars",
"Shakira",
"Snoop Dog",
"Notorious BIG",
"Arctic Monkeys",
"Kasabian",
"Moby",
"Arcade Fire",
"Slayer",
"King Crimson",
"Linkin Park",
"Franz Ferdinand",
"The Cure",
"The Smiths",
"Motorhead",
"Sepultura",
"Dimmu Borgir",
"Death",
"Sabbaton",
"John Williams",
"Tiersen",
"George Michael",
"Lana Del Rey",
"Red Hot Chili Pepers"
]

function uniq(a) {
  var seen = {};
  return a.filter(function(item) {
      return seen.hasOwnProperty(item) ? false : (seen[item] = true);
  });
}

let artistList=uniq(artList);

module.exports=artistList;