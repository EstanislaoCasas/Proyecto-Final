module.exports = (sequelize, dataTypes) => {
    let alias = 'Donaciones';
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
        tableName: 'donations',
        timestamps: false
    };
    const Donacion = sequelize.define(alias, cols, config);

    return Donacion;
}