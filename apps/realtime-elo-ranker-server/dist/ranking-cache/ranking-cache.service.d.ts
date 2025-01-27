export declare class RankingCacheService {
    private rankingData;
    getRanking(id: string): number | undefined;
    setRanking(id: string, ranking: number): void;
    getAllRankings(): Record<string, number>;
}
