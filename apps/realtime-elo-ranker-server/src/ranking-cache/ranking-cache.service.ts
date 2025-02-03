import { Injectable, OnModuleDestroy, OnModuleInit, Inject, forwardRef } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Player } from '../player/player.entity';
import { RankingEventsService } from '../ranking-events/ranking-events.service';

@Injectable()
export class RankingCacheService implements OnModuleDestroy, OnModuleInit {
  private rankingData: Record<string, number> = {};
  private readonly saveInterval: NodeJS.Timeout;

  constructor(
    @InjectRepository(Player)
    @Inject(forwardRef(() => RankingEventsService))
    private readonly playerRepository: Repository<Player>,
    private readonly rankingEventsService: RankingEventsService
  ) {
    this.saveInterval = setInterval(() => this.saveCacheToDatabase(), 5 * 60 * 1000);
  }

  public getRanking(id: string): number | undefined {
    return this.rankingData[id];
  }

  public setRanking(id: string, ranking: number): void {
    this.rankingData[id] = ranking;
  }

  public getAllRankings(): Record<string, number> {
    return this.rankingData;
  }

  // Sauvegarde du cache en base
  private async saveCacheToDatabase(): Promise<void> {
    console.log('Sauvegarde du cache en base...');
    const players = await this.playerRepository.find();

    for (const player of players) {
      if (this.rankingData[player.id] !== undefined) {
        player.rank = this.rankingData[player.id];
      }
    }

    await this.playerRepository.save(players);
    console.log('Cache sauvegardé en base.');
  }

  async onModuleInit() {
    // Charger les joueurs en mémoire au démarrage
    const players = await this.playerRepository.find();
    players.forEach(player => {
      this.rankingData[player.id] = player.rank;
    });
    this.rankingEventsService.notifySubscribers();
  }

  // Arrêt propre en cas d'arrêt du module
  async onModuleDestroy() {
    clearInterval(this.saveInterval);
    await this.saveCacheToDatabase();
  }
}
