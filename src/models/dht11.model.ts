import { IDht11 } from '@/interfaces/dht11.interface';
import { Sequelize, DataTypes, Model } from 'sequelize';

export class Dht11Model extends Model<IDht11> implements IDht11 {
  humidity: number;
  temperature: number;
}

export default function (sequelize: Sequelize): typeof Dht11Model {
  Dht11Model.init(
    {
      id: {
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      humidity: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      temperature: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      tableName: 'dht11',
      sequelize,
    },
  );

  return Dht11Model;
}
