fetch('produtos.json')
  .then(response => response.json())
  .then(produtos => {
    const lista = document.getElementById('lista-produtos');

    produtos.forEach(p => {
      lista.innerHTML += `
        <div class="produto">
          <img src="${p.imagem}">
          <h3>${p.nome}</h3>
          <p>${p.preco}</p>
          <a class="btn-whatsapp" href="https://wa.me/5591985144347" target="_blank">
            Comprar
          </a>
        </div>
      `;
    });
  });
