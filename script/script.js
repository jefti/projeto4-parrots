//alert("Código conectado");

let quant_cartas = prompt('com quantas cartas você quer começar o jogo ?');
let banco = [];

while(!par(quant_cartas)){
    alert('Número inválido, digite um número PAR entre 4 e 14');
    quant_cartas = prompt('com quantas cartas você quer começar o jogo ?');
}

criar_banco(quant_cartas);
preencher (quant_cartas);

function comparador() { 
	return Math.random() - 0.5; 
}

function par(numero){
    let teste_par = numero%2;
    //alert(teste_par);

    if(teste_par == 0 && numero >= 4 && numero <= 14){
        return true;
    }else{
        return false;
    }
}


function criar_banco(numero){
    cont= 0;
    while (cont< numero){
        const valor = Math.floor(cont/2);
        banco[cont] = valor;
        cont++;
    }
    banco.sort(comparador);
    console.log(banco);
}


function preencher(numero){
    let cont = 1;
    const board = document.querySelector('.tabuleiro');
    console.log(board);


    while (cont <= numero){
        id_figura = banco[cont-1];
        const carta = criaCarta(id_figura);
        board.innerHTML += carta;
        cont++;
    }
}

function criaCarta(id){
    let imagem = "";
switch (id){
    case 0:
        imagem = "./imagens/bobrossparrot.gif";
        break;
    case 1:
        imagem = "./imagens/explodyparrot.gif";
        break;
    case 2:
        imagem = "./imagens/fiestaparrot.gif";
        break;
    case 3:
        imagem = "./imagens/metalparrot.gif";
        break;
    case 4:
        imagem = "./imagens/revertitparrot.gif";
        break;
    case 5:
        imagem = "./imagens/tripletsparrot.gif";
        break;
    case 6:
        imagem = "./imagens/unicornparrot.gif";
        break;

}



    let texto = `<div onclick='virar(this)' class='card ${id}'><div class='front-face face'><img src='./imagens/back.png'></div><div class='back-face face'><img src='${imagem}'></div></div>`;
    return texto;
}


function virar(carta){
    const frente = carta.querySelector('.front-face');
    const tras = carta.querySelector('.back-face');
    frente.classList.add('flip-frente');
    tras.classList.add('flip-tras');
}



function select(){

}