import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RankingController } from './ranking/ranking.controller';
import { MatchController } from './match/match.controller';
import { PlayerController } from './player/player.controller';
import { RankingService } from './ranking/ranking.service';
import { MatchService } from './match/match.service';
import { PlayerService } from './player/player.service';
import { RankingEventsService } from './ranking-events/ranking-events.service';
import { RankingCacheService } from './ranking-cache/ranking-cache.service';

@Module({
  imports: [],
  controllers: [AppController, RankingController, MatchController, PlayerController],
  providers: [
    AppService,
    RankingService,
    MatchService,
    PlayerService,
    RankingEventsService,
    RankingCacheService,
  ],
})
export class AppModule {}