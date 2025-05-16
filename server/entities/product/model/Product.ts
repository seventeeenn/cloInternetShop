import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../../../shared/db/sequelize';

export interface ProductData {
    id: number;
    name: string;
    description: string;
    price: number;
    discount_price: number;
    quantity: number;
    image: string;
}

export const Review = sequelize.define<Model<ProductData>>('products', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING(200),
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING(500),
    allowNull: false,
  },
  price: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  discount_price: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  image: {
    type: DataTypes.STRING(200),
    allowNull: false,
  },
}, {
  tableName: 'products',
  timestamps: false,
});
