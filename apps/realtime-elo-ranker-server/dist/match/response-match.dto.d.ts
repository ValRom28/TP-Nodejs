import { ResponsePlayerDto } from "src/player/response-player.dto";
export declare class ResponseMatchDto {
    winner: ResponsePlayerDto;
    loser: ResponsePlayerDto;
    draw: boolean;
}
