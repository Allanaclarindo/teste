let carrinho = [];
let produtoSelecionado = null;
fetch('produtos.json')
  
  .then(response => {
    if (!response.ok) {
      throw new Error('Erro ao carregar produtos.json');
    }
    return response.json();
  })
  .then(produtos => {
    const lista = document.getElementById('lista-produtos');
    lista.innerHTML = '';

    if (produtos.length === 0) {
      lista.innerHTML = '<p>Nenhum produto cadastrado.</p>';
      return;
    }

    produtos.forEach(p => {
      lista.innerHTML += `
        <div class="produto">
          <img src="${p.imagem}" alt="${p.nome}">
          <h3>${p.nome}</h3>
          <p>${p.preco}</p>
          <p><strong>Cores:</strong> ${p.cores}</p>
          <p><strong>Tamanhos:</strong> ${p.tamanhos}</p>
        </div>
      `;
    });
  })
  .catch(error => {
    function abrirModal(produto) {
  produtoSelecionado = produto;

  document.getElementById("modal").style.display = "flex";
  document.getElementById("modal-nome").innerText = produto.nome;

  const cores = produto.cores.split(",");
  const tamanhos = produto.tamanhos.split(",");

  document.getElementById("cor").innerHTML =
    cores.map(c => `<option>${c.trim()}</option>`).join("");

  document.getElementById("tamanho").innerHTML =
    tamanhos.map(t => `<option>${t.trim()}</option>`).join("");
}

function fecharModal() {
  document.getElementById("modal").style.display = "none";
}

function adicionarCarrinho() {
  const cor = document.getElementById("cor").value;
  const tamanho = document.getElementById("tamanho").value;

  carrinho.push({
    nome: produtoSelecionado.nome,
    preco: produtoSelecionado.preco,
    cor,
    tamanho
  });

  document.getElementById("contador-carrinho").innerText = carrinho.length;
  fecharModal();
}
    console.error(error);
    document.getElementById('lista-produtos').innerHTML =
      '<p>Erro ao carregar o catálogo.</p>';
  });
