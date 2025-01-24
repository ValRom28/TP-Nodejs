import { Injectable } from '@nestjs/common';
import { RankingCacheService } from '../ranking-cache/ranking-cache.service';

@Injectable()
export class PlayerService {
  constructor(private readonly rankingCacheService: RankingCacheService) {}

  public createPlayer(playerId: string): void {
    this.rankingCacheService.setRanking(playerId, 1000);
  }
}