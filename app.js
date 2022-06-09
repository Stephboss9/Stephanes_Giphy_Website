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
   
    //display the results
    displayResults(responseData)

     //unhide load more btn
     loadMoreBtnElement.classList.remove('hidden')
}

function displayResults(data) {
  
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
    getResults(evt)
}

function showMore() {
    //set new offset
    offset = limit*pages
    //call getResults
    loadMore = true
    getResults()
}

async function generateRandomGifs() {
    let randomAPIUrl = `https://api.giphy.com/v1/gifs/random?api_key=${api_key}&rating=${rating}`
    console.log(randomAPIUrl)
    let response = await fetch(randomAPIUrl)
    let responseData = await response.json()
        giphySectionElem.innerHTML += `<div class = "giphy_img"> <img src = "${responseData.data.images.original.url}"> <p class = "gif_title">${responseData.data.title}<p></div>`

}

window.onload = async function () {
    //load trending gifs first
    let trendingAPIUrl = `https://api.giphy.com/v1/gifs/trending?api_key=${api_key}&rating=${rating}&offset=${offset}&limit=18`
    console.log(trendingAPIUrl)
    let response = await fetch(trendingAPIUrl)
    let responseData = await response.json()
    responseData.data.forEach(gif => {
        giphySectionElem.innerHTML += `<div class = "giphy_img"> <img src = "${gif.images.original.url}"> <p class = "gif_title">${gif.title}<p></div>`
    });
}