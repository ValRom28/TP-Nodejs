import { Controller, Post, Body } from '@nestjs/common';
import { PlayerService } from './player.service';

@Controller('api/player')
export class PlayerController {
  constructor(private readonly playerService: PlayerService) {}

  @Post()
  createPlayer(@Body() body: { playerId: string }): void {
    this.playerService.createPlayer(body.playerId);
  }
}