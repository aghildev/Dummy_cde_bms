//Taking Reference to attach to the DOM
const movieContainerEl = document.querySelector(".movies-container");
const workshopContainer = document.querySelector(".workshop-container")
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
const Api_url = Base_Url + "movie/now_playing?" + Api_key
const img_url = "https://image.tmdb.org/t/p/w500"    //------>  This is the Base URL For Images
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
    showMovies(data.results); //This Function is Invoked inside getMovies Function so that we can Accept the data fetced from getMovies function as the Argument for showMovies function
}
getMovies(Api_url)
//-----------------------------------------------------------------
// This function accept data from getMovies function and help to render it on webpage
function showMovies(movies) {
    //Below code for iterating through each movie and render as a template in webpage
    movies.forEach((movie) => {
        //Destructuring of Object done here so that we can unpack properties from object and can use as independent variables in the below block scope
        const { title, poster_path, vote_average, overview, popularity, id, genre_ids } = movie
        const movieEl = document.createElement("div")
        movieEl.classList.add("movies")
        movieEl.innerHTML = `
                 <a href="./movieExpanded.html?id=${id}">   
                     <img src="${img_url + poster_path}" alt="" />
                 </a>
                 <h2>${title}</h2>
                 <p>Likes-${popularity}</p>
                 <small>${genre_ids}</small>
      `
        movieContainerEl.appendChild(movieEl)

    })
    //In line No.53(this May Vary if you format it😶 )  href is written in such a way that we can  track the id of the movie we clicked..Its Written here because commenting is not possible inside the template literal 😐
}
//-------------------------------------------------------------------------------------------------------------------------------
//Can Ignore The Below Function Because Currently We Are Not Focussing on Manual data 🎉🎉
// function to get Live Events from json-server
async function getLiveEvents() {
    let url = "http://localhost:3000/images"
    const res = await fetch(url)
    const imgs = await res.json()
    //console.log(imgs)
    let template = ""
    imgs.forEach((img) => {
        template += `
  <div class = "workshop-events">
    <a href="./liveEventsExpanded.html?id=${img.id}"><img src=${img.img} alt="broken" /></a>
  </div>
      `
    })
    workshopContainer.innerHTML = template;
}
getLiveEvents()

//---------------------------------------------------------------------------------------------------------




