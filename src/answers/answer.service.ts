import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Answer } from './answer.entity';

@Injectable()
export class AnswerService {
  constructor(
    @InjectRepository(Answer)
    private answersRepository: Repository<Answer>,
  ) {}

  async create(answer: Answer): Promise<Answer> {
    return this.answersRepository.save(answer);
  }

  //   async findByUser(userId: number): Promise<Answer[]> {
  //     return this.answersRepository.find({ where: { user: { id: userId } } });
  //   }
}
