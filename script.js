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
  if (event.target.classList.contains("peca_branca")) {
    alert(`Eu sou uma peça branca. \nColuna: ${coluna} \nLinha: ${linha}`);
  }
  if (event.target.classList.contains("peca_marrom")) {
    alert(`Eu sou uma peça marrom. \nColuna: ${coluna} \nLinha: ${linha}`);
  }
}

function renderizaPecasTabuleiro() {
  const linhas = document.querySelectorAll(".linha");
  for (let countLinhas = 0; countLinhas < 3; countLinhas++) {
    const casaspretas = linhas[countLinhas].querySelectorAll(".casapreta");
    for (let countCasas = 0; countCasas < casaspretas.length; countCasas++) {
      const peca = document.createElement("div");
      peca.classList.add("peca_branca");
      peca.onclick = (e) => display(e);
      casaspretas[countCasas].appendChild(peca);
    }
  }
  for (let countLinhas = 5; countLinhas < 8; countLinhas++) {
    const casaspretas = linhas[countLinhas].querySelectorAll(".casapreta");
    for (let countCasas = 0; countCasas < casaspretas.length; countCasas++) {
      const peca = document.createElement("div");
      peca.classList.add("peca_marrom");
      peca.onclick = (e) => display(e);
      casaspretas[countCasas].appendChild(peca);
    }
  }
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
