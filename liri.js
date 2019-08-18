//add the required libraries/pacakages installed
require("dotenv").config();
const axios = require("axios");
const fs = require("fs");
const Spotify = require("node-spotify-api");
const moment = require("moment");

//require liri to use keys from keys file (which are also in .env which will be hidden)
const keys = require("./keys.js");
let spotify = new Spotify(keys.spotify);

//define variables using process.argv below
let command = process.argv[2]
let searchTerm = process.argv[3]

//log.txt bonus - append to file, no re-write
fs.appendFile('log.txt', command + ",", function (err) {
    //catch/throw from w3schools
    if (err) throw err;
});

//spotify-this-song
//this will show in the terminal:
    //artist(s)
    //the song's name
    //a preview link of the song from Spotify
    //the album that the song is from
    //if no song is provided then choose a default song to submit to the API
function spotifyThis (song) {
    spotify
        //search and then return the data
        .search({type: "track", query: song})
        .then(function (response) {
            //error for no song provided - function to follow below
            if (response.tracks.total === 0) {
                errorConditionForSpotify();
            } else {
            //if a viable song is provided, the below data is returned to user
                console.log("Artist: " + response.tracks.items[0].artists[0].name);
                console.log("Track: " + response.tracks.items[0].name);
                console.log("Preview URL: " + response.tracks.items[0].preview_url);
                console.log("Album: " + response.tracks.items[0].album.name);
            }
        //catch function handles my errors - used from here on out in this project
        //w3schools
        }).catch(function (error) {
            console.log(error);
            console.log("No Results found. Showing results for 'Oops!....I Did It Again' by Brittany Spears");
        });
    }

//function to be executed for song selected by me in the case of an error
function errorConditionForSpotify() {
    spotify
        //preselected song defined below
        .search({ type: 'track', query: 'Oops!...I Did It Again' })
       .then(function (notfoundresponse) {
           for (var i = 0; i < notfoundresponse.tracks.items.length; i++) {
               //preselected artist defined below
               // if (notfoundresponse.tracks.items[i].artists[0].name === "Brittany Spears") {
                   console.log("Artist: " + notfoundresponse.tracks.items[i].artists[0].name);
                   console.log("Track: " + notfoundresponse.tracks.items[i].name);
                   console.log("Preview URL: " + notfoundresponse.tracks.items[i].preview_url);
                   console.log("Album: " + notfoundresponse.tracks.items[i].album.name);
                   i = notfoundresponse.tracks.items.length;
               // }
           }
        //error
        //w3schools
        }).catch(function (error) {
            console.log(error);
            console.log("No Results found. ");
        });
    }

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
function movieThis(movie) {
    //axios call to OMDB
    axios.get("http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&tomatoes=true&apikey=trilogy").then(
        function (response) {
            //if the movie title is defined, the below data is returned to the user
            if (response.data.Title != undefined) {
                console.log("Title: " + response.data.Title);
                console.log("Year: " + response.data.Year);
                console.log("imdbRating: " + response.data.imdbRating);
                console.log("RottenTomatoes: " + response.data.tomatoRating);
                console.log("Country:: " + response.data.Country);
                console.log("Language:: " + response.data.Language);
                console.log("Plot: " + response.data.Plot);
                console.log("Actors: " + response.data.Actors);
            //function to be executed for movie selected by me in the case of an error
            }
            else {
                movieThis("Mr. Nobody"); //from homework README
            }
        }
        //error
        //w3schools
        ).catch(function (error) {
            console.log(error);
            console.log("No Results found. ");
        });
    }

//do-what-it-says
//will take text in random.text and use it to call one of Liri's commands
//edit the text in random.txt to test out the feature for movie-this
function doRandom() {
    //reading random.txt
    fs.readFile("random.txt", "utf8", function(error, data) {
        //separate out data
        var dataArr = data.split(",");
        spotifyThis(dataArr[1])
        //error
        if (error) {
          return console.log(error);
        }
    });
}

//switch function because there are three code blocks
function RunApp(){
    switch (command) {
    case "spotify-this-song":
        spotifyThis(searchTerm);
        break;
    case "movie-this":
        movieThis(searchTerm);
        break;
    case "do-what-it-says":
        doRandom();
        break;
    }
}

//initialize
RunApp();