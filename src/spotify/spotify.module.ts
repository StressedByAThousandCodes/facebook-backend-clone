import { Module } from '@nestjs/common';
import { SpotifyService } from './spotify.service';
import { SpotifyController } from './spotify.controller';
import { DatabaseModule } from 'libs/database/database.module';
import { AuthService } from 'src/auth/auth.service';
import { JwtStrategy } from 'src/auth/strategies/jwt.strategies';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

@Module({
  controllers: [SpotifyController],
  providers: [AuthService, JwtStrategy,SpotifyService],
  imports: [DatabaseModule,
    JwtModule.register({
      secret : "secret",
      signOptions: {expiresIn: '365d'}
    }),
    DatabaseModule,
    PassportModule
  ]
})
export class SpotifyModule {}
