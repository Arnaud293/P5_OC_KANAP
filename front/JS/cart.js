//  Récupérer les données du local storage

let notEmpty = JSON.parse(localStorage.getItem("product"));
console.log(notEmpty);

// Afficher les produits présents dans le panier 

const displayCart = () => {

    for (let product in notEmpty) {
        let cartArticle = document.createElement("article");
        document.getElementById('cart__items').appendChild(cartArticle);
        cartArticle.className = "cart__item";


    }
}

displayCart()