//add the npm pacakages installed
require("dotenv").config();
let axios = require("axios");
let fs = require("fs");
let Spotify = require("node-spotify-api");
let keys = require("./keys.js");
let moment = require("moment");
let spotify = new Spotify(keys.spotify);

//spotify-this-song
//this will show in the terminal:
    //artist(s)
    //the song's name
    //a preview link of the song from Spotify
    //the album that the song is from
//if no song is provided then choose a default song to submit to the API

.prompt([
{

}

])

//movie-this
//this will show in the terminal:
    //title of the movie.
    //year the movie came out.
    //IMDB Rating of the movie.
    //Rotten Tomatoes Rating of the movie.
    //country where the movie was produced.
    //language of the movie.
    //plot of the movie.
    //actors in the movie.
//if the user doesn't type a movie in, then choose a default movie to submit to the API

.prompt([
    {
    
    }
    
    ])

//node liri.js do-what-it-says
//will take text in random.text and use it to call one of Liri's commands
//edit the text in random.txt to test out the feature for movie-this

.prompt([
    {
    
    }
    
    ])