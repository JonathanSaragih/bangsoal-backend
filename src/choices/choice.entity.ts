import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Question } from '../questions/question.entity';
import { Answer } from '../answers/answer.entity';

@Entity()
export class Choice {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  text: string;

  @Column()
  isAnswer: boolean;

  @Column()
  explanation: string;

  @ManyToOne(() => Question, (question) => question.choices)
  question: Question;
}
