const imageContainer = document.getElementById("image-container")
const loader = document.getElementById("loader")
let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];


// Unsplash API
let count = 3
const query = "hasselblad"
const apiKey = 'JbB_7HYJeOVpS37mLdKkPLU49KCBhEEbdwVyKhVU8-M'
let apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}&query=${query}`

// check if all images were loaded
function imageLoaded() {
    imagesLoaded++;
    if (imagesLoaded === totalImages) {
        ready = true;
        loader.hidden = true;
        count = 10
        // console.log("ready = " + ready)
    }
    // console.log("imageLoaded", imagesLoaded)
}
// Helper Function to set Attributes to DOM elements
function setAttributes (element, attributes) {
    for (const key in attributes) {
        element.setAttribute(key, attributes[key])
    }
};
// create elements for link and photos, Add to DOM
function displayPhotos() {
    imagesLoaded = 0;
     totalImages = photosArray.length;
    //  console.log('totalImages = ' + totalImages)
    // for each elem in photosArray
    photosArray.forEach((photo) => {
        // create <a> elem to link to unsplash
        const item = document.createElement('a');
        setAttributes(item, {
            href: photo.links.html,
            target: '_blank',
        })
        
        // create <img> for photo
        const img = document.createElement('img');
        setAttributes(img, {
            src: photo.urls.small_s3,
            alt:   photo.alt_description,
            title:   photo.alt_description,
        })

        // event listener, check when each image is finished loading
        img.addEventListener('load', imageLoaded);

        // put image inside <a>
        item.appendChild(img)
        imageContainer.appendChild(item)
        });
}

// get photos from Unsplash API
async function getPhotos () {
    try {
        const response = await fetch(apiUrl);
        photosArray = await response.json();
        // console.log(photosArray)
        displayPhotos();

    } 
    // catch errors
    catch (error){
        console.log(error)
    }
}

// check to see if scrolling near the bottom of the page, Load more Photos
window.addEventListener('scroll', () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready)
    {
        ready = false;
        getPhotos();
        // console.log("load more");
    }
})


// on Load
getPhotos();
