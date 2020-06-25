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
        },
        user_id: {
            type: dataTypes.INTEGER
        },
        donations_total: {
            type: dataTypes.FLOAT(10,2),
            defaultValue: 0
        }
    };
    let config = {
        tableName: 'projects',
        timestamps: false
    };
    const Proyecto = sequelize.define(alias, cols, config);

    Proyecto.associate = function(models) {
        Proyecto.belongsTo(models.Usuarios, {
            as: 'usuario',
            foreignKey: 'user_id'
        });
        Proyecto.hasMany(models.Donaciones, {
            as: 'donacion',
            foreignKey: 'project_id'
        })
    }

    return Proyecto;
}