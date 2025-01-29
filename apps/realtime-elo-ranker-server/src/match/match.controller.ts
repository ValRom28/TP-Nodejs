import { Controller, Post, Get, Body } from '@nestjs/common';
import { MatchService } from './match.service';
import { CreateMatchDto } from './create-match.dto';
import { ResponseMatchDto } from './response-match.dto';

@Controller('api/match')
export class MatchController {
  constructor(private readonly matchService: MatchService) {}

  @Post()
  async postMatch(@Body() createMatchDto: CreateMatchDto): Promise<ResponseMatchDto> {
    return await this.matchService.addMatch(createMatchDto);
  }

  @Get()
  async getMatchHistory(): Promise<{ id: number; winner: string; loser: string; draw: boolean }[]> {
    return await this.matchService.getMatchHistory();
  }
}
