import {DataTypes} from 'sequelize';
import sequelize from '../config';

export type PartnerAttributes = {
  id?: number;
  clientApp?: string;
  clientName?: string;
  clientId?: string;
  clientSecret?: string;
  createdAt?: Date;
  updatedAt?: Date;
};

const Partner = sequelize.define(
  'partner',
  {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
    },
    clientApp: {
      type: DataTypes.STRING,
    },
    clientName: {
      type: DataTypes.STRING,
    },
    clientId: {
      type: DataTypes.STRING,
    },
    clientSecret: {
      type: DataTypes.STRING,
    },
  },
  {
    tableName: 'partners',
    underscored: true,
    timestamps: true,
  },
);

export default Partner;
