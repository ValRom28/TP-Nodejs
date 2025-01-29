import { Controller, Post, Body, HttpException, HttpStatus } from '@nestjs/common';
import { PlayerService } from './player.service';
import { CreatePlayerDto } from './create-player.dto';
import { ResponsePlayerDto } from './response-player.dto';

@Controller('api/player')
export class PlayerController {
  constructor(private readonly playerService: PlayerService) {}

  @Post()
  async createPlayer(@Body() createPlayerDto: CreatePlayerDto): Promise<ResponsePlayerDto> {
    if (!createPlayerDto.id) {
      throw new HttpException('id is required', HttpStatus.BAD_REQUEST);
    }

    return await this.playerService.createPlayer(createPlayerDto);
  }
}
