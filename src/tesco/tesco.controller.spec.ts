import { Test, TestingModule } from '@nestjs/testing';
import { TescoController } from './tesco.controller';

describe('TescoController', () => {
  let controller: TescoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TescoController],
    }).compile();

    controller = module.get<TescoController>(TescoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
