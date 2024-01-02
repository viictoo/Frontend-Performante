const qtContainer = document.getElementById('q-container');
const qtText = document.getElementById('quote');
const qtAuthor = document.getElementById('author');
const twitterBtn = document.getElementById('x');
const newBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');


// show loader
function showLoadingSpinner() {
    loader.hidden = false;
    qtContainer.hidden = true;
}

function removeLoadingSpinner() {
    if (!loader.hidden) {
        qtContainer.hidden = false;
        loader.hidden = true;
    }
}

// Get Quote from API
async function getQuote() {
    showLoadingSpinner();
    const proxyUrl = "https://cors-anywhere.herokuapp.com/"
    const apiUrl = "http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json";

    try {
        const response = await fetch(proxyUrl + apiUrl);
        const data = await response.json();
        // if author is blank add Uknown
        if (data.quoteAuthor === '') {
            qtAuthor.innerText = 'Unknown';
        } else {
            qtAuthor.innerText = data.quoteAuthor;
        }
        // reduce font size for longer texts
        if (data.quoteText.length > 50) {
            qtText.classList.add('long-quote');
        }
        else {
            qtText.classList.remove('long-quote')
        }
        qtText.innerText = data.quoteText;

        // stop loader and show the quote
        removeLoadingSpinner();
        // throw new Error('oops')

    } catch (error) {
        console.log(error)
        // getQuote();
    }
}
// tweet Quote
function tweetQuote() {
    const quote = qtText.innerText;
    const author = qtAuthor.innerText;
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
    console.log(twitterUrl)
    window.open(twitterUrl, '_blank');
}

// event Listeners
newBtn.addEventListener('click', getQuote);
twitterBtn.addEventListener('click', tweetQuote);

//On Load 
getQuote();
