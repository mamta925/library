module.exports = function(sequelize, DataTypes) {
    return (Library = sequelize.define(
        'Library',
        {
            Id: {
                type: DataTypes.INTEGER(11),
                allowNull: false,
                primaryKey: true,
                autoIncrement: true
            },
            Name: {
                type: DataTypes.STRING,
                allowNull: false
            }
        },
        {
            tableName: 'library',
            createdAt: 'created_at',
            updatedAt: 'updated_at',
            timestamps: true
        }
    ));
};
