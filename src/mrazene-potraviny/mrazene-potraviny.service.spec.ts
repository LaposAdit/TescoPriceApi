import { Test, TestingModule } from '@nestjs/testing';
import { MrazenePotravinyService } from './mrazene-potraviny.service';

describe('MrazenePotravinyService', () => {
  let service: MrazenePotravinyService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MrazenePotravinyService],
    }).compile();

    service = module.get<MrazenePotravinyService>(MrazenePotravinyService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
