import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Question } from './question.entity';
import { Choice } from '../choices/choice.entity';
import { QuestionService } from './question.service';
import { QuestionController } from './question.controller';
import { ChoiceService } from '../choices/choice.service';

@Module({
  imports: [TypeOrmModule.forFeature([Question, Choice])],
  providers: [QuestionService, ChoiceService],
  controllers: [QuestionController],
})
export class QuestionsModule {}
