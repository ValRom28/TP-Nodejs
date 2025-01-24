import { RankingService } from './ranking.service';
import { RankingEventsService } from '../ranking-events/ranking-events.service';
import { Observable } from 'rxjs';
interface RankingUpdateEvent {
    data: Record<string, number>;
}
export declare class RankingController {
    private readonly rankingService;
    private readonly rankingEventsService;
    private readonly rankingUpdates;
    constructor(rankingService: RankingService, rankingEventsService: RankingEventsService);
    getRanking(): {
        id: string;
        rank: number;
    }[];
    subscribeToRankingUpdates(): Observable<RankingUpdateEvent>;
}
export {};
