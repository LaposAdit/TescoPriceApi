import { Test, TestingModule } from '@nestjs/testing';
import { SpecialnaAZdravaVyzivaService } from './specialna-a-zdrava-vyziva.service';

describe('SpecialnaAZdravaVyzivaService', () => {
  let service: SpecialnaAZdravaVyzivaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SpecialnaAZdravaVyzivaService],
    }).compile();

    service = module.get<SpecialnaAZdravaVyzivaService>(SpecialnaAZdravaVyzivaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
