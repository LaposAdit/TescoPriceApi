import { Test, TestingModule } from '@nestjs/testing';
import { NapojeController } from './napoje.controller';

describe('NapojeController', () => {
  let controller: NapojeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NapojeController],
    }).compile();

    controller = module.get<NapojeController>(NapojeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
