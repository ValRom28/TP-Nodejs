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
exports.MatchService = void 0;
const common_1 = require("@nestjs/common");
const ranking_cache_service_1 = require("../ranking-cache/ranking-cache.service");
const ranking_events_service_1 = require("../ranking-events/ranking-events.service");
let MatchService = class MatchService {
    constructor(rankingCacheService, rankingEventsService) {
        this.rankingCacheService = rankingCacheService;
        this.rankingEventsService = rankingEventsService;
        this.matchHistory = [];
    }
    addMatch(adversaryA, adversaryB, result) {
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
        }
        else if (result === 'RIGHT_WIN') {
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
    getMatchHistory() {
        return this.matchHistory;
    }
};
exports.MatchService = MatchService;
exports.MatchService = MatchService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [ranking_cache_service_1.RankingCacheService,
        ranking_events_service_1.RankingEventsService])
], MatchService);
//# sourceMappingURL=match.service.js.map