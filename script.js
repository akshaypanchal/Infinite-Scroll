const imageContainer =  document.getElementById("image-container");
const loader = document.getElementById('loader');

let photosArray = [];
let ready = false;
let imagesLoaded = 0;
let totalImages = 0;

// Unsplash API Request
const count=30;
const apiKey="jIHQtSjcBnrOtMP2dijTa5OcJaeQcVI-FHqf3O5x-00";
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${
apiKey}&count=${count}`;

// Check is all images were loaded
function imageLoad(){
    imagesLoaded++;
    if ( imagesLoaded === totalImages){
        ready = true;
        loader.hidden = true;
    }

}


// Helper Function to set Attributes on DOM Elements
function setAttributes(element, attributes){
    for (const key in attributes){
        element.setAttribute(key, attributes[key]);
    }
}


// Create Elements for Links, add to DOM
function displayPhotos(){
    totalImages = 0;
    totalImages = photosArray.length;
    loader.hidden = false;
    photosArray.forEach((photo)=>{
        // Create <a> to link to Unsplash
        const item = document.createElement('a');

        setAttributes(item, {
            href: photo.links.html,
            target:'_blank',
        });

        // Create <img> for photo
        const  img = document.createElement('img');

        setAttributes(img, {
            src: photo.urls.regular,
            alt: photo.alt_description,
            title:photo.alt_description,

        });

        // Event Listener, Check when each is finished lodading
        img.addEventListener('load', imageLoad);

        // Put <img> inside <a>, then put both inside image container element
        item.appendChild(img);
        imageContainer.appendChild(item);
    });
}


// fetching Photos from Unsplash API
async function getPhotos(){
    try{

        const response = await fetch(apiUrl);
        photosArray = await response.json();
        displayPhotos();
    }
    catch(error){
        // Catch Error here..
    }
}


// Check to see if scrolling near bottom of page, Load more Photos
window.addEventListener('scroll',()=>{

    if(window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready ){
        ready =  false;
        getPhotos();
    }
});

// Calling getphotos function
getPhotos();