import { Test, TestingModule } from '@nestjs/testing';
import { RankingService } from './ranking.service';
import { RankingCacheService } from '../ranking-cache/ranking-cache.service';
import { RankingEventsService } from '../ranking-events/ranking-events.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Player } from '../player/player.entity';
import { Repository } from 'typeorm';

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
    rankingCacheService = module.get<RankingCacheService>(RankingCacheService);
    rankingEventsService = module.get<RankingEventsService>(RankingEventsService);
    playerRepository = module.get<Repository<Player>>(getRepositoryToken(Player));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should update player ranking and notify subscribers', async () => {
    const playerId = 'player1';
    const newRank = 1050;

    jest.spyOn(playerRepository, 'findOne').mockResolvedValue({ id: playerId, rank: 1000 } as Player);
    await service.updatePlayerRanking(playerId, newRank);

    expect(rankingCacheService.setRanking).toHaveBeenCalledWith(playerId, newRank);
    expect(rankingEventsService.notifySubscribers).toHaveBeenCalled();
  });
});
