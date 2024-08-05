import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Question } from './question.entity';
import { Choice } from '../choices/choice.entity';

@Injectable()
export class QuestionService {
  constructor(
    @InjectRepository(Question)
    private readonly questionsRepository: Repository<Question>,
    @InjectRepository(Choice)
    private readonly choiceRepository: Repository<Choice>,
  ) {}

  findOne(id: number): Promise<Question> {
    return this.questionsRepository.findOne({
      where: { id },
      relations: ['choices'],
    });
  }

  async create(question: Question): Promise<Question> {
    return this.questionsRepository.save(question);
  }

  async getAllWithChoices(): Promise<Question[]> {
    return this.questionsRepository.find({ relations: ['choices'] });
  }

  //   async getCorrectChoice(questionId: number): Promise<Choice> {
  //     const corectanswerid = await this.questionsRepository.findOne({
  //       where: { id: questionId },
  //       select: ['correctChoiceId'],
  //     });
  //     const correctChoice = await this.questionsRepository.findOne({
  //       where: { id: questionId },
  //       relations: ['choices'],
  //     });

  //     correctChoice.choices = correctChoice.choices.filter(
  //       (choice) => choice.id === corectanswerid.correctChoiceId,
  //     );

  //     return correctChoice.choices[0];
  //   }

  //   async checkAnswer(
  //     questionId: number,
  //     userChoiceId: number,
  //   ): Promise<{ isCorrect: boolean; correctChoice: Choice }> {
  //     const correctChoice = await this.getCorrectChoice(questionId);

  //     const isCorrect = correctChoice.id === userChoiceId;

  //     return { isCorrect, correctChoice };
  //   }
}
