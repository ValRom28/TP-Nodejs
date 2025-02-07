import { OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Player } from '../player/player.entity';
import { RankingEventsService } from '../ranking-events/ranking-events.service';
export declare class RankingCacheService implements OnModuleDestroy, OnModuleInit {
    private readonly playerRepository;
    private readonly rankingEventsService;
    private rankingData;
    private readonly saveInterval;
    constructor(playerRepository: Repository<Player>, rankingEventsService: RankingEventsService);
    getRanking(id: string): number;
    setRanking(id: string, ranking: number): void;
    getAllRankings(): Record<string, number>;
    private saveCacheToDatabase;
    onModuleInit(): Promise<void>;
    onModuleDestroy(): Promise<void>;
}
