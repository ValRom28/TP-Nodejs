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
exports.RankingController = void 0;
const common_1 = require("@nestjs/common");
const rxjs_1 = require("rxjs");
const event_emitter_1 = require("@nestjs/event-emitter");
const ranking_service_1 = require("./ranking.service");
const ranking_events_service_1 = require("../ranking-events/ranking-events.service");
let RankingController = class RankingController {
    constructor(rankingService, rankingEventsService, eventEmitter) {
        this.rankingService = rankingService;
        this.rankingEventsService = rankingEventsService;
        this.eventEmitter = eventEmitter;
        this.rankingUpdates = new rxjs_1.Subject();
        this.eventEmitter.on('ranking.update', (ranking) => {
            for (const playerId in ranking) {
                this.rankingUpdates.next({
                    type: 'RankingUpdate',
                    player: {
                        id: playerId,
                        rank: ranking[playerId],
                    },
                });
            }
        });
    }
    getRanking() {
        return this.rankingService.getRanking();
    }
    subscribeToRankingUpdates() {
        return new rxjs_1.Observable((subscriber) => {
            const initialRanking = this.rankingService.getRanking();
            subscriber.next(new MessageEvent('message', {
                data: JSON.stringify({ type: 'InitialData', ranking: initialRanking }),
            }));
            const subscription = this.rankingUpdates.subscribe({
                next: (rankingUpdate) => {
                    subscriber.next(new MessageEvent('message', {
                        data: JSON.stringify(rankingUpdate),
                    }));
                },
                error: (err) => {
                    subscriber.error({
                        type: 'Error',
                        message: err.message,
                    });
                },
            });
            return () => subscription.unsubscribe();
        });
    }
};
exports.RankingController = RankingController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Array)
], RankingController.prototype, "getRanking", null);
__decorate([
    (0, common_1.Sse)('events'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", rxjs_1.Observable)
], RankingController.prototype, "subscribeToRankingUpdates", null);
exports.RankingController = RankingController = __decorate([
    (0, common_1.Controller)('api/ranking'),
    __metadata("design:paramtypes", [ranking_service_1.RankingService,
        ranking_events_service_1.RankingEventsService,
        event_emitter_1.EventEmitter2])
], RankingController);
//# sourceMappingURL=ranking.controller.js.map