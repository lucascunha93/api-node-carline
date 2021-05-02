const roteador = require('express').Router({ mergeParams: true })
const TabelaVeiculo = require('./TabelaVeiculo')
const Veiculo  = require('./Veiculo')
const Serializador = require('../../../Serializador').SerializadorVeiculo

roteador.options('/', (requisicao, resposta) => {
    resposta.set('Access-Control-Allow-Methods', 'GET, POST')
    resposta.set('Access-Control-Allow-Headers', 'Content-Type')
    resposta.status(204)
    resposta.end()
})

roteador.get('/', async (requisicao, resposta) => {
    const resultados = await TabelaVeiculo.listar(requisicao.cliente.id)
    const serializador = new Serializador(
        resposta.getHeader('content-type')
    )
    resposta.send(
        serializador.serializar(resultados)
    )
})

roteador.post('/', async (requisicao, resposta, proximo) => {
    try {
        const idCliente = requisicao.params.idCliente
        const corpo = requisicao.body
        const dados = Object.assign({}, corpo, { idCliente: idCliente })
        const veiculo = new Veiculo(dados)
        await veiculo.criar()
        const serializador = new Serializador(
            resposta.getHeader('Content-Type')
        )
        resposta.set('ETag', veiculo.versao)
        const timestamp = (new Date(veiculo.dataAtualizacao)).getTime()
        resposta.set('Last-Modified', timestamp)
        resposta.set('Location', `/api/clientes/${veiculo.idCliente}/veiculos/${veiculo.id}`)
        resposta.status(201)
        resposta.send(
            serializador.serializar(veiculo)
        )
    } catch (erro) {
        proximo(erro)
    }
})

roteador.options('/:id', (requisicao, resposta) => {
    resposta.set('Access-Control-Allow-Methods', 'DELETE, GET, HEAD, PUT')
    resposta.set('Access-Control-Allow-Headers', 'Content-Type')
    resposta.status(204)
    resposta.end()
})

roteador.delete('/:id', async (requisicao, resposta) => {
    const dados = {
        id: requisicao.params.id,
        idCliente: requisicao.params.idCliente
    }
    const veiculo = new Veiculo(dados)
    await veiculo.apagar()
    resposta.status(204)
    resposta.end()
})

roteador.get('/:id', async (requisicao, resposta, proximo) => {
    try {
        const dados = {
            id: requisicao.params.id,
            idCliente: requisicao.idCliente.id
        }
    
        const veiculo = new Veiculo(dados)
        await veiculo.carregar()
        const serializador = new Serializador(
            resposta.getHeader('Content-Type'),
            ['nome', 'marca', 'anoFrabricacao', 'anoModelo', 'categoria', 'combustivel', 'cor', 'dataCriacao', 'dataModificacao', 'versao']
        )
        resposta.set('ETag', veiculo.versao)
        const timestamp = (new Date(veiculo.dataAtualizacao)).getTime()
        resposta.set('Last-Modified', timestamp)
        resposta.send(
            serializador.serializar(veiculo)
        )
    } catch (erro) {
        proximo(erro)
    }
})

roteador.head('/:id', async (requisicao, resposta, proximo) => {
    try {
        const dados = {
            id: requisicao.params.id,
            idCliente: requisicao.idCliente.id
        }
    
        const veiculo = new Veiculo(dados)
        await veiculo.carregar()
        resposta.set('ETag', veiculo.versao)
        const timestamp = (new Date(veiculo.dataAtualizacao)).getTime()
        resposta.set('Last-Modified', timestamp)
        resposta.status(200)
        resposta.end()
    } catch (erro) {
        proximo(erro)
    }
})

roteador.put('/:id', async (requisicao, resposta, proximo) => {
    try {
        const dados = Object.assign(
            {},
            requisicao.body,
            {
                id: requisicao.params.id,
                idCliente: requisicao.cliente.id
            }
        )
        const veiculo = new Veiculo(dados)
        await veiculo.atualizar()
        await veiculo.carregar()
        resposta.set('ETag', veiculo.versao)
        const timestamp = (new Date(veiculo.dataAtualizacao)).getTime()
        resposta.set('Last-Modified', timestamp)
        resposta.status(204)
        resposta.end()
    } catch (erro) {
        proximo(erro)
    }
})

module.exports = roteador
