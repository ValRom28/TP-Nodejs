import { Injectable } from '@nestjs/common';
import { RankingCacheService } from '../ranking-cache/ranking-cache.service';

@Injectable()
export class PlayerService {
  constructor(private readonly rankingCacheService: RankingCacheService) {}

  public createPlayer(id: string): void {
    if (!id) {
      throw new Error("playerId is required");
    }
    this.rankingCacheService.setRanking(id, 1000);
  }
}