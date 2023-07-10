import { DataTypes, Model, ModelDefined, Optional } from 'sequelize';
import { Product } from '../../types/Product';
import db from './index';
import OrderModel from './order.model';
import UserModel from './user.model';

export type ProductInputtableTypes = Optional<Product, 'id'>;
type ProductSequelizeModelCreator = ModelDefined<Product, ProductInputtableTypes>;
export type ProductSequelizeModel = Model<Product, ProductInputtableTypes>;

const ProductModel: ProductSequelizeModelCreator = db.define('Product', {
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  price: {
    type: DataTypes.STRING(30),
    allowNull: false,
  },
  orderId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, {
  tableName: 'products',
  timestamps: false,
  underscored: true,
});

UserModel.hasMany(OrderModel, { foreignKey: 'userId' });
OrderModel.belongsTo(UserModel, { foreignKey: 'userId' });

OrderModel.hasMany(ProductModel, { foreignKey: 'orderId', as: 'productIds' });
ProductModel.belongsTo(OrderModel, { foreignKey: 'orderId' });

export default ProductModel;
