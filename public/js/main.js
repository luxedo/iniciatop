let arrayDeJogadores = []
$(document).ready (() => {
  $(".player-input").keyup((e) => {
    if (e.keyCode == 13) adicionarJogador();
  });
  $(".player-input").focus();
  $(document).click((e) => {
    if ($(".edit-div").is(":visible")) {
      $(".edit-div:visible").each((index, element) => {
      });
    }
  });


  if (typeof(Storage) !== undefined) {
    let jogadores = pegarJogadores();
    for (let i=0; i<jogadores.length; i++) {
      let jogador = jogadores[i];
      colocarJogadorNoDOM(jogador.classe, jogador.nome, jogador.numero)
    }
    ordenarJogadores();
  }
});

function pegarJogadores() {
  try {
    jogadores = JSON.parse(localStorage.getItem("jogadores"));
  } catch(e) {

  } finally {
    if (jogadores === null) {
      jogadores = [];
      localStorage.setItem("jogadores", JSON.stringify([]));
    }
  }
  return jogadores
}

function adicionarJogador() {
  let nome = $(".player-input").val();
  if (nome != "") {
    let jogadorClasse;
    let count = 0;
    while (jogadorClasse === undefined) {
      if ($(`.jogador-${count}`).length === 0) {
        jogadorClasse = `jogador-${count}`
      }
      count ++
    }
    arrayDeJogadores.push(jogadorClasse)
    $(".player-input").val
    let jogadores = pegarJogadores();
    jogadores.push({nome: nome, numero: 0, classe: jogadorClasse});
    if (Storage !== null) {
      localStorage.setItem("jogadores", JSON.stringify(jogadores));
    }
    colocarJogadorNoDOM(jogadorClasse, nome)
    $(".player-input").val("");
  }
}


function escolherNumero(jogadorClasse) {
  $(`.${jogadorClasse}-numero-edit`).toggle();
  $(`.${jogadorClasse}-numero-div`).toggle();
  $(`.${jogadorClasse}-numero-input`).focus();
  $(`.${jogadorClasse}-numero-input`).select();
}

function toggleNumero(jogadorClasse) {
  $(`.${jogadorClasse}-numero-edit`).toggle();
  $(`.${jogadorClasse}-numero-div`).toggle();
}

function aceitarNumero(jogadorClasse) {
  let novoNumero = $(`.${jogadorClasse}-numero-input`).val();
  if (novoNumero != "") {
    $(`.${jogadorClasse}-numero-texto`).text(novoNumero.toString());
    toggleNumero(jogadorClasse);
    ordenarJogadores();
    if (Storage !== null) {
      let jogadores = pegarJogadores();
      let nome = $(`.${jogadorClasse}-nome-texto`).text();
      jogadores = jogadores.filter(jogador => jogador.classe !== jogadorClasse);
      jogadores.push({nome: nome, numero: novoNumero, classe: jogadorClasse})
      localStorage.setItem("jogadores", JSON.stringify(jogadores));
    }
  } else toggleNumero(jogadorClasse);
}

function escolherNome(jogadorClasse) {
  $(`.${jogadorClasse}-nome-edit`).toggle();
  $(`.${jogadorClasse}-nome-div`).toggle();
  $(`.${jogadorClasse}-nome-input`).focus();
  $(`.${jogadorClasse}-nome-input`).select();
}

function toggleNome(jogadorClasse) {
  $(`.${jogadorClasse}-nome-edit`).toggle();
  $(`.${jogadorClasse}-nome-div`).toggle();
}

function aceitarNome(jogadorClasse) {
  let novoNome = $(`.${jogadorClasse}-nome-input`).val();
  if (novoNome != "") {
    $(`.${jogadorClasse}-nome-texto`).text(novoNome.toString());
    if (Storage !== null) {
      let jogadores = pegarJogadores();
      let numero = $(`.${jogadorClasse}-numero-texto`).text();
      jogadores = jogadores.filter(jogador => jogador.classe !== jogadorClasse);
      jogadores.push({nome: novoNome, numero: numero, classe: jogadorClasse})
      localStorage.setItem("jogadores", JSON.stringify(jogadores));
    }
  }
  toggleNome(jogadorClasse);
}

function deletarJogador(jogadorClasse) {
  $(`.${jogadorClasse}`).remove();
  arrayDeJogadores.splice(jogadorClasse, 1);
  if (Storage !== null) {
    let jogadores = pegarJogadores();
    jogadores = jogadores.filter(jogador => jogador.classe !== jogadorClasse);
    localStorage.setItem("jogadores", JSON.stringify(jogadores));
  }

}

function ordenarJogadores() {
  let ordem = []
  $($(".lista-dos-jogadores")[0].children).each((index, element) => {
    let jogadorClasse = $(element)[0].classList[0]
    let iniciativaDoElemento = parseInt($(`.${jogadorClasse}-numero-texto`).text());
    let nomeDoElemento = $(`.${jogadorClasse}-nome-texto`).text();
    ordem.push([jogadorClasse, nomeDoElemento, iniciativaDoElemento]);
  });
  ordem = ordem.sort((prev, value) => prev[2]<value[2]);
  $(".lista-dos-jogadores").empty();
  ordem.forEach(value => colocarJogadorNoDOM(...value));
}

function highlightJogador(jogadorClasse) {
  $($(".lista-dos-jogadores")[0].children).each((index, element) => {
    $(element).removeClass("highlight");
  });
  $("."+jogadorClasse).addClass("highlight");
}

function colocarJogadorNoDOM(jogadorClasse, nome, numero) {
  numero = (numero === undefined || numero === null? 0: numero)
  $(".lista-dos-jogadores").append(`
    <div class="${jogadorClasse} row jogador-na-lista animated fadeIn">
      <div class="col-xs-5">
        <div class="col-xs-12 ${jogadorClasse}-nome-div">
          <a href="#" onclick="escolherNome('${jogadorClasse}');" class="${jogadorClasse}-nome-link"><h3 class="${jogadorClasse}-nome-texto">${nome}</h3></a>
        </div>
        <div class="col-xs-12 ${jogadorClasse}-nome-edit edit-div">
          <input type="text" class="${jogadorClasse}-nome-input edit" placeholder="Novo nome">
        </div>
      </div>

      <div class="col-xs-3">
        <div class="col-xs-12 ${jogadorClasse}-numero-div">
          <a href="#" onclick="escolherNumero('${jogadorClasse}');" class="${jogadorClasse}-numero-link"><h3 class="${jogadorClasse}-numero-texto">${numero}</h3></a>
        </div>
        <div class="col-xs-12 ${jogadorClasse}-numero-edit edit-div">
          <input type="number" class="${jogadorClasse}-numero-input edit" placeholder="Iniciativa" style="width: 4em;">
        </div>

      </div>
      <div class="col-xs-2 bottom" style="margin-top: 0.7em">
        <a href="#" onclick="highlightJogador('${jogadorClasse}');" class="${jogadorClasse}-highlight"><i class="fa fa-arrow-circle-o-up fa-3x"></i></a>
      </div>
      <div class="col-xs-2 bottom" style="margin-top: 0.7em">
        <a href="#" onclick="deletarJogador('${jogadorClasse}');" class="${jogadorClasse}-delete"><i class="fa fa-times fa-3x"></i></a>
      </div>
    </div>
  `);
  $(`.${jogadorClasse}-numero-edit`).hide();
  $(`.${jogadorClasse}-nome-edit`).hide();
  $(`.${jogadorClasse}-numero-input`).keyup((e) => {
    if (e.keyCode == 13) aceitarNumero(jogadorClasse);
    if (e.keyCode == 27) toggleNumero(jogadorClasse);
  });
  $(`.${jogadorClasse}-numero-input`).submit(() => aceitarNumero(jogadorClasse))
  $(`.${jogadorClasse}-nome-input`).keyup((e) => {
    if (e.keyCode == 13) aceitarNome(jogadorClasse);
    if (e.keyCode == 27) toggleNome(jogadorClasse);
  });
  $(`.${jogadorClasse}-nome-input`).submit(() => aceitarNome(jogadorClasse))
}
