import { MatchService } from './match.service';
import { CreateMatchDto } from './create-match.dto';
import { ResponseMatchDto } from './response-match.dto';
export declare class MatchController {
    private readonly matchService;
    constructor(matchService: MatchService);
    postMatch(createMatchDto: CreateMatchDto): Promise<ResponseMatchDto>;
    getMatchHistory(): Promise<{
        id: number;
        winner: string;
        loser: string;
        draw: boolean;
    }[]>;
}
