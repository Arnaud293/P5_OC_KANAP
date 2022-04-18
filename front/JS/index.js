const allproducts = document.getElementById('items');
const productscards = document.querySelector('article');

let canapData = []

// Récupérer les donnée des canapés

const getallproducts = async () => {
    await fetch('http://localhost:3000/api/products')
        .then((res) => res.json())
        .then((data) => canapData = data);

    console.log(canapData);
    allproductsdisplay()

}
getallproducts();

// Afficher les canapés sur la page d'accueil

const allproductsdisplay = () => {

    allproducts.innerHTML = canapData.map((canap) =>


        `
        <a href="product.html">
            <article>
                <img src="${canap.imageUrl}" alt="${canap.altTxt}">
                 <h3 class="productName">${canap.name}</h3>
                 <p class="productDescription">${canap.description}</p>
             </article>
                
                
        </a>
        `

    )
        .join("");
}
allproductsdisplay();