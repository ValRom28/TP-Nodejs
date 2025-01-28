import { Injectable } from '@nestjs/common';
import { RankingCacheService } from '../ranking-cache/ranking-cache.service';
import { RankingEventsService } from 'src/ranking-events/ranking-events.service';

@Injectable()
export class PlayerService {
  constructor(
    private readonly rankingCacheService: RankingCacheService,
    private readonly rankingEventsService: RankingEventsService,
  ) {}

  public createPlayer(id: string): void {
    if (!id) {
      throw new Error("id is required");
    }
    this.rankingCacheService.setRanking(id, 1000);
    this.rankingEventsService.notifySubscribers(id);
  }
}