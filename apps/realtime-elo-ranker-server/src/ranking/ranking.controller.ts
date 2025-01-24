import { Controller, Get, Sse } from '@nestjs/common';
import { RankingService } from './ranking.service';
import { RankingEventsService } from '../ranking-events/ranking-events.service';
import { Observable, Subject } from 'rxjs';

interface RankingUpdateEvent {
  data: Record<string, number>;
}

@Controller('api/ranking')
export class RankingController {
  private readonly rankingUpdates = new Subject<Record<string, number>>();

  constructor(
    private readonly rankingService: RankingService,
    private readonly rankingEventsService: RankingEventsService,
  ) {
    this.rankingEventsService.subscribe((ranking) => {
      this.rankingUpdates.next(ranking);
    });
  }

  @Get()
  getRanking(): { id: string, rank: number }[] {
    return this.rankingService.getRanking();
  }

  @Sse('events')
  subscribeToRankingUpdates(): Observable<RankingUpdateEvent> {
    return new Observable((subscriber) => {
      const subscription = this.rankingUpdates.subscribe((ranking) => {
        subscriber.next({ data: ranking });
      });

      return () => subscription.unsubscribe();
    });
  }
}