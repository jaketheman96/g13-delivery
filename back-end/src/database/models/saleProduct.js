module.exports = (sequelize, DataTypes) => {
  const SaleProduct = sequelize.define('SaleProduct', {
    saleId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      foreignKey: true,
    },
    productId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      foreignKey: true,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    }
  },
    {
      timestamps: false,
      tableName: 'SaleProduct',
    });
    SaleProduct.associate = (models) => {
      SaleProduct.belongsTo(models.Sale, {
      foreignKey: 'saleId', as: 'sale'
    });
    SaleProduct.belongsTo(models.Product, {
      foreignKey: 'productId', as: 'product'
    });
  };

  return SaleProduct;
};