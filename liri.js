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
    if (err) throw err;
});

//switch command since there are three blocks here
switch (command) {
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

//spotify-this-song
//this will show in the terminal:
    //artist(s)
    //the song's name
    //a preview link of the song from Spotify
    //the album that the song is from
    //if no song is provided then choose a default song to submit to the API

function spotify(song) {
    spotify
        .search({type: "track", query: song})
        .then(function (response) {
            //error for no song provided - function to follow below
            if (response.tracks.total === 0) {
                errorConditionForSpotify();
            } else {
                console.log("Artist: " + response.tracks.items[0].artists[0].name);
                console.log("Track: " + response.tracks.items[0].name);
                console.log("Preview URL: " + response.tracks.items[0].preview_url);
                console.log("Album: " + response.tracks.items[0].album.name);
            }
        //catch function handles my errors - used from here on out in this project
        }).catch(function (error) {
            console.log(error);
            console.log("No Results found. Showing results for 'Oops!....I Did It Again' by Brittany Spears");
        });
    }

//function to be executed for song selected by me in the case of an error
function errorConditionForSpotify() {
    spotify
        .search({ type: 'track', query: 'Oops!...I Did It Again' })
        .then(function (response) {
            for (var i = 0; i < response.tracks.items.length; i++) {
                if (response.tracks.items[i].artists[0].name === "Brittany Spears") {
                    console.log("Artist: " + response.tracks.items[i].artists[0].name);
                    console.log("Track: " + response.tracks.items[i].name);
                    console.log("Preview URL: " + response.tracks.items[i].preview_url);
                    console.log("Album: " + response.tracks.items[i].album.name);
                    i = response.tracks.items.length;
                }
            }
        //error
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
    axios.get("http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&tomatoes=true&apikey=trilogy").then(
        function (response) {
            //if the movie title is defined...
            if (response.data.Title != undefined) {
                console.log("Title: " + response.data.Title);
                console.log("Year: " + response.data.Year);
                console.log("imdbRating:: " + response.data.imdbRating);
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
        ).catch(function (error) {
            console.log(error);
            console.log("No Results found. ");
        });
    }

//do-what-it-says
//will take text in random.text and use it to call one of Liri's commands
//edit the text in random.txt to test out the feature for movie-this

// function doRandom() {
//     fs.readFile("random.txt", "utf8", function(error, data) {
//         var dataArr = data.split(",");
//         spotify(dataArr[1])
//         if (error) {
//           return console.log(error);
//         }
//     });
// }