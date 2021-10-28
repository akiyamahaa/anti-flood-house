import { Router } from 'express';
import { Routes } from '@interfaces/routes.interface';
import ArduinoController from '@/controllers/arduino.controller';

class ArduinoRoute implements Routes {
  public path = '/arduino';
  public router = Router();
  public arduinoController = new ArduinoController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.arduinoController.getAllArduinoData);
    this.router.post(`${this.path}`, this.arduinoController.createArduino);
  }
}

export default ArduinoRoute;
