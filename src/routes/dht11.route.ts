import { Router } from 'express';
import { Routes } from '@interfaces/routes.interface';
import Dht11Controller from '@/controllers/dht11.controller';

class Dht11Route implements Routes {
  public path = '/dht';
  public router = Router();
  public dhtController = new Dht11Controller();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.dhtController.getAllDht11Data);
    this.router.post(`${this.path}`, this.dhtController.createDht11);
  }
}

export default Dht11Route;
