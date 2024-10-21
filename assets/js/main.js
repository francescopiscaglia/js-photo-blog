// Setup

// seleziono gli elementi dalla DOM
const rowEL = document.querySelector(".row");
// console.log(imgEl);

const overlayEl = document.querySelector(".overlay");
// console.log(overlayEl);

const closeOverlayEl = document.querySelector(".close-overlay");
// console.log(closeOverlayEl);


// Elaboration

// chiamata AJAX
axios.get("https://jsonplaceholder.typicode.com/photos?_limit=6")
.then(response => {

    // salvo la risposta in una costante
    const photos = response.data
    // console.log(photos);

    getDataFromAPI(photos)

    const cardEl = document.querySelectorAll(".card");
    // console.log(cardEl);
 
    // open overlay
    // il querySelectorAll mi restituisce una nodelist ovvero un'array
    // quindi devo cicliarci all'interno per ottenere la singola card
    cardEl.forEach(element => {
        element.addEventListener("click", function() {
            overlayEl.style.display = "block";
        })
    })
}) .catch(error => console.error(error))




// close overlay
closeOverlayEl.addEventListener("click", function() {
    overlayEl.style.display = "none";
})


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

        // invoco la variabile per creare il markup con i dati 
        const markup = getMarkup(title, url);

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



