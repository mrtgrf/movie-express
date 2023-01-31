//jshint esversion:6

//https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc/movie&api_key=cc053bff01ae428245cab1cf77f28272

const { query } = require("express");
const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));


app.get("/", function(req,res){

    res.sendFile(__dirname + "/index.html");

});



app.post("/", function(req,res){
    const query = req.body.movieName;
    const apiKey = "cc053bff01ae428245cab1cf77f28272";
    const searchUrl = "https://api.themoviedb.org/3/search/movie?query=" + query + "&api_key=" + apiKey;

https.get(searchUrl, function(response){
    console.log(response.statusCode);

    response.on("data", function(data){
        const movieData = JSON.parse(data);
        const movieTitle = movieData.results[0].original_title;
        const imageUrl = "http://image.tmdb.org/t/p/w1280" + movieData.results[0].poster_path;
        const movieDescription = movieData.results[0].overview;

        res.write("<p>" + movieDescription + "</p>");
        res.write("<h1>" + movieTitle + "</h1>");
        res.write("<img src='" + imageUrl + "'>");
        res.send();
    });
});
});




app.listen(3000, function(){
    console.log("Server is running on port 3000");
});