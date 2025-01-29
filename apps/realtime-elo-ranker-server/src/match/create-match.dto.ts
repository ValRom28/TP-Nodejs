import { IsString, IsBoolean } from 'class-validator';

export class CreateMatchDto {
  @IsString()
  winner: string;

  @IsString()
  loser: string;

  @IsBoolean()
  draw: boolean;
}
