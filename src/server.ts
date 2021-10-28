process.env['NODE_CONFIG_DIR'] = __dirname + '/configs';

import 'dotenv/config';
import App from '@/app';
import AuthRoute from '@routes/auth.route';
import IndexRoute from '@routes/index.route';
import UsersRoute from '@routes/users.route';
import ArduinoRoute from './routes/arduino.route';
import Dht11Route from './routes/dht11.route';
import EarthSensorRoute from './routes/earthSensor.route';
import validateEnv from '@utils/validateEnv';
import { createServer } from 'http';

validateEnv();

const app = new App([new IndexRoute(), new UsersRoute(), new AuthRoute(), new ArduinoRoute(), new Dht11Route(), new EarthSensorRoute()]);

// app.listen();
console.log('====');

import Server = require('socket.io');
import { Socket } from 'socket.io';
import Dht11Service from './services/dht11.service';
import EarthSensorService from './services/earthSensor.service';
import ArduinoService from './services/arduino.service';

const httpServer = createServer(app.getServer());
const io = new Server(httpServer, {
  // ...
});

const dhtService = new Dht11Service();
const earthService = new EarthSensorService();
const arduinoService = new ArduinoService();

const createEarth = async (earthData: { earth_value: number }) => {
  return earthService.createEarthSensorData(earthData);
};
const createDht = async (dhtData: { humidity: number; temperature: number }) => {
  return dhtService.createDht11Data(dhtData);
};
const createArduino = async (arduinoData: { status: number }) => {
  return arduinoService.createArduinoData(arduinoData);
};
io.on('connection', (socket: Socket) => {
  console.log('====== New connection');

  socket.on('arduino', function (msg) {
    console.log('message arduino: ' + msg);
    createArduino({ status: parseInt(msg) });
  });
  socket.on('dht', function (msg) {
    const hud = msg.slice(0, 5);
    const temp = msg.slice(5, 11);
    createDht({ humidity: hud, temperature: temp });
  });

  socket.on('earth', function (msg) {
    console.log('message EARTH: ' + msg);
    createEarth({ earth_value: parseInt(msg) });
  });
});

httpServer.listen(3000);
