import { Repository } from 'typeorm';
import { Match } from './match.entity';
import { Player } from '../player/player.entity';
import { RankingCacheService } from '../ranking-cache/ranking-cache.service';
import { RankingEventsService } from '../ranking-events/ranking-events.service';
import { CreateMatchDto } from './create-match.dto';
import { ResponseMatchDto } from './response-match.dto';
export declare class MatchService {
    private readonly matchRepository;
    private readonly playerRepository;
    private readonly rankingCacheService;
    private readonly rankingEventsService;
    private readonly K;
    constructor(matchRepository: Repository<Match>, playerRepository: Repository<Player>, rankingCacheService: RankingCacheService, rankingEventsService: RankingEventsService);
    addMatch(createMatchDto: CreateMatchDto): Promise<ResponseMatchDto>;
    getMatchHistory(): Promise<{
        id: number;
        winner: string;
        loser: string;
        draw: boolean;
    }[]>;
}
