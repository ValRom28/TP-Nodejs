import { IsString, IsNumber } from 'class-validator';

export class ResponsePlayerDto {
    @IsString()
    id: string;

    @IsNumber()
    rank: number;
}
