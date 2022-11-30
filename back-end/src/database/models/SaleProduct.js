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
      tableName: 'saleProducts',
    });
    // SaleProduct.associate = (models) => {
    //   SaleProduct.belongsTo(models.Sale, {
    //   foreignKey: 'saleId', as: 'sale'
    // });
    // SaleProduct.belongsTo(models.Product, {
    //   foreignKey: 'productId', as: 'product'
    // });
  // };

  SaleProduct.associate = (models) => {
    models.Sale.belongsToMany(models.Product, {
      as: "products",
      through: SaleProduct,
      foreignKey: "sale_id",
      otherKey: "product_id",
    });
    models.Product.belongsToMany(models.Sale, {
      as: "sales",
      through: SaleProduct,
      foreignKey: "product_id",
      otherKey: "sale_id",
    });
  };

  return SaleProduct;
};