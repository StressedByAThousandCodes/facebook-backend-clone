import { Module } from '@nestjs/common';
import { SongService } from './song.service';
import { DatabaseModule } from 'libs/database/database.module';
import { SongController } from './song.controller';

@Module({
  providers: [SongService],
  imports: [DatabaseModule],
  controllers: [SongController],
})
export class SongModule {}
