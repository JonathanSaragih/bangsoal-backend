import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChoiceService } from './choice.service';
import { Choice } from './choice.entity';
import { ChoicesController } from './choice.controller';

@Module({
    imports: [TypeOrmModule.forFeature([Choice])],
    providers: [ChoiceService],
    controllers: [ChoicesController],
})
export class ChoicesModule { }
