const product = document.getElementById('item');
const productcontenair = document.querySelector('article');

// Lien entre page accueil et produit

let params = new URL(document.location).searchParams;
let canapId = params.get('id');


let canapData = [];

// Chercher les info de l'API
const getproductbyID = async () => {
    try {

        const res = await fetch(`http://localhost:3000/api/products/${canapId}`)
        canapData = await res.json()

        console.log(canapData);
    }
    catch {
        alert('Problème avec fetch')
    }
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

    // Mapping pour choix de la couleur (plusieurs éléments)
    document.querySelector("#colors").insertAdjacentHTML
        ("beforeend", canapData.colors.map(colors => `<option value="${colors}">${colors}</option>`)
            .join());




}

DisplayById()

// Ecoute du panier


document.querySelector('#addToCart').addEventListener('click', function () {





    // Récupération des options du produits : 

    let optionProduct = {
        name: canapData.name,
        id: canapId,
        color: document.getElementById('colors').value,
        quantity: Number(document.getElementById('quantity').value),

    }

    // Aucun produit n'est sélectionné

    if (Number(optionProduct.quantity) <= 0 || (optionProduct.quantity) > 100 || (optionProduct.color) == '') {
        alert('Veuillez choisir une couleur et une quantité comprise en 1 et 100');
        return
    }

    // Confirmation d'ajout au panier 

    const popupConfirmation = () => {
        if (window.confirm(`${optionProduct.quantity} ${optionProduct.name} ${optionProduct.color} a été ajouté à votre panier :
OK pour consulter votre panier, ANNULER pour continuer vos achats`)) {
            window.location.href = 'cart.html';

        } else {
            window.location.href = 'index.html';

        }
    };

    let notEmpty = JSON.parse(localStorage.getItem("product"));


    // Produit(s) présent(s) dans le localstorage

    if (notEmpty) {

        let sameId = notEmpty.find(p => p.id == optionProduct.id && p.color == optionProduct.color);
        if (sameId != undefined) {
            sameId.quantity = Number(optionProduct.quantity += sameId.quantity);



        } else {

            notEmpty.push(optionProduct);

        }
        localStorage.setItem("product", JSON.stringify(notEmpty));

        popupConfirmation();



    }


    // Pas de produit(s) dans le local storage 

    else {
        notEmpty = [];
        notEmpty.push(optionProduct);
        localStorage.setItem("product", JSON.stringify(notEmpty));
        popupConfirmation();
    }


}
)



