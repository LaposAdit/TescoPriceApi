import { Test, TestingModule } from '@nestjs/testing';
import { TrvanlivePotravinyService } from './trvanlive-potraviny.service';

describe('TrvanlivePotravinyService', () => {
  let service: TrvanlivePotravinyService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TrvanlivePotravinyService],
    }).compile();

    service = module.get<TrvanlivePotravinyService>(TrvanlivePotravinyService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
