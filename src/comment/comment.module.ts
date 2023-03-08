import { Module } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CommentController } from './comment.controller';
import { DatabaseModule } from 'libs/database/database.module';

@Module({
  controllers: [CommentController],
  providers: [CommentService],
  imports: [DatabaseModule]
})
export class CommentModule {}
