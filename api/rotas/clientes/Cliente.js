const TabelaCliente = require('./TabelaCliente')
const CampoInvalido = require('../../erros/CampoInvalido')
const DadosNaoFornecidos = require('../../erros/DadosNaoFornecidos')

class Cliente {

    constructor({ id, nome, cpf, email, dataNascimento }){
        this.id = id
        this.nome = nome
        this.cpf = cpf
        this.email = email
        this.dataNascimento = dataNascimento
    }

    criar(){
        const resultado = TabelaCliente.inserir({
            nome: this.nome,
            cpf: this.cpf,
            email: this.email,
            dataNascimento: this.dataNascimento
        })
        this.id = resultado.id
        this.dataCriacao = resultado.dataCriacao
        this.dataModificacao = resultado.dataModificacao

    }

    async carregar() {
        const encontrado = await TabelaCliente.pegarPorId(this.id)
        this.nome = encontrado.nome
        this.cpf = encontrado.cpf
        this.email = encontrado.email
        this.dataNascimento = encontrado.dataNascimento
        this.dataCriacao = encontrado.dataCriacao
        this.dataModificacao = encontrado.dataModificacao
    }

    async atualizar() {
        await TabelaCliente.pegarPorId(this.id)
        const campos = ['nome', 'cpf', 'email', 'dataNascimento0']
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
        
        await TabelaCliente.atualizar(this.id, dadosParaAtualizar)

    }

    remover() {
        return TabelaCliente.remover(this.id)
    }
}

module.exports = Cliente