import { RankingCacheService } from '../ranking-cache/ranking-cache.service';
export declare class PlayerService {
    private readonly rankingCacheService;
    constructor(rankingCacheService: RankingCacheService);
    createPlayer(id: string): void;
}
