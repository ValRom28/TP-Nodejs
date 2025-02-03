import { Repository } from 'typeorm';
import { Player } from './player.entity';
import { RankingCacheService } from '../ranking-cache/ranking-cache.service';
import { RankingEventsService } from '../ranking-events/ranking-events.service';
import { CreatePlayerDto } from './create-player.dto';
import { ResponsePlayerDto } from './response-player.dto';
export declare class PlayerService {
    private readonly playerRepository;
    private readonly rankingCacheService;
    private readonly rankingEventsService;
    constructor(playerRepository: Repository<Player>, rankingCacheService: RankingCacheService, rankingEventsService: RankingEventsService);
    createPlayer(createPlayerDto: CreatePlayerDto): Promise<ResponsePlayerDto>;
}
