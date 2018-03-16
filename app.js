//Request to use util.js functions in app.js
function myUtil( url ) {
    var ajax = new XMLHttpRequest();
    ajax.open( 'GET', url, false );
    ajax.onreadystatechange = function () {
        var script = ajax.response || ajax.responseText;
        if (ajax.readyState === 4) {
            switch( ajax.status) {
                case 200:
                    eval.apply( window, [script] );
                    console.log("script loaded: ", url);
                    break;
                default:
                    console.log("ERROR: script not loaded: ", url);
            }
        }
    };
    ajax.send(null);
}

myUtil('util.js');

//global arrays
const genres = [];
const movies = [];

var dCount = 0;

//create genre function to get input from form, create a genre instance and add it to the global array
function createGenre(){
    


    dCount += 1; 
    var n = document.getElementById("name").value;
    if (n != "") {
        var g = new Genre();
        g.name = n;
        
        enqueue(genres, g);

        document.getElementById("createGenre").reset(); 
        displayGenres();
        dropmenu();

        var genreNames = []; 
        for (var i = 0; i < genres.length; i += 1) {
            genreNames[i] = genres[i].name;
        }
        
        JSsort(genreNames,true); 
        for (var i = 0; i < genreNames.length; i += 1) {
            var gr = new Genre(); 
            gr.name = genreNames[i]; 

            genres[i] = gr; 
        }

        document.getElementById('genreConfirm').innerHTML = n + ' genre successfully added';
        document.getElementById('genreConfirm').style.opacity = '1'; 

        console.log(genres);
    }

}
//create movie function to get input from form, create a movie instance and add it to the global array
function createMovie(){
    var uuid = document.getElementById("uuid").value;
    var title = document.getElementById("title").value;
    var year = document.getElementById("year").value;
    var listed = document.getElementById("genres");
    var genre = listed.options[listed.selectedIndex].value;
    let gen = JSON.parse(genre);

    g = new Genre();
    g.name= gen.name;
    g.movies = gen.movies;
    let movie = new Movie();
    movie.uuid = uuid;
    movie.title = title;
    movie.year = year;
    movie.setGenre(g);

    enqueue(movies, movie);

    document.getElementById("createMovie").reset(); 

    console.log(movie);

    displayMovies();

    
}
//used to populate the dropdown menu in the create movie form
function dropmenu(){

var gen = document.getElementById("genres");
    
        let g = genres[genres.length-1];
        var e = document.createElement("option");
        e.innerHTML = g.name;
        var stringobj = flatten(g);
        e.value = stringobj;

        gen.appendChild(e);
}
//populates a section in app.html with genres from the global array
function displayGenres(){
    var gen = document.getElementById("genreList");

    if (dCount > 1) {
        while(gen.firstChild)
            gen.removeChild(gen.firstChild); 
    }

    for(var i=0; i<genres.length; i++){
        let g = genres[i];
        var e = document.createElement("li");
        e.innerHTML = g.name
        gen.appendChild(e);   
    }

}
//populates a table section in app.html with movies from the global array
function displayMovies(){
    let htmlStr = "<table>";
    htmlStr += "<thead><tr><th>UUID</th><th>Title</th>";
    htmlStr += "<th>Year</th><th>Genre</th>";
    htmlStr += "</tr></thead><tbody>";

    for(var i=0; i<movies.length; i++){
        let str = "<tr>";
            str += "<td>" + movies[i].uuid + "</td>" + "<td>"+ movies[i].title + "</td>";
            str += "<td>" + movies[i].year + "</td>" + "<td>"+ movies[i].genres/*.name*/ + "</td>";
           // for(var j=0; j<movies[i].related.length; j++){
             //   str += "<td>" + movies[i].related[j].title + "</td>";
            //}

        htmlStr += str;
    }
    htmlStr +="</tbody></table>";

    var sec = document.getElementById("movieList");
    sec.innerHTML = htmlStr;
}




function separateStr(str){
    const records = str.split("\n");
    for(let i=0 ; i<records.length; i+=1){
        const name = records[i];
        let g = new Genre();
        g.name = name;
        enqueue(genres, g);
    }
}


// function separateMovies(records){
//     for(let i=0; i<records.length; i+=1){
//         let m = new Movie();
//         m.uuid = records[i].uuid;
//         m.title = records[i].title;
//         m.year = records[i].year;
//         m.setGenre(records[i].genre);
//         enqueue(movies, m);
//     }
// }

function loadGenres() { 
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            console.log(this.responseText);
            separateStr(this.responseText);          
            //console.log(genres[0]);
            //displayGenres();
        }
    };

    xhttp.open("GET", "genreDB.txt", true);
    xhttp.send();
}   
//loadGenres();



// function loadMovies() {
//     var xhttp = new XMLHttpRequest(); 
//     xhttp.onreadystatechange = function() {
//         if (this.readyState === 4 && this.status === 200) {
//             //console.log (this.responseText); 
//             let data = /*JSON.parse*/(this.responseText);
//             console.log(data);
//             separateMovies(data);
//             displayMovies();
//         }
//     }; 

//     xhttp.open("GET", "moviesDB.json", true); 
//     xhttp.send(); 
// }

function loadMovies() {
    var moviesRequest = new XMLHttpRequest(); 
    moviesRequest.open('GET', 'moviesDB.json', true); 

    moviesRequest.onload = function() {
        var movieData = JSON.parse(moviesRequest.responseText);
        for (var i = 0; i < movieData.length; i += 1) {
            console.log(movieData[i].title);

            /*This is basically the separate movies function*/
            let m = new Movie();
            m.uuid = movieData[i].uuid;
            m.title = movieData[i].title;
            m.year = movieData[i].year;
            m.setGenre(movieData[i].genres);
            enqueue(movies, m);
            /*--------------------------------------------*/
            
            displayMovies();  
        }
    }
    moviesRequest.send();     
}
loadMovies();

