const ModeloTabelaVeiculos = require('../rotas/veiculos/ModeloTabelaVeiculo')
const ModeloTabelaClientes = require('../rotas/clientes/ModeloTabelaCliente')

ModeloTabelaVeiculos
.sync()
.then(() => console.log('Tabela criada com sucesso'))
.catch(console.log)

ModeloTabelaClientes
.sync()
.then(() => console.log('Tabela criada com sucesso'))
.catch(console.log)