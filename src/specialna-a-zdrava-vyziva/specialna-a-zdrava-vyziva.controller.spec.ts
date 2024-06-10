import { Test, TestingModule } from '@nestjs/testing';
import { SpecialnaAZdravaVyzivaController } from './specialna-a-zdrava-vyziva.controller';

describe('SpecialnaAZdravaVyzivaController', () => {
  let controller: SpecialnaAZdravaVyzivaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SpecialnaAZdravaVyzivaController],
    }).compile();

    controller = module.get<SpecialnaAZdravaVyzivaController>(SpecialnaAZdravaVyzivaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
