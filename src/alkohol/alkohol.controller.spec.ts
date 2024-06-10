import { Test, TestingModule } from '@nestjs/testing';
import { AlkoholController } from './alkohol.controller';

describe('AlkoholController', () => {
  let controller: AlkoholController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AlkoholController],
    }).compile();

    controller = module.get<AlkoholController>(AlkoholController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
