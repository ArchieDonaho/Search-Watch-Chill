
//omdb key
// http://www.omdbapi.com/?i=tt3896198&apikey=a6453f4e

// themoviedb key
// https://api.themoviedb.org/3/search/movie?api_key=983c87bc5226584d6913b9818f37ade3

//get a detailed description of the movie
var getMovieDescription = function(movieName) {
    link = "http://www.omdbapi.com/?apikey=a6453f4e&t=" + movieName + "&plot=short";

    fetch(link).then(function(response){
        //if we get a 2XX status code
        if(response.ok){
            //convert response
            response.json().then(function(data){
                console.log(data);
                console.log(data.plot);

                //add the description
                $("#description").text(data.Plot);
                //add the release date
                $("#released").text("Released: " + data.Released);
                //display all scores
                for(var i=0; i<data.Ratings.length; i++){
                    var score = $("<li>");
                    score.text(data.Ratings[i].Source + ": " + data.Ratings[i].Value);
                    $("#ratings").append(score)
                }
                //display box office profits
                $("#profits").text("Box Office Profit: " + data.BoxOffice);
                //display awards
                $("#awards").text("Awards: " + data.Awards);
            })
        } else {
            alert("could not retrieve description")
        }
    })
}

//obtains a movie based on the genre selected
var getGenre = function(genreId){
    link = "https://api.themoviedb.org/3/discover/movie?with_genres=" + genreId + "&api_key=983c87bc5226584d6913b9818f37ade3&sort_by=release_date.desc&sort_by=popularity.desc"

    fetch(link).then(function(response){
        //if we get a 2XX status code
        if(response.ok){
            //convert response
            response.json().then(function(data){
                // console.log(data);
            })
        } else {
            alert("Please Try Again")
        }
    })
}

//obtains the id of the movie using the name
var getMovieId = function(movieName){
    var link = "https://api.themoviedb.org/3/search/movie?api_key=983c87bc5226584d6913b9818f37ade3&query=" + movieName;

    fetch(link).then(function(response){
        //if we get a 2XX status code
        if(response.ok){
            //convert response
            response.json().then(function(data){

                // console.log(data);

                //obtain the details of the movie
                getMovieDetails(data.results[0].id);
                //obtain the video of the movie
                getMovieVideo(data.results[0].id);

            })
        } else {
            alert("Please Try Again")
        }
    })
}

//obtains the trailer link
var getMovieVideo = function(movieId) {
    var link = "https://api.themoviedb.org/3/movie/" + movieId + "/videos?api_key=983c87bc5226584d6913b9818f37ade3"; 

    fetch(link).then(function(response){
        //if we get a 2XX status code
        if(response.ok){
            //convert response
            response.json().then(function(data){
                //embed the trailer youtube video to the webpage
                $("#trailer").attr("src", "https://www.youtube.com/embed/" + data.results[0].key)
            })
        } else {
            alert("Please Try Again")
        }
    })
}

//obtains the movie details using the obtained id
var getMovieDetails = function(movieId){
    var link = "https://api.themoviedb.org/3/movie/" + movieId + "?api_key=983c87bc5226584d6913b9818f37ade3"; 

    fetch(link).then(function(response){
        //if we get a 2XX status code
        if(response.ok){
            //convert response
            response.json().then(function(movie){
                // console.log(movie.imdb_id)
                // console.log(movie);
                //display the movie poster to the html
                $("#movie-poster").attr("src", "http://image.tmdb.org/t/p/w500/" + movie.poster_path);
                //test display the card
                $(".test-save").attr("src", "http://image.tmdb.org/t/p/w500/" + movie.poster_path);

            })
        } else {
            alert("Please Try Again")
        }
    })
}

var movie = "shrek";

getMovieId(movie);
getMovieDescription(movie);
getGenre();