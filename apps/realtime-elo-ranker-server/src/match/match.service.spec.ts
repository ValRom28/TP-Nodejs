import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MatchService } from './match.service';
import { RankingCacheService } from '../ranking-cache/ranking-cache.service';
import { RankingEventsService } from '../ranking-events/ranking-events.service';
import { Match } from './match.entity';
import { Player } from '../player/player.entity';

describe('MatchService', () => {
  let service: MatchService;
  let rankingCacheService: RankingCacheService;
  let rankingEventsService: RankingEventsService;
  let matchRepository: Repository<Match>;
  let playerRepository: Repository<Player>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MatchService,
        {
          provide: getRepositoryToken(Match),
          useValue: {
            save: jest.fn(),
            findOne: jest.fn(),
            create: jest.fn(),
          },
        },
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

    service = module.get<MatchService>(MatchService);
    rankingCacheService = module.get<RankingCacheService>(RankingCacheService);
    rankingEventsService = module.get<RankingEventsService>(RankingEventsService);
    matchRepository = module.get<Repository<Match>>(getRepositoryToken(Match));
    playerRepository = module.get<Repository<Player>>(getRepositoryToken(Player));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should add a match and update rankings', async () => {
    const createMatchDto = { winner: 'player1', loser: 'player2', draw: false };
    const winner = new Player();
    winner.id = 'player1';
    winner.rank = 1000;
    const loser = new Player();
    loser.id = 'player2';
    loser.rank = 1000;

    jest.spyOn(playerRepository, 'findOne')
      .mockResolvedValueOnce(winner)
      .mockResolvedValueOnce(loser);
    jest.spyOn(playerRepository, 'save').mockResolvedValue(new Player());
    jest.spyOn(matchRepository, 'save').mockResolvedValue(new Match());


    const result = await service.addMatch(createMatchDto);

    expect(playerRepository.findOne).toHaveBeenCalledWith({ where: { id: 'player1' } });
    expect(playerRepository.findOne).toHaveBeenCalledWith({ where: { id: 'player2' } });
    expect(matchRepository.save).toHaveBeenCalled();
    expect(rankingCacheService.setRanking).toHaveBeenCalledWith('player1', 1016);
    expect(rankingCacheService.setRanking).toHaveBeenCalledWith('player2', 984);
    expect(rankingEventsService.notifySubscribers).toHaveBeenCalled();
    expect(result).toEqual({
      winner: { id: 'player1', rank: 1016 },
      loser: { id: 'player2', rank: 984 },
      draw: false,
    });
  });
});