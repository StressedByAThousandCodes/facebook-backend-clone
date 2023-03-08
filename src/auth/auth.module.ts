import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from 'src/user/user.module';
import { JwtStrategy } from './strategies/jwt.strategies';
import { JwtModule } from '@nestjs/jwt';
import { DatabaseModule } from 'libs/database/database.module';
import { PassportModule } from '@nestjs/passport';
import { UserService } from 'src/user/user.service';

@Module({
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, UserService],
  imports: [UserModule,
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

