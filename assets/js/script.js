
// " + movie + "?api_key=983c87bc5226584d6913b9818f37ade3
//var getMovie = function(movieId){
   // var link = "https://api.themoviedb.org/3/movie/" + movieId + "?api_key=983c87bc5226584d6913b9818f37ade3"; 
//omdb key
// http://www.omdbapi.com/?apikey=a6453f4e

// themoviedb key
// https://api.themoviedb.org/3/search/movie?api_key=983c87bc5226584d6913b9818f37ade3

//display the movie of the icon is clicked in the saved movie area
var displaySavedMovie = function(){

}

//save the movie of the save button is clicked
var saveMovie = function(){

}

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

//{id: 28, name: 'Action'}
//{id: 12, name: 'Adventure'}
//{id: 16, name: 'Animation'}
//{id: 35, name: 'Comedy'}
//{id: 80, name: 'Crime'}
//{id: 99, name: 'Documentary'}
//{id: 18, name: 'Drama'}
//{id: 10751, name: 'Family'}
//{id: 14, name: 'Fantasy'}
//{id: 36, name: 'History'}
//{id: 27, name: 'Horror'}
//{id: 10402, name: 'Music'}
//{id: 9648, name: 'Mystery'}
//{id: 10749, name: 'Romance'}
//{id: 878, name: 'Science Fiction'}
//{id: 10770, name: 'TV Movie'}
//{id: 53, name: 'Thriller'}
//{id: 10752, name: 'War'}
//{id: 37, name: 'Western'}

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
            alert("could not obtain movie based on genre")
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

                console.log(data);

                //if the movie that is being searched for exist...
                if(data.results[0] != undefined){
                    //obtain the details of the movie
                    getMovieDetails(data.results[0].id);
                    //obtain the video of the movie
                    getMovieVideo(data.results[0].id);
                } else {
                    //display a warning that the movie does not exist and to try again
                    alert("search did not bring up a movie")
                }

            })
        } else {
            alert("could not obtain the id of that movie")
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
            alert("could not obtain trailer link")
        }
    })
}

//obtains the movie details using the obtained id
var getMovieDetails = function(movieId){
    var link = "https://api.themoviedb.org/3/movie/" + movieId + "?api_key=983c87bc5226584d6913b9818f37ade3"; 

// open and close find movie modal
$("#find-movie-btn").click(function() {
  $(".modal").addClass("is-active")
});

$(".modal-close").click(function() {
  $(".modal").removeClass("is-active")
});

//getMovie(movie);
        if(response.ok){
            //convert response
            response.json().then(function(movie){
                // console.log(movie.imdb_id)
                console.log(movie);
                //display the movie poster to the html
                $("#movie-poster").attr("src", "http://image.tmdb.org/t/p/w500/" + movie.poster_path);
                //test display the card
                $(".test-save").attr("src", "http://image.tmdb.org/t/p/w500/" + movie.poster_path);
                //add the description using the movie title
                getMovieDescription(movie.original_title);

            })
        } else {
            alert("could not obtain movie details using the id")
        }
    })
}

//temporary for testing
var movie = "tron";
getMovieId(movie);
// getGenre();
