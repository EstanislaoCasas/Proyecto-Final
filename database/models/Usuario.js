module.exports = (sequelize, dataTypes) => {
    let alias = 'Usuarios';
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: dataTypes.STRING
        },
        first_name: {
            type: dataTypes.STRING
        },
        last_name: {
            type: dataTypes.STRING
        },
        identification_number: {
            type: dataTypes.INTEGER
        },
        avatar: {
            type: dataTypes.STRING
        },
        email: {
            type: dataTypes.STRING
        },
        password: {
            type: dataTypes.STRING
        },
        amount: {
            type: dataTypes.INTEGER
        },
        type: {
            type: dataTypes.STRING
        },
        created_at: {
            type: dataTypes.DATE
        },
        updated_at: {
            type: dataTypes.DATE
        }
    };
    let config = {
        tableName: 'users',
        timestamps: false
    };
    const Usuario = sequelize.define(alias, cols, config);

    return Usuario;
}