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
      linha.appendChild(casa);
    }
    tabuleiro_interno.appendChild(linha);
  }
  tabuleiro.appendChild(tabuleiro_interno);
  renderizaPecasTabuleiro();
}

function renderizaPecasTabuleiro() {
  const linhas = document.querySelectorAll(".linha");
  for (let countLinhas = 0; countLinhas < 3; countLinhas++) {
    const casaspretas = linhas[countLinhas].querySelectorAll(".casapreta");
    for (let countCasas = 0; countCasas < casaspretas.length; countCasas++) {
      const peca = document.createElement("div");
      peca.classList.add("peca_branca");
      casaspretas[countCasas].appendChild(peca);
    }
  }
  for (let countLinhas = 5; countLinhas < 8; countLinhas++) {
    const casaspretas = linhas[countLinhas].querySelectorAll(".casapreta");
    for (let countCasas = 0; countCasas < casaspretas.length; countCasas++) {
      const peca = document.createElement("div");
      peca.classList.add("peca_marrom");
      casaspretas[countCasas].appendChild(peca);
    }
  }
}

let peca_branca = document.querySelector(".tabuleiro_interno");
function display(event) {
  if (event.target.classList.contains("peca_branca")) {
    alert("Eu sou uma peça branca");
  }
  if (event.target.classList.contains("peca_marrom")) {
    alert("Eu sou uma peça marrom");
  }
  console.log(event.target.classList);
}

function alertaPecaBranca() {
  const pecaBranca = document.querySelectorAll(".peca_branca");
  for (let i = 0; i < pecaBranca.length; i++) {
    pecaBranca[i].addEventListener("click", () =>
      alert("Eu sou uma peça branca")
    );
  }
}

function alertaPecaMarrom() {
  const pecaMarrom = document.querySelectorAll(".peca_marrom");
  for (let i = 0; i < pecaMarrom.length; i++) {
    pecaMarrom[i].addEventListener("click", () =>
      alert("Eu sou uma peça marrom")
    );
  }
}

function documentoCarregado() {
  const tabuleiro = document.querySelector(".tabuleiro_interno");
  const iconHelp = document.querySelector(".icon-help");
  iconHelp.addEventListener("click", modalOnclick);
  iconHelp.addEventListener("keydown", modalOnclick);
  renderizaTabuleiroDom();
  alertaPecaBranca();
  alertaPecaMarrom();
}

function modalOnclick() {
  iniciarModal("modal-duvidas");
}

documentoCarregado();

/*
FEITO - Delegação de eventos, event bubbling (no DOM, refatora alerta peca branca).
FEITO - Fazer o ESC para fechar o modal (keyup, keydown).  
FEITO - Montar o tabuleiro. (apis p/ interagir com dom (appendChilld, innerHTML, createElement, createFragment... e estrutura de laços, colocar uma identificação na peça).
FEITO - Estudar JS Callback (ex de como usar/aplicar)
FEITO - Para aprofundar javascript callback.
BACKLOG - Criar um repositorio para seu código, subir seu código.
BACKLOG - Procurar documentação amigável começando com git.
BACKLOG - Armazenar estado de posicionamento na peça através de atributos HTML: data-linha="1", data-coluna="A".
BACKLOG - Ao clicar na peça, vc vai recuperar as informações do atribudo de data-linha e data-coluna e imprimi-los.
BACKLOG - No javascript existe uma api para criar atributos em elementos HTML, vc irá utiliza-lo para adicionar o valor do posicionamento ao renderizar o tabuleiro no DOM.



BACKLOG - Fontes de estudos: https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key
BACKLOG - https://developer.mozilla.org/en-US/docs/Web/API/Event/preventDefault
BACKLOG - https://developer.mozilla.org/en-US/docs/Web/API/Element/classList

const animal = {
    nome: 'Pluto', 
    cor: 'Preta',
    tamanho: '1.8m',
    pais: {
        pai: {
            nome: 'Joao',
            idade: 54,
        },
        mae: {
            nome: 'Maria',
            idade: 43,
        }
    }
}

console.log(animal.pais.mae.idade)

*/
