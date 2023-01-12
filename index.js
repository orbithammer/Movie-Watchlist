import Movie from "./Movie.js"
import WatchlistMovie from "./WatchlistMovie.js"

const movieSearch = document.getElementById("movie-search")
const searchResutls = document.getElementById("search-results")
const watchlist = document.getElementById("watchlist")

let currentSearchResults = []
let watchlistArray = JSON.parse(localStorage.getItem("watchlist")) || []
// console.log(`watchlistArray`,watchlistArray)
const currentUrl = (window.location.pathname)
// console.log(`currentUrl`,currentUrl)

document.addEventListener("click", e => {
    if(e.target.dataset.add) {
        handleAddClick(e.target.dataset.add)
    } else if(e.target.dataset.remove) {
        handleRemoveClick(e.target.dataset.remove)
    // } else if(e.target.id === "clear-watchlist") {
    //     localStorage.clear()
    //     console.log(`localStorage cleared`)
    } 
    // else {
    //     console.log(`e.target`, e.target)
    // }
})

if(currentUrl === "/index.html") {
    movieSearch.addEventListener("submit", e => {
        e.preventDefault()
        const keywordSearchData = new FormData(movieSearch)
        const keywordSearch = keywordSearchData.get("titleSearch")
        // const keywordSearch = keywordSearchWithSpaces.replace(/\s\s+/g, "+")
        // searchMovie(keywordSearch)
        searchMovie(keywordSearch)
    })   
}

function handleAddClick(imdbID) {
    // console.log(`add imdbID`, imdbID)
    const movieToSave = currentSearchResults.filter(movie => movie.imdbID === imdbID)
    watchlistArray.push(movieToSave[0])
    localStorage.setItem("watchlist", JSON.stringify(watchlistArray))
}

function handleRemoveClick(imdbID) {
    // console.log(`remove imdbID`, imdbID)
    const watchlistArrayRemoved = watchlistArray.filter(movie => movie.imdbID != imdbID)
    // console.log(`watchlistArrayRemoved`,watchlistArrayRemoved)
    localStorage.setItem("watchlist", JSON.stringify(watchlistArrayRemoved))
    watchlistArray = watchlistArrayRemoved
    renderWatchlist()
}

async function searchMovie(title) {
    searchResutls.innerHTML = ``
    // console.log(`title`, title)
    const res = await fetch(`https://www.omdbapi.com/?s=${title}&type=movie&apikey=1d92d023`)
    const data = await res.json()
    // console.log(`data`, data)
    if(data.Response === "False") {
        searchResutls.innerHTML = `<h3 class="unable-message">Unable to find what you’re looking for. Please try another search.</h3>`
    } else {
        data.Search.map(movie => getMovieInfo(movie.imdbID))
    }
}

async function getMovieInfo(imdbID) {
    const res = await fetch(`https://www.omdbapi.com/?i=${imdbID}&type=movie&apikey=1d92d023`)
    const data = await res.json()
    const { Poster, Title, imdbRating, Runtime, Genre, Plot } = data
    const movieData = { poster: Poster,
        title: Title, 
        imdbRating: imdbRating, 
        runtime: Runtime, 
        genre: Genre, 
        imdbID: imdbID, 
        plot: Plot }
    // console.log(`movieData`, movieData)
    renderSearchResults(new Movie(movieData))
    currentSearchResults.push(new WatchlistMovie(movieData))
}

function renderSearchResults(Movie) {
    // console.log(`Movie`, Movie)
    searchResutls.innerHTML += Movie.renderHtml()
}

function renderWatchlist() {
    // watchlistArray.map(movie => console.log(`watchlist movie`, movie))
    watchlist.innerHTML = watchlistArray.map(movie => new WatchlistMovie(movie).renderHtml())
}

if(currentUrl === "/watchlist.html") {
    if(watchlistArray) {
        renderWatchlist()
    }
}