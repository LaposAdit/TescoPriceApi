import { Test, TestingModule } from '@nestjs/testing';
import { OvocieAZeleninyController } from './ovocie-a-zeleniny.controller';

describe('OvocieAZeleninyController', () => {
  let controller: OvocieAZeleninyController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OvocieAZeleninyController],
    }).compile();

    controller = module.get<OvocieAZeleninyController>(OvocieAZeleninyController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
