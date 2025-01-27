import { Controller, Post, Body, HttpException, HttpStatus } from '@nestjs/common';
import { PlayerService } from './player.service';

@Controller('api/player')
export class PlayerController {
  constructor(private readonly playerService: PlayerService) {}

  @Post()
  createPlayer(@Body() body: { id: string }): void {
    if (!body.id) {
      console.log('playerId is missing');
      throw new HttpException('playerId is required', HttpStatus.BAD_REQUEST);
    }

    this.playerService.createPlayer(body.id);
  }
}