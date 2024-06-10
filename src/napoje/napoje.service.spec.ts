import { Test, TestingModule } from '@nestjs/testing';
import { NapojeService } from './napoje.service';

describe('NapojeService', () => {
  let service: NapojeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NapojeService],
    }).compile();

    service = module.get<NapojeService>(NapojeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
