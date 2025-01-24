import { Injectable } from '@nestjs/common';

@Injectable()
export class RankingCacheService {
  private rankingData: Record<string, number> = {};

  public getRanking(playerId: string): number | undefined {
    return this.rankingData[playerId];
  }

  public setRanking(playerId: string, ranking: number): void {
    this.rankingData[playerId] = ranking;
  }

  public getAllRankings(): Record<string, number> {
    return this.rankingData;
  }
}