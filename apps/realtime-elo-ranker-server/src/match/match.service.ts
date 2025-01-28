import { Injectable } from '@nestjs/common';
import { RankingCacheService } from '../ranking-cache/ranking-cache.service';
import { RankingEventsService } from '../ranking-events/ranking-events.service';

@Injectable()
export class MatchService {
  private readonly matchHistory: string[];
  private readonly K = 32;

  constructor(
    private readonly rankingCacheService: RankingCacheService,
    private readonly rankingEventsService: RankingEventsService,
  ) {
    this.matchHistory = [];
  }

  public addMatch(winner: string, loser: string, draw: boolean): { winner: { id: string, rank: number }, loser: { id: string, rank: number } } {
    const rankingWinner = this.rankingCacheService.getRanking(winner) || 1000;
    const rankingLoser = this.rankingCacheService.getRanking(loser) || 1000;

    if (draw) {
      this.matchHistory.push(`${winner} vs ${loser}: DRAW`);
      return { winner: { id: winner, rank: rankingWinner }, loser: { id: loser, rank: rankingLoser } };
    }

    const probabilityWinner = this.calculateWinProbability(rankingWinner, rankingLoser);
    const probabilityLoser = 1 - probabilityWinner;

    const newRankingWinner = this.calculateNewRanking(rankingWinner, 1, probabilityWinner);
    const newRankingLoser = this.calculateNewRanking(rankingLoser, 0, probabilityLoser);

    this.rankingCacheService.setRanking(winner, newRankingWinner);
    this.rankingCacheService.setRanking(loser, newRankingLoser);
    this.rankingEventsService.notifySubscribers();

    this.matchHistory.push(`${winner} vs ${loser}: WIN`);
    return { winner: { id: winner, rank: newRankingWinner }, loser: { id: loser, rank: newRankingLoser } };
  }

  private calculateWinProbability(rankingA: number, rankingB: number): number {
    return 1 / (1 + Math.pow(10, (rankingB - rankingA) / 400));
  }

  private calculateNewRanking(currentRanking: number, result: number, expectedScore: number): number {
    return Math.round(currentRanking + this.K * (result - expectedScore));
  }

  public getMatchHistory(): string[] {
    return this.matchHistory;
  }
}