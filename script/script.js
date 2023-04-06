//alert("Código conectado");

let quant_cartas = prompt('com quantas cartas você quer começar o jogo ?');

while(!par(quant_cartas)){
    alert('Número inválido, digite um número PAR entre 4 e 14');
    quant_cartas = prompt('com quantas cartas você quer começar o jogo ?');
}

preencher (quant_cartas);


function par(numero){
    let teste_par = numero%2;
    //alert(teste_par);

    if(teste_par == 0 && numero >= 4 && numero <= 14){
        return true;
    }else{
        return false;
    }
}


function criaCarta(id){
    let texto = "";
    
    return texto;
}

function preencher(numero){
    let cont = 1;
    const board = document.querySelector('.tabuleiro');
    console.log(board);


    while (cont <= numero){
        board.innerHTML += '<div class="card"><div class="front-face face">Frente</div><div class="back-face face">Verso</div></div>';
        cont++;
    }
}





function select(){

}