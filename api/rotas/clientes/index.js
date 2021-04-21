const roteador = require('express').Router()
const TabelaCliente = require('./TabelaCliente')
const Cliente = require('./Cliente')

roteador.get('/api/clientes', async (requisicao, resposta) => {
    const resultados = await TabelaCliente.listar()
    resposta.status(200)
    resposta.send(
        JSON.stringify(resultados)
    )
})

roteador.post('/api/clientes', async (requisicao, resposta, proximo) => {
    try {
        const dadosRecebidos = requisicao.body
        const cliente = new Cliente(dadosRecebidos)
        await cliente.criar()
        resposta.status(201)
        resposta.send(
            JSON.stringify(cliente)
        )
    } catch (erro) {
        console.log("deu erro");
        proximo(erro)
    }

})

roteador.put('/api/clientes/:id', async (requisicao, resposta, proximo) => {
    try {
        const id = requisicao.params.id
        const dadosRecebidos = requisicao.body
        const dados = Object.assign({}, dadosRecebidos, { id: id })
        const cliente = new Cliente(dados)
        await cliente.atualizar()
        resposta.status(204)
        resposta.end()
    } catch (erro) {
        proximo(erro)
    }
})

roteador.delete('/api/clientes/:id', async (requisicao, resposta, proximo) => {
    try {
        const id = requisicao.params.id
        const cliente = new Cliente({ id: id })
        await cliente.carregar()
        await cliente.remover()
        resposta.status(204)
        resposta.end
    } catch (erro) {
        proximo(erro)
    }

})

module.exports = roteador
