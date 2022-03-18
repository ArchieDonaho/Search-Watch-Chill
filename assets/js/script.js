
//omdb key
// http://www.omdbapi.com/?i=tt3896198&apikey=a6453f4e

// themoviedb key
// https://api.themoviedb.org/3/search/movie?api_key=983c87bc5226584d6913b9818f37ade3



//display the movie if the icon is clicked in the saved movie area
var displaySavedMovie = function(){

}

//save the movie of the save button is clicked
var saveMovie = function(imdbID){
    console.log("accessed saveMovie");
    console.log(imdbID);

    //display the image in the saved section
    posterPath = $("#movie-poster").attr("src");
    $(".test-save").attr("src", posterPath);

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

//generate a save button
var displaySaveButton = function(){
    // console.log("accessed displaySaveButton");
    //create and display the container for the button
    var buttonEl = $("<button>");
    buttonEl.addClass("btn").text("Save Movie").attr("id", "save-btn");
    var containerEl = $("#description").parent().parent();
    containerEl.after(buttonEl);
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

                //obtain a random movie from the list
                var movieId = Math.floor(Math.random() * data.results.length)
                getMovieId(movieId)
            })
        } else {
            alert("Please Try Again")
        }
    })
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

                //if omdb does not recognize the movie
                if(data.Error){
                    $("#description").text("Information not found (usually due to being hosed by a 3rd party service, ie. Netfilx, Hulu, Amazon");
                } else {
                    //add the description
                    $("#description").text(data.Plot);
                    //add the release date
                    $("#released").text("Released: " + data.Released);
                    //display all scores
                    $("#ratings").text("Ratings: ");
                    for(var i=0; i<data.Ratings.length; i++){
                        var score = $("<li>");
                        score.text(data.Ratings[i].Source + ": " + data.Ratings[i].Value);
                        $("#ratings").append(score)
                    }
                    //display box office profits
                    $("#profits").text("Box Office Profit: " + data.BoxOffice);
                    //display awards
                    $("#awards").text("Awards: " + data.Awards);
                }

                //generate the save button
                displaySaveButton();
            })
        } else {
            alert("could not retrieve description")
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
                console.log(data.results[0]);

                getMoviePoster(data.results[0].id);
                //obtain the trailer of the movie
                getMovieVideo(data.results[0].id);
                //obtain the details of the movie
                getMovieDescription(data.results[0].original_title);
                //display the title
                $("#movie-title").text(data.results[0].original_title + " , IMDB: " + data.results[0].id)
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
                // console.log(data);

                //if there is a trailer for the movie available
                if(data.results[0]){
                    //embed the trailer youtube video to the webpage
                    $("#trailer").attr("src", "https://www.youtube.com/embed/" + data.results[0].key)
                } 
            })
        } else {
            alert("Please Try Again")
        }
    })
}

var displayMoviePoster = function(moviePosterURL){
    console.log(moviePosterURL);
    //display the movie poster to the html
    $("#movie-poster").attr("src", "http://image.tmdb.org/t/p/w500/" + moviePosterURL);
}

//obtains the movie details using the obtained id
var getMoviePoster = function(movieId){
    console.log("movie id: " + movieId);
    var link = "https://api.themoviedb.org/3/movie/" + movieId + "?api_key=983c87bc5226584d6913b9818f37ade3"; 

    fetch(link).then(function(response){
        //if we get a 2XX status code
        if(response.ok){
            //convert response
            response.json()
            .then(function(movie){
                console.log(movie.imdb_id)
                console.log(movie.poster_path);

                

                //display the movie poster to the html
                $("#movie-poster").attr("src", "http://image.tmdb.org/t/p/w500/" + movie.poster_path);
                //test display the card
                // $(".test-save").attr("src", "http://image.tmdb.org/t/p/w500/" + movie.poster_path);

            })
        } else {
            alert("Please Try Again")
        }
    })


 
    
}

//when the save button is clicked, save the movie
$("#movie-title").parent().parent().parent().on("click", "#save-btn", function(){
    //grab the IMDB number to save the movie
    saveMovie( $("#movie-title").text().split("IMDB: ")[1]  );
    //figure out whwy the image is not displaying
});

//temporary for testing
var movie = "tron";
// getMovieId(movie);
getGenre(37);
