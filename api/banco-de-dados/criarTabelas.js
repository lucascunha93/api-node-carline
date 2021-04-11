const ModeloTabela = require('../rotas/clientes/ModeloTabelaCliente')

ModeloTabela
.sync()
.then(() => console.log('Tabela criada com sucesso'))
.catch(console.log)