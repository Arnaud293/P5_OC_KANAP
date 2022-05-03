


let canapData = [];

//  Récupérer les données du local storage

let itemInCart = JSON.parse(localStorage.getItem("product"));
console.table(itemInCart);



//  Récupérer les données des canapés hors lS 

// let newArray;

const getCanapData = async () => {

    const res = await fetch(`http://localhost:3000/api/products`);
    canapData = await res.json();


    // Si l'id est le même dans canapData et le localStorage sinon appliquer la fonction pour afficher les éléments :

    // newArray = [];
    // for (id of canapData) {
    if (itemInCart.length === 0) {
        document.getElementById('cart__items').insertAdjacentHTML('beforeend', `<p>Votre panier est vide.</p>`);
        document.getElementById('cart__items').style.textAlign = "center";
        return
    }

    else {

        for (let i = 0; i < itemInCart.length; i++) {
            const canap = itemInCart[i];
            const realCanap = canapData.find(data => data._id === canap.id);
            displayBasket(canap, realCanap);



        }
    }

}
getCanapData()



const displayBasket = (id, realId) => {

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
        cartArticle.setAttribute('data-id', id.id);
        cartArticle.setAttribute('data-color', id.color);


        // IMG

        let divCartImg = document.createElement("div");
        cartArticle.appendChild(divCartImg);
        divCartImg.className = "cart__item__content";
        let cartImg = document.createElement("img");
        divCartImg.appendChild(cartImg);
        cartImg.src = realId.imageUrl;
        cartImg.alt = realId.altTxt;

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
        productColor.textContent = id.color;
        divItemDescription.appendChild(productColor);

        // Description content : price 

        let productPrice = document.createElement('p');
        productPrice.textContent = realId.price + ' ' + '€';
        divItemDescription.appendChild(productPrice);

        // Settings bloc 

        let settingsBloc = document.createElement('div');
        settingsBloc.className = 'cart__item__content__settings';
        divItemContent.appendChild(settingsBloc);
        let settingsQuantity = document.createElement('div');
        settingsQuantity.className = 'cart__item__content__settings__quantity';
        settingsBloc.appendChild(settingsQuantity);

        // Settings bloc : manage quantity (add)

        let quantityTxt = document.createElement('p');
        quantityTxt.textContent = 'Qte : ';
        settingsQuantity.appendChild(quantityTxt);
        let inputQuantity = document.createElement('input');
        inputQuantity.setAttribute("type", "number");
        inputQuantity.setAttribute("name", "itemQuantity");
        inputQuantity.setAttribute("min", 1);
        inputQuantity.setAttribute("max", 100);
        inputQuantity.setAttribute("value", id.quantity);
        inputQuantity.classname = 'itemQuantity';
        settingsQuantity.appendChild(inputQuantity);
        inputQuantity.addEventListener('change', function (q) {
            id.quantity = inputQuantity.value;
            // localStorage.setItem("product", JSON.stringify(itemInCart));
            console.log(itemInCart);

        })

        // Settings bloc : remove quantity

        let removeQuantity = document.createElement('div');
        removeQuantity.className = 'cart__item__content__settings__delete';
        settingsBloc.appendChild(removeQuantity);
        let removeQuantityButton = document.createElement('p');
        removeQuantityButton.className = 'deleteItem';
        removeQuantityButton.textContent = 'Supprimer';
        removeQuantityButton.setAttribute("id", `${id.id && id.color}`)
        removeQuantity.appendChild(removeQuantityButton);
        removeQuantityButton.addEventListener('click', function (e) {
            e.preventDefault();

            let idToRemove = id.id;
            let colorToRemove = id.color;
            console.log(idToRemove);
            console.log(colorToRemove)

            itemInCart = itemInCart.filter(element => element.id !== idToRemove || element.color !== colorToRemove);
            // localStorage.setItem("product", JSON.stringify(itemInCart));
            e.target.closest('.cart__item').remove();
            alert(`${id.quantity} ${id.name} ${id.color} à été retiré du panier !`);
            // document.location.reload();
            console.log(itemInCart)
        })




    }

    getTotals(realId)
}



async function getTotals(realId) {
    // Qte

    let productQte = itemInCart;
    let totalQte = 0
    console.log(realId)
    for (let product of productQte) {
        totalQte += product.quantity;

    }

    let totalQuantity = document.getElementById('totalQuantity');
    totalQuantity.textContent = totalQte
    console.log(totalQte);

    // Price
    let inputQte = document.getElementsByClassName('itemQuantity')
    let productPrices = realId;
    let totalPrce = 0;
    console.log(productPrices)



    for (let i = 0; i < inputQte.lenght; ++i) {

        totalPrce += itemInCart[i].quantity * realId.price;

    }
    console.log(productQte)

    let totalPrice = document.getElementById('totalPrice');
    totalPrice.textContent = totalPrce;
    console.log(totalPrce)
}


