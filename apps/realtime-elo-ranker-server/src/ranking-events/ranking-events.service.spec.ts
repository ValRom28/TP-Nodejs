import { Test, TestingModule } from '@nestjs/testing';
import { RankingEventsService } from './ranking-events.service';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { RankingCacheService } from '../ranking-cache/ranking-cache.service';

describe('RankingEventsService', () => {
  let service: RankingEventsService;
  let eventEmitter: EventEmitter2;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RankingEventsService,
        {
          provide: RankingCacheService,
          useValue: {
            getRanking: jest.fn().mockReturnValue(1000),
            getAllRankings: jest.fn().mockReturnValue({ player1: 1000 }),
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

    service = module.get<RankingEventsService>(RankingEventsService);
    eventEmitter = module.get<EventEmitter2>(EventEmitter2);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should notify subscribers on ranking update', () => {
    const playerId = 'player1';
    service.notifySubscribers(playerId);
    expect(eventEmitter.emit).toHaveBeenCalledWith('ranking.update', { [playerId]: 1000 });
  });

  it('should remove all listeners on module destroy', () => {
    service.onModuleDestroy();
    expect(eventEmitter.removeAllListeners).toHaveBeenCalledWith('ranking.update');
  });
});
