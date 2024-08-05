import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { Question } from '../questions/question.entity';
import { User } from '../users/user.entity';
import { Choice } from '../choices/choice.entity';

@Entity()
export class Answer {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  questionId: number;

  @Column()
  choiceId: number;

  @Column()
  userId: number;
}
