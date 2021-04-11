    class NaoEncontrado extends Error {
        constructor(){
            super('Não foram fornecidos dados para atualizar!')
            this.name = 'DadosNaoFornecidos'
            this.idErro = 0
        }
    }

    module.exports = NaoEncontrado