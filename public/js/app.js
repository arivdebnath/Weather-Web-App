// fetch('http://localhost:3000/weather?address=boston').then((response) => {
//     response.json().then((data) => {
//         if (data.error) {
//             console.log(data.error);
//         } else {
//             console.log(`today's temperature is ${data.temp} and the weather can be described as ${data.weather[0].description}`);
//         }

//     })
// })

const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const p1 = document.querySelector('#p1');
const p2 = document.querySelector('#p2');
const p3 = document.querySelector('#p3');
const p4 = document.querySelector('#p4');
const p5 = document.querySelector('#p5');


weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const location = search.value;

    if (!location) {
        p1.textContent = "Please enter a location to search";
        p5.textContent = '';
        p2.textContent = '';
        p3.textContent = '';
        p4.textContent = '';

        // console.log('Please enter a location to search');
        return;
    }
    const searchUrl = '/weather?address=' + location;

    p1.textContent = 'Loading...'
    p5.textContent = 'Loading...'
    p2.textContent = 'Loading...'
    p3.textContent = 'Loading...'
    p4.textContent = 'Loading...'

    fetch(searchUrl).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                p1.textContent = data.error;
                p5.textContent = '';
                p2.textContent = '';
                p3.textContent = '';
                p4.textContent = '';
                // console.log(data.error);
            } else {
                p1.textContent = 'Location: ' + ' ' +  data.placeName
                p5.textContent = 'Description: ' + data.weather[0].main.toUpperCase() + ', ' + data.weather[0].description 
                p2.textContent = 'Temperature: ' + data.temp+ '℃'
                p3.textContent = 'Latitude: '+ data.latitude
                p4.textContent = 'Longitude: '+ data.longitude
                
            }

        })
    })

})