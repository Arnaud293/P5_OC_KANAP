const product = document.getElementById('item');
const productcontenair = document.querySelector('article');

let params = new URL(document.location).searchParams;
let canapId = params.get('id');

let canapData = [];

// Chercher les info de l'API
const getproductbyID = async () => {
    const res = await fetch(`http://localhost:3000/api/products/${canapId}`)
    canapData = await res.json()

    console.log(canapData);
}
getproductbyID();

//  Afficher produit en fonction de l'ID


const DisplayById = async () => {

    await getproductbyID();

    let productImg = document.querySelector('.item__img');
    productImg.innerHTML = `<img src="${canapData.imageUrl}" alt="${canapData.altTxt}">`;
    let productTitle = document.getElementById('title');
    productTitle.innerText = canapData.name;
    let productPrice = document.getElementById('price');
    productPrice.innerText = canapData.price;
    let productDescription = document.getElementById('description');
    productDescription.innerHTML = canapData.description;




}

DisplayById()
