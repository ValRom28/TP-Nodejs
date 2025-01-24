export declare class RankingCacheService {
    private rankingData;
    getRanking(playerId: string): number | undefined;
    setRanking(playerId: string, ranking: number): void;
    getAllRankings(): Record<string, number>;
}
