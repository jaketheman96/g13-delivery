module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define('Product', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true
    },
    name: {
      type:DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
      urlImage: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: sequelize.NOW,
    },
  },
    {
      timestamps: false,
      tableName: 'Products',
    });

    Product.associate = (models) => {
      Product.hasMany(models.saleProduct, {
        foreignKey: 'productId', as: 'product'
      });
    }
        
    return Product;
};

