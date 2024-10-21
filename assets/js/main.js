// Setup

// seleziono gli elementi dalla DOM
const rowEL = document.querySelector(".row");

const overlayEl = document.querySelector(".overlay");

const closeOverlayEl = document.querySelector(".close-overlay");

const mainImgEl = document.querySelector(".main-img > img");


// Elaboration

// chiamata AJAX
axios.get("https://jsonplaceholder.typicode.com/photos?_limit=6")
.then(response => {

    // salvo la risposta in una costante
    const photos = response.data;

    // invoco la funzione per salvare i dati e per aggiungere il markup
    getDataFromAPI(photos);
    
    const cardEl = document.querySelectorAll(".card");

    // il querySelectroAll mi restituisce una nodelist di tutte le card
    getOverlayImg(cardEl);

}) .catch(error => console.error(error));

// close overlay
closeOverlayEl.addEventListener("click", function() {
    closeOverlay(overlayEl);
});

overlayEl.addEventListener("click", function() {
    // se il target del click non è mainImgEl allora chiude l'overlay
    if (event.target != mainImgEl) {
        closeOverlay(overlayEl);
    };
});


// Helper functions

// creo una funzione per recuperare i dati che mi servono
/**
 * 
 * @param {array} arr The array contained in the API response
 */
function getDataFromAPI(arr) {
    let allMarkup = "";
    
    // ciclo all'interno dell'array per ottenere accesso ai singoli oggetti        
    arr.forEach(obj => {

        // destrotturo l'oggetto per ricavare i dati che mi servono            
        const { title, url } = obj
        // console.log(title, url);
        
        // invoco la funzione per capitalizzare il titolo
        const titleUpperCase = firstLetterUpperCase(title)

        // invoco la funzione per creare il markup con i dati 
        const markup = getMarkup(titleUpperCase, url);

        // aggiungo il markup alla DOM
        allMarkup += markup
    })

    rowEL.innerHTML = allMarkup;
};


// creo una funzione per generare il markup
/**
 * 
 * @param {string} title 
 * @param {url} url 
 * @returns markup
 */
function getMarkup(title, url) {
    return `
    <!-- Card -->
    <div class="card col-12 col-sm-6 col-md-4">

        <!-- pin img -->
        <div class="pin">
            <img src="./assets/img/pin.svg" alt="">
        </div>
        <!-- card img -->
        <div class="card-img">
            <img src="${url}" alt="">
        </div>
        <!-- card body -->
        <div class="card-body">
            <p>${title}</p>
        </div>
    </div>
    `;
};


// creo una funzione per l'img dell'overlay
/**
 * 
 * @param {array} nodelist the array returned by the query selector
 */
function getOverlayImg(nodelist) {

    // ciclo all'interno della nodelist cardEl
    nodelist.forEach(singleCard => {

        // aggiungo l'event listener
        singleCard.addEventListener("click", function() {

            // faccio comparire l'overlay
            overlayEl.style.display = "block";

            // dalla singleCard mi seleziono l'src dell'img
            const imgEl = singleCard.querySelector(".card-img > img").src;

            // aggiorno l'src
            mainImgEl.src = imgEl;
        })
    })
}


// creo una funzione per far chiudere l'overlay
/**
 * 
 * @param {element} overlay The DOM element overlay 
 */
function closeOverlay(overlay) {
    overlay.style.display = "none";
}

// creo una funzione per la prima lettere in maiuscolo
/**
 * 
 * @param {string} string The titol
 * @returns {string}
 */
function firstLetterUpperCase(string) {

    // splitto in un array tutte le parole della stringa
    const splitString = string.split(" ");

    // ciclo all'interno dell'array per prendere la prima lettera 
    for (let i = 0; i < splitString.length; i++) {
        splitString[i] = splitString[i].charAt(0).toUpperCase() + splitString[i].substring(1);
    }

    // faccio il return dell'array trasformato in stringa
    return splitString.join(" ");
}


