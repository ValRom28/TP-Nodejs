import { Module } from '@nestjs/common';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { TypeOrmModule } from '@nestjs/typeorm';

import { DatabaseModule } from './database/database.module';

import { AppController } from './app.controller';
import { RankingController } from './ranking/ranking.controller';
import { MatchController } from './match/match.controller';
import { PlayerController } from './player/player.controller';

import { AppService } from './app.service';
import { RankingService } from './ranking/ranking.service';
import { MatchService } from './match/match.service';
import { PlayerService } from './player/player.service';
import { RankingEventsService } from './ranking-events/ranking-events.service';
import { RankingCacheService } from './ranking-cache/ranking-cache.service';

import { Player } from './player/player.entity';
import { Match } from './match/match.entity';

@Module({
  imports: [
    EventEmitterModule.forRoot(),
    DatabaseModule,
    TypeOrmModule.forFeature([Player, Match]),
  ],
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
