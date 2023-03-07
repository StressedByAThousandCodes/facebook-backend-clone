import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { SpotifyModule } from 'src/spotify/spotify.module';
import { JwtStrategy } from './strategies/jwt.strategies';
import { JwtModule } from '@nestjs/jwt';
import { DatabaseModule } from 'libs/database/database.module';
import { PassportModule } from '@nestjs/passport';
import { SpotifyService } from 'src/spotify/spotify.service';

@Module({
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, SpotifyService],
  imports: [SpotifyModule,
  JwtModule.register({
    secret : "secret",
    signOptions: {expiresIn: '365d'}
  }),
  DatabaseModule,
  PassportModule
  ],
  exports: [PassportModule]
})
export class AuthModule {}

