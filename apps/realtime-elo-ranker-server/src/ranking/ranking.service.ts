import { Injectable } from '@nestjs/common';
import { RankingCacheService } from '../ranking-cache/ranking-cache.service';

@Injectable()
export class RankingService {
  constructor(private readonly rankingCacheService: RankingCacheService) {}

  public getRanking(): { id: string, rank: number }[] {
    const rankings = this.rankingCacheService.getAllRankings();
    return Object.keys(rankings).map(key => ({ id: key, rank: rankings[key] }));
  }
}