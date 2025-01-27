import { Injectable } from '@nestjs/common';

@Injectable()
export class RankingCacheService {
  private rankingData: Record<string, number> = {};

  public getRanking(id: string): number | undefined {
    return this.rankingData[id];
  }

  public setRanking(id: string, ranking: number): void {
    this.rankingData[id] = ranking;
  }

  public getAllRankings(): Record<string, number> {
    return this.rankingData;
  }
}