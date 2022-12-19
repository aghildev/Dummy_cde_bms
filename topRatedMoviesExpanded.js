const id = new URLSearchParams(window.location.search).get("id");
console.log(id)
const topRatedMoviesContainerEl = document.querySelector(".expandedTopRatedMovies-container")
const moviesYouMayLikeContainerEl = document.querySelector(".moviesYouMayLike-container")

let auth = "57b428c0e112b579eb26e2f43ff08b0f"
let Api_key = "api_key=57b428c0e112b579eb26e2f43ff08b0f"
let Base_Url = "https://api.themoviedb.org/3/"
let Api_url = Base_Url + "/trending/movie/week?" + Api_key
let img_url = "https://image.tmdb.org/t/p/w500"
let upComingMoviesUrl =  Base_Url + "movie/upcoming?" + Api_key
let recommendedMoviesUrl = Base_Url + "movie/now_playing?"+ Api_key+"&language=en-US&page=5"




const renderDetails = async () => {
    const res = await fetch(`${Base_Url}movie/${id}?${Api_key}&language=en-US`); // Fetching Specific Movie Details using id
    const movieData = await res.json()
    const { original_title, backdrop_path, vote_count, vote_average, runtime, release_date, overview, poster_path, genres } = movieData;//Destructuring Optional He😇  
    //We are getting Genres as an array so have to Iterate Over That..We have to delete The Coma Thats coming at the End of very last genre...Will  Rectify it later😒
    let gens = ""
    genres.forEach((g) => {
        gens += g.name + " " + ","
    })
    const template = `
     <h1>${original_title}</h1>
     <img src="${"https://image.tmdb.org/t/p/w500"}/${backdrop_path}" alt="" style= "width:90%" /> --cover photo
     <img src = "${"https://image.tmdb.org/t/p/w500"}/${poster_path}" alt="" style= "width:30%" /> --profile pic
     <h1>vote-count:${vote_count}</h1>
     <h1>Rating :${vote_average}</h1>
     <h1>Runtime of movie : ${runtime} mins</h1>
     <h1>Release Date : ${release_date}</h1>
     <h2>About Movie : ${overview}</h2>
     <h2>genres : ${gens}</h2>
      `
    //I have Written Which is Cover Photo and Which is Profile Pic Inside the Template String And Also Given Small Inline Style Dont forget to delete it While Styling 
    topRatedMoviesContainerEl.innerHTML = template
    renderCast()  //Calling The Function Render The Cast
    renderCrew()  //Calling The Function Render The Crew
    renderReviews() //Calling The Function Render The Reviews
    renderMoviesYouLike()
}




//------------------------------------------------------------------------------------------
//Function That Renders the Cast
const renderCast = async () => {
    const res = await fetch(`${Base_Url}movie/${id}/credits?${Api_key}&language=en-US`); // End Point That Fetch the Cast
    const cast = await res.json()
    let casts = cast.cast.slice(1, 7)//We are Getting a Buch Of Casts So We Sliced it Out 🐱‍👤
    //Below Code is the normal Dom Manipulation Like We Done Before.I have used Inline Styles So Please delete it While Designing
    const castElCon = document.createElement("div")
    castElCon.classList.add("cast")
    castElCon.innerHTML = `<h1>Cast</h1>`
    casts.forEach((c) => {
        castElCon.innerHTML += `
        <div class="cast-container">
          <small>${c.name}</small>
          <img src="${"https://image.tmdb.org/t/p/w500"}/${c.profile_path}" alt="" style="height:150px;border-radius:50%"/>
        </div>
          `
          topRatedMoviesContainerEl.appendChild(castElCon)
    })
}
//----------------------------------------------------------------------------------------------
//Function That Renders the Crew
const renderCrew = async () => {
    const res = await fetch(`${Base_Url}movie/${id}/credits?${Api_key}&language=en-US`); // End Point That Fetch the Crew
    const crew = await res.json()
    let crews = crew.crew.slice(1, 5)//We are Getting a Buch Of Crews So We Sliced it Out 🐱‍👤
    //Below Code is the normal Dom Manipulation Like We Done Before
    const crewElCon = document.createElement("div")
    crewElCon.classList.add("crew")
    crewElCon.innerHTML = `<h1>Crew</h1>`
    crews.forEach((c) => {
        crewElCon.innerHTML += `
        <div class="crew-container">
          <small>${c.name}</small>
          <img src="${"https://image.tmdb.org/t/p/w500"}/${c.profile_path ? c.profile_path : "/5QlzL72Du5zVs1E27pQ0OlFLImI.jpg"}" alt="" style="height:150px;border-radius:50%"/>
        </div>
         `
        //I have used Ternary Operator to get image because Some times We are getting Null through Api😕
        topRatedMoviesContainerEl.appendChild(crewElCon)
    })
}
//Function That Renders the Reviews
const renderReviews = async () => {
    const res = await fetch(`${Base_Url}movie/${id}/reviews?${Api_key}&language=en-US`); // End Point That Fetch the Crew
    const review = await res.json();
    const reviews = review.results
    //Below Code is the normal Dom Manipulation Like We Done Before
    const reviewCon = document.createElement("div")
    reviewCon.classList.add("review-container")
    console.log(reviews)
    reviews.forEach((rev) => {
        let content = rev.content.slice(1, 600)// The Review Content Was So Big So Sliced to 600 Words Including Spaces and punctuations..It will be Nice To change it While Designing
        let imgurl = rev.author_details.avatar_path
        const rating = rev.author_details.rating
        reviewCon.innerHTML += `
          <div class="reviews">
          <img src="${img_url}/${imgurl}" alt="" style= "height:150px;border-radius:50%"/>
           <h2>Author:${rev.author}</h2>
           <p>Review:${content}</p>
           <h2>created at:${rev.created_at}</h2>
           <h2>Rating:${rating}/10</h2>
          </div>
          `
          topRatedMoviesContainerEl.appendChild(reviewCon)
    })
}

const renderMoviesYouLike = async function() {
    const res = await fetch(recommendedMoviesUrl); // End Point That Fetch the Crew
    const movies = await res.json();
   const mayLikeMovies = movies.results.slice(1,10);
  
  
   mayLikeMovies.forEach((movie) => {
       
    const {id, title,release_date,popularity,vote_average,original_language,poster_path } = movie;
    const mayLikeCon = document.createElement("div")
    mayLikeCon.classList.add("moviesYouMayLike")
    mayLikeCon.innerHTML = `
             <a href="./topRatedMoviesExpanded.html?id=${id}">   
                 <img src="${img_url + poster_path}" alt="" />
             </a>
             <p>${title}</p>
             <p>Likes-${popularity}</p>
             <p>rating-${vote_average}</p>
           
  `
  moviesYouMayLikeContainerEl.appendChild(mayLikeCon)
})

}












window.addEventListener("DOMContentLoaded", () => renderDetails())