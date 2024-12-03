import {DataTypes} from 'sequelize';
import sequelize from '../config';

export type UserAttributes = {
  id?: number;
  name?: string;
  email?: string;
  password?: string;
  created_at?: Date;
  updated_at?: Date;
};

const User = sequelize.define(
  'user',
  {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: 'Users',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  },
);

export default User;
