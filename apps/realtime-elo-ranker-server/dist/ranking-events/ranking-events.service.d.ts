import { EventEmitter2 } from '@nestjs/event-emitter';
import { RankingCacheService } from '../ranking-cache/ranking-cache.service';
export declare class RankingEventsService {
    private readonly rankingCacheService;
    private readonly eventEmitter;
    constructor(rankingCacheService: RankingCacheService, eventEmitter: EventEmitter2);
    notifySubscribers(playerId?: string): void;
    onModuleDestroy(): void;
}
