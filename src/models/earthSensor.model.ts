import { IEarthSensor } from '@/interfaces/earthSensor.interface';
import { Sequelize, DataTypes, Model } from 'sequelize';

export class EarthSensorModel extends Model<IEarthSensor> implements IEarthSensor {
  earth_value: number;
}

export default function (sequelize: Sequelize): typeof EarthSensorModel {
  EarthSensorModel.init(
    {
      id: {
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      earth_value: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      tableName: 'earthSensor',
      sequelize,
    },
  );

  return EarthSensorModel;
}
