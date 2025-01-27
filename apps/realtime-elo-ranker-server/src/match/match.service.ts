import { Injectable } from '@nestjs/common';
import { RankingCacheService } from '../ranking-cache/ranking-cache.service';
import { RankingEventsService } from '../ranking-events/ranking-events.service';

@Injectable()
export class MatchService {
  private readonly matchHistory: string[];

  constructor(
    private readonly rankingCacheService: RankingCacheService,
    private readonly rankingEventsService: RankingEventsService,
  ) {
    this.matchHistory = [];
  }

  public addMatch(winner: string, loser: string, draw: boolean): { winner: { id: string, rank: number }, loser: { id: string, rank: number } } {
    const rankingWinner = this.rankingCacheService.getRanking(winner) || 1000;
    const rankingLoser = this.rankingCacheService.getRanking(loser) || 1000;

    let newRankingWinner = rankingWinner;
    let newRankingLoser = rankingLoser;

    if (draw) {
      return { winner: { id: winner, rank: newRankingWinner }, loser: { id: loser, rank: newRankingLoser } };
    } else {
      newRankingWinner += 10;
      newRankingLoser -= 10;
    }

    this.rankingCacheService.setRanking(winner, newRankingWinner);
    this.rankingCacheService.setRanking(loser, newRankingLoser);
    this.rankingEventsService.notifySubscribers();

    this.matchHistory.push(`${winner} vs ${loser}: ${draw ? 'DRAW' : 'WIN'}`);
    return { winner: { id: winner, rank: newRankingWinner }, loser: { id: loser, rank: newRankingLoser } };
  }

  public getMatchHistory(): string[] {
    return this.matchHistory;
  }
}