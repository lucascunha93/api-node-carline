const Sequelize = require('sequelize')
const instancia = require('../../../banco-de-dados')

const colunas = {
    idCliente: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    nome: {
        type: Sequelize.STRING,
        allowNull: false
    },
    anoFabricacao:{
        type: Sequelize.INTEGER,
        allowNull: false
    },
    anoModelo:{
        type: Sequelize.INTEGER,
        allowNull: false
    },
    categoria:{
        type: Sequelize.INTEGER,
        allowNull: false
    },
    combustivel:{
        type: Sequelize.INTEGER,
        allowNull: false
    },
    cor:{
        type: Sequelize.STRING,
        allowNull: false
    }
}

const opcoes = {
    freezeTableName: true,
    tableName: 'veiculos',
    timestamps: true,
    createdAt: 'dataCriacao',
    updatedAt: 'dataAtualizacao',
    version: 'versao'
}

module.exports = instancia.define('veiculo', colunas, opcoes)