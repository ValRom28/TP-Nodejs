import { Injectable } from '@nestjs/common';
import { RankingCacheService } from '../ranking-cache/ranking-cache.service';
import { ResponsePlayerDto } from '../player/response-player.dto';

@Injectable()
export class RankingService {
  constructor(private readonly rankingCacheService: RankingCacheService) {}

  async getRanking(): Promise<ResponsePlayerDto[]> {
    const rankings = this.rankingCacheService.getAllRankings();
    return Object.keys(rankings).map(id => ({ id, rank: rankings[id] }));
  }
}
