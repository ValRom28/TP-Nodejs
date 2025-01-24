import { RankingCacheService } from '../ranking-cache/ranking-cache.service';
export declare class RankingService {
    private readonly rankingCacheService;
    constructor(rankingCacheService: RankingCacheService);
    getRanking(): {
        id: string;
        rank: number;
    }[];
}
