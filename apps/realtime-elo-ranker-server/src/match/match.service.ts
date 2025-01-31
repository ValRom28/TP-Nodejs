import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Match } from './match.entity';
import { Player } from '../player/player.entity';
import { RankingCacheService } from '../ranking-cache/ranking-cache.service';
import { RankingEventsService } from '../ranking-events/ranking-events.service';
import { CreateMatchDto } from './create-match.dto';
import { ResponseMatchDto } from './response-match.dto';

@Injectable()
export class MatchService {
  private readonly K: number = 32;

  constructor(
    @InjectRepository(Match)
    private readonly matchRepository: Repository<Match>,
    @InjectRepository(Player)
    private readonly playerRepository: Repository<Player>,
    private readonly rankingCacheService: RankingCacheService,
    private readonly rankingEventsService: RankingEventsService,
  ) {}


  async addMatch(createMatchDto: CreateMatchDto): Promise<ResponseMatchDto> {
    const { winner, loser, draw } = createMatchDto;

    const winnerPlayer = await this.playerRepository.findOne({ where: { id: winner } });
    const loserPlayer = await this.playerRepository.findOne({ where: { id: loser } });
    
    if (!winnerPlayer || !loserPlayer) {
      throw new Error('Winner or loser player not found');
    }

    let rankingWinner = this.rankingCacheService.getRanking(winner) ?? 1000;
    let rankingLoser = this.rankingCacheService.getRanking(loser) ?? 1000;

    const expectedWinner = 1 / (1 + Math.pow(10, (rankingLoser - rankingWinner) / 400));
    const expectedLoser = 1 / (1 + Math.pow(10, (rankingWinner - rankingLoser) / 400));

    let scoreWinner, scoreLoser;

    if (draw) {
      scoreWinner = 0.5;
      scoreLoser = 0.5;
    } else {
      scoreWinner = 1;
      scoreLoser = 0;
    }

    rankingWinner = Math.round(rankingWinner + this.K * (scoreWinner - expectedWinner));
    rankingLoser = Math.round(rankingLoser + this.K * (scoreLoser - expectedLoser));

    this.rankingCacheService.setRanking(winner, rankingWinner);
    this.rankingCacheService.setRanking(loser, rankingLoser);

    winnerPlayer.rank = rankingWinner;
    loserPlayer.rank = rankingLoser;

    await this.playerRepository.save([winnerPlayer, loserPlayer]);

    const newMatch = this.matchRepository.create({
      winner: winnerPlayer,
      loser: loserPlayer,
      draw,
    });

    await this.matchRepository.save(newMatch);

    this.rankingEventsService.notifySubscribers();

    return {
      winner: { id: winner, rank: rankingWinner },
      loser: { id: loser, rank: rankingLoser },
      draw,
    };
  }

  
  async getMatchHistory(): Promise<{ id: number; winner: string; loser: string; draw: boolean }[]> {
    const matches = await this.matchRepository.find({ relations: ['winner', 'loser'] });
    return matches.map(match => ({
      id: match.id,
      winner: match.winner.id,
      loser: match.loser.id,
      draw: match.draw,
    }));
  }
}
