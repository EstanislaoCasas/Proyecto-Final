module.exports = (sequelize, dataTypes) => {
    let alias = 'Proyectos';
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        title: {
            type: dataTypes.STRING
        },
        short_description: {
            type: dataTypes.STRING
        },
        long_description: {
            type: dataTypes.STRING
        },
        amount: {
            type: dataTypes.INTEGER
        },
        created_at: {
            type: dataTypes.DATE
        },
        updated_at: {
            type: dataTypes.DATE
        }
    };
    let config = {
        tableName: 'projects',
        timestamps: false
    };
    const Proyecto = sequelize.define(alias, cols, config);

    Proyecto.associate = function(models) {
        Proyecto.belongsTo(models.Usuarios, {
            as: 'fk_projects_users',
            foreignKey: 'user_id'
        });
    }

    return Proyecto;
}