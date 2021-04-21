const Sequelize = require('sequelize')
const instancia = require('../../banco-de-dados')

const colunas = {
    nome: {
        type: Sequelize.STRING,
        allowNull: false
    },
    cpf:{
        type: Sequelize.DOUBLE,
        allowNull: false
    },
    email:{
        type: Sequelize.STRING,
        allowNull: false
    },
    dataNascimento:{
        type: Sequelize.INTEGER,
        allowNull: false
    },
}

const opcoes = {
    freezeTableName: true,
    tableName: 'clientes',
    timestamps: true,
    createdAt: 'dataCriacao',
    updatedAt: 'dataAtualizacao',
    version: 'versao'
}

module.exports = instancia.define('cliente', colunas, opcoes)