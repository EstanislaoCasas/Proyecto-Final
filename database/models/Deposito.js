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
        },
        created_at: {
            type: dataTypes.DATE
        },
        updated_at: {
            type: dataTypes.DATE
        },
        user_id: {
            type: dataTypes
        }
    };
    let config = {
        tableName: 'deposits',
        timestamps: false
    };
    const Deposito = sequelize.define(alias, cols, config);

    Deposito.associate = function(models) {
        Deposito.belongsTo(models.Usuarios, {
            as: 'usuario',
            foreignKey: 'user_id'
        })
    }

    return Deposito;
}