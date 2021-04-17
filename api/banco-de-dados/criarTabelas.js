const ModeloTabela = require('../rotas/veiculos/ModeloTabelaVeiculo')

ModeloTabela
.sync()
.then(() => console.log('Tabela criada com sucesso'))
.catch(console.log)