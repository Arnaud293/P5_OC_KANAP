


let canapData = [];

//  Récupérer les données du local storage

let itemInCart = JSON.parse(localStorage.getItem("product"));
console.table(itemInCart);



//  Récupérer les données des canapés hors lS 

const getCanapData = async () => {

    const res = await fetch(`http://localhost:3000/api/products`);
    canapData = await res.json();


    // Si l'id est le même dans canapData et le localStorage sinon appliquer la fonction pour afficher les éléments :


    if (itemInCart.length === 0) {
        document.getElementById('cart__items').insertAdjacentHTML('beforeend', `<p>Votre panier est vide.</p>`);
        document.getElementById('cart__items').style.textAlign = "center";
        return
    }

    else {
        let totalPrice = 0;
        for (let i = 0; i < itemInCart.length; i++) {
            const canap = itemInCart[i];
            const realCanap = canapData.find(data => data._id === canap.id);

            // + calcul du prix total directement à chaque boucle.

            totalPrice += itemInCart[i].quantity * realCanap.price;
            let totalPriceElement = document.getElementById('totalPrice');
            totalPriceElement.textContent = totalPrice;
            console.log(totalPrice)

            displayBasket(canap, realCanap);



        }
        // Calcul prix

    }

}
getCanapData()


// Afficher le tableau récapitulatif des achats 

const displayBasket = (id, realId) => {


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
        if (id.quantity <= 0 || id.quantity > 100) {
            return alert('Veuillez choisir une quantité comprise entre 1 et 100')
        }
        {
            localStorage.setItem("product", JSON.stringify(itemInCart));
            location.reload();

            console.log(itemInCart);
        }


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
        localStorage.setItem("product", JSON.stringify(itemInCart));
        e.target.closest('.cart__item').remove();
        alert(`${id.quantity} ${id.name} ${id.color} à été retiré du panier !`);
        location.reload();
        console.log(itemInCart)
    })



    getTotals()
}



async function getTotals() {
    // Qte

    let productQte = itemInCart;
    let totalQte = 0

    for (let product of productQte) {
        totalQte += Number(product.quantity);

    }

    let totalQuantity = document.getElementById('totalQuantity');
    totalQuantity.textContent = totalQte
    console.log(totalQte);
}

// Création des expressions régulières => RegExp

let emailReg = new RegExp('^[a-zA-Z0-9._-]+[@]{1}[a-zA-Z0-9._-]+[.]{1}[a-z]{2,10}$');
let textRegExp = new RegExp("^[a-zA-Z-àâäéèêëïîôöùûüç ,.'-]+$");
let addressRegExp = new RegExp("^[0-9]{1,3}(?:(?:[,. ]){1}[-a-zA-Zàâäéèêëïîôöùûüç]+)+");

// Validation du formulaire  

function getForm() {

    const form = document.querySelector('.cart__order__form');





    //  Ecoute Prénom

    form.firstName.addEventListener('change', function () {
        validFirstName(this);
    })

    // Validation prénom 

    const validFirstName = function (inputFirstName) {
        let firstNameErrorMsg = inputFirstName.nextElementSibling;


        if (textRegExp.test(inputFirstName.value)) {
            firstNameErrorMsg.innerHTML = '';
        }
        else {
            firstNameErrorMsg.innerHTML = 'Merci de renseigner votre prénom';
        }

    };

    // Ecoute du nom 

    form.lastName.addEventListener('change', function () {
        validLastName(this)
    })

    // Validation nom

    const validLastName = function (inputLastName) {
        let lastNameErrorMsg = inputLastName.nextElementSibling;

        if (textRegExp.test(inputLastName.value)) {
            lastNameErrorMsg.innerHTML = '';
        }
        else {
            lastNameErrorMsg.innerHTML = 'Merci de renseigner votre nom';
        }
    }

    // Ecoute de l'adresse 

    form.address.addEventListener('change', function () {
        validAddress(this);

    })

    // Validation adresse 

    const validAddress = function (inputAddress) {
        let addressErrorMsg = inputAddress.nextElementSibling;

        if (addressRegExp.test(inputAddress.value)) {
            addressErrorMsg.innerHTML = '';
        }
        else {
            addressErrorMsg.innerHTML = 'Merci de renseigner votre adresse'
        }
    }

    //  Ecoute de la ville 

    form.city.addEventListener('change', function () {
        validCity(this);
    })

    // Validation ville 

    const validCity = function (inputCity) {
        let cityErrorMsg = inputCity.nextElementSibling;

        if (textRegExp.test(inputCity.value)) {
            cityErrorMsg.innerHTML = '';
        }
        else {
            cityErrorMsg.innerHTML = 'Merci de renseigner une ville'
        }
    }

    // Ecoute de l'adresse mail 

    form.email.addEventListener('change', function () {
        validEmail(this);
    })

    // Validation email

    const validEmail = function (inputEmail) {
        let emailErrorMsg = inputEmail.nextElementSibling;

        if (emailReg.test(inputEmail.value)) {
            emailErrorMsg.innerHTML = '';
        }
        else {
            emailErrorMsg.innerHTML = 'Merci de renseigner votre email'
        }
    }
} getForm();

//  Requête POST :

function postForm() {
    const btnCommand = document.getElementById('order');



    //  Récupération des inputs

    let inputFirstName = document.getElementById('firstName');
    let inputLastName = document.getElementById('lastName');
    let inputAddress = document.getElementById('address');
    let inputCity = document.getElementById('city');
    let inputEmail = document.getElementById('email');

    // Creation de l'événement au click 

    btnCommand.addEventListener('click', function (e) {
        // e.preventDefault();
        if (
            !inputFirstName.value ||
            !inputLastName.value ||
            !inputCity.value ||
            !inputAddress.value ||
            !inputEmail.value
        ) {
            alert("Vous devez renseigner tous les champs !");
            e.preventDefault();
        }

        else if (
            !textRegExp.test(firstName.value) ||
            !textRegExp.test(lastName.value) ||
            !textRegExp.test(city.value) ||
            !addressRegExp.test(address.value) ||
            !emailReg.test(email.value)
        ) {
            alert('Merci de renseigner correctement tous les champs')
        }

        else {


            // Créer un tableau pour passer les infos

            let productsId = [];
            for (let p = 0; p < itemInCart.lenght; p++) {
                productsId.push(itemInCart[i].id)
            }
            console.log(productsId);

            const order = {
                contact: {
                    firstName: inputFirstName.value,
                    lastName: inputLastName.value,
                    address: inputAddress.value,
                    city: inputCity.value,
                    email: inputEmail.value,
                },

                products: productsId
            }

            let options = {
                method: 'POST',
                body: JSON.stringify(order),
                headers: {
                    "Content-Type": "application/json",
                }
            };

            fetch('http://localhost:3000/api/products/order', options)
                .then((res) => res.json())
                .then((data) => {
                    console.log(data);
                    localStorage.clear();
                    // localStorage.setItem('orderId', data.orderId);

                    document.location.href = 'confirmation.html?orderId=' + data.orderId
                })
                .catch((err) => {
                    alert('Issue with fetch' + err.message);
                });
        }

    })
}
postForm();