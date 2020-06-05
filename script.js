const genreNames = ['Action', 'Adventure', 'Animation', 'Comedy',
    'Documentary', 'Drama', 'Family', 'Fantasy',
    'History', 'Horror', 'Music', 'Mystery',
    'Romance', 'Science Fiction', 'TV Movie', 'Thriller',
    'War', 'Western'];



const relaxedGenres = ['Documentary', 'Family', 'Romance']
const relaxedExcludedGenres = ['Action',]
const neutralGenres = ['Adventure', 'Comedy', 'Drama', 'History', 'Mystery']
const energeticGenres = ['Action', 'Music', 'Thriller', 'War', 'Western']
const otherGenres = ['Animation', 'Fantasy', 'TV Movie', 'Science Fiction']

const genreLookup = [{id: 28, name: "Action"},{id: 12,name: "Adventure"},{id: 16,name: "Animation"},{id: 35,name: "Comedy"},
    {id: 80,name: "Crime"},{id: 99,name: "Documentary"},{id: 18,name: "Drama"},{id: 10751,name: "Family"},
    {id: 14,name: "Fantasy"},{id: 36,name: "History"},{id: 27,name: "Horror"},{id: 10402,name: "Music"},
    {id: 9648,name: "Mystery"},{id: 10749,name: "Romance"},{id: 878,name: "Science Fiction"},{id: 10770,name: "TV Movie"},
    {id: 53,name: "Thriller"},{id: 10752,name: "War"},{id: 37,name: "Western"}]


let foodApi = 'https://food-by-mood.herokuapp.com/api/foods'
let movieApi = 'https://api.themoviedb.org/3/genre/movie/list?api_key=dbd68826ec7649f3671ac738ca17fe12&language=en-US' //check documentation
let moods = [
    "relaxed",
    "neutral",
    "energetic"
];



// GIVEN a user-inputted mood
    // fetch an array of movies filtered by genres that match the mood
    // fetch an array of foods filtered by genres that match the mood

const movieReturnCount = 5

async function returnMovies (mood){
    // Doug's conversion from mood to IDs
    function moviesByGenreApi(genreIds, removedGenreIds) {
        return `https://api.themoviedb.org/3/discover/movie
            ?api_key=dbd68826ec7649f3671ac738ca17fe12&language=en-US
            &sort_by=popularity.desc
            &include_adult=false
            &include_video=true
            &page=1
            &with_genres=${genreIds},
            without_genres=$${removedGenreIds}`
    }
    let api
    switch(mood){
        case 'relaxed': 
            api = moviesByGenreApi(relaxedGenreIds, relaxedRemovedGenreIds)
            break
        case 'neutral':
            api = moviesByGenreApi(neutralGenreIds, neutralRemovedGenreIds)
            break
        case 'energetic':
            api = moviesByGenreApi(energeticGenreIds, energeticRemovedGenreIds)
            break
    }
    await fetch(api)
                .then(function(response){
                    if (response.ok){
                        localStorage.movies = JSON.stringify(response.json().results.slice(0, 10))
                    } else {Promise.reject('execute this in console when promise is rejected')}
                }.catch(error => console.warn(error)))
 
}

async function returnFoods (mood){
    function foodsByMood2sApi(mood2){}
    return
}

async function fetchData(api) {

    result = await fetch(api).then(result => result.json());
    return result;
}

async function FoodData() {
    foodObj = await fetchData(foodApi);
    // movieObj = fetchData(movieApi)
    console.log(foodObj);
    contentEl = document.querySelector('#content');
    contentEl.innerHTML = foodObj[0].title;
}

async function MovieData() {
    movieObj = await fetchData(movieApi);
    console.log(movieObj);
    contentEl = document.querySelector('#content');
    // let genreNames = movieObj.name;
    // console.log(`genreNames: ${genreNames}`);
    contentEl.innerHTML = JSON.stringify(movieObj);
}

// FoodData();
MovieData();

// to simulate the option chosen
let genre = returnGenre("energetic");
console.log(`genre: ${genre}`);

/*
Notes for us to do
array of genreNames
match up genrenames to the 3 moods
use genreNames to get the ids and then fetch based on genre
*/
