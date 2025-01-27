import { Controller, Post, Body } from '@nestjs/common';
import { MatchService } from './match.service';

@Controller('api/match')
export class MatchController {
  constructor(private readonly matchService: MatchService) {}

  @Post()
  postMatch(@Body() body: { winner: string; loser: string; draw: boolean }): { winner: { id: string, rank: number }, loser: { id: string, rank: number } } {
    console.log(`Received body: ${JSON.stringify(body)}`);
    return this.matchService.addMatch(body.winner, body.loser, body.draw);
  }
}