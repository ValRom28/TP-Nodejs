import { MatchService } from './match.service';
export declare class MatchController {
    private readonly matchService;
    constructor(matchService: MatchService);
    postMatch(body: {
        adversaryA: string;
        adversaryB: string;
        result: string;
    }): {
        winner: {
            id: string;
            rank: number;
        };
        loser: {
            id: string;
            rank: number;
        };
    };
}
