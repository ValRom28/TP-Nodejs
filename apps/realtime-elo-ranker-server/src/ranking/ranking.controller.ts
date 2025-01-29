import { Controller, Get, Sse } from '@nestjs/common';
import { Observable, Subject } from 'rxjs';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { RankingService } from './ranking.service';
import { RankingEventsService } from '../ranking-events/ranking-events.service';

interface RankingUpdateEvent {
  type: string;
  player: {
    id: string;
    rank: number;
  };
}

@Controller('api/ranking')
export class RankingController {
  private readonly rankingUpdates = new Subject<RankingUpdateEvent>();

  constructor(
    private readonly rankingService: RankingService,
    private readonly rankingEventsService: RankingEventsService,
    private readonly eventEmitter: EventEmitter2,
  ) {
    this.eventEmitter.on('ranking.update', (ranking) => {
      for (const playerId in ranking) {
        this.rankingUpdates.next({
          type: 'RankingUpdate',
          player: {
            id: playerId,
            rank: ranking[playerId],
          },
        });
      }
    });
  }

  @Get()
  async getRanking(): Promise<{ id: string, rank: number }[]> {
    return await this.rankingService.getRanking();
  }

  @Sse('events')
  subscribeToRankingUpdates(): Observable<MessageEvent> {
    return new Observable((subscriber) => {
      const subscription = this.rankingUpdates.subscribe({
        next: (rankingUpdate) => {
          subscriber.next(new MessageEvent('message', {
            data: JSON.stringify(rankingUpdate),
          }));
        },
        error: (err) => {
          subscriber.error({
            type: 'Error',
            message: err.message,
          });
        },
      });

      return () => subscription.unsubscribe();
    });
  }
}
