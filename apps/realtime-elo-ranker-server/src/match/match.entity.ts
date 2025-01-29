import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Player } from '../player/player.entity';

@Entity()
export class Match {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Player, { eager: true })
  winner: Player;

  @ManyToOne(() => Player, { eager: true })
  loser: Player;

  @Column({ default: false })
  draw: boolean;
}
