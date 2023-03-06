import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ConfigModule } from '@nestjs/config';
import { AppService } from './app.service';
import { SpotifyModule } from './spotify/spotify.module';
import { ConfigurableModuleClass } from '@nestjs/common/cache/cache.module-definition';
import { DatabaseModule } from 'libs/database/database.module';

@Module({
  imports: [SpotifyModule,
    ConfigModule.forRoot({isGlobal : true}),
    DatabaseModule,
    
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
