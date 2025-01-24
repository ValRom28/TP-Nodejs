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

  public addMatch(adversaryA: string, adversaryB: string, result: string): { winner: { id: string, rank: number }, loser: { id: string, rank: number } } {
    const rankingA = this.rankingCacheService.getRanking(adversaryA) || 1000;
    const rankingB = this.rankingCacheService.getRanking(adversaryB) || 1000;

    let newRankingA = rankingA;
    let newRankingB = rankingB;
    let winner = { id: '', rank: 0 };
    let loser = { id: '', rank: 0 };

    if (result === 'LEFT_WIN') {
      newRankingA += 10;
      newRankingB -= 10;
      winner = { id: adversaryA, rank: newRankingA };
      loser = { id: adversaryB, rank: newRankingB };
    } else if (result === 'RIGHT_WIN') {
      newRankingA -= 10;
      newRankingB += 10;
      winner = { id: adversaryB, rank: newRankingB };
      loser = { id: adversaryA, rank: newRankingA };
    }

    this.rankingCacheService.setRanking(adversaryA, newRankingA);
    this.rankingCacheService.setRanking(adversaryB, newRankingB);
    this.rankingEventsService.notifySubscribers();

    this.matchHistory.push(`${adversaryA} vs ${adversaryB}: ${result}`);
    return { winner, loser };
  }

  public getMatchHistory(): string[] {
    return this.matchHistory;
  }
}