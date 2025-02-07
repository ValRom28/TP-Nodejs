import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PlayerService } from './player.service';
import { CreatePlayerDto } from './create-player.dto';
import { RankingCacheService } from '../ranking-cache/ranking-cache.service';
import { RankingEventsService } from '../ranking-events/ranking-events.service';
import { Player } from './player.entity';

describe('PlayerService', () => {
  let service: PlayerService;
  let rankingCacheService: RankingCacheService;
  let rankingEventsService: RankingEventsService;
  let playerRepository: Repository<Player>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PlayerService,
        {
          provide: getRepositoryToken(Player),
          useClass: Repository,
        },
        {
          provide: RankingCacheService,
          useValue: {
            setRanking: jest.fn(),
            getRanking: jest.fn(),
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

    service = module.get<PlayerService>(PlayerService);
    rankingCacheService = module.get<RankingCacheService>(RankingCacheService);
    rankingEventsService = module.get<RankingEventsService>(RankingEventsService);
    playerRepository = module.get<Repository<Player>>(getRepositoryToken(Player));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a player with initial ranking', async () => {
    const createPlayerDto: CreatePlayerDto = { id: 'player1' };
    const player = new Player();
    player.id = 'player1';
    player.rank = 1000;

    jest.spyOn(playerRepository, 'findOne').mockResolvedValueOnce(null);
    jest.spyOn(playerRepository, 'create').mockReturnValue(player);
    jest.spyOn(playerRepository, 'save').mockResolvedValueOnce(player);

    const result = await service.createPlayer(createPlayerDto);

    expect(playerRepository.findOne).toHaveBeenCalledWith({ where: { id: 'player1' } });
    expect(playerRepository.create).toHaveBeenCalledWith({ id: 'player1' });
    expect(playerRepository.save).toHaveBeenCalledWith(player);
    expect(rankingCacheService.setRanking).toHaveBeenCalledWith('player1', 1000);
    expect(rankingEventsService.notifySubscribers).toHaveBeenCalledWith('player1');
    expect(result).toEqual({ id: 'player1', rank: 1000 });
  });

  it('should return existing player if already exists', async () => {
    const createPlayerDto: CreatePlayerDto = { id: 'player1' };
    const player = new Player();
    player.id = 'player1';
    player.rank = 1000;

    jest.spyOn(playerRepository, 'findOne').mockResolvedValueOnce(player);
    jest.spyOn(playerRepository, 'create').mockReturnValue(player);
    jest.spyOn(playerRepository, 'save').mockResolvedValueOnce(player);

    const result = await service.createPlayer(createPlayerDto);

    expect(playerRepository.findOne).toHaveBeenCalledWith({ where: { id: 'player1' } });
    expect(playerRepository.create).not.toHaveBeenCalled();
    expect(playerRepository.save).not.toHaveBeenCalled();
    expect(rankingCacheService.setRanking).toHaveBeenCalledWith('player1', 1000);
    expect(rankingEventsService.notifySubscribers).toHaveBeenCalledWith('player1');
    expect(result).toEqual({ id: 'player1', rank: 1000 });
  });
});