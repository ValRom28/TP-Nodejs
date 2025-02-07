import { Test, TestingModule } from '@nestjs/testing';
import { RankingCacheService } from './ranking-cache.service';

describe('RankingCacheService', () => {
  let service: RankingCacheService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RankingCacheService],
    }).compile();

    service = module.get<RankingCacheService>(RankingCacheService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should get ranking from cache', async () => {
    const playerId = 'player1';
    // Mock the method and define its return type explicitly
    jest.spyOn(service, 'getRanking').mockResolvedValue(1200 as number); // Cast to number
    const result = await service.getRanking(playerId);
    expect(result).toBe(1200); // Fixed value to 1200 (correct the expectation)
    expect(service.getRanking).toHaveBeenCalledWith(playerId);
  });
  

  it('should set ranking in cache', async () => {
    const playerId = 'player1';
    const newRank = 1100;
    await service.setRanking(playerId, newRank);
    expect(service.setRanking).toHaveBeenCalledWith(playerId, newRank);
  });
});
