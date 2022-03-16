//obtains the id ov the movie using the name
var getMovieId = function(movieName){
    var link = "https://api.themoviedb.org/3/search/movie?api_key=983c87bc5226584d6913b9818f37ade3&query=" + movieName;

    fetch(link).then(function(response){
        //if we get a 2XX status code
        if(response.ok){
            response.json().then(function(data){

                console.log(data);

                getMovieDetails(data.results[0].id);
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
            response.json().then(function(data){
                console.log("movie diveos: ")
                console.log(data);

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
            response.json().then(function(data){

                console.log(data);

                console.log(data.video)

                $("#movie-poster").attr("src", "http://image.tmdb.org/t/p/w500/" + data.poster_path);

            })
        } else {
            alert("Please Try Again")
        }
    })
}

var movie = "shrek";


getMovieId(movie);