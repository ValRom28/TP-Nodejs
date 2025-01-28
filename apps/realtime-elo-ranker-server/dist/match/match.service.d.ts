import { RankingCacheService } from '../ranking-cache/ranking-cache.service';
import { RankingEventsService } from '../ranking-events/ranking-events.service';
export declare class MatchService {
    private readonly rankingCacheService;
    private readonly rankingEventsService;
    private readonly matchHistory;
    private readonly K;
    constructor(rankingCacheService: RankingCacheService, rankingEventsService: RankingEventsService);
    addMatch(winner: string, loser: string, draw: boolean): {
        winner: {
            id: string;
            rank: number;
        };
        loser: {
            id: string;
            rank: number;
        };
    };
    private calculateWinProbability;
    private calculateNewRanking;
    getMatchHistory(): string[];
}
