import { RankingCacheService } from '../ranking-cache/ranking-cache.service';
import { RankingEventsService } from 'src/ranking-events/ranking-events.service';
export declare class PlayerService {
    private readonly rankingCacheService;
    private readonly rankingEventsService;
    constructor(rankingCacheService: RankingCacheService, rankingEventsService: RankingEventsService);
    createPlayer(id: string): void;
}
