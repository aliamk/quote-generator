const quoteContainer = document.getElementById('quote-container')
const quoteText = document.getElementById('quote')
const authorText = document.getElementById('author')
const twitterBtn = document.getElementById('twitter')
const newQuoteBtn = document.getElementById('new-quote')
const loader = document.getElementById('loader')

// Show loading
function showLoadingSpinner() {
  loader.hidden = false
  quoteContainer.hidden = true
}

// Hide loading
function removeLoadingSpinner() {
  if (!loader.hidden) {    // If loader is not hidden
    quoteContainer.hidden = false  // display the quoteContainer
    loader.hidden = true // and hide the loader
  }
}

// Get quote from API
async function getQuote() {
  
  showLoadingSpinner()
  const proxyUrl = 'https://cors-anywhere.herokuapp.com/'
  const apiUrl = 'http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json'

  try {
    const response = await fetch(proxyUrl + apiUrl)
    const data = await response.json()
    // console.log(data)
    if (data.quoteAuthor === '') {
      authorText.innerText = 'Unknown'
    } else {
      authorText.innerText = data.quoteAuthor
    }

    // Reduce font-size for long quotes
    if (data.quoteText.length > 120) {
      quoteText.classList.add('long-quote')
    } else {
      quoteText.classList.remove('long-quote')
    }
    quoteText.innerText = data.quoteText

    // Stop loader + display quoteContainer
    removeLoadingSpinner()

  } catch (error) {
    getQuote()  // Recursive code... replace with timeout or something
    // console.log('Whoops, no quote', error)
  }
}

// Tweet quotes
function tweetQuote() {
  const quote = quoteText.innerText
  const author = authorText.innerText
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`
  window.open(twitterUrl, '_blank')
}

// Event Listeners
newQuoteBtn.addEventListener('click', getQuote)
twitterBtn.addEventListener('click', tweetQuote)


// On Load
getQuote()