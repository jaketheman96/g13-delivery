module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define('Product', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    urlImage: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'url_image',
    },
  },
    {
      timestamps: false,
      tableName: 'products',
      underscored: true,
    });

    // Product.associate = (models) => {
    //   Product.hasMany(models.saleProduct, {
    //     foreignKey: 'productId', as: 'product'
    //   });
    // }
        
    return Product;
};

