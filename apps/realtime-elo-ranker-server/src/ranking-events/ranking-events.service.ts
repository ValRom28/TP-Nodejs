import { Injectable } from '@nestjs/common';
import { RankingCacheService } from '../ranking-cache/ranking-cache.service';

@Injectable()
export class RankingEventsService {
  private readonly subscribers: ((ranking: Record<string, number>) => void)[] = [];

  constructor(private readonly rankingCacheService: RankingCacheService) {}

  public subscribe(callback: (ranking: Record<string, number>) => void): void {
    this.subscribers.push(callback);
  }

  public notifySubscribers(): void {
    const ranking = this.rankingCacheService.getAllRankings();
    this.subscribers.forEach(callback => callback(ranking));
  }
}