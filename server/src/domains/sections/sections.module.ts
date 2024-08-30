import { Module } from '@nestjs/common';
import { SectionsService } from './sections.service';
import { SectionsController } from './sections.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Section } from './entities/section.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Section])],
  controllers: [SectionsController],
  providers: [SectionsService],
  exports: [TypeOrmModule],
})
export class SectionsModule {}
