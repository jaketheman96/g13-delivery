const { Model, DataTypes } = require('sequelize');
const Products = require('./Products');
const Sales = require('./Sales');
const { sequelize } = require('.');

class SalesProducts extends Model {}

SalesProducts.init({
  saleId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    references: {
      model: Sales,
      key: "id",
    },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  },
  productId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    references: {
      model: Products,
      key: "id",
    },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
  } }, {
    timestamps: false,
    underscored: true,
    modelName: "SalesProducts",
    tableName: "sales_products",
    sequelize,
  });

Products.belongsToMany(Sales, { through: SalesProducts, foreignKey: 'productId', as: "productsSales" });
Sales.belongsToMany(Products, { through: SalesProducts, foreignKey: 'saleId', as: "saleProducts" });

module.exports = SalesProducts;