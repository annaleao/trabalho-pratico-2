function createResponseDetails(product) {
    return `
    <div class="col-md-7">
    <div class="conteudo-container">
      <p class="ratings">${displayRating(product.rating.rate)}</p>
      <h1 class="title">${product.title}</h1>
      <p class="stock">Estação: ${product.season}</p>
      <ul class="lista-sem-estilo">
    
    `;
  }

  //I'm hosted with GitHub Pages.
  
  window.addEventListener('DOMContentLoaded', (event) => {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');
  
    fetch(`https://diwserver.vps.webdock.cloud/products/${productId}`)
      .then(response => response.json())
      .then(data => {
        document.getElementById('product-name').textContent = data.title;
        document.getElementById('product-image').src = data.image;
  
        const productDescriptionElement = document.getElementById('product-description');
        productDescriptionElement.innerHTML = `
          <p style="text-align: justify;">
            <strong>Composition:</strong><br />
            ${data.description}
          </p>
        `;
  
        document.getElementById('product-price').textContent = `Preço: R$ ${data.price}`;
      })
      .catch(error => console.log(error));
  });
  // Busca os id na url
  function getProductId() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('id');
  }
  
  // Busca os dados do produto
  async function fetchProducts() {
    try {
      const productId = getProductId();
      const url = `http://diwserver.vps.webdock.cloud:8765/products/${productId}`;
      const response = await fetch(url);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
    }
  }
  
  function displayRating(rate) {
    const roundedRate = Math.round(rate);
    let stars = "";
    for (let i = 0; i < roundedRate; i++) {
      stars += "★";
    }
    for (let j = roundedRate; j < 5; j++) {
      stars += "☆";
    }
    return stars;
  }
  
  async function renderPage() {
    const product = await fetchProducts();
    const productDetails = createResponseDetails(product);
    const productDetailsContainer = document.querySelector('#response-details');
    productDetailsContainer.innerHTML = productDetails;
  }
  
  renderPage();

