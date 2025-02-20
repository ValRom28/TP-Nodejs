"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const event_emitter_1 = require("@nestjs/event-emitter");
const typeorm_1 = require("@nestjs/typeorm");
const database_module_1 = require("./database/database.module");
const app_controller_1 = require("./app.controller");
const ranking_controller_1 = require("./ranking/ranking.controller");
const match_controller_1 = require("./match/match.controller");
const player_controller_1 = require("./player/player.controller");
const app_service_1 = require("./app.service");
const ranking_service_1 = require("./ranking/ranking.service");
const match_service_1 = require("./match/match.service");
const player_service_1 = require("./player/player.service");
const ranking_events_service_1 = require("./ranking-events/ranking-events.service");
const ranking_cache_service_1 = require("./ranking-cache/ranking-cache.service");
const player_entity_1 = require("./player/player.entity");
const match_entity_1 = require("./match/match.entity");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            event_emitter_1.EventEmitterModule.forRoot(),
            database_module_1.DatabaseModule,
            typeorm_1.TypeOrmModule.forFeature([player_entity_1.Player, match_entity_1.Match]),
        ],
        controllers: [app_controller_1.AppController, ranking_controller_1.RankingController, match_controller_1.MatchController, player_controller_1.PlayerController],
        providers: [
            app_service_1.AppService,
            ranking_service_1.RankingService,
            match_service_1.MatchService,
            player_service_1.PlayerService,
            ranking_cache_service_1.RankingCacheService,
            ranking_events_service_1.RankingEventsService,
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map