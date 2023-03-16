import { Module } from '@nestjs/common';
import { UserService } from './users.service';
import { UserController } from './users.controller';
import { DatabaseModule } from 'libs/database/database.module';
import { AuthService } from 'src/auth/auth.service';
import { JwtStrategy } from 'src/auth/strategies/jwt.strategies';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

@Module({
  controllers: [UserController],
  providers: [AuthService, JwtStrategy,UserService],
  imports: [DatabaseModule,
    JwtModule.register({
      secret : "secret",
      signOptions: {expiresIn: '365d'}
    }),
    DatabaseModule,
    PassportModule
  ]
})
export class UserModule {}
