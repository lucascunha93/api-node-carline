const roteador = require('express').Router()
const TabelaVeiculo = require('./TabelaVeiculo')
const Veiculo  = require('./Veiculo')

roteador.get('/', async (requisicao, resposta) => {
    const resultados = await TabelaVeiculo.listar()
    resposta.status(200)
    resposta.send(
        JSON.stringify(resultados)
    )
})

roteador.post('/', async (requisicao, reposta, proximo) => {
    try {
        const dadosRecebidos = requisicao.body
        const veiculo = new Veiculo(dadosRecebidos)
        await veiculo.Criar()
        reposta.status(201)
        reposta.send(
            JSON.stringify(veiculo)
        )
    } catch(erro){
        proximo(erro)
    }
})

module.exports = roteador
