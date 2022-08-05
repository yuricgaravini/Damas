//Criar estrutura de lista com base no loop (criar de forma automatica) POHAAAAA!!!! - Feito
//Movimentação olhando a lista - Feito
const pecas = [];
let casaSelecionadaId = null;
var vezJogador = "branca";

function iniciarModal(modalid) {
  const modal = document.getElementById(modalid);
  modal.classList.add("mostrar");
  modal.addEventListener("click", (e) => {
    if (e.target.id == modalid || e.target.className == "fechar")
      modal.classList.remove("mostrar");
  });
  document.addEventListener("keydown", function (e) {
    if (e.key == "Escape" || e.target.className == "fechar")
      modal.classList.remove("mostrar");
  });
}

function criarPecasTabuleiro() {
  let pecaId = 1;
  const linhas = document.querySelectorAll(".linha");
  for (let countLinhas = 0; countLinhas < 3; countLinhas++) {
    const casaspretas = linhas[countLinhas].querySelectorAll(".casapreta");
    for (let countCasas = 0; countCasas < casaspretas.length; countCasas++) {
      var coluna = parseInt(
        casaspretas[countCasas].getAttribute("data-coluna")
      );
      const objetoPeca = {
        id: pecaId,
        cor: "branca",
        posicao: {
          x: countLinhas + 1,
          y: coluna,
        },
        isDama: false,
      };
      pecas.push(objetoPeca);
      pecaId++;
    }
  }
  for (let countLinhas = 5; countLinhas < 8; countLinhas++) {
    const casaspretas = linhas[countLinhas].querySelectorAll(".casapreta");
    for (let countCasas = 0; countCasas < casaspretas.length; countCasas++) {
      var coluna = parseInt(
        casaspretas[countCasas].getAttribute("data-coluna")
      );
      const objetoPeca = {
        id: pecaId,
        cor: "marrom",
        posicao: {
          x: countLinhas + 1,
          y: coluna,
        },
        isDama: false,
      };
      pecas.push(objetoPeca);
      pecaId++;
    }
  }
}

function renderizaTabuleiroDom() {
  const tabuleiro = document.querySelector(".tabuleiro");
  const tabuleiro_interno = document.createElement("div");
  tabuleiro_interno.classList.add("tabuleiro_interno");
  for (let countLinhas = 0; countLinhas < 8; countLinhas++) {
    const linha = document.createElement("div");
    linha.classList.add("linha");
    let primeiracasa = "casabranca";
    if (countLinhas % 2 != 0) {
      primeiracasa = "casapreta";
    }
    //Controle da coluna
    for (let countColunas = 0; countColunas < 8; countColunas++) {
      let casacontraria = "casapreta";
      if (primeiracasa === "casapreta") {
        casacontraria = "casabranca";
      }
      const casa = document.createElement("div");
      if (countColunas % 2 == 0) {
        casa.classList.add(primeiracasa);
      } else {
        casa.classList.add(casacontraria);
      }
      casa.setAttribute("data-linha", countLinhas + 1);
      casa.setAttribute("data-coluna", countColunas + 1);
      casa.onclick = (event) => mover(event);
      linha.appendChild(casa);
    }
    tabuleiro_interno.appendChild(linha);
  }
  tabuleiro.appendChild(tabuleiro_interno);
  criarPecasTabuleiro();
  renderizaPecasTabuleiro();
}

function selecionarPeca(event) {
  const coluna = parseInt(
    event.target.parentElement.getAttribute("data-coluna")
  );
  const linha = parseInt(event.target.parentElement.getAttribute("data-linha"));
  pecas.forEach((peca) => {
    if (peca.posicao.x === linha && peca.posicao.y === coluna) {
      if (peca.cor === vezJogador) {
        casaSelecionadaId = peca.id;
        return;
      } else {
        alert("Aguarde seu adversário fazer a movimentação.");
        return;
      }
    }
  });
}

//Determinar de quem é a vez de jogar (alternando entre peca branca/marrom) - Feito
function mover(event) {
  const casaVazia = !event.currentTarget.firstChild;
  if (casaVazia && casaSelecionadaId) {
    pecas.forEach((peca) => {
      if (peca.id === casaSelecionadaId) {
        const linhaSelecionada = event.currentTarget.getAttribute("data-linha");
        const pecaMover = document.createElement("div");
        pecaMover.classList.add(
          peca.cor === "branca" ? "peca_branca" : "peca_marrom"
        );
        pecaMover.onclick = (e) => selecionarPeca(e);
        event.target.appendChild(pecaMover);
        var posicaoAntiga = document.querySelector(
          `[data-linha="${peca.posicao.x}"][data-coluna="${peca.posicao.y}"]`
        );
        posicaoAntiga.removeChild(posicaoAntiga.firstElementChild);
        peca.posicao.x = parseInt(event.target.getAttribute("data-linha"));
        peca.posicao.y = parseInt(event.target.getAttribute("data-coluna"));
        casaSelecionadaId = null;
        if (vezJogador === "branca") {
          vezJogador = "marrom";
        } else {
          vezJogador = "branca";
        }
        return;
      }
    });
  }
}
//Destacar de qual jogador é a vez(mudança na peça, apoio de texto, etc)
//Dica para onde ele pode movimentar
//Fazer movimento correto da pecas
function renderizaPecasTabuleiro() {
  pecas.forEach((peca) => {
    const casa = document.querySelector(
      `[data-linha="${peca.posicao.x}"][data-coluna="${peca.posicao.y}"]`
    );
    const pecaClasse = peca.cor === "branca" ? "peca_branca" : "peca_marrom";
    const pecaContainer = document.createElement("div");
    pecaContainer.classList.add(pecaClasse);
    pecaContainer.onclick = (e) => selecionarPeca(e);
    casa.appendChild(pecaContainer);
  });
}

function documentoCarregado() {
  const iconHelp = document.querySelector(".icon-help");
  iconHelp.addEventListener("click", modalOnclick);
  iconHelp.addEventListener("keydown", modalOnclick);
  renderizaTabuleiroDom();
}

function modalOnclick() {
  iniciarModal("modal-duvidas");
}
documentoCarregado();
