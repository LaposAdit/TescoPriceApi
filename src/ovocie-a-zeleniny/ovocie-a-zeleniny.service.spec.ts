import { Test, TestingModule } from '@nestjs/testing';
import { OvocieAZeleninyService } from './ovocie-a-zeleniny.service';

describe('OvocieAZeleninyService', () => {
  let service: OvocieAZeleninyService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OvocieAZeleninyService],
    }).compile();

    service = module.get<OvocieAZeleninyService>(OvocieAZeleninyService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
