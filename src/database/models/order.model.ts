import { DataTypes, Model, ModelDefined, Optional } from 'sequelize';
import { Order } from '../../types/Order';
import db from './index';

export type OrderInputtableTypes = Optional<Order, 'id'>;
type OrderSequelizeModelCreator = ModelDefined<Order, OrderInputtableTypes>;
export type OrderSequelizeModel = Model<Order, OrderInputtableTypes>;

const OrderModel: OrderSequelizeModelCreator = db.define('Order', {
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    primaryKey: true,
    autoIncrement: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, {
  tableName: 'orders',
  timestamps: false,
  underscored: true,
});

export default OrderModel;
