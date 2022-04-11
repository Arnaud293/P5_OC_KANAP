
document.querySelector('#items')
let url = `http://localhost:3000/api/products`;

fetch(url).then(response => response.json().then(data => console.log(data))
);


