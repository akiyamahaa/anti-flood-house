import { IEarthSensor } from '@/interfaces/earthSensor.interface';
import EarthSensorService from '@/services/earthSensor.service';
import { RequestHandler } from 'express';

class EarthSensorController {
  public EarthSensorService = new EarthSensorService();

  public getEarthSensorData: RequestHandler = async (req, res, next) => {
    try {
      const { page = 0 } = req.query as any;
      const data: IEarthSensor[] = await this.EarthSensorService.getEarthSensor(page);
      res.status(201).json({ data });
    } catch (error) {
      next(error);
    }
  };
  public createEarthSensor: RequestHandler = async (req, res, next) => {
    try {
      const earthSensorData: any = req.body;
      const createEarthSensorData: IEarthSensor = await this.EarthSensorService.createEarthSensorData(earthSensorData);
      res.status(201).json({ data: createEarthSensorData, message: 'created' });
    } catch (error) {
      next(error);
    }
  };
}

export default EarthSensorController;
