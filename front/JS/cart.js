


let canapData = [];

//  Récupérer les données du local storage

let itemInCart = JSON.parse(localStorage.getItem("product"));
console.table(itemInCart);



//  Récupérer les donnée des canapés hors lS 

let newArray;

const getCanapData = async () => {

    const res = await fetch(`http://localhost:3000/api/products`);
    canapData = await res.json();


    // Si l'id est le même dans canapData et le localStorage

    newArray = [];
    for (id of canapData) {
        if (!itemInCart) {
            document.getElementById('cart__items').insertAdjacentHTML('beforeend', `<p>Votre panier est vide.</p>`);
            document.getElementById('cart__items').style.textAlign = "center";
            return
        }
        else if (itemInCart.some(lsId => {

            return lsId.id === id._id


        })) {
            newArray.push(id);
            console.table(id);
            displayBasket()
        }
    }

}
getCanapData()


// Si le panier est vide
const displayBasket = () => {

    if (!itemInCart) {
        document.getElementById('cart__items').insertAdjacentHTML('beforeend', `<p>Votre panier est vide.</p>`);
        document.getElementById('cart__items').style.textAlign = "center";
        return
    }

    //  Sinon afficher l'article, + autant d'article que d'éléments dans le LS

    else {

        let cartArticle = document.createElement("article");
        document.getElementById('cart__items').appendChild(cartArticle);
        cartArticle.className = "cart__item";
        cartArticle.setAttribute('data-id', itemInCart.id);
        cartArticle.setAttribute('data-color', itemInCart.color);


        // IMG

        let divCartImg = document.createElement("div");
        cartArticle.appendChild(divCartImg);
        divCartImg.className = "cart__item__content";
        let cartImg = document.createElement("img");
        divCartImg.appendChild(cartImg);
        cartImg.src = id.imageUrl;
        cartImg.alt = id.altTxt;

    }
}







// Afficher les produits présents dans le panier 



