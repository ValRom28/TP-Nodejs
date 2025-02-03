"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RankingEventsService = void 0;
const common_1 = require("@nestjs/common");
const event_emitter_1 = require("@nestjs/event-emitter");
const ranking_cache_service_1 = require("../ranking-cache/ranking-cache.service");
let RankingEventsService = class RankingEventsService {
    constructor(rankingCacheService, eventEmitter) {
        this.rankingCacheService = rankingCacheService;
        this.eventEmitter = eventEmitter;
    }
    notifySubscribers(playerId) {
        const ranking = playerId
            ? { [playerId]: this.rankingCacheService.getRanking(playerId) }
            : this.rankingCacheService.getAllRankings();
        this.eventEmitter.emit('ranking.update', ranking);
    }
    onModuleDestroy() {
        this.eventEmitter.removeAllListeners('ranking.update');
    }
};
exports.RankingEventsService = RankingEventsService;
exports.RankingEventsService = RankingEventsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)((0, common_1.forwardRef)(() => ranking_cache_service_1.RankingCacheService))),
    __metadata("design:paramtypes", [ranking_cache_service_1.RankingCacheService,
        event_emitter_1.EventEmitter2])
], RankingEventsService);
//# sourceMappingURL=ranking-events.service.js.map