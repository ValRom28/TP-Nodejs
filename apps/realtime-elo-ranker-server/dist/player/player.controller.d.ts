import { PlayerService } from './player.service';
import { CreatePlayerDto } from './create-player.dto';
import { ResponsePlayerDto } from './response-player.dto';
export declare class PlayerController {
    private readonly playerService;
    constructor(playerService: PlayerService);
    createPlayer(createPlayerDto: CreatePlayerDto): Promise<ResponsePlayerDto>;
}
