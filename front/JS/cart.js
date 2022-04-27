


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

            idColor = lsId.color
            idQuantity = lsId.quantity
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
        cartArticle.setAttribute('data-id', id._id);
        cartArticle.setAttribute('data-color', id.colors);


        // IMG

        let divCartImg = document.createElement("div");
        cartArticle.appendChild(divCartImg);
        divCartImg.className = "cart__item__content";
        let cartImg = document.createElement("img");
        divCartImg.appendChild(cartImg);
        cartImg.src = id.imageUrl;
        cartImg.alt = id.altTxt;

        // Description Bloc 

        let divItemContent = document.createElement("div");
        divItemContent.className = 'cart__item__content';
        cartArticle.appendChild(divItemContent);
        let divItemDescription = document.createElement('div');
        divItemContent.appendChild(divItemDescription);
        divItemDescription.className = 'cart__item__content__description';

        // Description content : Title

        let productName = document.createElement("h2");
        productName.textContent = id.name;
        divItemDescription.appendChild(productName);

        // Description content : color

        let productColor = document.createElement('p');
        productColor.textContent = idColor;
        divItemDescription.appendChild(productColor);

        // Description content : price 

        let productPrice = document.createElement('p');
        productPrice.textContent = id.price + ' ' + '€';
        divItemDescription.appendChild(productPrice);

        // Settings bloc 

        let settingsBloc = document.createElement('div');
        settingsBloc.className = 'cart__item__content__settings';
        divItemContent.appendChild(settingsBloc);
        let settingsQuantity = document.createElement('div');
        settingsQuantity.className = 'cart__item__content__settings__quantity';
        settingsBloc.appendChild(settingsQuantity);

        let quantityTxt = document.createElement('p');
        quantityTxt.textContent = 'Qte : ';
        settingsQuantity.appendChild(quantityTxt);
        let inputQuantity = document.createElement('input');
        inputQuantity.setAttribute("type", "number");
        inputQuantity.setAttribute("name", "itemQuantity");
        inputQuantity.setAttribute("min", 1);
        inputQuantity.setAttribute("max", 100);
        inputQuantity.setAttribute("value", idQuantity);
        inputQuantity.classname = 'itemQuantity';
        settingsQuantity.appendChild(inputQuantity);

    }
}







// Afficher les produits présents dans le panier 



