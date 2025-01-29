import { RankingCacheService } from '../ranking-cache/ranking-cache.service';
import { ResponsePlayerDto } from '../player/response-player.dto';
export declare class RankingService {
    private readonly rankingCacheService;
    constructor(rankingCacheService: RankingCacheService);
    getRanking(): Promise<ResponsePlayerDto[]>;
}
