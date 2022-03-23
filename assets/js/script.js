//generate the array to save the movies
var savedMovies = [];

//deletes the saved movie when selected using the poster url
var deleteMovie =  function(url){
    //traverse the movie list to find the index of the movie
    var index;
    for(var i=0; i<savedMovies.length; i++){
        if(savedMovies[i].includes(url)){
            index = i;
        }
    }

    //remove that index form the array
    savedMovies.splice(index, 1);
    console.log(savedMovies);

    //save the movie list as a JSON string
    localStorage.setItem("movies", JSON.stringify(savedMovies));
    console.log("movies saved");

    //re-display the movies
    displaySavedMovie();
}

//display the saved movies
var displaySavedMovie = function(){
    savedMovies =  JSON.parse(localStorage.getItem("movies"));

    //if there is no movie list saved, generate a new array
    if(!savedMovies){
        savedMovies = [];
    }

    //remove the current list
    $("#saved-movies")
        .text("");

    // for each index in the movies array, display the image in the saved section
    $.each(savedMovies, function(index, item) {
        var column = $("<div>");
        column.addClass("column")
              .appendTo($("#saved-movies"));

        var figure = $("<figure>");
        figure.addClass("image is-128x128")
              .appendTo(column);

        var image = $("<img>");
        image.attr("src", item[1])
             .appendTo(figure);

        var button = $("<button>");
        button.addClass("delete delete-btn")
            .attr("type", "button")
            .appendTo(figure);
    })

    //when the delete button is clicked, remove the movie from the list (this needs to load only after the saved movie icons are displayed or else it wouldnt work)
    $(".delete-btn").on("click", function(){
     //send the source image to the function to delete it from the list
        deleteMovie($(this).siblings().attr("src"));
    })
}

//save the movie of the save button is clicked
var saveMovie = function(imdbID, posterURL){
    console.log("accessed saveMovie");

    //check to see if the movie is already on the list of saved movies, and save that to a variable
    var isSaved = false;
    var index;
    for(var i=0; i<savedMovies.length; i++){
        if(savedMovies[i].includes(imdbID)){
            isSaved = true;
            //if the position is saved already, obtain that index for later use
            index = i;
        }
    }
    console.log(isSaved);

    //if the movie is not on the list, add it to the front
    if(!isSaved){
        savedMovies.unshift([imdbID, posterURL]);
    } else {
        //else, remove it from it's current position and add it to the front
        savedMovies.splice(index, 1);
        savedMovies.unshift([imdbID, posterURL]);
    }
    
    //if the movie list is too long, then delete the 10th item
    if(savedMovies.length > 10){
        savedMovies.pop();
    }

    //save the movie list as a JSON string
    localStorage.setItem("movies", JSON.stringify(savedMovies));
    console.log("movies saved");

    // //then load it and display onto the webpage
    displaySavedMovie();
}

//create and display the container for the button
var displaySaveButton = function(){
    var containerEl = $("#description").parent().parent();
    //if the button doesn't exist, create and display one
    if($("#save-btn").length == 0){
        var buttonEl = $("<button>");
        buttonEl.addClass("btn")
                .text("Save Movie")
                .attr("id", "save-btn");

        containerEl.after(buttonEl);
    }
}

//obtains a movie based on the genre selected
var getGenre = function(genreId){
    link = "https://api.themoviedb.org/3/discover/movie?with_genres=" + genreId + "&api_key=983c87bc5226584d6913b9818f37ade3&sort_by=release_date.desc&sort_by=popularity.desc"

    fetch(link).then(function(response){
        //if we get a 2XX status code
        if(response.ok){
            //convert response
            response.json().then(function(data){
                // debugger;
                console.log(data);

                //obtain a random index from the list using the length of the list
                var movieId = Math.floor(Math.random() * data.results.length)
                //then, using the random number generated, select that index's movie id and send it to be displayed
                console.log(data.results[movieId].id)
                getMovieId(data.results[movieId].title)
            })
        }
    })
}

//get a detailed description of the movie
var getMovieDescription = function(movieName) {
    link = "https://www.omdbapi.com/?apikey=a6453f4e&t=" + movieName + "&plot=short";

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
                //display the title
                $("#movie-title").text(data.results[0].original_title + " , IMDB: " + data.results[0].id)
                //display the movie poster
                getMoviePoster(data.results[0].id);
                //obtain the trailer of the movie
                getMovieVideo(data.results[0].id);
                //obtain the details of the movie
                getMovieDescription(data.results[0].original_title);
            })
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
        }
    })
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
                // console.log(movie)
                //display the movie poster to the html
                $("#movie-poster").attr("src", "http://image.tmdb.org/t/p/w500/" + movie.poster_path);
            })
        }
    })
}

//load previously saved movies
displaySavedMovie()

// open find-movie modal when clicked
$("#find-movie-btn").click(function() {
    $(".modal").addClass("is-active")
});
  
// close find-movie modal when clicked
$(".modal-close").click(function() {
    $(".modal").removeClass("is-active")
});

// dropdown the genre list when clicked on
$(".dropdown").click(function(){
    $(".dropdown").addClass("is-active")
});

//when the search-genre button is clicked
$("#search-genre").click(function(){
    var genreId = document.querySelector("select[name = 'genres']").value;
    //load a movie based on the genre
    getGenre(genreId);
    //remove the modal
    $(".modal").removeClass("is-active")
});

//when the search-title button is clicked
$("#search-title").click(function(){
    //load a movie based on the title
    getMovieId($("#title-textbox").val());
    //remove the modal
    $(".modal").removeClass("is-active")
});

//when the save button is clicked, save the movie
$("#movie-title").parent().parent().parent().on("click", "#save-btn", function(){
    //grab the IMDB number to save the movie
    saveMovie( $("#movie-title").text().split(" , IMDB")[0], $("#movie-poster").attr("src") );
    //figure out whwy the image is not displaying
});

//when a poster from the saved movies is clicked, display that movie
$("#saved-movies").on("click", "img", function(){
    //grab the source image url and use that to find the title in the saved movies array
    var url = $(this).attr("src");
    console.log(url);

    //obtain the title from the index containing the same source url
    var title;
    for(var i=0; i<savedMovies.length; i++){
        if(savedMovies[i][1] == url){
            title = savedMovies[i][0];
        }
    }
    //then display that movie to the user
    getMovieId(title);
})
