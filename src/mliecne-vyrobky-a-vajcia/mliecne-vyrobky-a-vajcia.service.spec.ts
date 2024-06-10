import { Test, TestingModule } from '@nestjs/testing';
import { MliecneVyrobkyAVajciaService } from './mliecne-vyrobky-a-vajcia.service';

describe('MliecneVyrobkyAVajciaService', () => {
  let service: MliecneVyrobkyAVajciaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MliecneVyrobkyAVajciaService],
    }).compile();

    service = module.get<MliecneVyrobkyAVajciaService>(MliecneVyrobkyAVajciaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
