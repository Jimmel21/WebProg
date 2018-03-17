var first_names = ['Tevin', 'Jimmel', 'Matthew', 'John', 'Jane']; 
var last_names = ['Achong', 'Greer', 'Forbes', 'Doe', 'Johnson']; 

/* Creating function to merge two elements */
function merge(el1, el2) {
    return el1.concat(' ' + el2); 
}

/* Creating function to hold array of merged elements */
function mergeHandler(arr1, arr2, func) {
    return arr1.map((x, i) => func(x, arr2[i]));
}

function merge2Single(arr1, arr2) {
    return mergeHandler(arr1, arr2, merge); 
}

/* Creating function to create array of Objects */
function merge2Object(arr1, arr2) {
    let arr = mergeHandler(arr1, arr2, merge);
    
    var createObj = function(x, y) {
        return {
            firstname : x, 
            lastname : y
        }; 
    }; 
    
    return arr.map((x) => createObj(x.split(" ")[0], x.split(" ")[1])); 
}

console.log(mergeHandler(first_names, last_names, merge));

console.log(merge2Single(first_names, last_names)); 
console.log(merge2Object(first_names, last_names)); 





/*------Creating user interface to display functions------ */


var fnames = []; 
//Displaying array of First Names
function addFname() {
    document.getElementById('fname').style.border = '2px solid black';

    var fname = document.getElementById('fname').value;

    if (fname != "") {
        fnames.push(fname); 
        //Adding the first name to the array and displaying it
        
        var fDiv = document.createElement('div');
        fDiv.classList.add('names-item'); 

        fDiv.innerHTML = fnames.length + '. ' + fname;
        document.querySelector('.first-names').appendChild(fDiv);

        document.getElementById('fname').value = ''; 
    }
}



var lnames = []; 
/*------ Displaying array of last names ------*/
function addLname() {
    document.getElementById('lname').style.border = '2px solid black';

    var lname = document.getElementById('lname').value;
    if (lname != '') {
        lnames.push(lname); 
        //Adding the first name to the array and displaying it
        
        var lDiv = document.createElement('div');
        lDiv.classList.add('names-item'); 

        lDiv.innerHTML = lnames.length + '. ' + lname;
        document.querySelector('.last-names').appendChild(lDiv);

        document.getElementById('lname').value = ''; 
    }
}



var merge2SingleCount = 0; 
function displayMerge2Single() {
    merge2SingleCount += 1;     
    
    if (fnames.length === lnames.length) {
        
        if (merge2SingleCount > 1) {
            var merged = document.querySelector(".mergedNames");
            while (merged.firstChild) {
                merged.removeChild(merged.firstChild);
            }
        }

        document.querySelector('#mergedNamesHeader').style.opacity = '1'; 

        var fAndL = merge2Single(fnames, lnames); 

        for (var i = 0; i < fAndL.length; i += 1) {
            var newDiv = document.createElement('div');
            newDiv.classList.add('names-item'); 
            newDiv.innerHTML = fAndL[i]; 
            document.querySelector('.mergedNames').appendChild(newDiv);
        }
    }

    else {
        if (fnames.length > lnames.length) {
            document.getElementById('lname').style.border = '2px solid red';
        }
        else {
            document.getElementById('fname').style.border = '2px solid red'; 
        }
        alert("Please ensure that there are the same amount of first and last names. "); 
    }
}


var merge2ObjectCounter = 0; 
function displayMerge2Object() {
    merge2ObjectCounter += 1; 

    if (fnames.length === lnames.length) {

        if (merge2ObjectCounter > 1) {
            var merged = document.querySelector(".objects");
            while (merged.firstChild) {
                merged.removeChild(merged.firstChild);
            }
        }

        document.querySelector('#objectsHeader').style.opacity = '1'; 

        var fAndL = merge2Object(fnames, lnames); 

        for (var i = 0; i < fAndL.length; i += 1) {
            var newDiv = document.createElement('div');
            newDiv.classList.add('object-item'); 
            newDiv.innerHTML = 'First Name: ' + fAndL[i].firstname + '<br>' + 'Last Name: ' + fAndL[i].lastname; 
            document.querySelector('.objects').appendChild(newDiv);
        }
    }


    else {
        if (fnames.length > lnames.length) {
            document.getElementById('lname').style.border = '2px solid red';
        }
        else {
            document.getElementById('fname').style.border = '2px solid red'; 
        }
        alert("Please ensure that there are the same amount of first and last names. "); 
    }
}

console.log('Yeah man'); 

















/* Section 7 */


/*---- Number 1 ----*/
function loadGenres() { 
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            console.log(this.responseText);
        }
    };

    xhttp.open("GET", "../data/genreDB.txt", true);
    xhttp.send();
}

loadGenres();


/*---- Number 2 ----*/ 
function loadMovies() {
    var xhttp = new XMLHttpRequest(); 
    xhttp.onreadystatechange = function() {
        if (this.readyState === 4 && this.status === 200) {
            console.log (this.responseText); 
        }
    }; 

    xhttp.open("GET", "../data/moviesDB.json", true); 
    xhttp.send(); 
}



