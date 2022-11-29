
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    role: DataTypes.STRING,
  },
    {
      timestamps: false,
      tableName: 'Users',
    });

    User.associate = (models)=> {
      User.hasMany(models.Sale, {
        foreignKey: 'userId', as: 'user'
      });
      User.hasMany(models.Sale, {
        foreignKey:'sellerId', as: 'seller'
      });
    };
    
    return User;
  };

