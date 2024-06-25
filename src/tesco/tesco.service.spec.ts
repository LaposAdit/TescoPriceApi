import { Test, TestingModule } from '@nestjs/testing';
import { TescoService } from './tesco.service';

describe('TescoService', () => {
  let service: TescoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TescoService],
    }).compile();

    service = module.get<TescoService>(TescoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
