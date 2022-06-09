//Global Constants
const api_key = "RNtYFS9Q4vYDV1E5LLJsw58nQdlOZReC"
const limit = 9
const rating = "g"
const giphySectionElem = document.querySelector('#giphy_section')
const inputFieldElem = document.querySelector('#Gname')
const FormElem = document.getElementById('form')
const loadMoreBtnElement = document.querySelector('.button')
//other variables
let offset = 0
let random_id = ""
let searchKey = ""
let backupSearchKey = "" //to store most recent search key that was entered
let pages = 0
let loadMore = false //boolean indicating if user pressed the show more button
let trendingAPIUrl = `api.giphy.com/v1/gifs/trending?api_key=${api_key}&rating=${rating}&offset=${offset}&limit=${limit}`

FormElem.addEventListener('submit', (event) => {
    event.preventDefault()
    handleFormSubmission()
})





async function getResults(evt) {
    console.log("bob")

    //define apiURL
    if (loadMore) {
        searchKey = backupSearchKey
    }
    else {
        searchKey = FormElem['Gname'].value
    }

    let apiURL = `https://api.giphy.com/v1/gifs/search?api_key=${api_key}&rating=${rating}&offset=${offset}&limit=${limit}&q=${searchKey}`    
   
   //Make the api call
    let response = await fetch(apiURL)

    //get the JSON data
    let responseData = await response.json()
   
    displayResults(responseData)
     //unhide load more btn

     loadMoreBtnElement.classList.remove('hidden')
}

function displayResults(data) {
   console.log(data)
   console.log(giphySectionElem)
    data.data.forEach(gif => {
        giphySectionElem.innerHTML += `<div class = "giphy_img"> <img src = "${gif.images.original.url}"> <p class = "gif_title">${gif.title}<p></div>`
    });
    //store the search key incase the user wants to load more results
    backupSearchKey = searchKey

     //set the input form element back to ""
    FormElem['Gname'].value = ""

    //increment the number of pages, a page is equivalent to 9 gifs
    pages += 1
}

function handleFormSubmission (evt) {
   
    //set pages equal to 0
    pages = 0
    //clear any gifs present for new search
    giphySectionElem.innerHTML = ""
    //reset the offset
    offset = 0
    //set flag back to false(starting a new search)
    loadMore = false
    //hide the show more btn element
    loadMoreBtnElement.classList.add('hidden')
    //get search key
    getResults(evt)
    
}

function showMore() {
    //set new offset
    offset = limit*pages
    //call getResults
    loadMore = true
    getResults()
}

