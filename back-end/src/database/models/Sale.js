
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
      references: {
        model: 'users',
        key: 'id'
      }
    },
    sellerId: {
      type:DataTypes.INTEGER,
      allowNull: false,
      foreignKey: true,
      references: {
        model: 'users',
        key: 'id'
      }
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
    status: {
      type: DataTypes.STRING,
      allowNull: false
    },
  },
    {
      timestamps: false,
      tableName: 'sales',
      underscored: true,
    });
    // Sale.associate = (models) => {
    //   Sale.belongsTo(models.User, {
    //     foreignKey: 'userId', as: 'user' 
    //   });
    //   Sale.belongsTo(models.User, {
    //     foreignKey: 'sellerId', as: 'seller' 
    //   });
    //   Sale.hasMany(models.SaleProduct, {
    //     foreignKey: 'saleId', as: 'sale'
    //   })
    // };


    Sale.associate = (models) => {
      Sale.belongsTo(models.User,
        { foreignKey: 'user_id', as: 'buyer' });

      Sale.belongsTo(models.User,
        { foreignKey: 'seller_id', as: 'seller' });
    };


    return Sale;
};

