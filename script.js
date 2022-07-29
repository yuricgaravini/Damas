const pecas = [
  {
    id: 1,
    cor: "branca",
    posicao: {
      x: 1,
      y: 2,
    },
    isDama: false,
  },
  {
    id: 2,
    cor: "branca",
    posicao: {
      x: 1,
      y: 4,
    },
    isDama: false,
  },
  {
    id: 3,
    cor: "branca",
    posicao: {
      x: 1,
      y: 6,
    },
    isDama: false,
  },
  {
    id: 4,
    cor: "branca",
    posicao: {
      x: 1,
      y: 8,
    },
    isDama: false,
  },
  {
    id: 5,
    cor: "branca",
    posicao: {
      x: 2,
      y: 1,
    },
    isDama: false,
  },
  {
    id: 6,
    cor: "branca",
    posicao: {
      x: 2,
      y: 3,
    },
    isDama: false,
  },
  {
    id: 7,
    cor: "branca",
    posicao: {
      x: 2,
      y: 5,
    },
    isDama: false,
  },
  {
    id: 8,
    cor: "branca",
    posicao: {
      x: 2,
      y: 7,
    },
    isDama: false,
  },
  {
    id: 9,
    cor: "branca",
    posicao: {
      x: 3,
      y: 2,
    },
    isDama: false,
  },
  {
    id: 10,
    cor: "branca",
    posicao: {
      x: 3,
      y: 4,
    },
    isDama: false,
  },
  {
    id: 11,
    cor: "branca",
    posicao: {
      x: 3,
      y: 6,
    },
    isDama: false,
  },
  {
    id: 12,
    cor: "branca",
    posicao: {
      x: 3,
      y: 8,
    },
    isDama: false,
  },
  {
    id: 13,
    cor: "marrom",
    posicao: {
      x: 6,
      y: 1,
    },
    isDama: false,
  },
  {
    id: 14,
    cor: "marrom",
    posicao: {
      x: 6,
      y: 3,
    },
    isDama: false,
  },
  {
    id: 15,
    cor: "marrom",
    posicao: {
      x: 6,
      y: 5,
    },
    isDama: false,
  },
  {
    id: 16,
    cor: "marrom",
    posicao: {
      x: 6,
      y: 7,
    },
    isDama: false,
  },
  {
    id: 17,
    cor: "marrom",
    posicao: {
      x: 7,
      y: 2,
    },
    isDama: false,
  },
  {
    id: 18,
    cor: "marrom",
    posicao: {
      x: 7,
      y: 4,
    },
    isDama: false,
  },
  {
    id: 19,
    cor: "marrom",
    posicao: {
      x: 7,
      y: 6,
    },
    isDama: false,
  },
  {
    id: 20,
    cor: "marrom",
    posicao: {
      x: 7,
      y: 8,
    },
    isDama: false,
  },
  {
    id: 21,
    cor: "marrom",
    posicao: {
      x: 8,
      y: 1,
    },
    isDama: false,
  },
  {
    id: 22,
    cor: "marrom",
    posicao: {
      x: 8,
      y: 3,
    },
    isDama: false,
  },
  {
    id: 23,
    cor: "marrom",
    posicao: {
      x: 8,
      y: 5,
    },
    isDama: false,
  },
  {
    id: 24,
    cor: "marrom",
    posicao: {
      x: 8,
      y: 7,
    },
    isDama: false,
  },
];

let colunaSelecionada = 0;
let linhaSelecionada = 0;
let casaSelecionada = "";

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
  renderizaPecasTabuleiro();
}

function display(event) {
  const coluna = event.target.parentElement.getAttribute("data-coluna");
  const linha = event.target.parentElement.getAttribute("data-linha");
  linhaSelecionada = linha;
  colunaSelecionada = coluna;
  casaSelecionada = event.target.classList.value.trim();
}

function mover(event) {
  const casaVazia = !event.currentTarget.firstChild;
  console.log(linhaSelecionada, colunaSelecionada);
  if (casaVazia && linhaSelecionada > 0 && colunaSelecionada > 0) {
    const peca = document.createElement("div");
    peca.classList.add(casaSelecionada);
    peca.onclick = (e) => display(e);
    event.target.appendChild(peca);
    var posicaoAntiga = document.querySelector(
      `[data-coluna="${colunaSelecionada}"][data-linha="${linhaSelecionada}"]`
    );
    console.log(posicaoAntiga);
    posicaoAntiga.removeChild(posicaoAntiga.firstElementChild);
    colunaSelecionada = 0;
    linhaSelecionada = 0;
    casaSelecionada = "";
  }
}

function renderizaPecasTabuleiro() {
  pecas.forEach((pecas) => {
    const casa = document.querySelector(
      `[data-linha="${pecas.posicao.x}"][data-coluna="${pecas.posicao.y}"]`
    );
    const pecaClasse = pecas.cor === "branca" ? "peca_branca" : "peca_marrom";
    const pecaContainer = document.createElement("div");
    pecaContainer.classList.add(pecaClasse);
    pecaContainer.onclick = (e) => display(e);
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
