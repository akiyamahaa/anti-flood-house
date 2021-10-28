import DB from '@databases';
import { isEmpty } from '@utils/util';
import { HttpException } from '@exceptions/HttpException';
import { IEarthSensor } from '@/interfaces/earthSensor.interface';

class EarthSensorService {
  public EarthSensorModel = DB.EarthSensor;

  public async getEarthSensor(page: number): Promise<IEarthSensor[]> {
    const limit = 10;
    const offset = page * limit;
    return this.EarthSensorModel.findAll({ limit, offset, order: [['id', 'DESC']] });
  }

  public async createEarthSensorData(EarthSensorData: any): Promise<IEarthSensor> {
    // Check empty
    if (isEmpty(EarthSensorData)) throw new HttpException(400, "EarthSensor's data is empty!");
    // Check phone existed
    return this.EarthSensorModel.create({ ...EarthSensorData });
  }
}

export default EarthSensorService;
