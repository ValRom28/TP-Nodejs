import { ResponsePlayerDto } from "src/player/response-player.dto";

export class ResponseMatchDto {
    winner: ResponsePlayerDto;
    loser: ResponsePlayerDto;
    draw: boolean;
}