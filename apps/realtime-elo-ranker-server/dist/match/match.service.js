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
exports.MatchService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const match_entity_1 = require("./match.entity");
const player_entity_1 = require("../player/player.entity");
const ranking_cache_service_1 = require("../ranking-cache/ranking-cache.service");
const ranking_events_service_1 = require("../ranking-events/ranking-events.service");
let MatchService = class MatchService {
    constructor(matchRepository, playerRepository, rankingCacheService, rankingEventsService) {
        this.matchRepository = matchRepository;
        this.playerRepository = playerRepository;
        this.rankingCacheService = rankingCacheService;
        this.rankingEventsService = rankingEventsService;
        this.K = 32;
    }
    async addMatch(createMatchDto) {
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
        }
        else {
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
    async getMatchHistory() {
        const matches = await this.matchRepository.find({ relations: ['winner', 'loser'] });
        return matches.map(match => ({
            id: match.id,
            winner: match.winner.id,
            loser: match.loser.id,
            draw: match.draw,
        }));
    }
};
exports.MatchService = MatchService;
exports.MatchService = MatchService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(match_entity_1.Match)),
    __param(1, (0, typeorm_1.InjectRepository)(player_entity_1.Player)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        ranking_cache_service_1.RankingCacheService,
        ranking_events_service_1.RankingEventsService])
], MatchService);
//# sourceMappingURL=match.service.js.map