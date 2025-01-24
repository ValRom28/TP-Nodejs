import { RankingCacheService } from '../ranking-cache/ranking-cache.service';
import { RankingEventsService } from '../ranking-events/ranking-events.service';
export declare class MatchService {
    private readonly rankingCacheService;
    private readonly rankingEventsService;
    private readonly matchHistory;
    constructor(rankingCacheService: RankingCacheService, rankingEventsService: RankingEventsService);
    addMatch(adversaryA: string, adversaryB: string, result: string): {
        winner: {
            id: string;
            rank: number;
        };
        loser: {
            id: string;
            rank: number;
        };
    };
    getMatchHistory(): string[];
}
