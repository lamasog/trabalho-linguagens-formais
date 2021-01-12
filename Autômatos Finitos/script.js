const container = document.getElementById("automato");    
let count = 0       
let menu = {        // Todos os Botoes do Menu Superior
  selecionar: 0,  
  criaEstado: 1, 
  apagaEstado: 2,
  criaTransicao: 3
}
let opcaoAtual = menu.selecionar
let NumberID = [] 
let desfazer = []
let nodes = new vis.DataSet([ ])   // As Bolinhas
let edges = new vis.DataSet([ ])   // As Transições

var data = {
    nodes: nodes,
    edges: edges,
};

function addedge(edgeData, callback) {

    let data = edges.get({
        filter: function(item) {
            return item.from === edgeData.from && item.to === edgeData.to;
        }
    });
    console.log(data.length )

    let token = prompt("Digite o valor da transição", "");
    if (data.length > 0) {
        edges.update({
            id: data[0].id,
            label: data[0].label + ", " + token
        });
        callback(null);
    } else {
        edgeData.id = edgeData.from + "-" + edgeData.to;
        edgeData.arrows = "to";
        edgeData.label = token;
        callback(edgeData);
        network.addEdgeMode();
    }
}

var options = {           // A formatação dos Nós, formato circulo, cor cinza, etc
    nodes: {
        physics: false,
        shape: "circle",
        color: 'gray',
        font: {
            size: 25,
            align: "center"
        },
        margin: 15
    },
    edges: {
        arrows: {
            to: {
                enabled: false,
                scaleFactor: 1,
                type: "arrow"
            },
            from: {
                enabled: false,
                scaleFactor: 1,
                type: "arrow"
            }
          
        },
        font: {
            align: "top",
            color: "white",
            size: 17,
            strokeWidth: 1
        },
        width: 1
    },
    manipulation: {
        enabled: false, 
        addEdge: addedge
    }
};


let network = new vis.Network(container, data, options);

// Criando Eventos de Click no Botao. Assim, quando clicado será armazenado um determinado 
// numero na variavel e q
document.getElementById("selecionar").addEventListener('click', () => {opcaoAtual = 0})
document.getElementById("criar-estado").addEventListener('click', () => {opcaoAtual = 1})
document.getElementById("apagar").addEventListener('click', () => {opcaoAtual = 2})
document.getElementById("transicao").addEventListener('click', () => {opcaoAtual = 3})
document.getElementById("desfazer").addEventListener('click', () => {opcaoAtual = 4})

function removeEstado(number){
    const regex = new RegExp(number)
    for(i=0; i<count; i++){
        if( regex.test(NumberID[i])){
            NumberID[i] = "undefined"
        }
    }
}

function reusandoElementosRemovidos(){
    for(i=0; i<count; i++){
        if(NumberID[i] === "undefined"){
            return i
        }
    }
    return -1
}

function menuEscolha(data){
    switch(opcaoAtual){
        case menu.selecionar:
            break;

        case menu.criaEstado:
            if((temporario = reusandoElementosRemovidos()) === -1){
                NumberID[count] = nodes.add({
                    label: `q${count}`,
                    x: data.pointer.canvas.x,
                    y: data.pointer.canvas.y
                    })
                count++;
            }           
            else{
                NumberID[temporario] = nodes.add({
                    label: `q${temporario}`,
                    x: data.pointer.canvas.x,
                    y: data.pointer.canvas.y
                    })
            } 
            break;
        
        case menu.apagaEstado:
            removeEstado(data.nodes[0])
            nodes.remove(data.nodes[0]).length;
            break;

        case menu.criaTransicao:
            network.addEdgeMode();  
            break;
    }
}

network.addEventListener('click', data => {menuEscolha(data)} )