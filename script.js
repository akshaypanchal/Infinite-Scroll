const imageContainer =  document.getElementById("image-container");
const loader = document.getElementById('loader');

let photosArray = [];


// Unsplash API Request
const count=10;
const apiKey="jIHQtSjcBnrOtMP2dijTa5OcJaeQcVI-FHqf3O5x-00";
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${
apiKey}&count=${count}`;

// Create Elements for Links, add to DOM
function displayPhotos(){
    photosArray.forEach((photo)=>{
        // Create <a> to link to Unsplash
        const item = document.createElement('a');
        item.setAttribute('href', photo.links.html);
        item.setAttribute('target', '_blank');

        // Create <img> for photo
        const  img = document.createElement('img');
        img.setAttribute('src',photo.urls.regular);
        img.setAttribute('alt', photo.alt_description);
        img.setAttribute('title', photo.alt_description);

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


// Calling getphotos function
getPhotos();