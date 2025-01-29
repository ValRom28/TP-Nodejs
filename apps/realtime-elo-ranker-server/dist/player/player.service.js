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
exports.PlayerService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const player_entity_1 = require("./player.entity");
const ranking_cache_service_1 = require("../ranking-cache/ranking-cache.service");
const ranking_events_service_1 = require("../ranking-events/ranking-events.service");
let PlayerService = class PlayerService {
    constructor(playerRepository, rankingCacheService, rankingEventsService) {
        this.playerRepository = playerRepository;
        this.rankingCacheService = rankingCacheService;
        this.rankingEventsService = rankingEventsService;
    }
    async onModuleInit() {
        const players = await this.playerRepository.find();
        console.log(players);
        players.forEach(player => {
            this.rankingCacheService.setRanking(player.id, player.rank);
        });
    }
    async createPlayer(createPlayerDto) {
        const { id } = createPlayerDto;
        let player = await this.playerRepository.findOne({ where: { id } });
        if (!player) {
            player = this.playerRepository.create({ id, rank: 1000 });
            await this.playerRepository.save(player);
        }
        this.rankingCacheService.setRanking(id, player.rank);
        this.rankingEventsService.notifySubscribers();
        return { id: player.id, rank: player.rank };
    }
};
exports.PlayerService = PlayerService;
exports.PlayerService = PlayerService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(player_entity_1.Player)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        ranking_cache_service_1.RankingCacheService,
        ranking_events_service_1.RankingEventsService])
], PlayerService);
//# sourceMappingURL=player.service.js.map