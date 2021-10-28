import DB from '@databases';
import { isEmpty } from '@utils/util';
import { HttpException } from '@exceptions/HttpException';
import { IDht11 } from '@/interfaces/dht11.interface';

class Dht11Service {
  public dht11Model = DB.Dht11;

  public async getDht11Data(page: number): Promise<IDht11[]> {
    const limit = 10;
    const offset = page * limit;
    return this.dht11Model.findAll({ limit, offset, order: [['id', 'DESC']] });
  }

  public async createDht11Data(dht11Data: any): Promise<IDht11> {
    // Check empty
    if (isEmpty(dht11Data)) throw new HttpException(400, "Dht11's data is empty!");
    // Check phone existed
    return this.dht11Model.create({ ...dht11Data });
  }
}

export default Dht11Service;
