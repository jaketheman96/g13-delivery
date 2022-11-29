
module.exports = (sequelize, DataTypes) => {
  const Sale = sequelize.define('Sale', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true
    },
    userId: {
      type:DataTypes.INTEGER,
      allowNull: false,
      foreignKey: true,
    },
    sellerId: {
      type:DataTypes.INTEGER,
      allowNull: false,
      foreignKey: true,
    },
    totalPrice: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    deliveryAddress: {
      type: DataTypes.STRING,
      allowNull: false
    },
    deliveryNumber: {
      type: DataTypes.STRING,
      allowNull: false
    },
    saleDate: {
      type: DataTypes.DATE,
      allowNull: false
    },
  },
    {
      timestamps: false,
      tableName: 'Sales',
    });
    Sale.associate = (models) => {
      Sale.belongsTo(models.User, {
        foreignKey: 'userId', as: 'user' 
      });
      Sale.belongsTo(models.User, {
        foreignKey: 'sellerId', as: 'seller' 
      });
      Sale.hasMany(models.SaleProduct, {
        foreignKey: 'saleId', as: 'sale'
      })
    };

    return Sale;
};

