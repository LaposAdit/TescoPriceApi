import { Test, TestingModule } from '@nestjs/testing';
import { TrvanlivePotravinyController } from './trvanlive-potraviny.controller';

describe('TrvanlivePotravinyController', () => {
  let controller: TrvanlivePotravinyController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TrvanlivePotravinyController],
    }).compile();

    controller = module.get<TrvanlivePotravinyController>(TrvanlivePotravinyController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
