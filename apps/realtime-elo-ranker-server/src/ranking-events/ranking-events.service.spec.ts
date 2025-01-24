import { Test, TestingModule } from '@nestjs/testing';
import { RankingEventsService } from './ranking-events.service';

describe('RankingEventsService', () => {
  let service: RankingEventsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RankingEventsService],
    }).compile();

    service = module.get<RankingEventsService>(RankingEventsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
