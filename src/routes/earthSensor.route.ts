import { Router } from 'express';
import { Routes } from '@interfaces/routes.interface';
import EarthSensorController from '@/controllers/earthSensor.controller';

class EarthSensorRoute implements Routes {
  public path = '/earth';
  public router = Router();
  public earthController = new EarthSensorController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    // get all categories pagination
    this.router.get(`${this.path}`, this.earthController.getEarthSensorData);
    // create category
    this.router.post(`${this.path}`, this.earthController.createEarthSensor);
  }
}

export default EarthSensorRoute;
