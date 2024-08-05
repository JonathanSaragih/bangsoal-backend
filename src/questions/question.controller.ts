import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { QuestionService } from './question.service';
import { Question } from './question.entity';
import { ChoiceService } from 'src/choices/choice.service';
import { ApiBody, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';

@Controller('questions')
export class QuestionController {
  constructor(
    private readonly questionService: QuestionService,
    private readonly choiceService: ChoiceService,
  ) {}

  // ADMIN ONLY (bikin ini cuman buat input pertanyaan buat debug)
  @ApiOperation({ summary: 'Create new question' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        title: { type: 'string', example: '1 + 1 = ?' },
        choices: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              text: { type: 'string', example: '1' },
              explanation: { type: 'string', example: 'salah' },
              isAnswer: { type: 'boolean', example: false },
            },
          },
          example: [
            { text: '1', explanation: 'salah', isAnswer: false },
            { text: '2', explanation: 'bener', isAnswer: true },
            { text: '3', explanation: 'salah', isAnswer: false },
          ],
        },
      },
    },
    required: true,
  })
  @ApiResponse({ status: 201, description: 'Question created successfully' })
  @Post()
  async createQuestion(@Body() question: Question): Promise<string> {
    const out = await this.questionService.create(question);
    for (const choice of question.choices) {
      choice.question = out;
      this.choiceService.create(choice);
    }
    return 'Question created successfully';
  }

  @ApiOperation({ summary: 'Get question with id' })
  @ApiParam({
    name: 'id',
    type: Number,
    required: true,
    description: 'Question ID',
  })
  @ApiResponse({
    status: 200,
    schema: {
      type: 'object',
      properties: {
        id: { type: 'number', example: 1 },
        title: { type: 'string', example: '1 + 1 = ?' },
        choices: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              id: { type: 'number', example: 1 },
              text: { type: 'string', example: '1' },
              explanation: { type: 'string', example: 'salah' },
              isAnswer: { type: 'boolean', example: false },
            },
          },
          example: [
            { id: 1, text: '1', explanation: 'salah', isAnswer: false },
            { id: 2, text: '2', explanation: 'bener', isAnswer: true },
            { id: 3, text: '3', explanation: 'salah', isAnswer: false },
          ],
        },
      },
    },
  })
  @Get(':id')
  async getQuestion(@Param('id') id: number): Promise<Question> {
    return this.questionService.findOne(id);
  }

  @ApiOperation({ summary: 'Get all questions ' })
  @ApiResponse({ status: 200, type: Question, isArray: true })
  @Get()
  async getQuestions(): Promise<Question[]> {
    return this.questionService.getAllWithChoices();
  }
}
