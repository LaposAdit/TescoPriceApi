import { Test, TestingModule } from '@nestjs/testing';
import { PecivoService } from './pecivo.service';

describe('PecivoService', () => {
  let service: PecivoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PecivoService],
    }).compile();

    service = module.get<PecivoService>(PecivoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
