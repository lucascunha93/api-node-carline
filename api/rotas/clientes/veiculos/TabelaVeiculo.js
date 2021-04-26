const Modelo = require('./ModeloTabelaVeiculo')
const NaoEncontrado = require('../../../erros/NaoEncontrado')

module.exports = {
    listar(idC){
        return Modelo.findAll({
            where: {
                idCliente: idC
            },
            raw: true
        })
    },

    inserir(veiculo){
        return Modelo.create(veiculo)
    },

    async pegarPorId(idVeiculo, idC) {
        const encontrado = await Modelo.findOne({
            where: {
                id: idVeiculo,
                idCliente: idC
            },
            raw: true
        })
        
        if(!encontrado){
            throw new NaoEncontrado('Produto')
        }

        return encontrado
    },
    
    atualizar(dadosDoVeiculo, dadosParaAtualizar) {
        return Modelo.update(
            dadosParaAtualizar,
            {
                where: dadosDoVeiculo
            }
        )
    },

    remover(idVeiculo, idC) {
        return Modelo.destroy({
            where: { 
                id: idVeiculo,
                idCliente: idC
            }
        })
    }
}