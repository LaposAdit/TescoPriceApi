import { Test, TestingModule } from '@nestjs/testing';
import { PecivoController } from './pecivo.controller';

describe('PecivoController', () => {
  let controller: PecivoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PecivoController],
    }).compile();

    controller = module.get<PecivoController>(PecivoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
