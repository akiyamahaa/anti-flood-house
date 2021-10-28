import { IArduino } from '@/interfaces/arduino.interface';
import ArduinoService from '@/services/arduino.service';
import { RequestHandler } from 'express';

class ArduinoController {
  public ArduinoService = new ArduinoService();

  public getAllArduinoData: RequestHandler = async (req, res, next) => {
    try {
      const { page = 0 } = req.query as any;
      const data: IArduino[] = await this.ArduinoService.getArduinoData(page);
      res.status(201).json({ data });
    } catch (error) {
      next(error);
    }
  };
  public createArduino: RequestHandler = async (req, res, next) => {
    try {
      const ArduinoData: any = req.body;
      const createArduinoData: IArduino = await this.ArduinoService.createArduinoData(ArduinoData);
      res.status(201).json({ data: createArduinoData, message: 'created' });
    } catch (error) {
      next(error);
    }
  };
}

export default ArduinoController;
