import { RankingCacheService } from '../ranking-cache/ranking-cache.service';
export declare class RankingEventsService {
    private readonly rankingCacheService;
    private readonly subscribers;
    constructor(rankingCacheService: RankingCacheService);
    subscribe(callback: (ranking: Record<string, number>) => void): void;
    notifySubscribers(): void;
}
