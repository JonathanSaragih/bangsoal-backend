import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Choice } from '../choices/choice.entity';
import { Answer } from '../answers/answer.entity';

@Entity()
export class Question {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @OneToMany(() => Choice, (choice) => choice.question)
  choices: Choice[];
}
