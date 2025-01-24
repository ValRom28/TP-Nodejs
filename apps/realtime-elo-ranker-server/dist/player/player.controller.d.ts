import { PlayerService } from './player.service';
export declare class PlayerController {
    private readonly playerService;
    constructor(playerService: PlayerService);
    createPlayer(body: {
        playerId: string;
    }): void;
}
