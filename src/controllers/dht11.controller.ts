import { IDht11 } from '@/interfaces/dht11.interface';
import Dht11Service from '@/services/dht11.service';
import { RequestHandler } from 'express';

class Dht11Controller {
  public Dht11Service = new Dht11Service();

  public getAllDht11Data: RequestHandler = async (req, res, next) => {
    try {
      const { page = 0 } = req.query as any;
      const data: IDht11[] = await this.Dht11Service.getDht11Data(page);
      res.status(201).json({ data });
    } catch (error) {
      next(error);
    }
  };
  public createDht11: RequestHandler = async (req, res, next) => {
    try {
      const dht11Data: any = req.body;
      const createDht11Data: IDht11 = await this.Dht11Service.createDht11Data(dht11Data);
      res.status(201).json({ data: createDht11Data, message: 'created' });
    } catch (error) {
      next(error);
    }
  };
}

export default Dht11Controller;
