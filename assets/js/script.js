// fetch("https://api.themoviedb.org/3/movie/550?api_key=983c87bc5226584d6913b9818f37ade3");

// " + movie + "?api_key=983c87bc5226584d6913b9818f37ade3
var getMovie = function(movieId){
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
//shre = 808
var movie = "808";


getMovie(movie);