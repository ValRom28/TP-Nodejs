import { Test, TestingModule } from '@nestjs/testing';
import { RankingCacheService } from './ranking-cache.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Player } from '../player/player.entity';
import { RankingEventsService } from '../ranking-events/ranking-events.service';
import { EventEmitter2 } from '@nestjs/event-emitter';

describe('RankingCacheService', () => {
  let service: RankingCacheService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RankingCacheService,
        {
          provide: getRepositoryToken(Player),
          useValue: {
            find: jest.fn().mockResolvedValue([]),
            save: jest.fn(),
          },
        },
        {
          provide: RankingEventsService,
          useValue: {
            notifySubscribers: jest.fn(),
          },
        },
        {
          provide: EventEmitter2,
          useValue: {
            emit: jest.fn(),
            removeAllListeners: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<RankingCacheService>(RankingCacheService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should get ranking from cache', () => {
    const playerId = 'player1';
    service.setRanking(playerId, 1200); // Set ranking in cache
    const result = service.getRanking(playerId);
    expect(result).toBe(1200);
  });

  it('should set ranking in cache', () => {
    const playerId = 'player1';
    const newRank = 1100;
    service.setRanking(playerId, newRank);
    expect(service.getRanking(playerId)).toBe(newRank);
  });
});
