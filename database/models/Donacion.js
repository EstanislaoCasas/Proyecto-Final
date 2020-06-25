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
        },
        user_id: {
            type: dataTypes
        },
        project_id: {
            type: dataTypes
        }
    };
    let config = {
        tableName: 'donations',
        timestamps: false
    };
    const Donacion = sequelize.define(alias, cols, config);

    Donacion.associate = function(models) {
        Donacion.belongsTo(models.Usuarios, {
            as: 'usuario',
            foreignKey: 'user_id'
        });
        Donacion.belongsTo(models.Proyectos, {
            as: 'proyecto',
            foreignKey: 'project_id'
        })
    };
    
    return Donacion;
}