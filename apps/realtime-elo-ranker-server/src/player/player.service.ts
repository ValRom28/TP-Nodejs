import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Player } from './player.entity';
import { RankingCacheService } from '../ranking-cache/ranking-cache.service';
import { RankingEventsService } from '../ranking-events/ranking-events.service';
import { CreatePlayerDto } from './create-player.dto';
import { ResponsePlayerDto } from './response-player.dto';

@Injectable()
export class PlayerService implements OnModuleInit {
  constructor(
    @InjectRepository(Player)
    private readonly playerRepository: Repository<Player>,
    private readonly rankingCacheService: RankingCacheService,
    private readonly rankingEventsService: RankingEventsService
  ) {}

  async onModuleInit() {
    // Charger les joueurs en mémoire au démarrage
    const players = await this.playerRepository.find();
    console.log(players);
    players.forEach(player => {
      this.rankingCacheService.setRanking(player.id, player.rank);
    });
  }

  async createPlayer(createPlayerDto: CreatePlayerDto): Promise<ResponsePlayerDto> {
    const { id } = createPlayerDto;

    let player = await this.playerRepository.findOne({ where: { id } });

    if (!player) {
      player = this.playerRepository.create({ id, rank: 1000 });
      await this.playerRepository.save(player);
    }

    this.rankingCacheService.setRanking(id, player.rank);

    this.rankingEventsService.notifySubscribers(id);

    return { id: player.id, rank: player.rank };
  }
}
