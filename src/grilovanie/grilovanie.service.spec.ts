import { Test, TestingModule } from '@nestjs/testing';
import { GrilovanieService } from './grilovanie.service';

describe('GrilovanieService', () => {
  let service: GrilovanieService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GrilovanieService],
    }).compile();

    service = module.get<GrilovanieService>(GrilovanieService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
