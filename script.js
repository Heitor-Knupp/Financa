let Valor_Total;
let Valor_Aniversario; 
let Valor_Dividas;
let Dinheiro_Republica;

let DInheiro_Emergencial;
let DInheiro_Reformas;

let fluxo_divida_real;

function prints() {
    document.getElementById("floatCaixa").innerHTML = "R$ " + Valor_Total.toFixed(2);
    document.getElementById("floatAniversario").innerHTML = "R$ " + Valor_Aniversario.toFixed(2);    
    document.getElementById("floatDividas").innerHTML = "R$ " + Valor_Dividas.toFixed(2);
    document.getElementById("floatRepublica").innerHTML = "R$ " + Dinheiro_Republica.toFixed(2);
    document.getElementById("floatEmergencia").innerHTML = "R$ " + DInheiro_Emergencial.toFixed(2);
    document.getElementById("floatReforma").innerHTML = "R$ " + DInheiro_Reformas.toFixed(2);
}

function valoresIniciais() {
    const ValorTotalString = document.getElementById("Input-ValorTotal").value;
    Valor_Total = parseFloat(ValorTotalString);

    const ValorAniversarioInput = document.getElementById("Input-ValorAniversárioAtual").value
    Valor_Aniversario = parseFloat(ValorAniversarioInput);

    const DinheiroDividasINput = document.getElementById("Total-Dividas").value;
    Valor_Dividas = parseFloat(DinheiroDividasINput);

    ContasRepetitivas();

    prints();
    salvarDados();
}

function ContasRepetitivas(){
    Dinheiro_Republica = Valor_Total - Valor_Aniversario;
    DInheiro_Emergencial = (Dinheiro_Republica * 40) / 100;
    DInheiro_Reformas = Dinheiro_Republica - DInheiro_Emergencial;
}

const teclado = document.getElementById("Total-Dividas");
teclado.addEventListener("keyup", (e) => {
    if (e.key == "Enter"){
        valoresIniciais();
        const elementos_inputs = document.querySelectorAll(".inputs");
        elementos_inputs.forEach(valor_atual => {
        valor_atual.style.display = "none";
        });
    }

})

function dividas() {
    let fluxo_divida = document.getElementById("Quem-Pagou-Quanto").value;
    fluxo_divida_real = parseFloat(fluxo_divida);
    
    Valor_Total += fluxo_divida_real;
    Valor_Dividas -= fluxo_divida_real;

    if(Valor_Dividas < 0){
        Valor_Dividas = 0;
    }

    if(document.getElementById("Quem-Pagou").value == "Véia"){
        Valor_Aniversario += fluxo_divida_real;

        if(Valor_Aniversario >= 3400){
            Valor_Aniversario = 3400;
            ContasRepetitivas();
            prints();
        }else{
            ContasRepetitivas();
            prints();
        }
    }else{
        ContasRepetitivas();
        prints();
    }

    
    let fluxo_divida_nome = document.createElement("li");
    fluxo_divida_nome.innerHTML = document.getElementById("Quem-Pagou").value + " - " + "R$ " + document.getElementById("Quem-Pagou-Quanto").value + " - " + document.getElementById("Quem-Pagou-Quanto-Data").value;

    document.getElementById("Lista-Dividas").appendChild(fluxo_divida_nome);
    salvarDados();
}

function saidas() {
    let saida_caixa = document.getElementById("Quanto-Saiu").value;
    let saida_caixa_real = parseFloat(saida_caixa);

    if(document.getElementById("Porque-Saiu").value == "empréstimo"){
        Valor_Total -= saida_caixa_real;
        Valor_Dividas += saida_caixa_real;
        ContasRepetitivas();
        prints();
    }
    else if(document.getElementById("Porque-Saiu").value == "emergencia"){
        Valor_Total -= saida_caixa_real;
        Dinheiro_Republica -= saida_caixa_real;
        DInheiro_Emergencial -= saida_caixa_real;
        prints();
    }
    else{
        Valor_Total -= saida_caixa_real;
        Dinheiro_Republica -= saida_caixa_real;
        DInheiro_Reformas -= saida_caixa_real;
        prints();
    }

    let fluxo_saida_nome = document.createElement("li");
    fluxo_saida_nome.innerHTML = document.getElementById("Porque-Saiu").value + " - " + "R$ " + document.getElementById("Quanto-Saiu").value + " - " + document.getElementById("Destino-Saida").value;

    document.getElementById("Lista-Saidas").appendChild(fluxo_saida_nome);
    salvarDados();
}

function entradas() {
    let entrada_caixa = document.getElementById("Quanto-Entrou").value;
    let entrada_caixa_real = parseFloat(entrada_caixa);

    if(document.getElementById("Veio-de-Onde").value == "caixinha"){
        Valor_Total += entrada_caixa_real;
        Dinheiro_Republica += entrada_caixa_real;
        DInheiro_Reformas += entrada_caixa_real;
        prints();
    }
    else{
        Valor_Total += entrada_caixa_real;
        ContasRepetitivas();
        prints();
    }

    let fluxo_entrada_nome = document.createElement("li");
    fluxo_entrada_nome.innerHTML = document.getElementById("Veio-de-Onde").value + " -  R$" + document.getElementById("Quanto-Entrou").value + " - " + document.getElementById("Data-Entrada").value;

    document.getElementById("Lista-Entradas").appendChild(fluxo_entrada_nome);
    salvarDados();
}

function salvarDados() {
  const dadosParaSalvar = {
    total: Valor_Total,
    aniversario: Valor_Aniversario,
    dividas: Valor_Dividas
  };

  localStorage.setItem('balancoDados', JSON.stringify(dadosParaSalvar));

  localStorage.setItem('listaDividasHtml', document.getElementById("Lista-Dividas").innerHTML);
  localStorage.setItem('listaSaidasHtml', document.getElementById("Lista-Saidas").innerHTML);
  localStorage.setItem('listaEntradasHtml', document.getElementById("Lista-Entradas").innerHTML);
  
  console.log("Progresso salvo no navegador!");
}

function carregarDados() {
  const dadosSalvos = localStorage.getItem('balancoDados');

  if (dadosSalvos) {
    const dados = JSON.parse(dadosSalvos);

    Valor_Total = dados.total;
    Valor_Aniversario = dados.aniversario;
    Valor_Dividas = dados.dividas;


    document.getElementById("Lista-Dividas").innerHTML = localStorage.getItem('listaDividasHtml');
    document.getElementById("Lista-Saidas").innerHTML = localStorage.getItem('listaSaidasHtml');
    document.getElementById("Lista-Entradas").innerHTML = localStorage.getItem('listaEntradasHtml');
    
    ContasRepetitivas();
    prints();
    
    console.log("Progresso anterior carregado!");
  }
}

//Apaga dados no localstorage
function resetarProgresso() {
  const confirmacao = confirm("Você tem certeza que deseja apagar todo o progresso? Esta ação não pode ser desfeita.");

  if (confirmacao) {
    
    localStorage.clear();
    
    
    location.reload();
  }
}

window.addEventListener('DOMContentLoaded', carregarDados);