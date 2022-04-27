async function getproductbyID() {
    const res = await fetch(`http://localhost:3000/api/products`);
    canapData = await res.json();


    console.log(canapData);

    let itemInCart = JSON.parse(localStorage.getItem("product"));
    console.table(itemInCart);
    for (let product of itemInCart) {
        console.log(product);
        if (canapData.find(p => p._id === product.id)) {

            displayCart(p);

        }
    }
}
getproductbyID();


// Afficher les produits présents dans le panier

const displayCart = (p) => {

    let cartArticle = document.createElement("article");
    document.getElementById('cart__items').appendChild(cartArticle);
    cartArticle.className = "cart__item";
    cartArticle.setAttribute('data-id', p);


    // IMG

    let divCartImg = document.createElement("div");
    cartArticle.appendChild(divCartImg);
    divCartImg.className = "cart__item__content";
    let cartImg = document.createElement("img");
    divCartImg.appendChild(cartImg);





}
