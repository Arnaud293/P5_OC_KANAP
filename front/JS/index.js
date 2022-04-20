const allproducts = document.getElementById('items');
const productscards = document.querySelector('article');



let canapData = []

// Récupérer les donnée des canapés

const getallproducts = async () => {
    const res = await fetch('http://localhost:3000/api/products')
    canapData = await res.json();
    console.log(canapData);


}
getallproducts();

// Afficher les canapés sur la page d'accueil

const allproductsdisplay = async () => {

    await getallproducts();

    allproducts.innerHTML = canapData.map((canap) =>


        `
        <a href="product.html?id=${canap._id}">
            <article>
                <img src="${canap.imageUrl}" alt="${canap.altTxt}">
                 <h3 class="productName">${canap.name}</h3>
                 <p class="productDescription">${canap.description}</p>
                 <p>${canap.price} <span id="price">
                  
                </span>€</p>
             </article>
                
                
        </a>
        `

    )
        .join("");
}
allproductsdisplay();

// Faire le lien entre page accueil et page produit 

