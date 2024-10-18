// Setup

// seleziono gli elementi dalla DOM
const rowEL = document.querySelector(".row");
// console.log(imgEl);


// Elaboration

// chiamata AJAX
axios.get("https://jsonplaceholder.typicode.com/photos?_limit=6")
.then(response => {

    // salvo la risposta in una costante
    const photos = response.data
    // console.log(photos);

    getDataFromAPI(photos)

}) .catch(error => console.error(error))


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
            <svg width="25" height="25" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g filter="url(#filter0_d_11_3)">
                    <circle cx="17" cy="16" r="16" fill="url(#paint0_linear_11_3)" />
                    <circle cx="17" cy="16" r="15" stroke="url(#paint1_linear_11_3)" stroke-width="2" />
                </g>
                <defs>
                    <filter id="filter0_d_11_3" x="0.6" y="0" width="34.8" height="35.4"
                        filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                        <feFlood flood-opacity="0" result="BackgroundImageFix" />
                        <feColorMatrix in="SourceAlpha" type="matrix"
                            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                        <feOffset dx="1" dy="2" />
                        <feGaussianBlur stdDeviation="0.7" />
                        <feComposite in2="hardAlpha" operator="out" />
                        <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
                        <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_11_3" />
                        <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_11_3"
                            result="shape" />
                    </filter>
                    <linearGradient id="paint0_linear_11_3" x1="17" y1="0" x2="17" y2="32"
                        gradientUnits="userSpaceOnUse">
                        <stop stop-color="#5D0B03" />
                        <stop offset="1" stop-color="#F66659" />
                    </linearGradient>
                    <linearGradient id="paint1_linear_11_3" x1="10.1429" y1="7.76563e-07" x2="30.2571"
                        y2="24.6857" gradientUnits="userSpaceOnUse">
                        <stop stop-color="#FFF3EB" />
                        <stop offset="1" stop-color="#512312" />
                    </linearGradient>
                </defs>
            </svg>
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



