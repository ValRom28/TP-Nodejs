import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity('player')
export class Player {
  @PrimaryColumn()
  id: string;

  @Column({ default: 1200 })
  rank: number;
}
