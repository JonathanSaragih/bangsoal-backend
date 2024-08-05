import { Controller, Get, Param } from '@nestjs/common';
import { ChoiceService } from './choice.service';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('choices')
export class ChoicesController {
  constructor(private choiceService: ChoiceService) {}

  @ApiOperation({ summary: 'Check if choice is correct' })
  @ApiResponse({ status: 200, type: Boolean })
  @Get(':id')
  async isAnswer(@Param('id') id: number) {
    return this.choiceService.isAnswerCorrect(id);
  }
}
