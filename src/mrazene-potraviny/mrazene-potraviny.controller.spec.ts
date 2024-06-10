import { Test, TestingModule } from '@nestjs/testing';
import { MrazenePotravinyController } from './mrazene-potraviny.controller';

describe('MrazenePotravinyController', () => {
  let controller: MrazenePotravinyController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MrazenePotravinyController],
    }).compile();

    controller = module.get<MrazenePotravinyController>(MrazenePotravinyController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
