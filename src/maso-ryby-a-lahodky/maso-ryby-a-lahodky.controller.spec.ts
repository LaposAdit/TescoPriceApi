import { Test, TestingModule } from '@nestjs/testing';
import { MasoRybyALahodkyController } from './maso-ryby-a-lahodky.controller';

describe('MasoRybyALahodkyController', () => {
  let controller: MasoRybyALahodkyController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MasoRybyALahodkyController],
    }).compile();

    controller = module.get<MasoRybyALahodkyController>(MasoRybyALahodkyController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
