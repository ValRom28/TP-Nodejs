import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RankingService } from './ranking.service';
import { RankingCacheService } from '../ranking-cache/ranking-cache.service';
import { RankingEventsService } from '../ranking-events/ranking-events.service';
import { Player } from '../player/player.entity';

describe('RankingService', () => {
  let service: RankingService;
  let rankingCacheService: RankingCacheService;
  let rankingEventsService: RankingEventsService;
  let playerRepository: Repository<Player>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RankingService,
        {
          provide: getRepositoryToken(Player),
          useClass: Repository,
        },
        {
          provide: RankingCacheService,
          useValue: {
            getRanking: jest.fn().mockReturnValue(1000),
            setRanking: jest.fn(),
            getAllRankings: jest.fn().mockReturnValue({ player1: 1000, player2: 1100 }),
          },
        },
        {
          provide: RankingEventsService,
          useValue: {
            notifySubscribers: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<RankingService>(RankingService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should get ranking', async () => {
    const ranking = await service.getRanking();
    expect(ranking).toEqual([
      { id: 'player1', rank: 1000 },
      { id: 'player2', rank: 1100 },
    ]);
  });
});