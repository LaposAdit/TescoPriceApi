import { Test, TestingModule } from '@nestjs/testing';
import { GrilovanieController } from './grilovanie.controller';

describe('GrilovanieController', () => {
  let controller: GrilovanieController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GrilovanieController],
    }).compile();

    controller = module.get<GrilovanieController>(GrilovanieController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
