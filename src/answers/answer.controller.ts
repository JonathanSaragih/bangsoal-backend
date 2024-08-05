import { Controller, Post, Body } from '@nestjs/common';
import { AnswerService } from './answer.service';
import { Answer } from './answer.entity';
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('answers')
export class AnswerController {
  constructor(private readonly answerService: AnswerService) {}

  @ApiOperation({ summary: 'User answer' })
  @ApiResponse({ status: 200, type: Answer })
  @ApiBody({ type: Answer, required: true })
  @Post()
  create(@Body() answer: Answer): Promise<Answer> {
    return this.answerService.create(answer);
  }

  //   @Get('user/:id')
  //   findByUser(@Param('id') userId: number): Promise<Answer[]> {
  //     return this.answerService.findByUser(userId);
  //   }
}
