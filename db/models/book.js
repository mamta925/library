module.exports = function(sequelize, DataTypes) {
    return (Book = sequelize.define(
        'Book',
        {
            Id: {
                type: DataTypes.INTEGER(11),
                allowNull: false,
                primaryKey: true,
                autoIncrement: true
            },
            libraryId:{
                type: DataTypes.INTEGER(11),
                allowNull: false
            },
            title: {
                type: DataTypes.STRING,
                allowNull: false
            },
            author:{
                type: DataTypes.STRING,
                allowNull: false 
            },
            ISBN:{
                type: DataTypes.STRING,
                allowNull: false,
                unique: true 
            },
            releaseDate:{
                type: DataTypes.DATE,
                allowNull: false
            }
        },
        {
            tableName: 'book',
            createdAt: 'created_at',
            updatedAt: 'updated_at',
            timestamps: true
        }
    ));
};
