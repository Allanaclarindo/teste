let produtos = [];
let carrinho = [];
let produtoSelecionado = null;

const lista = document.getElementById('lista-produtos');

/* VISUALIZAR IMAGEM */
function verImagem(src) {
  window.open(src, "_blank");
}

/* CARREGAR PRODUTOS */
fetch('produtos.json')
  .then(response => response.json())
  .then(data => {
    produtos = data;
    renderizarProdutos();
  });

/* RENDERIZAR PRODUTOS — UMA IMAGEM */
function renderizarProdutos() {
  lista.innerHTML = '';

  produtos.forEach((p, index) => {
    lista.innerHTML += `
      <div class="produto">
        <img src="${p.imagem}" alt="${p.nome}" onclick="verImagem('${p.imagem}')">
        <h3>${p.nome}</h3>
        <p>${p.preco}</p>
        <button onclick="abrirModal(${index})">Comprar</button>
      </div>
    `;
  });
}

/* MODAL */
function abrirModal(index) {
  produtoSelecionado = produtos[index];
  document.getElementById("modal").style.display = "flex";
  document.getElementById("modal-nome").innerText = produtoSelecionado.nome;

  document.getElementById("cor").innerHTML =
    produtoSelecionado.cores.split(",").map(c => `<option>${c.trim()}</option>`).join("");

  document.getElementById("tamanho").innerHTML =
    produtoSelecionado.tamanhos.split(",").map(t => `<option>${t.trim()}</option>`).join("");
}

function fecharModal() {
  document.getElementById("modal").style.display = "none";
}

/* CARRINHO */
function adicionarCarrinho() {
  carrinho.push({
    nome: produtoSelecionado.nome,
    preco: produtoSelecionado.preco,
    valor: parseFloat(produtoSelecionado.preco.replace("R$", "").replace(",", ".")),
    cor: document.getElementById("cor").value,
    tamanho: document.getElementById("tamanho").value
  });

  document.getElementById("contador-carrinho").innerText = carrinho.length;
  fecharModal();
}

/* EXPOR FUNÇÕES */
/* ===== CARRINHO ===== */
function abrirCarrinho() {
  const listaCarrinho = document.getElementById("lista-carrinho");
  listaCarrinho.innerHTML = "";

  if (carrinho.length === 0) {
    listaCarrinho.innerHTML = "<p>Seu carrinho está vazio</p>";
  } else {
    carrinho.forEach((item, index) => {
      listaCarrinho.innerHTML += `
        <p>
          <strong>${item.nome}</strong><br>
          Cor: ${item.cor} | Tamanho: ${item.tamanho}<br>
          Preço: ${item.preco}<br>
          <button onclick="removerItem(${index})">❌ Remover</button>
        </p>
        <hr>
      `;
    });
  }

  atualizarTotal();
  document.getElementById("modal-carrinho").style.display = "flex";
}

function fecharCarrinho() {
  document.getElementById("modal-carrinho").style.display = "none";
}

function removerItem(index) {
  carrinho.splice(index, 1);
  document.getElementById("contador-carrinho").innerText = carrinho.length;
  abrirCarrinho();
}

function atualizarTotal() {
  let total = carrinho.reduce((soma, item) => soma + item.valor, 0);

  const entregaSelecionada = document.querySelector('input[name="recebimento"]:checked');
  if (entregaSelecionada && entregaSelecionada.value === "entrega") {
    total += 10;
  }

  document.getElementById("total-final").innerText = total.toFixed(2);
}

function finalizarWhatsApp() {
  if (carrinho.length === 0) {
    alert("Seu carrinho está vazio");
    return;
  }

  let mensagem = "🛍️ Pedido Bella Flor:%0A%0A";
  let total = carrinho.reduce((soma, item) => soma + item.valor, 0);

  carrinho.forEach((item, i) => {
    mensagem += `${i + 1}. ${item.nome}%0A`;
    mensagem += `Cor: ${item.cor}%0A`;
    mensagem += `Tamanho: ${item.tamanho}%0A`;
    mensagem += `Preço: ${item.preco}%0A%0A`;
  });

  const entregaSelecionada = document.querySelector('input[name="recebimento"]:checked');
  if (entregaSelecionada && entregaSelecionada.value === "entrega") {
    mensagem += "🚚 Entrega: R$ 10,00%0A";
    total += 10;
  } else {
    mensagem += "📦 Retirada no local%0A";
  }

  mensagem += `%0A💰 Total: R$ ${total.toFixed(2)}`;

  window.open("https://wa.me/5591985144347?text=" + mensagem, "_blank");
}

/* ===== EXPOR FUNÇÕES ===== */
window.abrirModal = abrirModal;
window.fecharModal = fecharModal;
window.adicionarCarrinho = adicionarCarrinho;
window.abrirCarrinho = abrirCarrinho;
window.fecharCarrinho = fecharCarrinho;
window.removerItem = removerItem;
window.atualizarTotal = atualizarTotal;
window.finalizarWhatsApp = finalizarWhatsApp;
