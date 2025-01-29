import { Observable } from 'rxjs';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { RankingService } from './ranking.service';
import { RankingEventsService } from '../ranking-events/ranking-events.service';
export declare class RankingController {
    private readonly rankingService;
    private readonly rankingEventsService;
    private readonly eventEmitter;
    private readonly rankingUpdates;
    constructor(rankingService: RankingService, rankingEventsService: RankingEventsService, eventEmitter: EventEmitter2);
    getRanking(): Promise<{
        id: string;
        rank: number;
    }[]>;
    subscribeToRankingUpdates(): Observable<MessageEvent>;
}
