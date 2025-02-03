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
exports.RankingCacheService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const player_entity_1 = require("../player/player.entity");
const ranking_events_service_1 = require("../ranking-events/ranking-events.service");
let RankingCacheService = class RankingCacheService {
    constructor(playerRepository, rankingEventsService) {
        this.playerRepository = playerRepository;
        this.rankingEventsService = rankingEventsService;
        this.rankingData = {};
        this.saveInterval = setInterval(() => this.saveCacheToDatabase(), 5 * 60 * 1000);
    }
    getRanking(id) {
        const rank = this.rankingData[id];
        if (rank !== undefined) {
            console.log('[CACHE] Récupération du classement en cache pour le joueur', id);
        }
        else {
            console.log('[CACHE MISS] Classement non trouvé en cache pour le joueur', id);
        }
        return rank;
    }
    setRanking(id, ranking) {
        console.log('[CACHE SET] Mise à jour du classement en cache pour le joueur', id);
        this.rankingData[id] = ranking;
    }
    getAllRankings() {
        return this.rankingData;
    }
    async saveCacheToDatabase() {
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
        const players = await this.playerRepository.find();
        players.forEach(player => {
            this.rankingData[player.id] = player.rank;
        });
        this.rankingEventsService.notifySubscribers();
    }
    async onModuleDestroy() {
        clearInterval(this.saveInterval);
        await this.saveCacheToDatabase();
    }
};
exports.RankingCacheService = RankingCacheService;
exports.RankingCacheService = RankingCacheService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(player_entity_1.Player)),
    __param(0, (0, common_1.Inject)((0, common_1.forwardRef)(() => ranking_events_service_1.RankingEventsService))),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        ranking_events_service_1.RankingEventsService])
], RankingCacheService);
//# sourceMappingURL=ranking-cache.service.js.map