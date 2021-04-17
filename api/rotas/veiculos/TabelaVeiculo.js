const Modelo = require('./ModeloTabelaVeiculo')
const NaoEncontrado = require('../../erros/NaoEncontrado')

module.exports = {
    listar(){
        return Modelo.findAll()
    },

    inserir(veiculo){
        return Modelo.create(veiculo)
    },
    
}