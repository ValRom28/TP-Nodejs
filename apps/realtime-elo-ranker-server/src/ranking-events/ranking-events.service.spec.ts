import { Test, TestingModule } from '@nestjs/testing';
import { RankingEventsService } from './ranking-events.service';
import { EventEmitter2 } from '@nestjs/event-emitter';

describe('RankingEventsService', () => {
  let service: RankingEventsService;
  let eventEmitter: EventEmitter2;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RankingEventsService,
        {
          provide: EventEmitter2,
          useValue: {
            emit: jest.fn(),
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
    const mockRanking = { playerId: 'player1', rank: 1000 };
    service.notifySubscribers(mockRanking.playerId);
    expect(eventEmitter.emit).toHaveBeenCalledWith('rankingUpdated', mockRanking);
  });
});
