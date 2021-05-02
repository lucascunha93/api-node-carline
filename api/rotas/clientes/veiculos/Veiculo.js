const TabelaVeiculo = require('./TabelaVeiculo')
const CampoInvalido = require('../../../erros/CampoInvalido')
const DadosNaoFornecidos = require('../../../erros/DadosNaoFornecidos')

class Veiculo {
    constructor({ id, idCliente, nome, marca, anoFabricacao, anoModelo, categoria, combustivel, cor, dataCriacao, dataModificacao }) {
        this.id = id
        this.idCliente = idCliente
        this.nome = nome
        this.marca = marca
        this.anoFabricacao = anoFabricacao
        this.anoModelo = anoModelo
        this.categoria = categoria
        this.combustivel = combustivel
        this.cor = cor
        this.dataCriacao = dataCriacao
        this.dataModificacao = dataModificacao
    }

    async criar() {
        //this.validar()
        const resultado = await TabelaVeiculo.inserir({
            idCliente: this.idCliente,
            nome: this.nome,
            marca: this.marca,
            anoFabricacao: this.anoFabricacao,
            anoModelo: this.anoModelo,
            categoria: this.categoria,
            combustivel: this.combustivel,
            cor: this.cor,
        })

        this.id = resultado.id
        this.dataCriacao = resultado.dataCriacao
        this.dataModificacao = resultado.dataModificacao
    }

    async carregar() {
        const encontrado = await TabelaVeiculo.pegarPorId(this.id, this.idCliente)
        this.nome = encontrado.nome
        this.idCliente = encontrado.idCliente
        this.marca = encontrado.marca
        this.anoFabricacao = encontrado.anoFabricacao
        this.anoModelo = encontrado.anoModelo
        this.categoria = encontrado.categoria
        this.combustivel = encontrado.combustivel
        this.cor = encontrado.cor
        this.dataCriacao = encontrado.dataCriacao
        this.dataModificacao = encontrado.dataModificacao
    }

    async atualizar() {
        await TabelaVeiculo.pegarPorId(this.id, this.idCliente)
        const campos = ['nome', 'marca', 'anoFabricacao', 'anoModelo', 'categoria', 'combustivel', 'cor']
        const dadosParaAtualizar = {}
        campos.forEach((campo) => {
            const valor = this[campo]

            if (typeof valor === 'string' || typeof valor === 'number') {
                dadosParaAtualizar[campo] = valor
            }
        })

        if (Object.keys(dadosParaAtualizar).length === 0) {
            throw new DadosNaoFornecidos()
        }
        return TabelaVeiculo.atualizar(
            {
                id: this.id, 
                idCliente: this.idCliente
            },
            dadosParaAtualizar
        )

    }

    apagar() {
        return TabelaVeiculo.remover(this.id, this.idCliente)
    }

    validar() {
        const campos = ['empresa', 'email', 'categoria']

        campos.forEach(campo => {
            const valor = this[campo]

            if (typeof valor !== 'string' || valor.length === 0) {
                throw new CampoInvalido(campo)
            }
        })
    }
}

module.exports = Veiculo