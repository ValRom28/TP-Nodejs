import { Test, TestingModule } from '@nestjs/testing';
import { RankingController } from './ranking.controller';
import { RankingService } from './ranking.service';
import { RankingEventsService } from '../ranking-events/ranking-events.service';
import { EventEmitter2 } from '@nestjs/event-emitter';

describe('RankingController', () => {
  let controller: RankingController;
  let service: RankingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RankingController],
      providers: [
        {
          provide: RankingService,
          useValue: {
            getRanking: jest.fn().mockReturnValue([
              { id: 'player1', rank: 1000 },
              { id: 'player2', rank: 1100 },
            ]),
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
          },
        },
      ],
    }).compile();

    controller = module.get<RankingController>(RankingController);
    service = module.get<RankingService>(RankingService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should get ranking', () => {
    const result = controller.getRanking();
    expect(result).toEqual([
      { id: 'player1', rank: 1000 },
      { id: 'player2', rank: 1100 },
    ]);
    expect(service.getRanking).toHaveBeenCalled();
  });
});
