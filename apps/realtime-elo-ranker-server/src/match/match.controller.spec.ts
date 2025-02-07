import { Test, TestingModule } from '@nestjs/testing';
import { MatchController } from './match.controller';
import { MatchService } from './match.service';
import { CreateMatchDto } from './create-match.dto';

describe('MatchController', () => {
  let controller: MatchController;
  let service: MatchService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MatchController],
      providers: [
        {
          provide: MatchService,
          useValue: {
            addMatch: jest.fn().mockResolvedValue({
              winner: { id: 'player1', rank: 1016 },
              loser: { id: 'player2', rank: 984 },
            }),
          },
        },
      ],
    }).compile();

    controller = module.get<MatchController>(MatchController);
    service = module.get<MatchService>(MatchService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should add a match', async () => {
    const createMatchDto: CreateMatchDto = { winner: 'player1', loser: 'player2', draw: false };
    const result = await controller.postMatch(createMatchDto);
    expect(result).toEqual({
      winner: { id: 'player1', rank: 1016 },
      loser: { id: 'player2', rank: 984 },
    });
    expect(service.addMatch).toHaveBeenCalledWith(createMatchDto);
  });
});