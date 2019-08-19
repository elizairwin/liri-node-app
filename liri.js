//add the required libraries/pacakages installed
require("dotenv").config();
const axios = require("axios");
const fs = require("fs");
const Spotify = require("node-spotify-api");
//dates, times
const moment = require("moment");

//require liri to use keys from keys file (which are also in .env which will be hidden)
const keys = require("./keys.js");
let spotify = new Spotify(keys.spotify);

//define variables using process.argv below
let command = process.argv[2]
let searchTerm = process.argv[3]

//log.txt bonus - append to file, no re-write
//used bank.js activity
fs.appendFile('log.txt', command + ",", function (err) {
    //catch/throw from w3schools
    if (err) throw err;
});

//spotify-this-song
function spotifyThis(song) {
    spotify
        //search and then return the data
        .search({ type: "track", query: song })
        .then(function (response) {
            //error for no song provided - function to follow below
            if (response.tracks.total === 0) {
                errorConditionForSpotify();
            } else {
                //if a viable song is provided, the below data is returned to user
                console.log(`
                Artist: ${response.tracks.items[0].artists[0].name}
                Track: ${response.tracks.items[0].name}
                Preview URL: ${response.tracks.items[0].preview_url}
                Album: ${response.tracks.items[0].album.name}
                `);
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
                console.log(`
                    Artist: ${notfoundresponse.tracks.items[i].artists[0].name}
                    Track: ${notfoundresponse.tracks.items[0].name}
                    Preview URL: ${notfoundresponse.tracks.items[i].preview_url}
                    Album: ${notfoundresponse.tracks.items[i].album.name}
                    `);
                i = notfoundresponse.tracks.items.length;
            }
            //error
            //w3schools
        }).catch(function (error) {
            console.log(error);
            console.log("No Results found. ");
        });
}

//movie-this
function movieThis(movie) {
    //axios call to OMDB
    axios.get("http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&tomatoes=true&apikey=trilogy").then(
        function (response) {
            //if the movie title is defined, the below data is returned to the user
            if (response.data.Title != undefined) {
                console.log(`
                Title: ${response.data.Title}
                Year: ${response.data.Year}
                IMDB Rating: ${response.data.imdbRating}
                Rotten Tomatoes: ${response.data.tomatoRating}
                Country: ${response.data.Country}
                Language: ${response.data.Language}
                Plot: ${response.data.Plot}
                Actors: ${response.data.Actors}
                `);
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
//can edit the text in random.txt to test out the feature
function doRandom() {
    //reading random.txt
    fs.readFile("random.txt", "utf8", function (error, data) {
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
//used bank.js activity
function RunApp() {
    switch (command) {
        case "spotify-this-song":
            if (!searchTerm){
                spotifyThis("Womanizer");
                break;
            }else{
                spotifyThis(searchTerm);
                break;
            }
        case "movie-this":
            if (!searchTerm){
                movieThis("Lion");
                break;
            }else{
                movieThis(searchTerm);
                break;
            }
        case "do-what-it-says":
            doRandom();
            break;
    }
}
//initialize
RunApp();