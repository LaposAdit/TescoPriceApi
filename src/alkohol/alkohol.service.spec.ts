import { Test, TestingModule } from '@nestjs/testing';
import { AlkoholService } from './alkohol.service';

describe('AlkoholService', () => {
  let service: AlkoholService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AlkoholService],
    }).compile();

    service = module.get<AlkoholService>(AlkoholService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
