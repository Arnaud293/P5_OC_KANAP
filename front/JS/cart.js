


let canapData = [];

//  Récupérer les données du local storage

let itemInCart = JSON.parse(localStorage.getItem("product"));
console.table(itemInCart);


//  Récupérer les donnée des canapés hors lS 

let newArray;

const getCanapData = async (newArray = []) => {

    const res = await fetch(`http://localhost:3000/api/products`);
    canapData = await res.json();


    // Revoir cette fonction et bien la comprendre !


    for (id of canapData) {
        if (itemInCart.some(lsId => {
            return lsId.id === id._id
        })) {
            newArray.push(id);
        }
    }



}
getCanapData();
console.log(newArray)



// Si le panier est vide

if (!itemInCart) {
    document.getElementById('cart__items').insertAdjacentHTML('beforeend', `<p>Votre panier est vide.</p>`);
    document.getElementById('cart__items').style.textAlign = "center";

}

//  Sinon afficher l'article, + autant d'article que d'éléments dans le LS

else {

    for (let p = 0; p < itemInCart.length; p++) {


        let cartArticle = document.createElement("article");
        document.getElementById('cart__items').appendChild(cartArticle);
        cartArticle.className = "cart__item";
        cartArticle.setAttribute('data-id', itemInCart[p].id);
        cartArticle.setAttribute('data-color', itemInCart[p].color);


        // IMG

        let divCartImg = document.createElement("div");
        cartArticle.appendChild(divCartImg);
        divCartImg.className = "cart__item__content";
        let cartImg = document.createElement("img");
        divCartImg.appendChild(cartImg);








    }

}






// Afficher les produits présents dans le panier 



