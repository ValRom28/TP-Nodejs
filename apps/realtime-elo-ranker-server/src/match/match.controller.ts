import { Controller, Post, Body } from '@nestjs/common';
import { MatchService } from './match.service';

@Controller('api/match')
export class MatchController {
  constructor(private readonly matchService: MatchService) {}

  @Post()
  postMatch(@Body() body: { adversaryA: string; adversaryB: string; result: string }): { winner: { id: string, rank: number }, loser: { id: string, rank: number } } {
    return this.matchService.addMatch(body.adversaryA, body.adversaryB, body.result);
  }
}