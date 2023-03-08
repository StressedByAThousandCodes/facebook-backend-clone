import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ConfigModule } from '@nestjs/config';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { DatabaseModule } from 'libs/database/database.module';
import { AuthModule } from './auth/auth.module';
import { HomeModule } from './home/home.module';

@Module({
  imports: [UserModule,
    ConfigModule.forRoot({isGlobal : true}),
    DatabaseModule,
    AuthModule,
    HomeModule,
    
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
