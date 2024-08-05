import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Choice } from './choice.entity';

@Injectable()
export class ChoiceService {
  constructor(
    @InjectRepository(Choice)
    private choicesRepository: Repository<Choice>,
  ) {}

  async create(choice: Choice): Promise<Choice> {
    return this.choicesRepository.save(choice);
  }

  async isAnswerCorrect(choiceId: number): Promise<boolean> {
    const choice = await this.choicesRepository.findOne({
      where: { id: choiceId },
    });

    return choice.isAnswer;
  }
}
