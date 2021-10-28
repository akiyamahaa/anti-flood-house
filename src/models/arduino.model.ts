import { IArduino } from '@/interfaces/arduino.interface';
import { Sequelize, DataTypes, Model } from 'sequelize';

export class ArduinoModel extends Model<IArduino> implements IArduino {
  status: number;
}

export default function (sequelize: Sequelize): typeof ArduinoModel {
  ArduinoModel.init(
    {
      id: {
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      status: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      tableName: 'arduino',
      sequelize,
    },
  );

  return ArduinoModel;
}
