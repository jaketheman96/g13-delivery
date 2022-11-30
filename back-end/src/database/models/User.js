
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    role: DataTypes.STRING,
  },
    {
      timestamps: false,
      tableName: 'users',
      underscored: true,
    });

    User.associate = (models)=> {
      User.hasMany(models.Sale, {
        foreignKey: 'userId', as: 'user'
      });
      User.hasMany(models.Sale, {
        foreignKey:'sellerId', as: 'seller'
      });
    };

    User.associate = (models) => {
      User.hasOne(models.Sale,
        { foreignKey: 'user_id', as: 'userSale' });

      User.hasOne(models.Sale,
        { foreignKey: 'seller_id', as: 'sellerSale' });
    };
    
    return User;
  };

