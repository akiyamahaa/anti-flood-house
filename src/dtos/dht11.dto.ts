import { IsNumber } from 'class-validator';

export class CreateDht11Dto {
  @IsNumber()
  public humidity: number;

  @IsNumber()
  public temperature: number;
}
