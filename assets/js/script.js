var getMovieId = function(movieName){
    var link = "https://api.themoviedb.org/3/search/movie?api_key=983c87bc5226584d6913b9818f37ade3&query=" + movieName;

    fetch(link).then(function(response){
        //if we get a 2XX status code
        if(response.ok){
            response.json().then(function(data){

                console.log(data);

                getMovieDetails(data.results[0].id);

            })
        } else {
            alert("Please Try Again")
        }
    })
}

var getMovieDetails = function(movieId){
    var link = "https://api.themoviedb.org/3/movie/" + movieId + "?api_key=983c87bc5226584d6913b9818f37ade3"; 

    fetch(link).then(function(response){
        //if we get a 2XX status code
        if(response.ok){
            response.json().then(function(data){

                console.log(data);

            })
        } else {
            alert("Please Try Again")
        }
    })
}

var movie = "shrek";


getMovieId(movie);