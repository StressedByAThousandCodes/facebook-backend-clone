import { Module } from '@nestjs/common';
import { SpotifyService } from './spotify.service';
import { SpotifyController } from './spotify.controller';
import { DatabaseModule } from 'libs/database/database.module';

@Module({
  controllers: [SpotifyController],
  providers: [SpotifyService],
  imports: [DatabaseModule]
})
export class SpotifyModule {}
