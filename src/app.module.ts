import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ConfigModule } from '@nestjs/config';
import { AppService } from './app.service';
import { SpotifyModule } from './spotify/spotify.module';
import { DatabaseModule } from 'libs/database/database.module';
import { SongModule } from './song/song.module';
import { AuthModule } from './auth/auth.module';
import { HomeModule } from './home/home.module';

@Module({
  imports: [SpotifyModule,
    ConfigModule.forRoot({isGlobal : true}),
    DatabaseModule,
    SongModule,
    AuthModule,
    HomeModule,
    
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
