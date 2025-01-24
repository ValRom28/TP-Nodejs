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
Object.defineProperty(exports, "__esModule", { value: true });
exports.RankingEventsService = void 0;
const common_1 = require("@nestjs/common");
const ranking_cache_service_1 = require("../ranking-cache/ranking-cache.service");
let RankingEventsService = class RankingEventsService {
    constructor(rankingCacheService) {
        this.rankingCacheService = rankingCacheService;
        this.subscribers = [];
    }
    subscribe(callback) {
        this.subscribers.push(callback);
    }
    notifySubscribers() {
        const ranking = this.rankingCacheService.getAllRankings();
        this.subscribers.forEach(callback => callback(ranking));
    }
};
exports.RankingEventsService = RankingEventsService;
exports.RankingEventsService = RankingEventsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [ranking_cache_service_1.RankingCacheService])
], RankingEventsService);
//# sourceMappingURL=ranking-events.service.js.map