const roteador = require('express').Router()
const TabelaVeiculo = require('./TabelaVeiculo')
const Veiculo  = require('./Veiculo')

roteador.get('/api/veiculos', async (requisicao, resposta) => {
    const resultados = await TabelaVeiculo.listar()
    resposta.status(200)
    resposta.send(
        JSON.stringify(resultados)
    )
})

roteador.post('/api/veiculos', async (requisicao, reposta, proximo) => {
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

roteador.put('/api/veiculos/:id', async (requisicao, reposta, proximo) => {
    try {
        const id = requisicao.params.id
        const dadosRecebidos = requisicao.body
        const dados = Object.assign({}, dadosRecebidos, {id: id})
        const veiculo = new Veiculo(dados)
        await veiculo.atualizar()
        reposta.status(204)
        reposta.end()
    } catch(erro){
        proximo(erro)
    }
})

roteador.delete('/api/veiculos/:id', async (requisicao, reposta, proximo) => {
    try {
        const id = requisicao.params.id
        const veiculo = new Veiculo({ id: id})
        await veiculo.carregar()
        await veiculo.remover()
        reposta.status(204)
        reposta.end()
    } catch(erro){
        proximo(erro)
    }
})

module.exports = roteador
