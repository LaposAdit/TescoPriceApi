import { Test, TestingModule } from '@nestjs/testing';
import { MliecneVyrobkyAVajciaController } from './mliecne-vyrobky-a-vajcia.controller';

describe('MliecneVyrobkyAVajciaController', () => {
  let controller: MliecneVyrobkyAVajciaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MliecneVyrobkyAVajciaController],
    }).compile();

    controller = module.get<MliecneVyrobkyAVajciaController>(MliecneVyrobkyAVajciaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
