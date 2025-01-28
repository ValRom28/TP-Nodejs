import { Controller, Post, Body } from '@nestjs/common';
import { PlayerService } from './player.service';

@Controller('api/player')
export class PlayerController {
  constructor(private readonly playerService: PlayerService) {}

  @Post()
  createPlayer(@Body() body: { id: string }): void {
    this.playerService.createPlayer(body.id);
  }
}