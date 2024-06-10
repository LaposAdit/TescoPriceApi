import { Test, TestingModule } from '@nestjs/testing';
import { MasoRybyALahodkyService } from './maso-ryby-a-lahodky.service';

describe('MasoRybyALahodkyService', () => {
  let service: MasoRybyALahodkyService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MasoRybyALahodkyService],
    }).compile();

    service = module.get<MasoRybyALahodkyService>(MasoRybyALahodkyService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
