import { Injectable, Inject, forwardRef } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { RankingCacheService } from '../ranking-cache/ranking-cache.service';

@Injectable()
export class RankingEventsService {
  constructor(
    @Inject(forwardRef(() => RankingCacheService)) 
    private readonly rankingCacheService: RankingCacheService,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  public notifySubscribers(playerId?: string): void {
    const ranking = playerId
      ? { [playerId]: this.rankingCacheService.getRanking(playerId) }
      : this.rankingCacheService.getAllRankings();
  
    this.eventEmitter.emit('ranking.update', ranking);
  }

  onModuleDestroy() {
    this.eventEmitter.removeAllListeners('ranking.update');
  }  
}