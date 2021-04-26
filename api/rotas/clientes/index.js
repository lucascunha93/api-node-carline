const roteador = require('express').Router()
const TabelaCliente = require('./TabelaCliente')
const Cliente = require('./Cliente')
const SerializadorCliente = require('../../Serializador').SerializadorCliente

roteador.options('/', (requisicao, resposta) => {
    resposta.set('Access-Control-Allow-Methods', 'GET, POST')
    resposta.set('Access-Control-Allow-Headers', 'Content-Type')
    resposta.status(204)
    resposta.end()
})



roteador.get('/api/clientes', async (requisicao, resposta) => {
    const resultados = await TabelaCliente.listar()
    resposta.status(200)
    const serializador = new SerializadorCliente(
        reposta.getHeader('content-type'), ['data-nascimento']
    )
    resposta.send(
        serializador.serializar(resultados)
    )
})

roteador.post('/api/clientes', async (requisicao, resposta, proximo) => {
    try {
        const dadosRecebidos = requisicao.body
        const cliente = new Cliente(dadosRecebidos)
        await cliente.criar()
        resposta.status(201)
        const serializador = new SerializadorCliente(
            reposta.getHeader('content-type'), ['data-nascimento']
        )
        resposta.send(
            serializador.serializar(cliente)
        )
    } catch (erro) {
        proximo(erro)
    }

})

roteador.options('/api/clientes/:id', (requisicao, resposta) => {
    resposta.set('Access-Control-Allow-Methods', 'GET, PUT, DELETE')
    resposta.set('Access-Control-Allow-Headers', 'Content-Type')
    resposta.status(204)
    resposta.end()
})

roteador.get('/api/clientes/:id', async (requisicao, resposta, proximo) => {
    try{
        const id = requisicao.params.id
        const cliente = new Cliente({id: id})
        await cliente.carregar()
        reposta.status(200)
        const serializador = new SerializadorCliente(
            reposta.getHeader('content-type'),
            ['email', 'dataNascimento']
        )
        reposta.send(
            serializador.serializar(cliente)
        )
    } catch(erro) {
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

const roteadorClientes = require('./veiculos')

const verificarCliente = async (requisicao, resposta, proximo) => {
    try {
        const id = requisicao.params.id
        const cliente = new Cliente({id:id})
        await cliente.carregar()
        requisicao.cliente = cliente
        proximo()
    } catch(erro) {
        proximo(erro)
    }   
}

roteador.use(':id/veiculos', verificarCliente, roteadorClientes)

module.exports = roteador
