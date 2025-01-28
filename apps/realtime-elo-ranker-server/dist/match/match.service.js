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
        this.K = 32;
        this.matchHistory = [];
    }
    addMatch(winner, loser, draw) {
        const rankingWinner = this.rankingCacheService.getRanking(winner) || 1000;
        const rankingLoser = this.rankingCacheService.getRanking(loser) || 1000;
        if (draw) {
            this.matchHistory.push(`${winner} vs ${loser}: DRAW`);
            return { winner: { id: winner, rank: rankingWinner }, loser: { id: loser, rank: rankingLoser } };
        }
        const probabilityWinner = this.calculateWinProbability(rankingWinner, rankingLoser);
        const probabilityLoser = 1 - probabilityWinner;
        const newRankingWinner = this.calculateNewRanking(rankingWinner, 1, probabilityWinner);
        const newRankingLoser = this.calculateNewRanking(rankingLoser, 0, probabilityLoser);
        this.rankingCacheService.setRanking(winner, newRankingWinner);
        this.rankingCacheService.setRanking(loser, newRankingLoser);
        this.rankingEventsService.notifySubscribers();
        this.matchHistory.push(`${winner} vs ${loser}: WIN`);
        return { winner: { id: winner, rank: newRankingWinner }, loser: { id: loser, rank: newRankingLoser } };
    }
    calculateWinProbability(rankingA, rankingB) {
        return 1 / (1 + Math.pow(10, (rankingB - rankingA) / 400));
    }
    calculateNewRanking(currentRanking, result, expectedScore) {
        return Math.round(currentRanking + this.K * (result - expectedScore));
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