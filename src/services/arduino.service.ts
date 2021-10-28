import DB from '@databases';
import { isEmpty } from '@utils/util';
import { HttpException } from '@exceptions/HttpException';
import { IArduino } from '@/interfaces/arduino.interface';

class ArduinoService {
  public arduinoModel = DB.Arduino;

  public async getArduinoData(page: number): Promise<IArduino[]> {
    const limit = 10;
    const offset = page * limit;
    return this.arduinoModel.findAll({ limit, offset, order: [['id', 'DESC']] });
  }

  public async createArduinoData(arduinoData: { status: number }): Promise<IArduino> {
    // Check empty
    if (isEmpty(arduinoData)) throw new HttpException(400, "Arduino's data is empty!");
    // Check phone existed
    return this.arduinoModel.create({ ...arduinoData });
  }
}

export default ArduinoService;
