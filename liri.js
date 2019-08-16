//add the npm pacakages installed
require("dotenv").config();
const axios = require("axios");
const fs = require("fs");
const Spotify = require("node-spotify-api");
const moment = require("moment");
const inquirer = require("inquirer");

//require liri to use keys from keys file (which are also in .env which will be hidden)
const keys = require("./keys.js");
let spotify = new Spotify(keys.spotify);

//define variables using process.argv below
let command = process.argv[2]
let searchTerm = process.argv[3]

//switch command since there are three scenarios here
switch (command){
    case "spotify-this-song":  
        spotify(searchTerm);
        break;
    case "movie-this": 
        movieThis(searchTerm);
        break;
    case "do-what-it-says":  
        doRandom();
    break;
}

//gather some initial info from the user
inquirer.prompt([
    {
    type: "input",
    message: "What is your name?",
    name: "username"
    },
    {
    type: "checkbox",
    message: "What would you like Liri to help you with?",
    choices: ["spotify-this-song", "movie-this", "do-what-it-says"],
    name: "LiriAsked"
    },
])

//spotify-this-song
//this will show in the terminal:
    //artist(s)
    //the song's name
    //a preview link of the song from Spotify
    //the album that the song is from
//if no song is provided then choose a default song to submit to the API

inquirer.prompt([
    {
    type: "input",
    message: "What song do you want to hear?",
    mame: "song"
    },
])

if (response.choices === ("spotify-this-song") {
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

inquirer.prompt([
    {
    type: "input",
    message: "What movie do you want to know about?",
    mame: "movie"
    },
])

//do-what-it-says
//will take text in random.text and use it to call one of Liri's commands
//edit the text in random.txt to test out the feature for movie-this

.prompt([
    {
    
    }
    
    ])