//Taking Reference to attach to the DOM
const movieContainerEl = document.querySelector(".movies-container");
const workshopContainer = document.querySelector(".workshop-container")
const indianMoviesContainerEl = document.querySelector(".indianMovies-container")
const nowPlayingMoviesContainerEl = document.querySelector(".nowPlayingMovies-container")
const popularMoviesContainerEl = document.querySelector(".popularMovies-container")
const topRatedMoviesContainerEl = document.querySelector(".topRatedMovies-container")
const latestMoviesContainerEl = document.querySelector(".latestMovies-container")
const bollywoodMoviesContainerEl = document.querySelector(".hindiMovies-container")
const trendingMoviesContainerEl = document.querySelector(".trendingMovies-container")
//--------------------------------------------------------------------------------🎅
// code from swiper library for banner Sliding Starts
var swiper1 = new Swiper(".swiper-container-1", {
    spaceBetween: 30,
    centeredSlides: true,
    autoplay: {
        delay: 2500,
        disableOnInteraction: false,
    },
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
});
//----------------------------------------------------------------------------------------
// variable declaration For the resuseablility while hitting Api End Points
const auth = "57b428c0e112b579eb26e2f43ff08b0f"
const Api_key = "api_key=57b428c0e112b579eb26e2f43ff08b0f"
const Base_Url = "https://api.themoviedb.org/3/"

const img_url = "https://image.tmdb.org/t/p/w500"    //------>  This is the Base URL For Images

const nowPlayingMoviesUrl = Base_Url + "movie/now_playing?" + Api_key+"&language=en-US&page=1"
const popularMoviesUrl = Base_Url + "movie/popular?"+ Api_key+"&language=en-US&page=3"
const topRatedMoviesUrl = Base_Url + "movie/top_rated?" + Api_key+"&language=en-US&page=2"
const latestMoviesUrl = Base_Url + "movie/now_playing?" + Api_key+"&language=en-US&page=2"

const trendingMovieNamesUrl =  Base_Url + "discover/movie?" + Api_key+"&sort_by=popularity.desc&page=1&primary_release_year=2022&with_original_language=ml|bn|ta"
const recommendedMoviesUrl = Base_Url + "discover/movie?" + Api_key+"&sort_by=popularity.desc&page=1&primary_release_year=2022&with_original_language=hi"
const likedIndianMovies = Base_Url + "discover/movie?" + Api_key+"&sort_by=popularity.desc&page=2&primary_release_year=2022&with_origin_country=IN"
const popularMoviesUrl2= Base_Url + "discover/movie?" + Api_key+"&sort_by=popularity.desc&page=1&primary_release_year=2021&with_original_language=ml|bn|ta"

//--------------------------------------------------------------------------
// function to get movies from TMDB API
async function getMovies(url) {
    const fetchedData = await fetch(url, {
        method: "GET",
        headers: {
            Accept: "application/json",
            Authorization: auth
        }
    })
    const data = await fetchedData.json();
    console.log(data.results)
    showMovies(data.results); //This Function is Invoked inside getMovies Function so that we can Accept the data fetced from getMovies function as the Argument for showMovies function
}
getMovies(recommendedMoviesUrl)
//-----------------------------------------------------------------
// This function accept data from getMovies function and help to render it on webpage
function showMovies(movies) {
    //Below code for iterating through each movie and render as a template in webpage
    movies.forEach((movie) => {
        //Destructuring of Object done here so that we can unpack properties from object and can use as independent variables in the below block scope
        let { title, poster_path, vote_average, overview, popularity, original_language,id, genre_ids } = movie
        if(original_language == "en") {
            original_language = "English"
         }
         if(original_language == "hi") {
            original_language = "Hindi"
         }
         if(original_language == "te"){
            original_language = "Telegu"
         }
         if(original_language == "ta") {
            original_language = "Tamil"
         }
         if(original_language == "ml") {
            original_language = "Malayalam"
         }
         if(original_language == "bn") {
            original_language = "Bengali"
         }
        const movieEl = document.createElement("div")
        let genres = ["Action/Mystery","Comedy/Drama/Romance","Action/Thriller","Drama/Mystery"]
        let rndm = Math.floor(Math.random() *genres.length)
        let genresOfMovie = genres[rndm]
        movieEl.classList.add("movies")
        movieEl.innerHTML = `
                 <a href="./movieExpanded.html?id=${id}">   
                     <img src="${img_url + poster_path}" alt="" />
                 </a>
                 <h2>${title}</h2>
                 <p>Likes-${popularity}</p>
                 <small>${genresOfMovie}</small>
                 <p>Language-${original_language}</p>
      `
        movieContainerEl.appendChild(movieEl)

    })
    //In line No.53(this May Vary if you format it😶 )  href is written in such a way that we can  track the id of the movie we clicked..Its Written here because commenting is not possible inside the template literal 😐
}

//-------------------------------------------------------------------------------------------------------------------------------
//Can Ignore The Below Function Because Currently We Are Not Focussing on Manual data 🎉🎉
// function to get Live Events from json-server
// async function getLiveEvents() {
//     let url = "http://localhost:3000/images"
//     const res = await fetch(url)
//     const imgs = await res.json()
//     //console.log(imgs)
//     let template = ""
//     imgs.forEach((img) => {
//         template += `
//   <div class = "workshop-events">
//     <a href="./liveEventsExpanded.html?id=${img.id}"><img src=${img.img} alt="broken" /></a>
//   </div>
//       `
//     })
//     workshopContainer.innerHTML = template;
// }
// getLiveEvents()

//---------------------------------------------------------------------------------------------------------

//Upcoming Movies


const getlikedIndianMovies = async function(url) {
   
    const fetchedDataOfLikedIndianMovies = await fetch(url, {
        method: "GET",
        headers: {
            Accept: "application/json",
            Authorization: auth
        }
    })
    const data = await fetchedDataOfLikedIndianMovies.json();
    console.log(data.results)
    showLikedIndianMovies(data.results)
}

getlikedIndianMovies(likedIndianMovies)


function  showLikedIndianMovies(movies) {
    console.log(movies)
    
     movies.forEach((movie) => {
       
         let {id, title,release_date,popularity,vote_average,original_language,poster_path } = movie;
         if(original_language == "en") {
            original_language = "English"
         }
         if(original_language == "hi") {
            original_language = "Hindi"
         }
         if(original_language == "te"){
            original_language = "Telegu"
         }
         if(original_language == "ta") {
            original_language = "Tamil"
         }
         if(original_language == "ml") {
            original_language = "Malayalam"
         }
         if(original_language == "bn") {
            original_language = "Bengali"
         }
         const indianEl = document.createElement("div")
         let genres = ["Action/Mystery","Comedy/Drama/Romance","Action/Thriller","Drama/Mystery"]
        let rndm = Math.floor(Math.random() *genres.length)
        let genresOfMovie = genres[rndm]
         indianEl.classList.add("indian-movies")
         indianEl.innerHTML = `
                  <a href="./indianMoviesExpanded.html?id=${id}">   
                      <img src="${poster_path?img_url + poster_path:img_url+"/w896mqGi91LrTp2pUsc8a9QAbyL.jpg"}" alt="" />
                  </a>
                  <p>${title}</p>
                  <p>Likes-${popularity}</p>
                  <p>rating-${vote_average}</p>
                  <p>releasedate-${release_date}</p>
                  <p>Language-${original_language}</p>
                  <h3>${genresOfMovie}</h3>
       `
       indianMoviesContainerEl.appendChild(indianEl)
    })
    
}


//-------------------------------------------------------------------------------------------------------------
//Premering Movies 

const getNowPlayingMovies = async function(url) {
   
    const fetchedDataOfNowPlayingMovies  = await fetch(url, {
        method: "GET",
        headers: {
            Accept: "application/json",
            Authorization: auth
        }
    })
    const data = await fetchedDataOfNowPlayingMovies.json();
    console.log(data.results)
    showNowPlayingMovies (data.results)
}
getNowPlayingMovies(nowPlayingMoviesUrl) 

function showNowPlayingMovies(movies) {
    console.log(movies)
    
     movies.forEach((movie) => {
       
         let {id, title,release_date,popularity,vote_average,original_language,poster_path } = movie;
         if(original_language == "en") {
            original_language = "English"
         }
         if(original_language == "hi") {
            original_language = "Hindi"
         }
         if(original_language == "te"){
            original_language = "Telegu"
         }
         if(original_language == "ta") {
            original_language = "Tamil"
         }
         if(original_language == "ml") {
            original_language = "Malayalam"
         }
         if(original_language == "bn") {
            original_language = "Bengali"
         }
         const nowPlayingEl = document.createElement("div")
         let genres = ["Action/Mystery","Comedy/Drama/Romance","Action/Thriller","Drama/Mystery"]
         let rndm = Math.floor(Math.random() *genres.length)
         let genresOfMovie = genres[rndm]
         nowPlayingEl.classList.add("premeire-movies")
         nowPlayingEl.innerHTML = `
                  <a href="./premeireMoviesExpanded.html?id=${id}">   
                      <img src="${img_url + poster_path}" alt="" />
                  </a>
                  <p>${title}</p>
                  <p>Likes-${popularity}</p>
                  <p>rating-${vote_average}</p>
                  <p>releasedate-${release_date}</p>
                  <p>Language-${original_language}</p>
                  <h2>${genresOfMovie}</h2>
       `
       nowPlayingMoviesContainerEl.appendChild(nowPlayingEl)
    })
    
}



//---------------------------------------------------------------------------------------------------------------------------------

//popular



const getPopularMovies = async function(url) {
   
    const fetchedDataOfGetPopularMovies  = await fetch(url, {
        method: "GET",
        headers: {
            Accept: "application/json",
            Authorization: auth
        }
    })
    const data = await fetchedDataOfGetPopularMovies.json();
    console.log(data.results);
    showPopularMovies (data.results)
}
getPopularMovies(popularMoviesUrl2) 


function showPopularMovies(movies) {
    console.log(movies)
    
     movies.forEach((movie) => {
       
         let {id, title,release_date,popularity,vote_average,original_language,poster_path } = movie;
         if(original_language == "en") {
            original_language = "English"
         }
         if(original_language == "hi") {
            original_language = "Hindi"
         }
         if(original_language == "te"){
            original_language = "Telegu"
         }
         if(original_language == "ta") {
            original_language = "Tamil"
         }
         if(original_language == "ml") {
            original_language = "Malayalam"
         }
         if(original_language == "bn") {
            original_language = "Bengali"
         }
         const popularMoviesEl = document.createElement("div")
         let genres = ["Action/Mystery","Comedy/Drama/Romance","Action/Thriller","Drama/Mystery"]
         let rndm = Math.floor(Math.random() *genres.length)
         let genresOfMovie = genres[rndm]
         popularMoviesEl.classList.add("popular-movies")
         popularMoviesEl.innerHTML = `
                  <a href="./popularMoviesExpanded.html?id=${id}">   
                      <img src="${img_url + poster_path}" alt="" />
                  </a>
                  <p>${title}</p>
                  <p>Likes-${popularity}</p>
                  <p>rating-${vote_average}</p>
                  <p>releasedate-${release_date}</p>
                  <p>Language-${original_language}</p>
                  <h2>${genresOfMovie}</h2>
       `
       popularMoviesContainerEl.appendChild(popularMoviesEl)
    })
    
}


//----------------------------------------------------------------------

//Top Rated

const getTopRatedMovies = async function(url) {
   
    const fetchedDataOfTopRatedMovies  = await fetch(url, {
        method: "GET",
        headers: {
            Accept: "application/json",
            Authorization: auth
        }
    })
    const data = await fetchedDataOfTopRatedMovies.json();
    console.log(data.results);
    showTopRatedMovies (data.results)
}
getTopRatedMovies(topRatedMoviesUrl) 


function showTopRatedMovies(movies) {
    console.log(movies)
    
     movies.forEach((movie) => {
       
         let {id, title,release_date,popularity,vote_average,original_language,poster_path } = movie;
         if(original_language == "en") {
            original_language = "English"
         }
         if(original_language == "hi") {
            original_language = "Hindi"
         }
         if(original_language == "te"){
            original_language = "Telegu"
         }
         if(original_language == "ta") {
            original_language = "Tamil"
         }
         if(original_language == "ml") {
            original_language = "Malayalam"
         }
         if(original_language == "bn") {
            original_language = "Bengali"
         }
         const topRatedMoviesEl = document.createElement("div")
         let genres = ["Action/Mystery","Comedy/Drama/Romance","Action/Thriller","Drama/Mystery"]
         let rndm = Math.floor(Math.random() *genres.length)
         let genresOfMovie = genres[rndm]
         topRatedMoviesEl.classList.add("topRated-movies")
         topRatedMoviesEl.innerHTML = `
                  <a href="./topRatedMoviesExpanded.html?id=${id}">   
                      <img src="${img_url + poster_path}" alt="" />
                  </a>
                  <p>${title}</p>
                  <p>Likes-${popularity}</p>
                  <p>rating-${vote_average}</p>
                  <p>releasedate-${release_date}</p>
                  <p>Language-${original_language}</p>
                  <h2>${genresOfMovie}</h2>
       `
       topRatedMoviesContainerEl.appendChild(topRatedMoviesEl)
    })
    
}

//-------------------------------------------------------------------------------------------------------------

//Latest Movies


const getLatestMovies = async function(url) {
   
    const fetchedDataOfLatestMovies  = await fetch(url, {
        method: "GET",
        headers: {
            Accept: "application/json",
            Authorization: auth
        }
    })
    const data = await fetchedDataOfLatestMovies.json();
    console.log(data.results);
    showLatestMovies(data.results)
}
getLatestMovies(latestMoviesUrl);


function showLatestMovies(movies) {
    console.log(movies)
    
     movies.forEach((movie) => {
       
         let {id, title,release_date,popularity,vote_average,original_language,poster_path } = movie;
         if(original_language == "en") {
            original_language = "English"
         }
         if(original_language == "hi") {
            original_language = "Hindi"
         }
         if(original_language == "te"){
            original_language = "Telegu"
         }
         if(original_language == "ta") {
            original_language = "Tamil"
         }
         if(original_language == "ml") {
            original_language = "Malayalam"
         }
         if(original_language == "bn") {
            original_language = "Bengali"
         }
         const latestMoviesEl = document.createElement("div")
         let genres = ["Action/Mystery","Comedy/Drama/Romance","Action/Thriller","Drama/Mystery"]
         let rndm = Math.floor(Math.random() *genres.length)
         let genresOfMovie = genres[rndm]
         latestMoviesEl.classList.add("latest-movies")
         latestMoviesEl.innerHTML = `
                  <a href="./latestMoviesExpanded.html?id=${id}">   
                      <img src="${img_url + poster_path}" alt="" />
                  </a>
                  <p>${title}</p>
                  <p>Likes-${popularity}</p>
                  <p>rating-${vote_average}</p>
                  <p>releasedate-${release_date}</p>
                  <p>Language-${original_language}</p>
                  <h2>${genresOfMovie}</h2>
       `
       latestMoviesContainerEl.appendChild(latestMoviesEl)
    })
    
}

//------------------------------------------------------------------------------------------------------------------------------

//Trending Searches

const getTrendingMovies = async function(url) {
   
    const fetchedDataOfTrendingMovies  = await fetch(url, {
        method: "GET",
        headers: {
            Accept: "application/json",
            Authorization: auth
        }
    })
    const data = await fetchedDataOfTrendingMovies.json();
    console.log(data.results);
    showTrendingMovies(data.results)
}
getTrendingMovies(trendingMovieNamesUrl);


function showTrendingMovies(movies){
    movies.forEach(movie => {
        let {id, title} = movie;
        const trendingMoviesEl = document.createElement("div")
        trendingMoviesEl.classList.add("trending-movies")
        trendingMoviesEl.innerHTML = `
          <a href="./trendingMoviesExpanded.html?id=${id}">
              <h3>${title}</h3>
          </a>
        
        `
        trendingMoviesContainerEl.appendChild(trendingMoviesEl)
    })
}