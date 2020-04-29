module.exports = (sequelize, dataTypes) => {
    let alias = 'Depositos';
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        amount: {
            type: dataTypes.INTEGER
        }
    };
    let config = {
        tableName: 'deposits',
        timestamps: false
    };
    const Deposito = sequelize.define(alias, cols, config);

    return Deposito;
}