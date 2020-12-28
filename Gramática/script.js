const addInputButton = document.getElementById('buttonPlus')
const testGramatica = document.getElementById('testaGramatica')
let entradaTeste = document.getElementById('test')
let entradaUser = entradaTeste.value
let count = 1
let todasRegras = []
let posicaoteste = 0
let aux, posicaotesteaux

function iniciaS() {
    let s = document.getElementById("var0")
    s.value = "S"
}

function addInput() {
    let tabela = document.getElementById('tabela');
    let NumerodeLinhas = tabela.rows.length
    let linha = tabela.insertRow(NumerodeLinhas);
    let celula1 = linha.insertCell(0);
    let celula2 = linha.insertCell(1);
    celula1.innerHTML = `<td class="var"><div class="input-group"><input type="text"  id="var${count}" class="form-control" style="max-width: 50px; text-transform: uppercase;" maxlength=1><div class="input-group-append"><span class="input-group-text"><i class="fa fa-arrow-right"></i></span></div></div></td>`
    celula2.innerHTML = `<td class="rule"><input type="text" id="rule${count}" class="form-control" style="max-width: 150px;"></td>`
    count++
} 

function procurarProximaRegra(letra, posicao){
    for(i = posicao+1; i< count; i++){
        if(todasRegras[i].Variavel === letra)
            return i;
    }
    return -1
}

function testeSupremo(regra, linha, posicao, posicaoteste){
    let novalinha

    if(posicao >= regra.length)
        return false

    if(regra[posicao] === regra[posicao].toUpperCase()){
        novalinha = procurarProximaRegra(regra[posicao], linha)
        if(regra.length-1 === posicao){    
            if(testeSupremo(todasRegras[novalinha].Regra, novalinha, 0, posicaoteste))
                return true    
            else{
                novalinha = procurarProximaRegra(regra[posicao], novalinha)
                while(novalinha != -1){
                    if(testeSupremo(todasRegras[novalinha].Regra, novalinha, 0, posicaoteste))
                        return true
                    novalinha = procurarProximaRegra(regra[posicao], novalinha)
                }
                return false
            }     
        }
        else{
            if(testeSupremo(todasRegras[novalinha].Regra, novalinha, 0, posicaoteste)){
                posicaoteste = posicaotesteaux
                return testeSupremo(regra, linha, posicao+1, posicaoteste+1)
            }
            else{
                novalinha = procurarProximaRegra(regra[posicao], novalinha)
                while(novalinha != -1){
                    if(testeSupremo(todasRegras[novalinha].Regra, novalinha, 0, posicaoteste)){
                        posicaoteste = posicaotesteaux
                        return testeSupremo(regra, linha, posicao+1, posicaoteste+1)
                    }
                    novalinha = procurarProximaRegra(regra[posicao], novalinha)
                }
                return false
            }  
        }
    }
    else{
        if( regra[posicao] === entradaUser[posicaoteste]){
            if(regra.length-1 === posicao ){  
                if(posicaoteste === entradaUser.length-1){
                    aux = 1
                }
                posicaotesteaux = posicaoteste
                return true
            }
            return testeSupremo(regra, linha, posicao+1, posicaoteste+1)
        }
        else return false;
    }

}

function pegaValoresInput(){
    let variavel, regra;

    for (i=0; i < count; i++){
        variavel = document.getElementById(`var${i}`).value.toUpperCase()
        regra = document.getElementById(`rule${i}`).value
        todasRegras[i] = {"Variavel": variavel, "Regra": regra}   
    }
    entradaTeste = document.getElementById('test')
    entradaUser = entradaTeste.value
    
    for(i=0; i<todasRegras.length; i++){
        if(todasRegras[i].Variavel === 'S'){
            aux = 0
            if(testeSupremo(todasRegras[i].Regra, 0, 0, 0) && aux ==1){
                console.log("Deu Certo!")
                break
            }                
        }
    }

    if(aux != 1)
        console.log("Deu Errado!")
}

addInputButton.addEventListener('click', addInput)
testGramatica.addEventListener('click', pegaValoresInput)